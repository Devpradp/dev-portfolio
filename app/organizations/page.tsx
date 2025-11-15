'use client'

import Navigation from '@/components/Navigation'
import Organizations from '@/components/Organizations'
import PageTransition from '@/components/PageTransition'

export default function OrganizationsPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navigation />
        <Organizations />
      </main>
    </PageTransition>
  )
}

