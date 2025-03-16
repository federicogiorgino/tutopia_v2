import { create } from 'zustand'

type NewPostDialogStore = {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
}

const useNewPostDialogStore = create<NewPostDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}))

export { useNewPostDialogStore }
