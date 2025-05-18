import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Chart } from "@/lib/types"
import { getPlaceholderByTags } from "@/lib/placeholder-images"

interface StaticSectionProps {
  title: string
  description?: string
  chart: Chart
  reverse?: boolean
}

export default function StaticSection({ title, description, chart, reverse = false }: StaticSectionProps) {
  // Get appropriate placeholder based on chart tags if no image is provided
  const imageUrl = chart.image || getPlaceholderByTags(chart.tags)

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
        <div className="rounded-lg overflow-hidden border border-border/50 aspect-[4/3] bg-card/30">
          <img src={imageUrl || "/placeholder.svg"} alt={chart.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{chart.title}</h3>
            <p className="text-sm text-muted-foreground">by {chart.author}</p>
          </div>

          <p className="text-muted-foreground">{chart.description}</p>

          <div className="flex flex-wrap gap-2">
            {chart.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            <Badge variant="outline" className="flex items-center gap-1">
              {chart.diceType}
            </Badge>
          </div>

          <div className="flex gap-3">
            <Button asChild>
              <Link href={`/charts/${chart.id}`}>Roll This Chart</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/charts/${chart.id}`} className="flex items-center gap-1">
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
