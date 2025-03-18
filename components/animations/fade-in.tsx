'use client'

import { HTMLMotionProps, motion } from 'framer-motion'
import type React from 'react'

import { cn } from '@/lib/utils'

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
  ...props
}: FadeInProps) {
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
      initial={{ opacity: 0, ...getDirectionOffset() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
