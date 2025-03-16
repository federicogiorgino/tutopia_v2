'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { NewPostForm } from './forms/new-post-form'
import { useNewPostDialog } from '@/hooks/use-new-post-dialog'

function NewPostDialog() {
  const { isOpen, closeDialog } = useNewPostDialog()
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">New Post</DialogTitle>
        </DialogHeader>

        <NewPostForm />
      </DialogContent>
    </Dialog>
  )
}

export { NewPostDialog }
