'use client'

import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { ExternalLink, Share2 } from 'lucide-react'
import Link from 'next/link'

import { PostData } from '@/lib/db'
import { formatDate } from '@/lib/utils'

import { ButtonAnimation } from '@/components/animations/button-animation'
import { FadeIn } from '@/components/animations/fade-in'
import { LikeButton } from '@/components/like-button'
import { PostBadges } from '@/components/post-badges'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface PostInfosProps {
  post: PostData
}

function PostInfos({ post }: PostInfosProps) {
  return (
    <FadeIn className="container py-8">
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <FadeIn className="space-y-4">
            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

            <div className="mb-4 flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                created by{' '}
                <span className="text-foreground font-medium">
                  {post.creator}
                </span>
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-sm">
                {formatDate(post.createdAt)}
              </span>
            </div>

            <PostBadges
              format={post.format}
              level={post.level}
              type={post.type}
              language={post.language}
              year={post.year}
            />

            <p className="text-muted-foreground mb-6 text-lg">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <ButtonAnimation>
                <Button asChild>
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Resource <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </ButtonAnimation>
              <ButtonAnimation>
                <LikeButton
                  isLarge
                  postId={post.id}
                  initialState={{
                    likes: post._count.likes,
                    isLikedByUser: post.likes.some(
                      (like) => like.userId === post.user.id
                    ),
                  }}
                />
              </ButtonAnimation>
              <ButtonAnimation>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </ButtonAnimation>
            </div>
          </FadeIn>
          <Separator />
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <Card>
              <CardHeader>
                <h3 className="text-center text-lg font-bold">
                  About the Author
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Avatar className="mb-4 h-20 w-20">
                      <AvatarImage
                        src={post.user?.image || '/images/user.png'}
                        alt={post?.user.name || 'Unknown'}
                      />
                      <AvatarFallback>
                        {post.user?.username?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <h4 className="text-xl font-bold">
                    {post.user?.name || 'Unknown Author'}
                  </h4>
                  <p className="text-muted-foreground mb-4 text-sm">
                    @{post.user?.username}
                  </p>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {post.user?.bio}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/users/${post.user?.id}`}>View Profile</Link>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">Post Stats</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes</span>
                    <span className="font-medium">{post._count.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comments</span>
                    {/* <span className="font-medium">{post._count.comments}</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Added</span>
                    <span className="font-medium">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </FadeIn>
  )
}

function PostInfosSkeleton() {
  return (
    <FadeIn className="container py-8">
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <FadeIn className="space-y-4">
            <div className="bg-muted mb-4 h-9 w-3/4 animate-pulse rounded-md" />

            <div className="mb-4 flex items-center gap-2">
              <div className="bg-muted h-4 w-32 animate-pulse rounded-md" />
              <span className="text-muted-foreground">•</span>
              <div className="bg-muted h-4 w-24 animate-pulse rounded-md" />
            </div>

            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-muted h-6 w-20 animate-pulse rounded-full"
                />
              ))}
            </div>

            <div className="bg-muted h-16 w-full animate-pulse rounded-md" />

            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-muted h-10 w-32 animate-pulse rounded-md"
                />
              ))}
            </div>
          </FadeIn>
          <Separator />
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <Card>
              <CardHeader>
                <h3 className="text-center text-lg font-bold">
                  About the Author
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-muted mb-4 h-20 w-20 animate-pulse rounded-full" />
                  <div className="bg-muted mb-2 h-6 w-40 animate-pulse rounded-md" />
                  <div className="bg-muted mb-4 h-4 w-24 animate-pulse rounded-md" />
                  <div className="bg-muted mb-4 h-16 w-full animate-pulse rounded-md" />
                  <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">Post Stats</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="bg-muted h-4 w-20 animate-pulse rounded-md" />
                      <div className="bg-muted h-4 w-12 animate-pulse rounded-md" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </FadeIn>
  )
}

export { PostInfos, PostInfosSkeleton }
