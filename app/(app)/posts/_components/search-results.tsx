'use client'

import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { useSearchParams } from 'next/navigation'

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
    <div>{data?.data?.posts.map((el, i) => <div key={i}>{el.title}</div>)}</div>
  )
}

function SearchResultsSkeleton() {
  return <div>SearchResultsSkeleton</div>
}
export { SearchResults, SearchResultsSkeleton }
