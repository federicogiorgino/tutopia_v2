import { Search } from 'lucide-react'

import { FiltersDrawer } from '@/components/filters-drawer'

import { Searchbar } from './_components/searchbar'
import { getFilters, getPosts } from '@/actions/posts'

async function ResultsPage() {
  const filters = await getFilters()

  return (
    <div className="container mx-auto space-y-6 px-4 py-20 md:px-0">
      <div className="bg-background sticky top-16 z-10 pt-4 pb-2">
        <div className="flex items-center gap-4">
          <Searchbar fullWidth />
          <FiltersDrawer />
        </div>

        {JSON.stringify(filters)}
      </div>
    </div>
  )
}

export default ResultsPage
