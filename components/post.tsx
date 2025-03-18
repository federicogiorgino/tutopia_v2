'use client'

import { MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PostData } from '@/lib/db'

import { LikeButton } from './like-button'
import { PostBadges } from './post-badges'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardFooter } from './ui/card'
import { Skeleton } from './ui/skeleton'

interface PostProps {
  post: PostData
}
function Post({ post }: PostProps) {
  const router = useRouter()

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-3 p-6 py-3">
        <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
        <p className="text-muted-foreground text-md line-clamp-3">
          {post.description}
        </p>
        <PostBadges
          format={post.format}
          level={post.level}
          type={post.type}
          language={post.language}
          year={post.year}
        />
      </CardContent>

      <CardFooter className="flex justify-between p-6 pt-0 pb-2">
        <div className="flex items-center gap-4">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some(
                (like) => like.userId === post.user.id
              ),
            }}
          />

          <div className="flex items-center">
            <MessageSquare className="text-muted-foreground mr-1 h-4 w-4" />
            <span className="text-muted-foreground text-sm">1 </span>
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/users/${post.user.id}`)
          }}
          className="decoration-muted-foreground flex cursor-pointer items-center gap-2 underline-offset-4 transition-all duration-200 hover:underline"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.user.image || '/images/user.png'} />
            <AvatarFallback>
              {post.user?.username?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground text-sm font-bold">
            {post.user?.username || 'Unknown'}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

function PostSkeleton() {
  return (
    <Card className="group hover:border-foreground/50 h-full cursor-pointer transition-all duration-200">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-5 pt-0 pb-2">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-10" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  )
}

export { Post, PostSkeleton }
