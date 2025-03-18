import { useQuery } from '@tanstack/react-query'

import { getPost } from '@/actions/posts'

export const usePostDetails = (id: string) => {
  return useQuery({
    queryKey: ['postDetails', id],
    queryFn: () => getPost(id),
  })
}
