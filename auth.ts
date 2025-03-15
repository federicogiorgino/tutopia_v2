import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google, GitHub],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      session.user.username = user.username
      return session
    },
  },
})
