import { Prisma } from '@prisma/client'

export const userDataInclude = {
  id: true,
  username: true,
  name: true,
  bio: true,
  image: true,
  createdAt: true,
} satisfies Prisma.UserSelect

export const postDataInclude = {
  user: {
    select: userDataInclude,
  },
} satisfies Prisma.PostInclude

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude
}>

export type UserData = Prisma.UserGetPayload<{
  select: typeof userDataInclude
}>
