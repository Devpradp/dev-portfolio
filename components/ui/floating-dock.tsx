'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface DockItem {
  title: string
  href: string
  icon?: React.ReactNode
}

interface FloatingDockProps {
  items: DockItem[]
  mobileClassName?: string
}

export function FloatingDock({ items, mobileClassName }: FloatingDockProps) {
  const [active, setActive] = useState<string | null>(null)
  const mouseX = useRef<number>(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = e.clientX
  }

  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50',
        mobileClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="flex items-end gap-2 px-4 py-3 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl shadow-2xl"
      >
        {items.map((item, index) => {
          const isActive = active === item.title
          
          return (
            <Link
              key={item.title}
              href={item.href}
              onMouseEnter={() => setActive(item.title)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                'relative flex items-center justify-center rounded-xl transition-all duration-300',
                'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10',
                isActive && 'bg-accent-light/20 dark:bg-accent-dark/20'
              )}
            >
              <motion.div
                className="px-4 py-2.5"
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {item.icon ? (
                  <div className="h-5 w-5">{item.icon}</div>
                ) : (
                  <span className={cn(
                    'text-sm font-semibold whitespace-nowrap',
                    isActive 
                      ? 'text-accent-light dark:text-accent-dark' 
                      : 'text-foreground-light dark:text-foreground-dark'
                  )}>
                    {item.title}
                  </span>
                )}
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                  >
                    <span className="text-xs font-medium text-foreground-light dark:text-foreground-dark">
                      {item.title}
                    </span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-card-light dark:bg-card-dark border-r border-b border-border-light dark:border-border-dark rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}

