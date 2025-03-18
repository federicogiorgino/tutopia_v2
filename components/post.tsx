'use client'

import { motion } from 'framer-motion'
import { Calendar, Heart, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { PostData } from '@/lib/db'

import { LikeButton } from './like-button'
import { PostBadges } from './post-badges'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardFooter } from './ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

interface PostProps {
  post: PostData
}
function Post({ post }: PostProps) {
  const router = useRouter()
  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-3 p-5 py-3">
        <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
        <p className="text-muted-foreground line-clamp-3">{post.description}</p>
        <PostBadges
          format={post.format}
          level={post.level}
          type={post.type}
          language={post.language}
          year={post.year}
        />
      </CardContent>

      <CardFooter className="flex justify-between p-5 pt-0 pb-2">
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
          <span className="text-muted-foreground text-sm font-bold">
            {post.user?.username || 'Unknown'}
          </span>
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.user.image || '/images/user.png'} />
            <AvatarFallback>
              {post.user?.username?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* <HoverCard>
          <HoverCardTrigger asChild className="cursor-pointer">
            <div className="flex cursor-pointer items-center gap-2">
              <span className="text-muted-foreground text-sm font-bold">
                {post.user?.username || 'Unknown'}
              </span>
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.user.image || '/images/user.png'} />
                <AvatarFallback>
                  {post.user?.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="flex gap-4">
            <Avatar>
              <AvatarImage src={post.user.image || '/images/user.png'} />
              <AvatarFallback>
                {post.user.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Link
                href={`/users/${post.user.id}`}
                className="text-sm font-semibold"
              >
                {post.user?.username}
              </Link>

              <div className="flex items-center pt-2">
                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-muted-foreground text-xs">
                  Joined{' '}
                  {new Date(post.user.createdAt || '').toLocaleDateString()}
                </span>
              </div>

              <p className="text-muted-foreground line-clamp-3 text-sm">
                {post.user?.bio}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard> */}
      </CardFooter>
    </Card>
  )
}

export { Post }
