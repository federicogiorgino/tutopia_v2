'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const searchSchema = z.object({
  query: z.string().max(100, 'Search keyword is too long'),
})

type SearchFormData = z.infer<typeof searchSchema>

interface SearchBarProps {
  fullWidth?: boolean
}

function Searchbar({ fullWidth = false }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: searchParams.get('q') || '',
    },
  })

  const onSubmit = (data: SearchFormData) => {
    router.push(`/posts?q=${encodeURIComponent(data.query.trim())}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={fullWidth ? 'w-full' : 'mx-auto max-w-2xl'}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-full">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    placeholder="Search..."
                    type="search"
                    {...field}
                    className="pl-10"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { Searchbar }
