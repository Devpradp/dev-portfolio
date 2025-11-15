'use client'

import Navigation from '@/components/Navigation'
import Experience from '@/components/Experience'
import PageTransition from '@/components/PageTransition'

export default function ExperiencePage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navigation />
        <Experience />
      </main>
    </PageTransition>
  )
}

