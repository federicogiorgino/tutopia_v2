'use client'

import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { StaggerContainer } from '@/components/animations/stagger-container'
import { StaggerItem } from '@/components/animations/stagger-item'
import { Post, PostSkeleton } from '@/components/post'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { useSearchResults } from '@/hooks/use-search-results'

function SearchResults() {
  const searchParams = useSearchParams()

  const q = searchParams.get('q') || ''
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const type = searchParams.get('type') as PostType | ''
  const format = searchParams.get('format') as PostFormat | ''
  const level = searchParams.get('level') as PostLevel | ''
  const language = searchParams.get('language') || ''
  const itemsPerPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : 5

  const { data, isLoading, isError } = useSearchResults(
    { q, type, format, level, language },
    page,
    itemsPerPage
  )

  const posts = data?.data?.posts

  if (isLoading) {
    return <SearchResultsSkeleton />
  }

  if (isError) {
    return (
      <div className="mt-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Error</AlertTitle>
          <AlertDescription>
            There was an error loading the search results. Please try again
            later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <StaggerContainer className="mt-10 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
        <p className="text-muted-foreground max-sm:text-center">
          No results found. Try adjusting your filters.
        </p>
      </StaggerContainer>
    )
  }

  return (
    <StaggerContainer className="mt-10 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
      {posts.map((post) => (
        <StaggerItem key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Post post={post} />
            </motion.div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="mt-10 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  )
}
export { SearchResults, SearchResultsSkeleton }
