import { HTMLMotionProps, motion } from 'framer-motion'

function ButtonAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.div>
  )
}

export { ButtonAnimation }
