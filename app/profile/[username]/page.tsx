import Link from "next/link"
import { ArrowLeft, Edit, Plus, Trash2, Download, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { featuredCharts, recentCharts } from "@/lib/sample-data"
import { getPlaceholderByTags } from "@/lib/placeholder-images"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const username = params.username

  // Determine if this is the current user's profile
  const isCurrentUser = username === "DungeonMaster42" // In a real app, this would check against the logged-in user

  // Find user data - in a real app, this would fetch from an API
  const userData =
    username === "TheArchivist"
      ? {
          username: "TheArchivist",
          email: "archivist@example.com",
          avatar: "",
          joinDate: "Member since April 2024",
          charts: 3,
          downloads: 18,
          favorites: 2,
          contributions: 2,
        }
      : username === "WitchCrafted"
        ? {
            username: "WitchCrafted",
            email: "witch@example.com",
            avatar: "",
            joinDate: "Member since April 2024",
            charts: 2,
            downloads: 9,
            favorites: 1,
            contributions: 1,
          }
        : {
            username: username,
            email: `${username.toLowerCase()}@example.com`,
            avatar: "",
            joinDate: "Member since May 2024",
            charts: 0,
            downloads: 0,
            favorites: 0,
            contributions: 0,
          }

  // Sample user's charts
  const userCharts =
    username === "TheArchivist"
      ? [featuredCharts[0], featuredCharts[2], recentCharts[1]]
      : username === "WitchCrafted"
        ? [featuredCharts[1], recentCharts[0]]
        : []

  // Get initials for avatar fallback
  const initials = userData.username.substring(0, 2).toUpperCase()

  // Tab labels based on whose profile is being viewed
  const tabLabels = {
    charts: isCurrentUser ? "My Charts" : `${userData.username}'s Charts`,
    favorites: isCurrentUser ? "Favorites" : `${userData.username}'s Favorites`,
    collections: isCurrentUser ? "Collections" : `${userData.username}'s Collections`,
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>

      {/* User Profile Header */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.username}
                onError={(e) => {
                  // If the avatar fails to load, it will fall back to the AvatarFallback
                  e.currentTarget.src = ""
                }}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{userData.username}</h1>
              <p className="text-muted-foreground">{userData.joinDate}</p>

              <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.charts}</p>
                  <p className="text-sm text-muted-foreground">Charts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.downloads}</p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.favorites}</p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.contributions}</p>
                  <p className="text-sm text-muted-foreground">Contributions</p>
                </div>
              </div>
            </div>

            {isCurrentUser ? (
              <Button variant="outline" className="shrink-0">
                Edit Profile
              </Button>
            ) : (
              <Button variant="outline" className="shrink-0">
                Follow
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">{tabLabels.charts}</TabsTrigger>
          <TabsTrigger value="favorites">{tabLabels.favorites}</TabsTrigger>
          <TabsTrigger value="collections">{tabLabels.collections}</TabsTrigger>
        </TabsList>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{tabLabels.charts}</h2>
            {isCurrentUser && (
              <Button asChild>
                <Link href="/create" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Create New Chart</span>
                </Link>
              </Button>
            )}
          </div>

          {userCharts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {userCharts.map((chart) => {
                // Get appropriate placeholder based on chart tags if no image is provided
                const imageUrl = chart.image || getPlaceholderByTags(chart.tags)

                return (
                  <Card key={chart.id} className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-full sm:w-32 h-24 rounded-md overflow-hidden shrink-0">
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={chart.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback if the image fails to load
                              e.currentTarget.src = "/placeholders/fantasy-default.png"
                            }}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{chart.title}</h3>
                              <p className="text-xs text-muted-foreground">Created on {chart.createdAt}</p>
                            </div>
                            <Badge variant="outline">{chart.diceType}</Badge>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {chart.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <Download className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{chart.downloads} downloads</span>
                          </div>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/charts/${chart.id}`}>View</Link>
                          </Button>
                          {isCurrentUser && (
                            <>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Edit className="h-3 w-3" />
                                <span>Edit</span>
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive gap-1">
                                <Trash2 className="h-3 w-3" />
                                <span>Delete</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No charts created yet.</p>
                <Button className="mt-4" asChild>
                  <Link href="/create">Create Your First Chart</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <h2 className="text-2xl font-bold">{tabLabels.favorites}</h2>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No favorites yet.</p>
              <Button className="mt-4" asChild>
                <Link href="/">Explore Charts</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{tabLabels.collections}</h2>
            {isCurrentUser && (
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                <span>New Collection</span>
              </Button>
            )}
          </div>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No collections created yet.</p>
              <Button className="mt-4" variant="outline" asChild>
                <Link href="/">Explore Charts to Add</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {username === "TheArchivist" && (
        <>
          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Activity</h2>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Created a new chart: Dungeon Traps</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Favorited: Tavern Rumors by WitchCrafted</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Edit className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Edited chart: Magic Mishaps</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
