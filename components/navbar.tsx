import { Plus } from 'lucide-react'
import { User } from 'next-auth'
import Link from 'next/link'

import getSession from '@/lib/get-session'

import { NavLinks } from '@/components/nav-links'
import { Icons } from '@/components/ui/icons'

import { MobileMenu } from './mobile-menu'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { UserButton } from './user-button'
import { auth, signIn } from '@/auth'

async function Navbar() {
  const session = await getSession()
  const user = session?.user

  return (
    <header className="bg-background/80 fixed top-0 right-0 left-0 z-50">
      <nav className="container mx-auto px-4 md:px-0">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="text-primary h-7 w-7" />
            <span className="text-lg font-bold select-none">
              tut<span className="text-primary">opia</span>
            </span>
          </Link>

          <NavLinks />

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button>
              <Plus />
            </Button>

            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {user ? (
                <div className="flex items-center gap-4">
                  <UserButton user={user} />
                </div>
              ) : (
                <form
                  action={async () => {
                    'use server'
                    await signIn()
                  }}
                >
                  <Button type="submit">Login</Button>
                </form>
              )}
            </div>

            <MobileMenu user={user as User} />
          </div>
        </div>
      </nav>
    </header>
  )
}

export { Navbar }
