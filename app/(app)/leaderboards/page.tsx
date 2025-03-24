import { Suspense } from 'react'

import { Leaderboard, LeaderboardSkeleton } from './_components/leaderboard'

async function LeaderboardsPage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-20 md:px-0">
      <Suspense fallback={<LeaderboardSkeleton />}>
        <Leaderboard />
      </Suspense>
    </div>
  )
}

export default LeaderboardsPage
