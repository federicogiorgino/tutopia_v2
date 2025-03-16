'use client'

import { Menu } from 'lucide-react'
import { User } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_LINKS } from '@/lib/constants'

import { NavLinks } from './nav-links'
import { Button } from './ui/button'
import { Icons } from './ui/icons'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { UserButton } from './user-button'

interface MobileMenuProps {
  user: User
}
function MobileMenu({ user }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="flex h-full flex-col gap-4 p-4">
          <SheetTitle className="">
            <div className="border-b py-4">
              <Link href="/" className="flex items-center space-x-2">
                <Icons.logo className="text-primary h-7 w-7" />
                <span className="text-lg font-bold select-none">
                  tut<span className="text-primary">opia</span>
                </span>
              </Link>
            </div>
          </SheetTitle>

          {/* Links in mobile menu */}
          <div className="flex-1">
            <ul className="flex flex-col space-y-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className={`hover:text-primary transition-colors ${
                        isActive
                          ? 'text-primary font-bold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <NavLinks />

          <div className="mt-auto py-4">
            {user ? (
              <div className="flex flex-col gap-4">
                <UserButton user={user} />
                {/* <Button variant="outline">
                  <Plus />
                  Create
                </Button> */}
                <Button
                  className="w-full"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button type="submit" onClick={() => signIn()} className="w-full">
                Login
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileMenu }
