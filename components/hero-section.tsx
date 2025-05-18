import Link from "next/link"
import { PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="py-12 px-4 text-center space-y-6 relative overflow-hidden rounded-xl border border-border/50 bg-card/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/dark-fantasy-pattern.png')] opacity-10 bg-cover bg-center" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Every chart is just the start.
          <br />
          You take it from here.
        </h1>

        <p className="mt-6 text-xl text-muted-foreground">
          Create, share, and remix RPG charts with the tap of a finger. From goblin names to magical mishaps — every
          chart is a world waiting to be rolled.
        </p>

        <div className="mt-8 flex justify-center">
          <Button size="lg" variant="default" className="gap-2" asChild>
            <Link href="/create">
              <PenTool className="h-5 w-5" />
              <span>Create Your Own</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
