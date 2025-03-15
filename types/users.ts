import * as z from 'zod'

export const onboardingFormSchema = z.object({
  name: z.string().min(3, 'Name needs to be at least 3 characters long'),
  username: z
    .string()
    .min(3, 'Username needs to be at least 3 characters long'),
})

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>
