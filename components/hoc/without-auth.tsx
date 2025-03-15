import { redirect } from 'next/navigation'
import type React from 'react'

import getSession from '@/lib/get-session'

function withoutAuth<P extends object>(Component: React.ComponentType<P>) {
  return async function ProfileCheckComponent(
    props: P & { searchParams?: { callbackUrl?: string } }
  ) {
    const session = await getSession()
    const user = session?.user

    // If user is logged in but doesn't have name or username
    if (user) {
      // Redirect to '/'
      redirect('/')
    }

    // If all checks pass, render the component
    return <Component {...props} />
  }
}

export { withoutAuth }
