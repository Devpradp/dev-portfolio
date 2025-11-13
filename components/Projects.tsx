'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { CometCard } from '@/components/ui/comet-card'
import ProjectModal from '@/components/ProjectModal'
import { useInView } from '@/hooks/useInView'

interface Project {
  name: string
  technologies: string[]
  description: string[]
  achievements: string[]
  github?: string
  demo?: string
  imageUrl: string
}

const projects: Project[] = [
  {
    name: 'EDEN',
    technologies: ['TypeScript', 'React', 'Next.js', 'YOLO', 'OpenCV', 'PyTorch', 'Mapbox', 'Twilio', 'OpenAI'],
    description: [
      'Engineered an AI-powered security monitoring system using YOLO across 25+ live camera feeds, detecting incidents (fighting, theft, vandalism) with accuracy improving from 75% → 92%.',
      'Built a multi-agent verification system with pre-trained models and OpenAI for person tracking and spatial analysis to validate threats.',
      'Integrated real-time video analysis with automated alerting, enabling instant security dispatch via Twilio, reducing response time from 30m → 5m.',
    ],
    achievements: [
      'Improved detection accuracy from 75% → 92%',
      'Reduced response time from 30m → 5m',
      'Monitored 25+ live camera feeds simultaneously',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    name: 'LovaSlide (HackHarvard 2025)',
    technologies: ['Python', 'TypeScript', 'Next.js', 'React', 'FastAPI', 'OpenAI API', 'SerpAPI'],
    description: [
      'Developed an AI-powered tool that automatically transforms documents into polished, data-driven presentations, highlighting key insights, cutting slide generation time by 90 percent compared to Gamma AI and Copilot.',
      'Engineered intelligent agents to extract and summarize text, generate and animate slides, and verify factual accuracy using OpenAI and SerpAPI integrations.',
    ],
    achievements: [
      'Cut slide generation time by 90% compared to competitors',
      'Built intelligent multi-agent system for document processing',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isSectionInView = useInView(sectionRef, { threshold: 0.3 })

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Delay to allow exit animation
  }

  return (
    <>
      <section ref={sectionRef} id="projects" className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isSectionInView ? 1 : 0, y: isSectionInView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isSectionInView ? 1 : 0, y: isSectionInView ? 0 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-lg"
              >
                <CometCard>
                  <button
                    type="button"
                    onClick={() => handleProjectClick(project)}
                    className="flex w-full cursor-pointer flex-col items-stretch rounded-[16px] border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-2 saturate-0 hover:saturate-100 transition-all duration-300"
                    aria-label={`View ${project.name}`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'none',
                      opacity: 1,
                    }}
                  >
                    <div className="mx-2 flex-1">
                      <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-[16px]">
                        <img
                          loading="lazy"
                          className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                          alt={`${project.name} background`}
                          src={project.imageUrl}
                          style={{
                            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 6px 0px',
                            opacity: 1,
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-foreground-light dark:text-foreground-dark">
                      <div className="text-base font-bold">{project.name}</div>
                      <div className="text-xs text-foreground-light/50 dark:text-foreground-dark/50">#{index + 1}</div>
                    </div>
                  </button>
                </CometCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

