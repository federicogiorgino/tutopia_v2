'use client'

import { CommentForm, CommentFormSkeleton } from './comment-form'
import { CommentItem, CommentItemSkeleton } from './comment-item'
import { useComments } from '@/hooks/use-comments'

interface CommentsListProps {
  postId: string
}

function CommentsList({ postId }: CommentsListProps) {
  const { data } = useComments(postId)
  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-2xl font-bold">
        Comments ({data?.data?.length})
      </h2>

      <CommentForm postId={postId} />

      <div className="mt-10 grid gap-4">
        {data?.data?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} postId={postId} />
        ))}
        {!data?.data?.length && (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}

function CommentsListSkeleton() {
  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-2xl font-bold">Comments (0)</h2>
      <CommentFormSkeleton />
      <div className="mt-10 grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CommentItemSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export { CommentsList, CommentsListSkeleton }
