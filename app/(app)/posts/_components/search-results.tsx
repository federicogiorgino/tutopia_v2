'use client'

import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { StaggerContainer } from '@/components/animations/stagger-container'
import { StaggerItem } from '@/components/animations/stagger-item'
import { Post } from '@/components/post'

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

  return (
    <StaggerContainer className="mt-10 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
      {data?.data?.posts.map((post) => (
        <StaggerItem key={post.id}>
          <Link href={'/'}>
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
  return <div>SearchResultsSkeleton</div>
}
export { SearchResults, SearchResultsSkeleton }
