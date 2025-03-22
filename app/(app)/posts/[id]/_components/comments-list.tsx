'use client'

import { CommentForm } from './comment-form'
import { useComments } from '@/hooks/use-comments'

interface CommentsListProps {
  postId: string
}

function CommentsList({ postId }: CommentsListProps) {
  const { data, mutation } = useComments(postId)
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">
        Comments ({data?.data?.length})
      </h2>

      <CommentForm postId={postId} />
    </div>
  )
}

export { CommentsList }
