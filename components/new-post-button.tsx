'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useNewPostDialog } from '@/hooks/use-new-post-dialog'

function NewPostButton() {
  const { openDialog } = useNewPostDialog()
  return (
    <Button onClick={openDialog} size="sm">
      <Plus />
      <span className="hidden md:block">New Post</span>
    </Button>
  )
}

export { NewPostButton }
