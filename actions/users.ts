'use server'

import getSession from '@/lib/get-session'
import { prisma } from '@/lib/prisma'

import { OnboardingFormValues, onboardingFormSchema } from '@/types/users'

// Updates a user's onboarding information in the database
// @param data The onboarding form data to update
// @returns Object containing status and message/error

export const onboardUser = async (data: OnboardingFormValues) => {
  try {
    // Get the current session
    const session = await getSession()

    // Check if user is authenticated
    if (!session?.user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    // Validate the onboarding data against schema
    const validated = onboardingFormSchema.safeParse(data)

    // Return validation errors if any
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    // Update the user's onboarding info in database
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
