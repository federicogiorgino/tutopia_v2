'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_LINKS } from '@/lib/constants'

function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="hidden items-center space-x-6 md:flex">
      {NAV_LINKS.map((link, i) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={i}
            href={link.href}
            className={`hover:text-primary text-sm transition-colors ${
              isActive ? 'text-primary font-bold' : 'text-muted-foreground'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}

export { NavLinks }
