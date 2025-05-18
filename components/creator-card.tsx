import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Creator } from "@/lib/types"
import { getRandomAvatarPlaceholder } from "@/lib/placeholder-images"

interface CreatorCardProps {
  creator: Creator
  isContributor?: boolean
}

export default function CreatorCard({ creator, isContributor = false }: CreatorCardProps) {
  // Get a random avatar placeholder if no avatar is provided
  const avatarUrl = creator.avatar || getRandomAvatarPlaceholder()

  // Get initials for avatar fallback
  const initials = creator.username.substring(0, 2).toUpperCase()

  return (
    <Card className="w-[220px]">
      <CardContent className="pt-6 pb-2 text-center">
        <Avatar className="h-20 w-20 mx-auto border-4 border-background">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={creator.username} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <h3 className="mt-4 font-semibold">{creator.username}</h3>
        <div className="mt-1 text-xs text-muted-foreground">{creator.title}</div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div>
            <p className="text-sm font-medium">{creator.charts}</p>
            <p className="text-xs text-muted-foreground">{isContributor ? "Contributions" : "Charts"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">{creator.downloads}</p>
            <p className="text-xs text-muted-foreground">Downloads</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/profile/${creator.username}`} className="flex items-center justify-center gap-1">
            <span>View Profile</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
