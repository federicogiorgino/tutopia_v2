'use client'

import { SlidersHorizontal } from 'lucide-react'
import { Suspense } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Filters, FiltersSkeleton } from './filters'
import { Button } from './ui/button'

function FiltersDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="px-8 pt-8 pb-4">
          <SheetTitle className="text-2xl">Filters</SheetTitle>
          <SheetDescription>
            Select the filters you want to apply to your search.
          </SheetDescription>
        </SheetHeader>
        <div className="px-8">
          <Suspense fallback={<FiltersSkeleton />}>
            <Filters />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { FiltersDrawer }
