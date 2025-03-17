import { capitalizeFirstLetter } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'

import { PostBadge } from './post-badge'

interface PostBadgesProps {
  language: string
  type: string
  format: string
  level: string
  year: number
}

function PostBadges({ language, type, format, level, year }: PostBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="bg-violet-100 text-violet-800">
        {capitalizeFirstLetter(language)}
      </Badge>
      <Badge variant="outline" className="bg-cyan-100 text-cyan-800">
        {year} 📅
      </Badge>
      <PostBadge category={type} />
      <PostBadge category={format} />
      <PostBadge category={level} />
    </div>
  )
}

export { PostBadges }
