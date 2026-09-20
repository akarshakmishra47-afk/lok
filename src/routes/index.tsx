import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionHeading, LocationCard } from '../components/folklore'
import { Button } from '@/components/ui/button'
import { folkloreService, type Location } from '@/lib/folklore-data'

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => {
    const locations = await folkloreService.getLocations();
    return { featured: locations.slice(0, 3) };
  }
})

function Index() {
  const { featured } = Route.useLoaderData();

  return (
    <div className="relative isolate min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-20 animate-[slowPan_40s_ease-in-out_infinite_alternate] bg-[url('/lokkatha-temple.jpg')] bg-cover bg-center opacity-70"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/80 to-background"></div>
        
        <div className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-8 animate-[float_8s_ease-in-out_infinite]">
          <SectionHeading 
            eyebrow="An Atlas of Living Memory"
            title="Every place holds a story."
            copy="Journey through India's landscapes to discover the legends, spirits, songs, and memories rooted within them. A community-driven archive preserving the oral traditions that history forgot."
          />
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/explore">
              <Button size="lg" className="h-14 px-8 text-base font-medium shadow-[0_0_30px_-5px_var(--color-primary)]">Explore the archive</Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-medium bg-background/50 backdrop-blur-sm">Open the map</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <SectionHeading 
            eyebrow="Curated"
            title="Featured locations"
            copy="Step into some of the most enduring mysteries and legends."
          />
          <Link to="/explore" className="hidden text-sm font-medium text-primary hover:underline md:block">
            View all places →
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((location: Location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <Link to="/explore">
            <Button variant="outline" className="w-full">View all places</Button>
          </Link>
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="relative overflow-hidden border-t border-border py-24 sm:py-32">
        <div className="absolute inset-0 -z-20 animate-[slowPan_60s_linear_infinite] bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background"></div>
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl">Are you a keeper of stories?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-md">
            Whether it's a tale passed down by your grandparents or a strange experience you can't explain, your recollections matter. Help us build the largest digital archive of Indian folklore.
          </p>
          <div className="mt-10 relative z-10">
            <Link to="/auth">
              <Button size="lg" className="h-14 px-8 text-base font-medium shadow-[0_0_40px_-10px_var(--color-primary)]">Contribute a story</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
