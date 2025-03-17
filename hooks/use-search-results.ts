import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { getPosts } from '@/actions/posts'

export const useSearchResults = (
  filters: {
    q: string
    type: PostType | ''
    format: PostFormat | ''
    level: PostLevel | ''
    language: string
  },
  page: number,
  itemsPerPage: number
) => {
  return useQuery({
    queryKey: ['searchResults', filters, page, itemsPerPage],
    queryFn: () => getPosts(filters, page, itemsPerPage),
  })
}
