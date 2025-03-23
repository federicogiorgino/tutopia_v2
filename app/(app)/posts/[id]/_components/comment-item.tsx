'use client'

import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { CommentData } from '@/lib/db'
import { cn, getInitials } from '@/lib/utils'

import { StaggerItem } from '@/components/animations/stagger-item'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { CommentForm } from './comment-form'
import { fetchReplies } from '@/actions/comments'

interface CommentItemProps {
  comment: CommentData
  postId: string
}

function CommentItem({ comment, postId }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const {
    data: replies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['replies', postId, comment.id],
    queryFn: () => fetchReplies(postId, comment.id),
    enabled: showReplies,
  })

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <StaggerItem className="group">
      <div className="flex items-start gap-3">
        <Link href={`/users/${comment.userId}`}>
          <Avatar className="bg-background h-9 w-9">
            <AvatarImage
              src={comment.user.image || ''}
              alt={comment.user.name || 'User'}
            />
            <AvatarFallback className="text-xs font-medium">
              {!!comment.user.name && getInitials(comment.user.name)}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 space-y-0">
          <div className="flex w-full items-center justify-between gap-2">
            <Link href={`/users/${comment.userId}`}>
              <h4 className="text-md font-semibold">
                {comment.user.name || 'Anonymous'}
              </h4>
            </Link>
            <span className="text-muted-foreground text-xs">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          <div className="text-muted-foreground rounded-lg py-2 text-sm break-all">
            {comment.body}
          </div>

          <div className="flex items-center gap-4 p-0">
            <button
              className="hover:bg-accent/50 flex h-7 cursor-pointer items-center gap-1 rounded p-1 text-xs"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageSquare className="mr-1 h-3 w-3" />
              {showReplyForm ? 'Cancel' : 'Reply'}
            </button>

            {comment._count.children > 0 && (
              <button
                className="hover:bg-accent/50 flex h-7 cursor-pointer items-center gap-1 rounded p-1 text-xs"
                onClick={handleShowReplies}
              >
                {showReplies ? (
                  <ChevronUp className="mr-1 h-3 w-3" />
                ) : (
                  <ChevronDown className="mr-1 h-3 w-3" />
                )}
                {showReplies
                  ? 'Hide Replies'
                  : `Show Replies (${comment._count.children})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2 ml-12">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            setShowReplyForm={() => setShowReplyForm(false)}
          />
        </div>
      )}

      <div
        className={cn(
          'ml-12 overflow-hidden transition-all duration-300 ease-in-out',
          showReplies ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {isLoading && (
          <div className="flex items-center justify-center py-2">
            <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
            <span className="text-muted-foreground ml-2 text-xs">
              Loading replies...
            </span>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md p-2 text-xs">
            Error loading replies. Please try again.
          </div>
        )}

        <div className="space-y-3 pt-4">
          {replies?.data?.map((reply) => (
            <motion.div
              key={reply.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-3">
                <Link href={`/users/${reply.userId}`}>
                  <Avatar className="bg-background h-9 w-9">
                    <AvatarImage
                      src={reply.user.image || ''}
                      alt={reply.user.name || 'User'}
                    />
                    <AvatarFallback className="text-xs font-medium">
                      {!!reply.user.name && getInitials(reply.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex-1 space-y-0">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Link href={`/users/${reply.userId}`}>
                      <h4 className="text-md font-semibold">
                        {reply.user.name || 'Anonymous'}
                      </h4>
                    </Link>
                    <span className="text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(reply.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <div className="text-muted-foreground rounded-lg py-2 text-sm break-all">
                    {reply.body}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StaggerItem>
  )
}

function CommentItemSkeleton() {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-start gap-2">
        <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            <div className="bg-muted h-3 w-20 animate-pulse rounded" />
          </div>
          <div className="bg-muted h-8 w-3/4 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}

export { CommentItem, CommentItemSkeleton }
