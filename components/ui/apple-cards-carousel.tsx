'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CardSpotlight } from './card-spotlight'

export const Card = React.memo(
  ({
    card,
    index,
    onCardClick,
  }: {
    card: {
      title: string
      src: string
      content: React.ReactNode
    }
    index: number
    onCardClick: () => void
  }) => {
    const [hovered, setHovered] = useState(false)

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex-shrink-0 flex items-center justify-center transition-all duration-300"
        style={{
          width: '85vw',
          height: '85vh',
        }}
      >
        <CardSpotlight className="w-full h-full">
          <motion.div
            onClick={onCardClick}
            className={cn(
              'relative w-full h-full cursor-pointer rounded-[16px] border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark overflow-hidden transition-all duration-300',
              hovered && 'shadow-xl scale-[1.01]'
            )}
          >
            {/* Full Image Background */}
            <div className="relative w-full h-full">
              <motion.img
                src={card.src}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              
              {/* Title at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white drop-shadow-lg">
                  {card.title}
                </h3>
              </div>
            </div>
          </motion.div>
        </CardSpotlight>
      </div>
    )
  }
)

Card.displayName = 'Card'

export const Carousel = ({
  items,
  onCardClick,
}: {
  items: React.ReactNode[]
  onCardClick: (index: number) => void
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const totalItems = React.Children.count(items)

  // Clone items and pass click handler
  const itemsWithActive = React.Children.map(items, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onCardClick: () => onCardClick(index),
      } as any)
    }
    return child
  })

  const scrollBy = (amount: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: amount,
      behavior: 'smooth',
    })
  }

  const scrollNext = () => {
    if (!scrollRef.current || !containerRef.current) return
    const cardWidth = 85 * (window.innerWidth / 100) // 85vw in pixels
    const gap = 32 // 2rem in pixels
    scrollBy(cardWidth + gap)
  }

  const scrollPrev = () => {
    if (!scrollRef.current || !containerRef.current) return
    const cardWidth = 85 * (window.innerWidth / 100) // 85vw in pixels
    const gap = 32 // 2rem in pixels
    scrollBy(-(cardWidth + gap))
  }

  return (
    <div className="w-full h-full relative">
      {/* Navigation Buttons - Always show */}
      <motion.button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-md border border-border-light dark:border-border-dark shadow-lg hover:shadow-xl transition-shadow"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6 text-foreground-light dark:text-foreground-dark" />
      </motion.button>

      <motion.button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-md border border-border-light dark:border-border-dark shadow-lg hover:shadow-xl transition-shadow"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6 text-foreground-light dark:text-foreground-dark" />
      </motion.button>

      {/* Scroll Container - Free scrolling */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          height: '85vh',
        }}
      >
        <div
          ref={containerRef}
          className="flex h-full items-center"
          style={{
            paddingLeft: 'calc((100vw - 85vw) / 2)',
            paddingRight: 'calc((100vw - 85vw) / 2)',
            gap: '2rem',
            minWidth: 'max-content',
          }}
        >
          {itemsWithActive}
        </div>
      </div>
    </div>
  )
}
