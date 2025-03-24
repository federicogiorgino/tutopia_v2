'use server'

import { prisma } from '@/lib/prisma'

import { ActivityType, DateRange } from '@/types/leaderboards'

export const getLeaderboards = async (
  type: ActivityType,
  dateRange: DateRange
) => {
  try {
    // Get current date
    const now = new Date()
    let startDate: Date | null = null

    // Calculate start date based on selected date range
    switch (dateRange) {
      case 'DAY':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'WEEK':
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        )
        break
      case 'MONTH':
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        )
        break
      case 'YEAR':
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        )
        break
      case 'ALL_TIME':
        startDate = null
        break
    }

    // Build where clause for database query
    const whereClause: any = {}
    if (type !== 'ALL') {
      whereClause.activityType = type
    }
    if (startDate) {
      whereClause.createdAt = {
        gte: startDate,
      }
    }

    // Get top 10 users by points for the given criteria
    const leaderboard = await prisma.points.groupBy({
      by: ['userId'],
      where: whereClause,
      _sum: {
        points: true,
      },
      orderBy: {
        _sum: {
          points: 'desc',
        },
      },
      take: 10,
    })

    // Get user IDs from leaderboard results
    const userIds = leaderboard.map((entry) => entry.userId)

    // Fetch user details for the leaderboard entries
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        image: true,
        name: true,
      },
    })

    // Create a map of user details for easy lookup
    const userMap = new Map(
      users.map((user) => [
        user.id,
        { name: user.name, image: user.image, username: user.username },
      ])
    )

    // Return formatted leaderboard data
    return {
      status: 'success',
      data: leaderboard.map((entry) => {
        const user = userMap.get(entry.userId)
        return {
          userId: entry.userId,
          username: user?.username || 'Anonymous',
          name: user?.name || 'Anonymous',
          image: user?.image || null,
          totalPoints: entry._sum.points || 0,
        }
      }),
    }
  } catch (error) {
    // Return error response if something goes wrong
    return { status: 'error', error: 'Failed to fetch leaderboard' }
  }
}
