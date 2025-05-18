import Link from "next/link"
import { Heart, Copy, Dice6 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Chart } from "@/lib/types"
import { getPlaceholderByTags } from "@/lib/placeholder-images"

interface ChartCardProps {
  chart: Chart
  featured?: boolean
}

export default function ChartCard({ chart, featured = false }: ChartCardProps) {
  // Get appropriate placeholder based on chart tags if no image is provided
  const imageUrl = chart.image || getPlaceholderByTags(chart.tags)

  return (
    <Card className={`w-[280px] ${featured ? "border-primary/20" : ""}`}>
      <CardHeader className="p-0">
        <div className="relative h-36 w-full overflow-hidden rounded-t-lg">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={chart.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold truncate">{chart.title}</h3>
              <p className="text-xs text-muted-foreground">by {chart.author}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {chart.diceType}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1">
            {chart.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {chart.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{chart.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Favorite</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Copy className="h-4 w-4" />
          <span className="sr-only">Duplicate</span>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/charts/${chart.id}`} className="flex items-center gap-1">
            <Dice6 className="h-4 w-4" />
            <span>Roll</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
