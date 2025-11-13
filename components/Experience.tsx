'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Calendar } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  achievements: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: 'Co-Founder/Software Engineer',
    company: 'Melong',
    location: 'Remote',
    period: 'June 2025 - Present',
    description: [
      'Building an interactive storytelling application for children, emphasizing engagement, usability, and educational value.',
      'Developing and integrating MySQL database tables and Express.js API endpoints for new application features and efficient data storage.',
    ],
    achievements: [
      'Implemented a Redis-based token blacklist system to manage access tokens, improving authentication security by preventing reuse of revoked tokens and reducing unauthorized access incidents from 42% → 23%.',
    ],
  },
  {
    title: 'Test Automation Engineer Intern',
    company: 'Kapsch TrafficCom',
    location: 'Remote',
    period: 'May 2025 - August 2025',
    description: [
      'Created and maintained automated UI tests for two versions of Kapsch\'s DYNAC traffic management system using Ranorex and Selenium, ensuring cross-version stability and feature parity.',
    ],
    achievements: [
      'Identified, debugged, and resolved issues in existing automated test cases across legacy and current DYNAC platforms, improving test reliability and reducing manual QA effort from 4h → 30m.',
    ],
  },
]

function ExperienceCard({
  exp,
  index,
  isExpanded,
  onToggle,
  isSectionInView,
}: {
  exp: ExperienceItem
  index: number
  isExpanded: boolean
  onToggle: () => void
  isSectionInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isSectionInView ? 1 : 0, y: isSectionInView ? 0 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card-light dark:bg-card-dark rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-border-light dark:border-border-dark"
    >
      <motion.button
        onClick={onToggle}
        className="w-full text-left"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold mb-2">{exp.title}</h3>
            <p className="text-xl text-accent-light dark:text-accent-dark mb-3">
              {exp.company}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-foreground-light/70 dark:text-foreground-dark/70">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {exp.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {exp.period}
              </span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Responsibilities:</h4>
                <ul className="list-disc list-inside space-y-2 text-foreground-light dark:text-foreground-dark ml-4">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-2 text-foreground-light dark:text-foreground-dark ml-4">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="text-accent-light dark:text-accent-dark">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isSectionInView = useInView(sectionRef, { threshold: 0.3 })

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} id="experience" className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isSectionInView ? 1 : 0, y: isSectionInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => toggleExpand(index)}
              isSectionInView={isSectionInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
