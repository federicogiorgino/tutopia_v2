'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PostFormat, PostLevel, PostType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { LANGUAGES, NEW_POST_FORM_STEPS } from '@/lib/constants'
import { capitalizeFirstLetter, cn, getErrorMessage } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TagInput } from '@/components/ui/tag-input'
import { Textarea } from '@/components/ui/textarea'

import { createPost } from '@/actions/posts'
import { useNewPostDialog } from '@/hooks/use-new-post-dialog'
import { postSchema } from '@/schemas/post'
import { NewPostValues } from '@/types/post'

function NewPostForm() {
  const { closeDialog } = useNewPostDialog()
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<NewPostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      creator: '',
      title: '',
      description: '',
      externalUrl: '',
      language: 'english',
      type: PostType.FREE,
      format: PostFormat.OTHERS,
      level: PostLevel.BEGINNER,
      year: new Date().getFullYear(),
      tags: [],
    },
  })

  const nextStep = async () => {
    const fields = NEW_POST_FORM_STEPS[currentStep].fields as Array<
      keyof NewPostValues
    >
    const output = await form.trigger(fields, { shouldFocus: true })
    if (output) {
      setCurrentStep((step) => step + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep((step) => step - 1)
  }

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('Post created successfully')
      form.reset()
      closeDialog()
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })

  const onSubmit = async (data: NewPostValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mx-auto w-full">
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="bg-primary-foreground text-primary inline-block rounded-full px-2 py-1 text-xs font-semibold">
                  {NEW_POST_FORM_STEPS[currentStep].title}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-semibold">
                  {Math.round(
                    (currentStep / (NEW_POST_FORM_STEPS.length - 1)) * 100
                  )}
                  %
                </span>
              </div>
            </div>
            <div className="bg-primary/20 mb-4 flex h-2 overflow-hidden rounded text-xs">
              <div
                style={{
                  width: `${(currentStep / (NEW_POST_FORM_STEPS.length - 1)) * 100}%`,
                }}
                className="bg-primary flex flex-col justify-center text-center whitespace-nowrap text-white shadow-none transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
        </div>

        {currentStep === 0 && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter post description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="externalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {currentStep === 1 && (
          <>
            <FormField
              control={form.control}
              name="creator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter creator name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PostType.FREE}>Free</SelectItem>
                      <SelectItem value={PostType.NO_REGISTRATION}>
                        No registration
                      </SelectItem>
                      <SelectItem value={PostType.PAID}>Paid</SelectItem>
                      <SelectItem value={PostType.SUBSCRIPTION}>
                        Subscription
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select post format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PostFormat.ARTICLE}>
                        Article
                      </SelectItem>
                      <SelectItem value={PostFormat.VIDEO}>Video</SelectItem>
                      <SelectItem value={PostFormat.COURSE}>Course</SelectItem>
                      <SelectItem value={PostFormat.OTHERS}>Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select post level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PostLevel.BEGINNER}>
                        Beginner
                      </SelectItem>
                      <SelectItem value={PostLevel.INTERMEDIATE}>
                        Intermediate
                      </SelectItem>
                      <SelectItem value={PostLevel.ADVANCED}>
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select post language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LANGUAGES.map((language, i) => (
                          <SelectItem value={language} key={i}>
                            {capitalizeFirstLetter(language)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a year between 1900 and {new Date().getFullYear()}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagInput value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Enter tags related to your post. A maximum of 3 tags is
                    preferred.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div
          className={cn(
            currentStep === 0 ? 'justify-end' : 'justify-between',
            'flex'
          )}
        >
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < NEW_POST_FORM_STEPS.length - 1 && (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
          {currentStep === NEW_POST_FORM_STEPS.length - 1 && (
            <LoadingButton type="submit">
              {form.formState.isSubmitting ? 'Saving...' : 'Save'}
            </LoadingButton>
          )}
        </div>
      </form>
    </Form>
  )
}

export { NewPostForm }
