'use server'

import getSession from '@/lib/get-session'
import { prisma } from '@/lib/prisma'

import { postSchema } from '@/schemas/post'
import { NewPostValues } from '@/types/post'

// Creates a new post in the database
// @param data The post data to create
// returns Object containing status and message/error

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
