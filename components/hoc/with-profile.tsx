import { redirect } from 'next/navigation'
import type React from 'react'

import getSession from '@/lib/get-session'

function withCompletedProfile<P extends object>(
  Component: React.ComponentType<P>
) {
  return async function ProfileCheckComponent(
    props: P & { searchParams?: { callbackUrl?: string } }
  ) {
    const session = await getSession()
    const user = session?.user

    // If user is logged in but doesn't have name or username
    if (user && (!user.name || !user.username)) {
      // Get the current path for callback
      const currentPath = props.searchParams?.callbackUrl || '/'

      // Redirect to onboarding with callback URL
      redirect(`/onboarding?callbackUrl=${encodeURIComponent(currentPath)}`)
    }

    // If all checks pass, render the component
    return <Component {...props} />
  }
}

export { withCompletedProfile }
