import { z } from 'zod'

import { postSchema } from '@/schemas/post'

export type NewPostValues = z.infer<typeof postSchema>
