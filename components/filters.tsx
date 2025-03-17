'use client'

import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { use } from 'react'

import { LANGUAGES } from '@/lib/constants'
import { capitalizeFirstLetter } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useFilters } from '@/hooks/use-filters'

function Filters() {
  const searchParams = useSearchParams()

  const q = searchParams.get('q') || ''
  const { data: filters, isLoading } = useFilters(q)
  const [_, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10)
      return isNaN(parsed) || parsed < 1 ? 1 : parsed
    },
    serialize: (value) => value.toString(),
  })

  const [__, setPerPage] = useQueryState('perPage', {
    defaultValue: 10,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10)
      return isNaN(parsed) || parsed < 1 ? 10 : parsed
    },
    serialize: (value) => value.toString(),
  })
  const [type, setType] = useQueryState('type', {
    defaultValue: '' as PostType,
    parse: (value) =>
      Object.values(PostType).includes(value as PostType)
        ? (value as PostType)
        : '',
    serialize: (value) => value,
  })

  const [format, setFormat] = useQueryState('format', {
    defaultValue: '' as PostFormat,
    parse: (value) =>
      Object.values(PostFormat).includes(value as PostFormat)
        ? (value as PostFormat)
        : '',
    serialize: (value) => value,
  })

  const [level, setLevel] = useQueryState('level', {
    defaultValue: '' as PostLevel,
    parse: (value) =>
      Object.values(PostLevel).includes(value as PostLevel)
        ? (value as PostLevel)
        : '',
    serialize: (value) => value,
  })

  const [language, setLanguage] = useQueryState('language', {
    defaultValue: '',
    parse: (value) => (LANGUAGES.includes(value) ? value : ''),
    serialize: (value) => value,
  })

  const handleSingleSelection = <T extends string>(
    checked: boolean,
    value: T,
    setter: (value: T) => void
  ) => {
    if (checked) {
      setter(value)
      setPage(1) // Reset page to 1 when a filter is changed
    } else {
      setter('' as T)
      setPage(1) // Reset page to 1 when a filter is cleared
    }
  }

  const clearFilters = () => {
    setType('')
    setFormat('')
    setLevel('')
    setLanguage('')
    setPage(1)
    setPerPage(10)
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <FiltersSkeleton />
      ) : (
        <>
          {' '}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Language</h3>
            <Select
              value={language}
              onValueChange={(value) => {
                setLanguage(value)
                setPage(1) // Reset page to 1 when language is changed
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {capitalizeFirstLetter(lang.value)} ({lang.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Type</h3>
            <div className="space-y-2">
              {filters?.data?.types.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${option.value}`}
                    checked={type === option.value}
                    onCheckedChange={(checked) =>
                      handleSingleSelection(
                        checked as boolean,
                        option.value,
                        setType
                      )
                    }
                  />
                  <Label htmlFor={`type-${option.value}`}>
                    {capitalizeFirstLetter(option.value)} ({option.count})
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Format</h3>
            <div className="space-y-2">
              {filters?.data?.formats.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`format-${option.value}`}
                    checked={format === option.value}
                    onCheckedChange={(checked) =>
                      handleSingleSelection(
                        checked as boolean,
                        option.value,
                        setFormat
                      )
                    }
                  />
                  <Label htmlFor={`format-${option.value}`}>
                    {capitalizeFirstLetter(option.value)} ({option.count})
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Level</h3>
            <div className="space-y-2">
              {filters?.data?.levels.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${option.value}`}
                    checked={level === option.value}
                    onCheckedChange={(checked) =>
                      handleSingleSelection(
                        checked as boolean,
                        option.value,
                        setLevel
                      )
                    }
                  />
                  <Label htmlFor={`level-${option.value}`}>
                    {capitalizeFirstLetter(option.value)} ({option.count})
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full" variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </>
      )}
    </div>
  )
}

function FiltersSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Language</h3>
        <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Type</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Format</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Level</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
    </div>
  )
}

export { Filters, FiltersSkeleton }
