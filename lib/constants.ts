export const NAV_LINKS = [
  { label: 'Leaderboard', href: '/leaderboards' },
  { label: 'Explore', href: '/posts' },
  { label: 'About', href: '/about' },
]

export const LANGUAGES = [
  'english',
  'spanish',
  'french',
  'german',
  'chinese',
  'japanese',
  'korean',
  'arabic',
]

export const NEW_POST_FORM_STEPS = [
  {
    id: 1,
    title: 'Basic Information',
    fields: ['title', 'description', 'externalUrl'],
  },
  {
    id: 2,
    title: 'Content Details',
    fields: ['creator', 'topic', 'type', 'format'],
  },
  {
    id: 3,
    title: 'Additional Information',
    fields: ['level', 'language', 'year', 'tags'],
  },
]
