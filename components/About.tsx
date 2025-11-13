'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isSectionInView = useInView(sectionRef, { threshold: 0.3 })

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
    <section ref={sectionRef} id="about" className="min-h-[80vh] flex items-center justify-center px-4 py-12 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? 'visible' : 'hidden'}
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
              className="text-5xl md:text-6xl font-extrabold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi, I'm{' '}
              <span className="text-accent-light dark:text-accent-dark">
                Dev Pradeep
              </span>
            </motion.h1>

            <motion.p
              className="text-xl font-semibold text-foreground-light dark:text-foreground-dark"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Software Engineer & Co-Founder at Melong
            </motion.p>

            <motion.p
              className="text-lg font-medium text-foreground-light dark:text-foreground-dark leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Currently pursuing a Bachelor of Science in Computer Science at University at Buffalo
              (GPA: 3.78), expected to graduate in May 2027. Passionate about building innovative
              software solutions and creating impactful user experiences.
            </motion.p>

            {/* Contact Links */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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

