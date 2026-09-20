import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { LocationMap } from '@/components/folklore'
import { folkloreService } from '@/lib/folklore-data'
import type { Location } from '@/lib/folklore-data'

export const Route = createFileRoute('/map')({
  component: MapPage,
})

function MapPage() {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    folkloreService.getLocations().then(setLocations).catch(console.error)
  }, [])

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4.5rem)' }}>
      <div className="p-4 border-b border-border bg-background">
        <h1 className="font-display text-2xl">Interactive Atlas</h1>
        <p className="text-sm text-muted-foreground">Select a marker to explore its folklore.</p>
      </div>
      <div className="flex-1 relative">
        <LocationMap locations={locations} />
      </div>
    </div>
  )
}
