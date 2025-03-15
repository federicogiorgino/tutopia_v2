'use server'

import getSession from '@/lib/get-session'
import { prisma } from '@/lib/prisma'

import { OnboardingFormValues, onboardingFormSchema } from '@/types/users'

export const onboardUser = async (data: OnboardingFormValues) => {
  try {
    const session = await getSession()

    if (!session?.user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = onboardingFormSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: validated.data,
    })

    return { status: 'success', message: 'Onboarded successfully' }
  } catch (error) {
    return { status: 'error', error: 'There was an error onboarding you' }
  }
}
