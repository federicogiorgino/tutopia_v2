'use server'

import { PostFormat, PostLevel, PostType } from '@prisma/client'

import { getPostDataInclude } from '@/lib/db'
import getSession from '@/lib/get-session'
import { prisma } from '@/lib/prisma'

import { postSchema } from '@/schemas/post'
import { NewPostValues } from '@/types/post'

// Creates a new post in the database
// @param data The post data to create
// @returns Object containing status and message/error

export const createPost = async (data: NewPostValues) => {
  try {
    // Get the current session
    const session = await getSession()

    // Check if user is authenticated
    if (!session || !session.user.id) {
      return {
        status: 'error',
        error: 'You must be logged in to perform this action',
      }
    }

    // @todo: Add protection with Arcjet

    // Validate the post data against schema
    const validatedData = postSchema.safeParse(data)

    // Return validation errors if any
    if (!validatedData.success) {
      return { status: 'error', error: validatedData.error.errors }
    }

    // Create the post in database
    await prisma.post.create({
      data: {
        ...validatedData.data,
        userId: session.user.id,
      },
    })

    return { status: 'success', message: 'Post created successfully' }
  } catch (error) {
    return { status: 'error', error: 'Failed to create post' }
  }
}

// Gets filter options and their counts based on existing posts
// @param q Optional search query to filter results
// @returns Object containing counts for each filter type

export const getFilters = async (q?: string) => {
  try {
    const baseWhere = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {}

    // Get counts for each filter value
    const [typeCount, formatCount, levelCount, languageCount] =
      await Promise.all([
        prisma.post.groupBy({
          by: ['type'],
          where: q
            ? {
                OR: [
                  { title: { contains: q, mode: 'insensitive' } },
                  { description: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          _count: true,
        }),
        prisma.post.groupBy({
          by: ['format'],
          where: q
            ? {
                OR: [
                  { title: { contains: q, mode: 'insensitive' } },
                  { description: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          _count: true,
        }),
        prisma.post.groupBy({
          by: ['level'],
          where: q
            ? {
                OR: [
                  { title: { contains: q, mode: 'insensitive' } },
                  { description: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          _count: true,
        }),
        prisma.post.groupBy({
          by: ['language'],
          where: q
            ? {
                OR: [
                  { title: { contains: q, mode: 'insensitive' } },
                  { description: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          _count: true,
        }),
      ])

    return {
      status: 'success',
      data: {
        types: typeCount.map((t) => ({ value: t.type, count: t._count })),
        formats: formatCount.map((f) => ({ value: f.format, count: f._count })),
        levels: levelCount.map((l) => ({ value: l.level, count: l._count })),
        languages: languageCount.map((l) => ({
          value: l.language,
          count: l._count,
        })),
      },
    }
  } catch (error) {
    return { status: 'error', error: 'Failed to get filters' }
  }
}

// Gets paginated posts with optional filters
// @param filters Object containing filter criteria
// @param page Current page number
// @param perPage Number of posts per page
// @returns Object containing posts and pagination info

export const getPosts = async (
  filters: {
    q: string
    type: PostType | ''
    format: PostFormat | ''
    level: PostLevel | ''
    language: string
  },
  page: number,
  perPage: number
) => {
  try {
    // Get paginated posts with filters
    const session = await getSession()
    const [results, totalCount] = await Promise.all([
      prisma.post.findMany({
        where: {
          AND: [
            filters.q
              ? {
                  OR: [
                    { title: { contains: filters.q, mode: 'insensitive' } },
                    {
                      description: { contains: filters.q, mode: 'insensitive' },
                    },
                  ],
                }
              : {},
            filters.type ? { type: filters.type as PostType } : {},
            filters.format ? { format: filters.format as PostFormat } : {},
            filters.level ? { level: filters.level as PostLevel } : {},
            filters.language ? { language: filters.language } : {},
          ],
        },
        skip: (page - 1) * perPage,
        take: perPage,
        include: getPostDataInclude(session?.user.id),
      }),

      // Get total count for pagination
      prisma.post.count({
        where: {
          AND: [
            filters.q
              ? {
                  OR: [
                    { title: { contains: filters.q, mode: 'insensitive' } },
                    {
                      description: { contains: filters.q, mode: 'insensitive' },
                    },
                  ],
                }
              : {},
            filters.type ? { type: filters.type as PostType } : {},
            filters.format ? { format: filters.format as PostFormat } : {},
            filters.level ? { level: filters.level as PostLevel } : {},
            filters.language ? { language: filters.language } : {},
          ],
        },
      }),
    ])

    return {
      status: 'success',
      data: {
        posts: results,
        totalPages: Math.ceil(totalCount / perPage),
      },
    }
  } catch (error) {
    return { status: 'error', error: 'Failed to get posts' }
  }
}

// Gets a single post by ID
// @param postId The ID of the post to retrieve
// @returns Object containing the post data or error

export const getPost = async (postId: string) => {
  try {
    const session = await getSession()

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: getPostDataInclude(session?.user.id),
    })

    if (!post) {
      return { status: 'success', error: 'Post not found' }
    }
    return {
      status: 'success',
      data: post,
    }
  } catch (error) {
    return { status: 'error', error: 'Failed to get posts' }
  }
}
