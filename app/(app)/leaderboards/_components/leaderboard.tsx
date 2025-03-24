'use client'

import { AlertCircle, Medal } from 'lucide-react'
import Link from 'next/link'
import { useQueryState } from 'nuqs'

import { cn } from '@/lib/utils'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { LeaderboardHeader } from './leaderboard-header'
import { useLeaderboards } from '@/hooks/use-leaderboards'
import { ActivityType, DateRange } from '@/types/leaderboards'

const getMedalColor = (position: number) => {
  switch (position) {
    case 0:
      return 'text-yellow-500' // Gold
    case 1:
      return 'text-gray-400' // Silver
    case 2:
      return 'text-amber-700' // Bronze
    default:
      return ''
  }
}

const getBorderColor = (position: number) => {
  switch (position) {
    case 0:
      return 'border-yellow-500'
    case 1:
      return 'border-gray-400'
    case 2:
      return 'text-amber-700' // Bronze
    default:
      return ''
  }
}

function Leaderboard() {
  const [activityType] = useQueryState<ActivityType>('activity', {
    defaultValue: 'ALL',
    parse: (value): ActivityType => {
      const validTypes: ActivityType[] = [
        'ALL',
        'POST_CREATION',
        'COMMENT',
        'LIKE_RECEIVED',
        'FOLLOWER_GAIN',
      ]
      return validTypes.includes(value as ActivityType)
        ? (value as ActivityType)
        : 'ALL'
    },
  })
  const [dateRange] = useQueryState<DateRange>('date', {
    defaultValue: 'ALL_TIME',
    parse: (value): DateRange => {
      const validRanges: DateRange[] = [
        'DAY',
        'WEEK',
        'MONTH',
        'YEAR',
        'ALL_TIME',
      ]
      return validRanges.includes(value as DateRange)
        ? (value as DateRange)
        : 'ALL_TIME'
    },
  })

  const { data, isLoading, isError } = useLeaderboards(activityType, dateRange)

  if (isLoading) {
    return <LeaderboardSkeleton />
  }

  if (isError) {
    return (
      <div className="grid gap-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>

          <AlertDescription>
            Failed to load leaderboard data. Please try again later
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (data?.data?.length === 0) {
    return (
      <div className="grid gap-6">
        <LeaderboardHeader />
        There are no users for that leaderboard.
      </div>
    )
  }

  return (
    <div className="grid gap-10">
      <LeaderboardHeader />

      {data?.data?.map((user, index) => (
        <Link
          key={user.userId}
          href={`/users/${user.userId}`}
          className={cn(
            'flex items-center rounded-lg p-3',
            getBorderColor(index),
            index < 3 ? 'bg-muted/50 border-2' : ''
          )}
        >
          <div className="w-10 flex-shrink-0 text-center font-medium">
            {index < 3 ? (
              <Medal className={`mx-auto h-6 w-6 ${getMedalColor(index)}`} />
            ) : (
              <span className="text-muted-foreground">{index + 1}</span>
            )}
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.image || '/images/user.png'}
              alt={user?.name || 'Unknown'}
            />
            <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <div className="font-medium">{user.name}</div>
            <div className="text-muted-foreground text-sm">
              @{user.username}
            </div>
          </div>
          <div className="text-md font-semibold">{user.totalPoints} pts</div>
        </Link>
      ))}
    </div>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="grid gap-6">
      <LeaderboardHeader />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex items-center rounded-lg p-3',
            // getBorderColor(i),
            i < 3 ? 'bg-muted/50 border' : ''
          )}
        >
          <div className="w-10 flex-shrink-0 text-center">
            {i < 3 ? (
              <div className="bg-muted mx-auto h-6 w-6 animate-pulse rounded-full" />
            ) : (
              <div className="bg-muted mx-auto h-6 w-6 animate-pulse rounded" />
            )}
          </div>
          <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
          <div className="ml-4 flex-1">
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            <div className="bg-muted h-3 w-16 animate-pulse rounded text-sm" />
          </div>
          <div className="bg-muted h-4 w-16 animate-pulse rounded" />
        </div>
      ))}
    </div>
  )
}

export { Leaderboard, LeaderboardSkeleton }
