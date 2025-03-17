import { Suspense } from 'react'

import { FiltersDrawer } from '@/components/filters-drawer'

import {
  SearchResults,
  SearchResultsSkeleton,
} from './_components/search-results'
import { Searchbar } from './_components/searchbar'

async function ResultsPage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-20 md:px-0">
      <div className="bg-background sticky top-16 z-10 pt-4 pb-2">
        <div className="flex items-center gap-4">
          <Searchbar fullWidth />
          <FiltersDrawer />
        </div>
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}

export default ResultsPage
