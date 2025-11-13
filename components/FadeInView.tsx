'use client'

import { useRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

interface FadeInViewProps extends Omit<MotionProps, 'animate'> {
  children: React.ReactNode
  delay?: number
  yOffset?: number
}

export default function FadeInView({ 
  children, 
  delay = 0, 
  yOffset = 20,
  ...props 
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { threshold: 1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : yOffset 
      }}
      transition={{ duration: 0.6, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

