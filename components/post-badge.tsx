import { PostFormat, PostLevel, PostType } from '@prisma/client'

import { capitalizeFirstLetter } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'

function getBadgeConfig(category: string) {
  switch (category) {
    case PostType.FREE:
      return { color: 'bg-green-100 text-green-800', emoji: '🆓' }
    case PostType.PAID:
      return { color: 'bg-blue-100 text-blue-800', emoji: '💰' }
    case PostType.SUBSCRIPTION:
      return { color: 'bg-purple-100 text-purple-800', emoji: '🔄' }
    case PostType.NO_REGISTRATION:
      return { color: 'bg-emerald-100 text-emerald-800', emoji: '❌' }
    case PostFormat.VIDEO:
      return { color: 'bg-red-100 text-red-800', emoji: '🎥' }
    case PostFormat.ARTICLE:
      return { color: 'bg-yellow-100 text-yellow-800', emoji: '📝' }
    case PostFormat.COURSE:
      return { color: 'bg-indigo-100 text-indigo-800', emoji: '🎓' }
    case PostFormat.OTHERS:
      return { color: 'bg-gray-300 text-gray-600', emoji: '🔠' }
    case PostLevel.BEGINNER:
      return { color: 'bg-teal-100 text-teal-800', emoji: '🌱' }
    case PostLevel.INTERMEDIATE:
      return { color: 'bg-orange-100 text-orange-800', emoji: '🚀' }
    case PostLevel.ADVANCED:
      return { color: 'bg-pink-100 text-pink-800', emoji: '🏆' }
    default:
      return { color: 'bg-gray-100 text-gray-800', emoji: '' }
  }
}

interface PostBadgeProps {
  category: string
}

function PostBadge({ category }: PostBadgeProps) {
  const { color, emoji } = getBadgeConfig(category)

  return (
    <Badge variant="outline" className={color}>
      {capitalizeFirstLetter(category)} {emoji}
    </Badge>
  )
}

export { PostBadge }
