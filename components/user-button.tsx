'use client'

import { Bell, ChevronsUpDown, Lock, LogOut, User2 } from 'lucide-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

import { cn, getInitials } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useIsMobile } from '@/hooks/use-is-mobile'

interface UserButtonProps {
  user: User
}

function UserButton({ user }: UserButtonProps) {
  const isMobile = useIsMobile()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={isMobile ? 'default' : 'icon'}
          variant="ghost"
          className={cn(
            isMobile ? 'min-h-12 w-full rounded-md' : 'rounded-full',
            'border'
          )}
        >
          {isMobile ? (
            <>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.image || '/images/user.png'}
                  alt="User Image"
                />
                <AvatarFallback>{getInitials(user.name || 'U')}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </>
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.image || '/images/user.png'}
                alt="User Image"
              />
              <AvatarFallback>{getInitials(user.name || 'U')}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={isMobile ? 'w-full' : 'w-56'}
        align={isMobile ? 'end' : 'end'}
        forceMount
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.image || '/images/user.png'}
                alt="User Image"
              />
              <AvatarFallback>{getInitials(user.name || 'U')}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight">
              <span className="text-md truncate font-semibold">
                {user.name}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                @{user.username}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/users/${user.id}`}>
              <User2 className="mr-2 h-4 w-4" />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/notifications">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>

          {user.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Lock className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {!isMobile ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex w-full items-center"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </button>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserButton }
