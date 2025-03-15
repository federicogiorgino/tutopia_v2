'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation'
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

import { onboardUser } from '@/actions/users'
import { OnboardingFormValues, onboardingFormSchema } from '@/types/users'

interface OnboardingFormProps {
  user: User | undefined
}

function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter()
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      name: user?.name || '',
      username: '',
    },
  })

  const { isSubmitting } = form.formState

  const mutation = useMutation({
    mutationFn: onboardUser,
    onSuccess: () => {
      toast.success('User successfully onboarded')
      form.reset()
      router.push('/')
    },
    onError: (error) => {
      toast.error('There was a problem with your request')
    },
  })

  const onSubmit = async (data: OnboardingFormValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="therealjohndoe"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" className="w-full" loading={isSubmitting}>
          Ready to go
        </LoadingButton>
      </form>
    </Form>
  )
}

export { OnboardingForm }
