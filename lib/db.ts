import { Prisma } from '@prisma/client'

export const userDataInclude = {
  id: true,
  username: true,
  name: true,
  bio: true,
  image: true,
  createdAt: true,
  _count: {
    select: {
      posts: true,
      comments: true
    },
  },
} satisfies Prisma.UserSelect

export const getPostDataInclude = (userId?: string) => {
  return {
    user: {
      select: userDataInclude,
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
export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>
}>

export type UserData = Prisma.UserGetPayload<{
  select: typeof userDataInclude
}>
