'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Carousel, Card } from '@/components/ui/apple-cards-carousel'
import ProjectModal from '@/components/ProjectModal'

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

  const handleCardClick = (index: number) => {
    setSelectedProject(projects[index])
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const cards = projects.map((project, index) => {
    return (
      <Card
        key={project.name}
        card={{
          title: project.name,
          src: project.imageUrl,
          content: null, // Not needed since we're using modal
        }}
        index={index}
        active={0}
        onCardClick={() => handleCardClick(index)}
      />
    )
  })

  return (
    <>
      <section id="projects" className="min-h-screen px-0 py-12 flex flex-col">
        <div className="w-full flex-1 flex flex-col">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-center mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.h2>

          <Carousel items={cards} onCardClick={handleCardClick} />
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  )
}
