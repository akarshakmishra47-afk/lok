import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { folkloreService } from '@/lib/folklore-data'
import type { Location } from '@/lib/folklore-data'
import { CommentSection, LoadingState, ErrorState } from '@/components/folklore'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/location/$slug/discussions')({
  component: DiscussionsPage,
})

function DiscussionsPage() {
  const { slug } = Route.useParams()
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const loc = await folkloreService.getLocationBySlug(slug)
        if (loc) {
          setLocation(loc)
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
    <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <Link to="/location/$slug" params={{ slug }}>
        <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to {location.name}
        </Button>
      </Link>
      
      <CommentSection location={location} />
    </div>
  )
}
