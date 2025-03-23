import { useQuery } from '@tanstack/react-query'

import { getLeaderboards } from '@/actions/leaderboards'
import { ActivityType, DateRange } from '@/types/leaderboards'

export const useLeaderboards = (
  activityType: ActivityType,
  dateRange: DateRange
) => {
  return useQuery({
    queryKey: ['leaderboards', activityType, dateRange],
    queryFn: () => getLeaderboards(activityType, dateRange),
  })
}
