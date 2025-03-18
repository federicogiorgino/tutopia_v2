import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            404 Page Not Found
          </h1>
          <p className="text-muted-foreground">
            Sorry, we couldn&#x27;t find the page you&#x27;re looking for.
          </p>
        </div>
        <Link
          href="/"
          className={buttonVariants({ variant: 'outline' })}
          prefetch={false}
        >
          &larr; Back home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
