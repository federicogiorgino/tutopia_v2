'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { useComments } from '@/hooks/use-comments'

const formSchema = z.object({
  body: z.string().min(1, {
    message: 'Comment cannot be empty.',
  }),
})

interface CommentFormProps {
  postId: string
  parentId?: string
  setShowReplyForm?: () => void
}
function CommentForm({ postId, parentId, setShowReplyForm }: CommentFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: '',
    },
  })

  const { mutation } = useComments(postId)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session) {
      router.push(`/login?callbackUrl=/posts/${postId}`)
    }
    try {
      mutation.mutate({
        body: values.body,
        postId,
        parentId,
      })
      form.reset()
      toast.success('Comment submitted successfully')
      if (setShowReplyForm) {
        setShowReplyForm()
      }
    } catch (error) {
      toast.error('There was an error submitting your comment')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a comment..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

export { CommentForm }
