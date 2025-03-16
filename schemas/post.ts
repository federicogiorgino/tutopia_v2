import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  externalUrl: z.string().url('Invalid URL'),
  creator: z.string().min(1, 'Creator is required'),
  type: z.enum([
    PostType.FREE,
    PostType.PAID,
    PostType.SUBSCRIPTION,
    PostType.NO_REGISTRATION,
  ]),
  format: z.enum([
    PostFormat.ARTICLE,
    PostFormat.COURSE,
    PostFormat.OTHERS,
    PostFormat.VIDEO,
  ]),
  level: z.enum([
    PostLevel.ADVANCED,
    PostLevel.BEGINNER,
    PostLevel.INTERMEDIATE,
  ]),
  language: z.string().min(1, 'Language is required'),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  tags: z.array(z.string()),
})
