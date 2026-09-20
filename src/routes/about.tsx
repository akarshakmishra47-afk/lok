import { createFileRoute } from '@tanstack/react-router'
import { SectionHeading } from '@/components/folklore'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <SectionHeading 
        eyebrow="The Project"
        title="About LokKatha"
        copy="LokKatha is an interactive folklore explorer designed to document the myths, legends, and community theories surrounding India's historical locations."
      />
      
      <div className="mt-12 space-y-8 text-muted-foreground leading-7">
        <p>
          Every historical site has an official narrative—the dates, the dynasties, the architectural styles. But layered beneath that is the oral tradition, passed down through generations.
        </p>
        <p>
          LokKatha aims to preserve these stories, distinguishing between historical records and folklore, and allowing communities to share their personal recollections and theories.
        </p>
        
        <h3 className="font-display text-2xl text-foreground mt-12 mb-4">Architecture</h3>
        <p>
          Built with React, Vite, TanStack Router, and Supabase. The cinematic interface utilizes a custom dark-mode design system.
        </p>
      </div>
    </div>
  )
}
