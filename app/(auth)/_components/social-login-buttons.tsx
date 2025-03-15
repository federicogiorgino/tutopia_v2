'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

type SocialLoginButtonsProps = {
  callbackUrl: string | undefined
}
function SocialLoginButtons({ callbackUrl }: SocialLoginButtonsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Button
        variant="outline"
        className="flex w-full items-center gap-2"
        onClick={() => signIn('github', { redirectTo: callbackUrl ?? '' })}
      >
        <Icons.github />
        Github
      </Button>
      <Button
        variant="outline"
        className="flex w-full items-center gap-2"
        onClick={() => signIn('google', { redirectTo: callbackUrl ?? '' })}
      >
        <Icons.google />
        Google
      </Button>
    </div>
  )
}

export { SocialLoginButtons }
