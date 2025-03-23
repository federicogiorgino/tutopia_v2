import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createComment, fetchComments } from '@/actions/comments'

export const useComments = (postId: string, commentId?: string) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  })

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      queryClient.invalidateQueries({
        queryKey: ['replies', postId, commentId],
      })
      queryClient.invalidateQueries({ queryKey: ['postDetails', postId] })
      queryClient.invalidateQueries({ queryKey: ['searchResults'] })
    },
  })

  return {
    data,
    isLoading,
    isError,
    mutation,
  }
}
