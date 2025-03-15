'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailFormValues = z.infer<typeof formSchema>

interface EmailInputProps {
  callbackUrl: string | undefined
}

function EmailInput({ callbackUrl }: EmailInputProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: EmailFormValues) => {
    try {
      await signIn('resend', data)
    } catch (error) {
      toast.error('There was a problem with your request.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" className="w-full" loading={isSubmitting}>
          Continue with Email
        </LoadingButton>
      </form>
    </Form>
  )
}

export { EmailInput }
