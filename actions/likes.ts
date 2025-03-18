'use server'

import { NotificationType, PointsActivityType } from '@prisma/client'

import getSession from '@/lib/get-session'
import { prisma } from '@/lib/prisma'

import { LikeInfo } from '@/types/likes'

export const getLikes = async (postId: string) => {
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

    // Find the post and get its author's ID, the likes and the count of likes
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        likes: {
          where: {
            userId: session.user.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    })

    if (!post) {
      return { status: 'error', error: 'Post not found' }
    }

    const data: LikeInfo = {
      likes: post._count.likes,
      isLikedByUser: !!post.likes.length,
    }

    return { status: 'success', data }
  } catch (error) {
    return { status: 'error', message: 'There was a problem getting the likes' }
  }
}

// Likes a post and handles related notifications and points
// @param postId - The ID of the post to like
// @returns Status object indicating success or failure
export const likePost = async (postId: string) => {
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

    // Find the post and get its author's ID
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        userId: true,
      },
    })

    if (!post) {
      return { status: 'error', error: 'Post not found' }
    }

    // Execute all database operations in a transaction
    await prisma.$transaction([
      // Create or update the like record
      prisma.like.upsert({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
        create: {
          userId: session.user.id,
          postId,
        },
        update: {},
      }),
      // If the liker is not the post author, create notification and award points
      ...(session.user.id !== post.userId
        ? [
            // Create notification for post author
            prisma.notification.create({
              data: {
                recipientId: post.userId,
                issuerId: session.user.id,
                postId,
                type: NotificationType.LIKE,
              },
            }),
            // Award points to post author
            prisma.points.create({
              data: {
                userId: post.userId,
                points: 5,
                activityType: PointsActivityType.LIKE_RECEIVED,
                postId,
              },
            }),
          ]
        : []),
    ])
    return { status: 'success', message: 'Post liked successfully' }
  } catch (error) {
    return { status: 'error', message: 'There was a problem liking the post' }
  }
}

// Unlikes a post and removes related notifications and points
// @param postId - The ID of the post to unlike
// @returns Status object indicating success or failure

export const unlikePost = async (postId: string) => {
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

    // Find the post and get its author's ID
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        userId: true,
      },
    })

    if (!post) {
      return { status: 'error', error: 'Post not found' }
    }

    // Execute all database operations in a transaction
    await prisma.$transaction([
      // Remove the like record
      prisma.like.deleteMany({
        where: { userId: session.user.id, postId },
      }),
      // Remove the notification
      prisma.notification.deleteMany({
        where: {
          recipientId: post.userId,
          issuerId: session.user.id,
          postId,
          type: NotificationType.LIKE,
        },
      }),
      // Remove the points awarded
      prisma.points.deleteMany({
        where: {
          postId,
          userId: post.userId,
          activityType: PointsActivityType.LIKE_RECEIVED,
        },
      }),
    ])
    return { status: 'success', message: 'Post unliked successfully' }
  } catch (error) {
    return { status: 'error', message: 'There was a problem unliking the post' }
  }
}
