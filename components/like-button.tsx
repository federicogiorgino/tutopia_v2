'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { getLikes, likePost, unlikePost } from '@/actions/likes'
import { LikeInfo } from '@/types/likes'

interface LikeButtonProps {
  isLarge?: boolean
  postId: string
  initialState: LikeInfo
}

function LikeButton({ postId, initialState, isLarge }: LikeButtonProps) {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetails', postId] })
    },
    onError() {
      toast.error('Something went wrong. Try again')
    },
  })

  const isLiked = data?.data?.isLikedByUser ?? initialState.isLikedByUser
  const likesCount = data?.data?.likes ?? initialState.likes

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    mutate()
  }

  if (isLarge) {
    return (
      <Button
        variant={isLiked ? 'default' : 'outline'}
        onClick={handleClick}
        className="hover:cursor-pointer"
      >
        <motion.div
          animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={cn('mr-2 h-4 w-4', {
              'fill-current': isLiked,
            })}
          />
        </motion.div>
        {likesCount} likes
      </Button>
    )
  }

  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={handleClick}
    >
      <Heart
        className={cn('mr-1 h-4 w-4', {
          'fill-primary text-primary': isLiked,
          'text-muted-foreground': !isLiked,
        })}
      />
      <span className="text-muted-foreground text-sm tabular-nums">
        {likesCount}
      </span>
    </div>
  )
}

export { LikeButton }
