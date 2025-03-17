'use client'

import { HTMLMotionProps, motion } from 'framer-motion'
import type React from 'react'

import { cn } from '@/lib/utils'

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  staggerChildren?: number
}
function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerChildren = 0.1,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { StaggerContainer }
