import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { folkloreService } from '@/lib/folklore-data'
import type { Location } from '@/lib/folklore-data'
import { SectionHeading, LocationGrid, SearchBar, FilterBar } from '@/components/folklore'

export const Route = createFileRoute('/explore')({
  component: Explore,
})

function Explore() {
  const [locations, setLocations] = useState<Location[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    folkloreService.getLocations().then(setLocations).catch(console.error)
  }, [])

  const filtered = locations.filter(l => {
    if (filter !== 'All' && l.category !== filter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.state.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  })

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <SectionHeading 
        eyebrow="The Archive"
        title="Explore folklore and places"
      />
      
      <div className="my-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-sm">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterBar value={filter} onChange={setFilter} />
      </div>

      <LocationGrid items={filtered} />
    </div>
  )
}
