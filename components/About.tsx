'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

function CursorHighlight({ children }: { children: React.ReactNode }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Reset state when component mounts (page refresh/navigation)
    setCursorPosition({ x: 0, y: 0 })
    setBoxPosition({ x: 0, y: 0, width: 0, height: 0 })
    setIsAnimating(false)

    // Start animation after a short delay
    const startTimer = setTimeout(() => {
      setIsAnimating(true)
    }, 800)

    return () => clearTimeout(startTimer)
  }, [])

  useEffect(() => {
    if (!isAnimating || !containerRef.current) return

    const container = containerRef.current
    const padding = 8 // Padding around the text for the box (even on all sides)
    const cursorOffset = 12 // Offset cursor from box corner
    
    // Start position (top-left)
    const startX = -padding
    const startY = -padding
    // End position (bottom-right)
    const endX = container.offsetWidth + padding
    const endY = container.offsetHeight + padding

    const duration = 500 // 0.8 seconds for faster animation
    const updateInterval = 16 // ~60fps
    const totalSteps = duration / updateInterval
    let currentStep = 0

    const interval = setInterval(() => {
      const progress = currentStep / totalSteps

      if (progress >= 1) {
        // Animation complete - stop
        clearInterval(interval)
        return
      }

      // Cursor moves from start to end with offset from corner
      const x = startX + (endX - startX) * progress + cursorOffset
      const y = startY + (endY - startY) * progress + cursorOffset

      setCursorPosition({ x, y })

      // Box expands from start position to end position
      setBoxPosition({
        x: startX,
        y: startY,
        width: (endX - startX) * progress,
        height: (endY - startY) * progress,
      })

      currentStep++
    }, updateInterval)

    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <span ref={containerRef} className="relative inline-block">
      {children}
      {/* Selection box that expands as cursor drags */}
      <motion.div
        className="absolute border-2 border-accent-light dark:border-accent-dark pointer-events-none rounded-sm"
        style={{
          left: `${boxPosition.x}px`,
          top: `${boxPosition.y}px`,
          width: `${boxPosition.width}px`,
          height: `${boxPosition.height}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {/* Cursor icon that moves around the box */}
      <motion.div
        className="absolute pointer-events-none z-10"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-accent-light dark:text-accent-dark drop-shadow-lg"
        >
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
      </motion.div>
    </span>
  )
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="min-h-[80vh] flex items-center justify-center px-4 py-12 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-start"
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent-light dark:border-accent-dark shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-full h-full bg-accent-light dark:bg-accent-dark flex items-center justify-center text-6xl font-black text-white">
                DP
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold font-heading leading-tight"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="block mb-2">HI, I'M</span>
              <CursorHighlight>
                <span className="text-accent-light dark:text-accent-dark">
                  DEV PRADEEP
                </span>
              </CursorHighlight>
            </motion.h1>

            <motion.p
              className="text-xl font-semibold text-foreground-light dark:text-foreground-dark"
              variants={itemVariants}
            >
              Computer Science Student at University at Buffalo
            </motion.p>

            <motion.p
              className="text-lg font-medium text-foreground-light dark:text-foreground-dark leading-relaxed"
              variants={itemVariants}
            >
              Currently pursuing a Bachelor of Science in Computer Science at University at Buffalo, 
              expected to graduate in May 2027. Passionate about building innovative
              software solutions and creating impactful user experiences.
            </motion.p>

            {/* Contact Links */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="mailto:dev.pradeep@outlook.com"
                className="flex items-center gap-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-white rounded-full font-medium hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Email
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/devpradeep-swe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-full font-medium hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </motion.a>
              <motion.a
                href="https://github.com/devpradp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-full font-medium hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                GitHub
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

