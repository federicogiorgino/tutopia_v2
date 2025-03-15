import { AuthFormHeader } from '../_components/auth-form-header'
import { AuthFormWrapper } from '../_components/auth-form-wrapper'
import { Terminal } from 'lucide-react'
import { redirect } from 'next/navigation'

import getSession from '@/lib/get-session'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

async function VerifyEmailPage() {
  const session = await getSession()

  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24">
      <AuthFormWrapper>
        <AuthFormHeader
          title="Check your email"
          description=" We have sent a verifcation link to your email address."
        />

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle className="text-md font-semibold">Heads up!</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Make sure to check your spam folder.
          </AlertDescription>
        </Alert>
      </AuthFormWrapper>
    </div>
  )
}

export default VerifyEmailPage
