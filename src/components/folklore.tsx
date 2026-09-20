import { Link } from "@tanstack/react-router";
import { Compass, Feather, MapPin, Menu, MessageCircle, Search, Send, Sparkles, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Location, UserComment, HistoricalLore } from "@/lib/folklore-data";
import { folkloreService } from "@/lib/folklore-data";
import { supabase } from "@/lib/supabase";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    folkloreService.getCurrentUser().then(setUser);
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const links = [["/explore", "Explore"], ["/map", "Map"], ["/about", "About"]] as const;
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8"><Link to="/" className="flex items-center gap-3" aria-label="LokKatha home"><span className="grid size-8 place-items-center border border-primary/60 text-primary"><Feather size={16}/></span><span className="font-display text-xl text-foreground">LokKatha</span></Link><nav className="hidden items-center gap-8 md:flex">{links.map(([to,label])=><Link key={to} to={to} activeProps={{className:"text-primary"}} inactiveProps={{className:"text-muted-foreground"}} className="text-sm transition-colors hover:text-foreground">{label}</Link>)}{user ? <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button> : <Link to="/auth"><Button variant="outline" size="sm">Login</Button></Link>}</nav><div className="flex items-center gap-2 md:hidden">{user ? <Button variant="outline" size="sm" onClick={handleLogout}>Out</Button> : <Link to="/auth"><Button variant="outline" size="sm">In</Button></Link>}<Button variant="ghost" size="icon" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</Button></div></div>{open&&<nav className="border-t border-border bg-background px-5 py-5 md:hidden">{links.map(([to,label])=><Link key={to} to={to} onClick={()=>setOpen(false)} className="block py-3 text-muted-foreground">{label}</Link>)}</nav>}</header>;
}

