'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Award, Users, Calendar } from 'lucide-react'

interface Organization {
  name: string
  role: string
  period: string
  affiliation: string
  achievements: string[]
}

const organizations: Organization[] = [
  {
    name: 'UB Data Analytics',
    role: 'Member',
    period: 'March 2025 - Present',
    affiliation: 'University at Buffalo',
    achievements: [
      'Awarded 1st place out of 16 competing teams (80+ students) for delivering a data-driven presentation.',
      'Analyzed trends and presented findings to a panel of judges.',
      'Discovered insights including correlation between song length and comment activity, and how energy/danceability metrics influenced user engagement and algorithmic visibility.',
    ],
  },
  {
    name: 'UB Forge',
    role: 'Builder',
    period: 'April 2025 - Present',
    affiliation: 'University at Buffalo',
    achievements: [
      'Collaborating with developers and founders in a start-up-like environment, creating impactful projects throughout the semester.',
      'Expanding UB Forge\'s community by bringing in innovative and ambitious builders and organized weekly project presentations to inspire fellow members.',
      'Networking with professional software engineers and coordinated their participation in UB Forge meetings to share experience and advise students.',
    ],
  },
]

export default function Organizations() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="organizations" className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold font-heading text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Organizations
        </motion.h2>

        <div className="space-y-6">
          {organizations.map((org, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card-light dark:bg-card-dark rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-border-light dark:border-border-dark"
            >
              <motion.button
                onClick={() => toggleExpand(index)}
                className="w-full text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-extrabold font-heading">{org.name}</h3>
                      {index === 0 && (
                        <motion.div
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-semibold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: 'spring' }}
                        >
                          <Award className="w-3 h-3" />
                          1st Place
                        </motion.div>
                      )}
                    </div>
                    <p className="text-xl text-accent-light dark:text-accent-dark mb-1">
                      {org.role}
                    </p>
                    <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70 mb-3">
                      {org.affiliation}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-foreground-light/70 dark:text-foreground-dark/70">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {org.period}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6">
                      <h4 className="font-semibold mb-3">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-2 text-foreground-light dark:text-foreground-dark ml-4">
                        {org.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

