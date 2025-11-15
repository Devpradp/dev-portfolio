'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'C#', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      'Flask',
      'SQLAlchemy',
      'React',
      'Next.js',
      'Express',
      'TensorFlow Lite',
      'YOLO',
      'Firebase',
      'Expo',
    ],
  },
  {
    title: 'Developer Tools',
    skills: [
      'Git',
      'GitLab',
      'Docker',
      'Sequel Ace',
      'Postman',
      'Visual Studio Code',
      'JetBrains',
      'MySQL',
      'Emacs',
      'Selenium',
      'Ranorex',
      'Jest',
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isSectionInView = useInView(sectionRef, { threshold: 0.3 })

  return (
    <section ref={sectionRef} id="skills" className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold font-heading text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isSectionInView ? 1 : 0, y: isSectionInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isSectionInView ? 1 : 0, y: isSectionInView ? 0 : 30 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold font-heading mb-6 text-center">{category.title}</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isSectionInView ? 1 : 0, scale: isSectionInView ? 1 : 0.8 }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.03,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <div className="px-6 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-full shadow-md hover:shadow-xl transition-shadow cursor-default">
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

