import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { folkloreService } from '@/lib/folklore-data'
import type { Location, HistoricalLore } from '@/lib/folklore-data'
import { SectionHeading, LoreSection, CommentSection, LoadingState, ErrorState } from '@/components/folklore'
import { MapPin } from 'lucide-react'

export const Route = createFileRoute('/location/$slug')({
  component: LocationPage,
})

function LocationPage() {
  const { slug } = Route.useParams()
  const [location, setLocation] = useState<Location | null>(null)
  const [lore, setLore] = useState<HistoricalLore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const loc = await folkloreService.getLocationBySlug(slug)
        if (loc) {
          setLocation(loc)
          const l = await folkloreService.getLoreForLocation(loc.id)
          setLore(l)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  if (loading) return <LoadingState />
  if (!location) return <ErrorState />

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-center gap-2 text-sm text-primary mb-4">
            <MapPin size={16}/> {location.city ? `${location.city}, ` : ''}{location.state}
          </div>
          <SectionHeading 
            eyebrow={location.category}
            title={location.name}
            copy={location.historical_summary}
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <img src={location.image_url} alt={location.name} className="size-full object-cover" />
          <div className="absolute inset-0 bg-image-shade"/>
        </div>
      </div>
      
      <div className="mt-16">
        <LoreSection lore={lore} />
      </div>

      <div className="mt-16 border-t border-border pt-16 max-w-3xl">
        <CommentSection location={location} />
      </div>
    </div>
  )
}
