'use client'

import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { useQueryState } from 'nuqs'

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

function Filters() {
  const [_, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10)
      return isNaN(parsed) || parsed < 1 ? 1 : parsed
    },
    serialize: (value) => value.toString(),
  })

  const [perPage, setPerPage] = useQueryState('perPage', {
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
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {capitalizeFirstLetter(lang)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Type</h3>
        <div className="space-y-2">
          {Object.values(PostType).map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${option}`}
                checked={type === option}
                onCheckedChange={(checked) =>
                  handleSingleSelection(checked as boolean, option, setType)
                }
              />
              <Label htmlFor={`type-${option}`}>
                {capitalizeFirstLetter(option)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Format</h3>
        <div className="space-y-2">
          {Object.values(PostFormat).map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`format-${option}`}
                checked={format === option}
                onCheckedChange={(checked) =>
                  handleSingleSelection(checked as boolean, option, setFormat)
                }
              />
              <Label htmlFor={`format-${option}`}>
                {capitalizeFirstLetter(option)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Level</h3>
        <div className="space-y-2">
          {Object.values(PostLevel).map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${option}`}
                checked={level === option}
                onCheckedChange={(checked) =>
                  handleSingleSelection(checked as boolean, option, setLevel)
                }
              />
              <Label htmlFor={`level-${option}`}>
                {capitalizeFirstLetter(option)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full" variant="outline" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  )
}
export { Filters }
