'use client'

import { HTMLMotionProps, motion } from 'framer-motion'
import type React from 'react'

import { cn } from '@/lib/utils'

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance = 20,
  ...props
}: StaggerItemProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      case 'none':
        return {}
      default:
        return { y: distance }
    }
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, ...getDirectionOffset() },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
