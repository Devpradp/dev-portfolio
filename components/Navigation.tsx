'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

function ScrambleText({ text, onLoad = true }: { text: string; onLoad?: boolean }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
  const [mounted, setMounted] = useState(false)
  
  // Start with scrambled text
  const getScrambledText = (target: string) => {
    return target
      .split('')
      .map((char) => (char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
      .join('')
  }

  // Start with actual text to avoid hydration mismatch
  const [displayText, setDisplayText] = useState(text)
  const [isHovered, setIsHovered] = useState(false)
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const textRef = useRef(text)
  const hasScrambledOnLoad = useRef(false)

  // Update ref when text changes
  useEffect(() => {
    textRef.current = text
  }, [text])

  const scramble = useCallback(() => {
    let iterations = 0
    const targetText = textRef.current

    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current)
    }

    // Start with scrambled text
    setDisplayText(getScrambledText(targetText))

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return prev
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iterations) {
              return targetText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      })

      iterations += 1 / 3

      if (iterations >= targetText.length) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current)
        }
        setDisplayText(targetText)
      }
    }, 30)
  }, [])

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (onLoad && mounted && !hasScrambledOnLoad.current) {
      // Initial scramble on load - only after component is mounted (client-side)
      const timer = setTimeout(() => {
        // Start with scrambled text
        setDisplayText(getScrambledText(textRef.current))
        hasScrambledOnLoad.current = true
        scramble()
      }, 100)

      return () => {
        clearTimeout(timer)
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current)
        }
      }
    }
  }, [onLoad, mounted, scramble])

  useEffect(() => {
    if (isHovered) {
      scramble()
    } else {
      // When hover ends, clear any ongoing scramble and show original text
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
        scrambleIntervalRef.current = null
      }
      setDisplayText(textRef.current)
    }

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
      }
    }
  }, [isHovered, scramble])

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  )
}

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'Experience', href: '/experience' },
  { title: 'Organizations', href: '/organizations' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-xl font-extrabold font-heading text-accent-light dark:text-accent-dark"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ScrambleText text="DEV PRADEEP" />
              </motion.div>
            </Link>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-card-light dark:hover:bg-card-dark transition-colors"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Floating Dock Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="flex items-end gap-2 px-4 py-3 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl shadow-2xl"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  'relative flex items-center justify-center rounded-xl px-4 py-2.5 transition-all duration-300 text-sm font-semibold whitespace-nowrap',
                  isActive
                    ? 'bg-accent-light/20 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark'
                    : 'text-foreground-light dark:text-foreground-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.title}
                </motion.div>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}
