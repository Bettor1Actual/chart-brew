"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { featuredCharts } from "@/lib/sample-data"
import { getPlaceholderByTags } from "@/lib/placeholder-images"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Slider } from "@/components/ui/slider"
import { Apple, Play, Send } from "lucide-react"

interface ChartPageProps {
  params: {
    id: string
  }
}

export default function ChartPage({ params }: ChartPageProps) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [rollValue, setRollValue] = useState(3)
  const [isRolling, setIsRolling] = useState(false)
  const [showRollAnimation, setShowRollAnimation] = useState(false)
  const [isManualEntry, setIsManualEntry] = useState(false)
  const [manualInput, setManualInput] = useState<string>("")
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  // Find chart by ID from sample data
  const chart = featuredCharts.find((c) => c.id === params.id) || featuredCharts[0]

  // Get appropriate placeholder based on chart tags if no image is provided
  const imageUrl = chart.image || getPlaceholderByTags(chart.tags)

  // Chart entries based on the chart type
  const chartEntries =
    chart.title === "Goblin Names"
      ? [
          { minRoll: 1, maxRoll: 1, result: "Snivven" },
          { minRoll: 2, maxRoll: 2, result: "Grubtooth" },
          { minRoll: 3, maxRoll: 3, result: "Nix Ratgobbler" },
          { minRoll: 4, maxRoll: 4, result: "Skrak Toothgnasher" },
          { minRoll: 5, maxRoll: 5, result: "Mog Spiderbiter" },
          { minRoll: 6, maxRoll: 6, result: "Blitz Quickstabber" },
          { minRoll: 7, maxRoll: 7, result: "Zibble Fingerslicer" },
          { minRoll: 8, maxRoll: 8, result: "Grukk Bonecrusher" },
        ]
      : chart.title === "Tavern Rumors"
        ? [
            {
              minRoll: 1,
              maxRoll: 1,
              result: "The brewer's ghost is back, turning all the ale sour at midnight.",
            },
            {
              minRoll: 2,
              maxRoll: 2,
              result: "A dragon was seen near the mountain pass, breathing blue fire.",
            },
            {
              minRoll: 3,
              maxRoll: 3,
              result:
                "The blacksmith's daughter can speak to animals. She's been warning about something coming from the forest.",
            },
            {
              minRoll: 4,
              maxRoll: 4,
              result:
                "There's a secret entrance to the old catacombs beneath the tavern's cellar. The owner keeps it locked.",
            },
            {
              minRoll: 5,
              maxRoll: 5,
              result:
                "The traveling merchant selling magical trinkets is actually a polymorphed dragon testing the locals.",
            },
            {
              minRoll: 6,
              maxRoll: 6,
              result: "The old hermit in the hills has been seen drawing strange symbols that glow at night.",
            },
            {
              minRoll: 7,
              maxRoll: 7,
              result:
                "Three children went missing last full moon. They returned a day later with no memory but speaking in rhymes.",
            },
            {
              minRoll: 8,
              maxRoll: 8,
              result:
                "The well water has been tasting strange lately. Some say it grants vivid dreams of ancient cities.",
            },
            {
              minRoll: 9,
              maxRoll: 9,
              result:
                "A band of adventurers went into the caves last week. Only their weapons returned, walking on their own.",
            },
            {
              minRoll: 10,
              maxRoll: 10,
              result:
                "The mayor's been buying up all the silver in town. Says it's for a new statue, but no one's seen any work started.",
            },
          ]
        : [
            {
              minRoll: 1,
              maxRoll: 1,
              result: "Hair turns bright blue for 1d4 hours.",
            },
            {
              minRoll: 2,
              maxRoll: 2,
              result: "Explodes in a harmless cloud of glitter that clings to everything nearby.",
            },
            {
              minRoll: 3,
              maxRoll: 3,
              result: "Caster speaks in rhymes for the next 10 minutes.",
            },
            {
              minRoll: 4,
              maxRoll: 4,
              result: "Nearby metal objects float gently for 1 minute.",
            },
            {
              minRoll: 5,
              maxRoll: 5,
              result: "A spectral musical instrument plays whenever the caster speaks for 1 hour.",
            },
            {
              minRoll: 6,
              maxRoll: 6,
              result:
                "The caster's shadow acts independently for 1d4 minutes, though it can't affect the physical world.",
            },
          ]

  // Find the result for the current roll
  const currentResult = chartEntries.find((entry) => rollValue >= entry.minRoll && rollValue <= entry.maxRoll)

  // Handle duplicate and edit
  const handleDuplicateAndEdit = () => {
    // In a real app, this would create a new chart based on the current one
    // For now, we'll navigate to the create page with query params
    const queryParams = new URLSearchParams({
      duplicate: "true",
      source: chart.id,
      title: chart.title,
      description: chart.description,
      diceType: chart.diceType,
      tags: chart.tags.join(","),
      image: chart.image,
    }).toString()

    router.push(`/create?${queryParams}`)
  }

  // Handle favorite
  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Chart removed from your favorites" : "Chart added to your favorites",
    })
  }

  // Handle random roll
  const handleRoll = () => {
    setIsRolling(true)
    setShowRollAnimation(true)
    setIsManualEntry(false)

    // Simulate dice rolling animation
    let rollCount = 0
    const maxRolls = 10
    const maxValue = chart.diceType === "d6" ? 6 : chart.diceType === "d8" ? 8 : chart.diceType === "d10" ? 10 : 6
    const rollInterval = setInterval(() => {
      setRollValue(Math.floor(Math.random() * maxValue) + 1)
      rollCount++

      if (rollCount >= maxRolls) {
        clearInterval(rollInterval)
        setIsRolling(false)

        // Hide the animation after a delay
        setTimeout(() => {
          setShowRollAnimation(false)
        }, 500)
      }
    }, 100)
  }

  // Handle manual roll input
  const handleManualRoll = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number.parseInt(manualInput)
    const maxValue = chart.diceType === "d6" ? 6 : chart.diceType === "d8" ? 8 : chart.diceType === "d10" ? 10 : 6

    if (!isNaN(value) && value >= 1 && value <= maxValue) {
      setRollValue(value)
      setIsManualEntry(true)
      setShowRollAnimation(true)

      // Hide the animation after a delay
      setTimeout(() => {
        setShowRollAnimation(false)
      }, 300)

      // Clear the input
      setManualInput("")
    } else {
      toast({
        title: "Invalid roll value",
        description: `Please enter a number between 1 and ${maxValue}`,
        variant: "destructive",
      })
    }
  }

  // Get dice color based on roll value
  const getDiceColor = () => {
    const maxValue = chart.diceType === "d6" ? 6 : chart.diceType === "d8" ? 8 : chart.diceType === "d10" ? 10 : 6
    if (rollValue >= Math.ceil(maxValue * 0.75)) return "text-green-500" // Great roll
    if (rollValue >= Math.ceil(maxValue * 0.5)) return "text-blue-500" // Good roll
    if (rollValue >= Math.ceil(maxValue * 0.25)) return "text-amber-500" // Average roll
    return "text-red-500" // Poor roll
  }

  const handleSubmit = () => {
    toast({
      title: "Got it!",
      description: "Thanks for helping shape what we build next.",
    })
    setSubmitted(true)
  }

  return (
    <div className="container py-6 space-y-6">
      <Toaster />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Chart Details (lower priority) */}
        <div className="lg:order-2 space-y-4">
          {/* Chart Details - Always visible now */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="pt-2">
                <h1 className="text-2xl font-bold tracking-tight">{chart.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">by</span>
                  <Link href={`/profile/${chart.author}`} className="text-sm font-medium hover:underline">
                    {chart.author}
                  </Link>
                </div>
              </div>

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
            </CardContent>
          </Card>

          {/* QR Sharing Card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">QR Sharing</h3>
              <Separator className="my-2" />
              <div className="bg-white p-4 rounded-md flex items-center justify-center">
                <img
                  src="/qr-code.png"
                  alt="QR Code"
                  className="h-40 w-40"
                  onError={(e) => {
                    // Fallback if the QR code fails to load
                    e.currentTarget.src = "/placeholders/qr-placeholder.png"
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                "{chart.title}" by {chart.author} — Tap or scan to add this chart to your collection.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2" onClick={handleFavorite}>
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-primary" : ""}`} />
              <span>{isFavorited ? "Favorited" : "Favorite"}</span>
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleDuplicateAndEdit}>
              <Copy className="h-4 w-4" />
              <span>Duplicate & Edit</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          {/* Chart Image - Moved below buttons */}
          <div className="aspect-video rounded-lg overflow-hidden border border-border/50">
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

          {/* Chart Description - Moved below image */}
          <div className="prose prose-invert max-w-none">
            <p>{chart.description}</p>
            <p>
              This chart contains {chartEntries.length} unique entries that can be rolled using a {chart.diceType}.
            </p>
            <p className="text-sm text-muted-foreground">
              Downloads: {chart.downloads} • Favorites: {chart.favorites} • Created: {chart.createdAt}
            </p>
          </div>
        </div>

        {/* Right Column - Roller and Chart Entries (higher priority) */}
        <div className="lg:col-span-2 lg:order-1 space-y-6">
          {/* App Promotion - Replacing Dice Roller */}
          <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-600 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-600 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-600 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-600 rounded-br-lg"></div>

            <div className="p-8 space-y-6 relative z-10">
              {/* Chart Title with decorative elements */}
              <div className="text-center relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
                <h2
                  className="relative inline-block px-6 py-1 text-3xl font-bold tracking-wide text-amber-100 bg-gray-900"
                  style={{ fontFamily: "serif", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  {chart.title}
                </h2>
              </div>

              {/* App Promotion Content */}
              <div className="max-w-md mx-auto bg-black/30 rounded-lg p-6 border border-amber-800/30">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-amber-100">
                    For now, the rolling feature lives only in the Chart Brew app.
                  </h3>
                  <p className="text-amber-200/80">
                    Create and roll charts directly from your phone — faster, smoother, and built for mobile-first
                    magic.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Button
                      variant="outline"
                      className="gap-2 border-amber-800/70 text-amber-100 hover:bg-amber-900/30"
                      disabled
                    >
                      <Apple className="h-4 w-4" />
                      <span>Download on the App Store</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 border-amber-800/70 text-amber-100 hover:bg-amber-900/30"
                      disabled
                    >
                      <Play className="h-4 w-4" />
                      <span>Get it on Google Play</span>
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-amber-800/30 mt-6">
                    <h4 className="font-semibold text-amber-100 mb-4">Want to see this feature on the web?</h4>
                    <p className="text-sm text-amber-200/70 mb-6">Rate how badly we need it:</p>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[5]}
                          max={10}
                          min={1}
                          step={1}
                          value={[rating]}
                          onValueChange={(value) => setRating(value[0])}
                          disabled={submitted}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-amber-200/70">
                          <span>Don't care</span>
                          <span>Dying for it</span>
                        </div>
                      </div>

                      <Button
                        className="w-full gap-2 bg-amber-700 hover:bg-amber-800 text-white border-none"
                        onClick={handleSubmit}
                        disabled={submitted}
                      >
                        <Send className="h-4 w-4" />
                        <span>Submit Feedback</span>
                      </Button>

                      {submitted && (
                        <p className="text-sm text-center text-amber-400">
                          Got it! Thanks for helping shape what we build next.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dice Type Indicator - Keep this for context */}
              <div className="mt-4 text-right">
                <span
                  className="inline-block px-4 py-1 text-xl font-mono text-amber-100 bg-black/50 rounded-lg border border-amber-800/50"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                >
                  1{chart.diceType}
                </span>
              </div>
            </div>
          </div>

          {/* Chart Entries */}
          <Tabs defaultValue="entries" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="entries">Chart Entries</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="entries" className="p-4 border rounded-md mt-2">
              <div className="space-y-2">
                {chartEntries.map((entry, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-md border flex gap-3 transition-colors ${
                      rollValue >= entry.minRoll && rollValue <= entry.maxRoll
                        ? "bg-amber-900/20 border-amber-800"
                        : "bg-card/50 border-border/50"
                    }`}
                  >
                    <div className="flex-shrink-0 w-16 text-center">
                      <div
                        className={`font-mono font-medium ${
                          rollValue >= entry.minRoll && rollValue <= entry.maxRoll ? "text-amber-500" : "text-primary"
                        }`}
                      >
                        {entry.minRoll === entry.maxRoll ? entry.minRoll : `${entry.minRoll}-${entry.maxRoll}`}
                      </div>
                    </div>
                    <div className="flex-1">{entry.result}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="comments" className="p-4 border rounded-md mt-2">
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            </TabsContent>
            <TabsContent value="history" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium">v1.0</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Original Version</p>
                    <p className="text-xs text-muted-foreground">Created on {chart.createdAt}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
