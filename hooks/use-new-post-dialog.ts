import { useNewPostDialogStore } from '@/store/use-new-post-dialog-store'

const useNewPostDialog = () => {
  const { isOpen, openDialog, closeDialog } = useNewPostDialogStore()
  return { isOpen, openDialog, closeDialog }
}

export { useNewPostDialog }
