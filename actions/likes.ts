'use server'

import getSession from '@/lib/get-session'
import { prisma } from '@/lib/prisma'

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

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        userId: true,
      },
    })

    if (!post) {
      return { status: 'error', error: 'Post not found' }
    }

    await prisma.$transaction([
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
      ...(session.user.id !== post.userId
        ? [
            // will handle notifications & points
          ]
        : []),
    ])
    return { status: 'success', message: 'Post liked successfully' }
  } catch (error) {
    return { status: 'error', message: 'There was a problem liking the post' }
  }
}
