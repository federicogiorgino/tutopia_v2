import { AuthFormHeader } from '../_components/auth-form-header'
import { AuthFormWrapper } from '../_components/auth-form-wrapper'
import { EmailInput } from '../_components/email-input'
import { SocialLoginButtons } from '../_components/social-login-buttons'

import { withoutAuth } from '@/components/hoc/without-auth'

interface LoginPageProps {
  searchParams: {
    callbackUrl: string | undefined
  }
}
async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24">
      <AuthFormWrapper>
        <AuthFormHeader
          title="Tutopia.xyz"
          description="Enter your email address to continue"
        />
        <EmailInput callbackUrl={callbackUrl} />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or
          </span>
        </div>
        <SocialLoginButtons callbackUrl={callbackUrl} />
      </AuthFormWrapper>
    </div>
  )
}

export default withoutAuth(LoginPage)
