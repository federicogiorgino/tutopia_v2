'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { getLikes, likePost, unlikePost } from '@/actions/likes'
import { LikeInfo } from '@/types/likes'

interface LikeButtonProps {
  postId: string
  initialState: LikeInfo
}

function LikeButton({ postId, initialState }: LikeButtonProps) {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['like', postId],
    queryFn: () => getLikes(postId),
  })

  const { mutate } = useMutation({
    mutationFn: () =>
      data?.data?.isLikedByUser ? unlikePost(postId) : likePost(postId),
    onMutate: () => {
      // Optimistically update the UI
      const oldData = queryClient.getQueryData(['like', postId])
      queryClient.setQueryData(['like', postId], {
        status: 'success',
        data: {
          likes:
            (data?.data?.likes ?? 0) + (data?.data?.isLikedByUser ? -1 : 1),
          isLikedByUser: !data?.data?.isLikedByUser,
        },
      })

      // Return context for rollback
      return { oldData }
    },
    onError() {
      toast.error('Something went wrong. Try again')
    },
  })
  return (
    <motion.div
      className="flex cursor-pointer items-center"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        mutate()
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Heart
        className={cn(
          'mr-1 h-4 w-4',
          (data?.data?.isLikedByUser ?? initialState.isLikedByUser)
            ? 'fill-primary text-primary'
            : 'text-muted-foreground'
        )}
      />
      <span className="text-muted-foreground text-sm tabular-nums">
        {data?.data?.likes ?? initialState.likes}
      </span>
    </motion.div>
  )
}

export { LikeButton }
