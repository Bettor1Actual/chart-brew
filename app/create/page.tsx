"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Apple, Play, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CreateChartPage() {
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    toast({
      title: "Got it!",
      description: "Thanks for helping shape what we build next.",
    })
    setSubmitted(true)
  }

  return (
    <div className="container py-6 space-y-8">
      <Toaster />
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </Button>
      </div>

      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">For now, the Create feature lives only in the Chart Brew app.</CardTitle>
            <p className="text-muted-foreground mt-2">
              Create and roll charts directly from your phone — faster, smoother, and built for mobile-first magic.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" className="gap-2" disabled>
                <Apple className="h-4 w-4" />
                <span>Download on the App Store</span>
              </Button>
              <Button variant="outline" className="gap-2" disabled>
                <Play className="h-4 w-4" />
                <span>Get it on Google Play</span>
              </Button>
            </div>

            <div className="pt-6 border-t border-border/50">
              <h3 className="font-semibold text-center mb-4">Want to see this feature on the web?</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">Rate how badly we need it:</p>

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
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Don't care</span>
                    <span>Dying for it</span>
                  </div>
                </div>

                <Button className="w-full gap-2" onClick={handleSubmit} disabled={submitted}>
                  <Send className="h-4 w-4" />
                  <span>Submit Feedback</span>
                </Button>

                {submitted && (
                  <p className="text-sm text-center text-primary">
                    Got it! Thanks for helping shape what we build next.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-center text-muted-foreground justify-center">
            <p>Mobile apps coming soon. Stay tuned!</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
