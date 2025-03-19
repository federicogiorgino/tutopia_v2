'use server'

import { NotificationType, PointsActivityType } from '@prisma/client'

import { getCommentDataInclude } from '@/lib/db'
import getSession from '@/lib/get-session'
import { prisma } from '@/lib/prisma'

export const createComment = async (data: {
  body: string
  postId: string
  parentId?: string
}) => {
  try {
    const session = await getSession()

    // Check if user is authenticated
    if (!session || !session.user.id) {
      return {
        status: 'error',
        error: 'You must be logged in to perform this action',
      }
    }

    const post = await prisma.post.findUnique({
      where: {
        id: data.postId,
      },
    })

    if (!post) return { success: false, error: 'Post not found' }

    await prisma.comment.create({
      data: {
        body: data.body,
        user: {
          connect: { id: session.user.id },
        },
        post: {
          connect: { id: data.postId },
        },
        parent: data.parentId
          ? {
              connect: { id: data.parentId },
            }
          : undefined,
      },
      include: {
        user: true,
      },
    })

    // Create notification if post creator is different from commenter

    if (session.user.id !== post.userId) {
      await prisma.$transaction([
        prisma.points.create({
          data: {
            userId: post.userId,
            postId: data.postId,
            points: 5,
            activityType: PointsActivityType.COMMENT,
          },
        }),
        prisma.notification.create({
          data: {
            issuerId: session.user.id,
            recipientId: post.id,
            postId: data.postId,
            type: data.parentId
              ? NotificationType.REPLY
              : NotificationType.COMMENT,
          },
        }),
      ])
    }

    return { status: 'success', message: 'Comment created successfully' }
  } catch (error) {
    return {
      status: 'error',
      message: 'There was a problem commenting the post',
    }
  }
}

export const fetchComments = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      include: getCommentDataInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    })
    return {
      status: 'success',
      data: comments,
    }
  } catch (error) {
    return {
      status: 'error',
      error: 'Failed to fetch comments',
    }
  }
}