export function Footer() { return <footer className="border-t border-border"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-2 lg:px-8"><div><p className="font-display text-2xl">LokKatha</p><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">An evolving archive of India's stories, landscapes, and living memory.</p></div><div className="flex gap-6 md:justify-end"><Link to="/explore" className="text-sm text-muted-foreground hover:text-primary">Explore</Link><Link to="/map" className="text-sm text-muted-foreground hover:text-primary">Map</Link><Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link></div></div><div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">Stories belong to the communities that carry them.</div></footer> }

export function PageShell({children}:{children:React.ReactNode}) { return <><Navbar/><main className="min-h-screen pt-18">{children}</main><Footer/></>; }

export function SectionHeading({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}) { return <div className="max-w-2xl"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p><h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">{title}</h2>{copy&&<p className="mt-5 leading-7 text-muted-foreground">{copy}</p>}</div> }

export function LocationCard({location}:{location:Location}) { 
  return <article className="group overflow-hidden border border-border bg-card">
    <Link to="/location/$slug" params={{slug:location.slug}}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={location.image_url} alt={location.name} width={1200} height={800} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-image-shade"/>
        <span className="absolute left-4 top-4 border border-primary/40 bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-primary backdrop-blur">{location.category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={13}/>{location.city ? `${location.city}, ` : ''}{location.state}</div>
        <h3 className="mt-3 font-display text-2xl text-card-foreground group-hover:text-primary">{location.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{location.short_description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="text-primary">Enter place →</span>
        </div>
      </div>
    </Link>
  </article> 
}

export function LocationGrid({items}:{items?:Location[]}) { 
  return items && items.length?<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(x=><LocationCard key={x.slug} location={x}/>)}</div>:<EmptyState/> 
}

export function SearchBar({value,onChange}:{value:string;onChange:(v:string)=>void}) { return <label className="relative block"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/><Input value={value} onChange={(e: any)=>onChange(e.target.value)} className="h-12 border-border bg-card pl-11" placeholder="Search places, stories, or regions…" aria-label="Search folklore locations"/></label> }
export function FilterBar({value,onChange}:{value:string;onChange:(v:string)=>void}) { const filters=["All","Fort","Village","Beach","Lake","Stepwell","Marshland"]; return <div className="flex gap-2 overflow-x-auto pb-2">{filters.map(f=><Button key={f} size="sm" variant={value===f?"default":"outline"} onClick={()=>onChange(f)}>{f}</Button>)}</div> }

export function LocationMap({activeSlug, locations = []}:{activeSlug?:string, locations?: Location[]}) { 
  if (locations.length === 0) return <LoadingState />;

  const center = activeSlug 
    ? [locations.find(l => l.slug === activeSlug)?.latitude || 20.5937, locations.find(l => l.slug === activeSlug)?.longitude || 78.9629]
    : [20.5937, 78.9629];

  return <div className="relative min-h-[520px] overflow-hidden border border-border bg-map z-0">
    <MapContainer center={center as [number, number]} zoom={4.5} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(l => (
        <Marker key={l.slug} position={[l.latitude, l.longitude]}>
          <Popup className="bg-card text-card-foreground">
            <Link to="/location/$slug" params={{slug:l.slug}} className="font-display hover:text-primary">
              {l.name}
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div> 
}

export function LoreSection({lore}:{lore: HistoricalLore[]}) { 
  return <section className="grid gap-10 border-t border-border py-16 lg:grid-cols-[.7fr_1.3fr]">
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-primary">The oral tradition</p>
      <h2 className="mt-3 font-display text-4xl">What the elders tell</h2>
    </div>
    <div className="space-y-6 text-base leading-8 text-muted-foreground">
      {lore.map((l, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="font-display text-xl text-foreground">{l.title}</h3>
          <p className="mt-2">{l.content}</p>
          <div className="mt-2 text-xs opacity-70">Source: {l.source || 'Local tradition'} • {l.credibility_note}</div>
        </div>
      ))}
      <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl italic leading-9 text-foreground">“The earth does not forget a footprint, nor the wind a name spoken with love.”</blockquote>
    </div>
  </section> 
}

export function CommentSection({location}:{location:Location}) { 
  const [comments,setComments]=useState<UserComment[]>([]); 
  const [draft,setDraft]=useState(""); 
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    folkloreService.getCurrentUser().then(setUser);
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    folkloreService.getCommentsForLocation(location.id).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [location.id]);

  const handleShare = async () => {
    if(!draft.trim()) return;
    if(!user) {
      alert("Please sign in to share a recollection.");
      return;
    }
    try {
      const newComment = await folkloreService.addComment({
        location_id: location.id,
        user_id: user.id,
        username: user.email?.split('@')[0] || "Storyteller",
        comment: draft.trim(),
        theory_type: "theory"
      });
      setComments([newComment, ...comments]);
      setDraft("");
    } catch (e) {
      console.error(e);
      alert("Failed to post comment. Ensure you are logged in (RLS) if required.");
    }
  }

  return <section>
    <div className="flex items-center gap-3">
      <MessageCircle className="text-primary"/>
      <h2 className="font-display text-3xl">Community recollections</h2>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">Share a version, memory, or source connected to {location.name}.</p>
    <div className="mt-8 border border-border bg-card p-5">
      <Textarea value={draft} onChange={(e: any)=>setDraft(e.target.value)} placeholder="Add your recollection…" className="min-h-28 resize-none border-border bg-background"/>
      <div className="mt-3 flex justify-end">
        <Button onClick={handleShare}><Send className="mr-2 h-4 w-4"/> Share</Button>
      </div>
    </div>
    <div className="mt-8 space-y-0">
      {loading ? <LoadingState /> : comments.map((c)=><article key={c.id} className="border-b border-border py-6"><div className="flex justify-between gap-4"><p className="font-medium text-foreground">{c.username || 'Anonymous'}</p><time className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</time></div><p className="mt-3 leading-7 text-muted-foreground">{c.comment}</p></article>)}
    </div>
  </section> 
}

export function LoadingState(){return <div className="grid min-h-72 place-items-center"><div className="text-center"><Sparkles className="mx-auto animate-pulse text-primary"/><p className="mt-4 text-sm text-muted-foreground">Gathering stories…</p></div></div>}
export function ErrorState(){return <div className="grid min-h-72 place-items-center text-center"><div><p className="font-display text-2xl">The trail has gone cold.</p><p className="mt-2 text-sm text-muted-foreground">We could not recover this story.</p></div></div>}
export function EmptyState(){return <div className="grid min-h-72 place-items-center border border-dashed border-border text-center"><div><Compass className="mx-auto text-primary"/><p className="mt-4 font-display text-2xl">No stories found</p><p className="mt-2 text-sm text-muted-foreground">Try another place or tradition.</p></div></div>}
