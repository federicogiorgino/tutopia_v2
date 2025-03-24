'use client'

import { useQueryState } from 'nuqs'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ActivityType, DateRange } from '@/types/leaderboards'

function LeaderboardHeader() {
  const [activityType, setActivityType] = useQueryState<ActivityType>(
    'activity',
    {
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
    }
  )
  const [dateRange, setDateRange] = useQueryState<DateRange>('date', {
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

  const handleActivityTypeChange = (value: ActivityType) => {
    setActivityType(value)
  }

  const handleDateRangeChange = (value: DateRange) => {
    setDateRange(value)
  }
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:items-center md:flex-row md:items-end">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Leaderboard</h2>
        <div className="text-muted-foreground text-sm">
          <p>See who's leading the pack </p>

          <p>
            Filter by specific actions like posts, comments, and likes, or view
            overall rankings. Change the time period to see top contributors for
            today, this week, month, year or all-time.
          </p>
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <Select onValueChange={handleActivityTypeChange} value={activityType}>
          <SelectTrigger>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Activities</SelectItem>
            <SelectItem value="POST_CREATION">Post Creation</SelectItem>
            <SelectItem value="COMMENT">Comments</SelectItem>
            <SelectItem value="LIKE_RECEIVED">Likes Received</SelectItem>
            <SelectItem value="FOLLOWER_GAIN">Followers Gained</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleDateRangeChange} value={dateRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DAY">Today</SelectItem>
            <SelectItem value="WEEK">This Week</SelectItem>
            <SelectItem value="MONTH">This Month</SelectItem>
            <SelectItem value="YEAR">This Year</SelectItem>
            <SelectItem value="ALL_TIME">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export { LeaderboardHeader }
