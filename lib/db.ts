import { Prisma } from '@prisma/client'

export const getUserDataInclude = {
  id: true,
  username: true,
  name: true,
  bio: true,
  image: true,
  createdAt: true,
  _count: {
    select: {
      posts: true,
      comments: true,
    },
  },
} satisfies Prisma.UserSelect

export const getPostDataInclude = (userId?: string) => {
  return {
    user: {
      select: getUserDataInclude,
    },
    likes: userId
      ? {
          where: {
            userId,
          },
          select: {
            userId: true,
          },
        }
      : {},
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  } satisfies Prisma.PostInclude
}
export function getCommentDataInclude() {
  return {
    user: {
      select: getUserDataInclude,
    },
    _count: {
      select: { children: true },
    },
  } satisfies Prisma.CommentInclude
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>
}>

export type UserData = Prisma.UserGetPayload<{
  select: typeof getUserDataInclude
}>

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>
}>
