'use client'

import Navigation from '@/components/Navigation'
import Projects from '@/components/Projects'
import PageTransition from '@/components/PageTransition'

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navigation />
        <Projects />
      </main>
    </PageTransition>
  )
}

