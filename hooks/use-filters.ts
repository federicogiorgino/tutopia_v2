import { useQuery } from '@tanstack/react-query'

import { getFilters } from '@/actions/posts'

export const useFilters = (q?: string) => {
  return useQuery({
    queryKey: ['filters', q],
    queryFn: () => getFilters(q),
  })
}
