import { AuthFormHeader } from '../_components/auth-form-header'
import { AuthFormWrapper } from '../_components/auth-form-wrapper'
import { redirect } from 'next/navigation'

import getSession from '@/lib/get-session'

import { OnboardingForm } from './_components/onboarding-form'

async function OnboardingPage() {
  const session = await getSession()

  const user = session?.user

  if (user?.name && user?.username) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24">
      <AuthFormWrapper>
        <AuthFormHeader
          title="Tell us about yourself"
          description="We have sent a verifcation link to your email address."
        />

        <OnboardingForm user={user} />
      </AuthFormWrapper>
    </div>
  )
}

export default OnboardingPage
