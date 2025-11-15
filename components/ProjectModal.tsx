'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
import ProjectSlideshow from './ui/ProjectSlideshow'

export interface MediaItem {
  type: 'image' | 'video'
  url: string
  alt?: string
}

interface Project {
  name: string
  technologies: string[]
  description: string[]
  achievements: string[]
  github?: string
  demo?: string
  media?: MediaItem[]
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto border border-border-light dark:border-border-dark"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark p-6 flex items-start justify-between z-10">
                    <h2 className="text-3xl font-extrabold font-heading">{project.name}</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-foreground-light/10 dark:hover:bg-foreground-dark/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Slideshow */}
              {project.media && project.media.length > 0 && (
                <ProjectSlideshow media={project.media} />
              )}

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Technologies */}
                <div>
                      <h3 className="text-lg font-semibold font-heading mb-3">Technologies & Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 text-sm font-medium bg-accent-light/10 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                      <h3 className="text-lg font-semibold font-heading mb-3">Description</h3>
                  <div className="space-y-3">
                    {project.description.map((desc, i) => (
                      <p key={i} className="text-foreground-light dark:text-foreground-dark leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div>
                      <h3 className="text-lg font-semibold font-heading mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-foreground-light dark:text-foreground-dark flex items-start gap-2"
                      >
                        <span className="text-accent-light dark:text-accent-dark mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                {(project.github || project.demo) && (
                  <div className="flex gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-white rounded-full font-medium hover:shadow-lg transition-shadow"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        View on GitHub
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-full font-medium hover:shadow-lg transition-shadow"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Demo
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

