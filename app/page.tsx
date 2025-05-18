"use client"

import Link from "next/link"
import { Feather, PawPrintIcon as Patreon } from "lucide-react"
import HeroSection from "@/components/hero-section"
import ScrollableSection from "@/components/scrollable-section"
import StaticSection from "@/components/static-section"
import ChartCard from "@/components/chart-card"
import CreatorCard from "@/components/creator-card"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"

// Sample data
import { featuredCharts, topCreators, recentCharts, topContributors } from "@/lib/sample-data"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center mr-4">
            <Link href="/" className="flex items-center space-x-2">
              <Feather className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg hidden sm:inline-block">Chart Brew</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 flex-1 justify-between">
            <div className="flex items-center space-x-4">{/* This div is kept empty to maintain the layout */}</div>

            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="text-sm font-medium text-orange-500 hover:text-orange-400 hidden sm:flex items-center gap-1"
              >
                <Patreon className="h-4 w-4" />
                <span>Chart Brew Patreon</span>
              </Link>

              <UserNav />
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Priority Content */}
        <ScrollableSection title="Featured Charts" description="Staff picks and seasonal favorites">
          {featuredCharts.map((chart) => (
            <ChartCard key={chart.id} chart={chart} featured />
          ))}
        </ScrollableSection>

        {/* Top Creators */}
        <ScrollableSection title="Top Creators" description="The masterminds behind your favorite charts">
          {topCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </ScrollableSection>

        {/* Chart of the Month */}
        <StaticSection
          title="Chart of the Month"
          description="This month's most extraordinary creation"
          chart={featuredCharts[0]}
        />

        {/* Ad Block 1 */}
        <div className="rounded-lg border border-border/50 bg-card/50 p-6 text-center">
          <p className="text-lg font-semibold">Support Chart Brew</p>
          <p className="text-sm text-muted-foreground mt-2">Unlock premium charts and features by becoming a patron</p>
          <Button className="mt-4 bg-orange-600 hover:bg-orange-700" asChild>
            <Link href="#" className="flex items-center gap-2">
              <Patreon className="h-4 w-4" />
              <span>Chart Brew Patreon</span>
            </Link>
          </Button>
        </div>

        {/* Most Downloaded */}
        <StaticSection
          title="Most Downloaded"
          description="Charts that have captured the community's imagination"
          chart={featuredCharts[2]}
          reverse
        />

        {/* Recent Charts */}
        <ScrollableSection title="Recent Charts" description="Fresh from the forge">
          {recentCharts.map((chart) => (
            <ChartCard key={chart.id} chart={chart} />
          ))}
        </ScrollableSection>

        {/* Top Contributors */}
        <ScrollableSection title="Top Contributors" description="Chart remixers who build on great ideas">
          {topContributors.map((contributor) => (
            <CreatorCard key={contributor.id} creator={contributor} isContributor={true} />
          ))}
        </ScrollableSection>

        {/* Ad Block 2 */}
        <div className="rounded-lg border border-border/50 bg-card/50 p-6 text-center">
          <p className="text-lg font-semibold">Create Your Own Charts</p>
          <p className="text-sm text-muted-foreground mt-2">
            Download the Chart Brew mobile app to create and share your own charts
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="outline" disabled>
              App Store
            </Button>
            <Button variant="outline" disabled>
              Google Play
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Mobile apps coming soon!</p>
        </div>
      </main>

      <footer className="border-t border-border/40 bg-background/95 py-6">
        <div className="container flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Feather className="h-5 w-5 text-primary" />
            <span className="font-semibold">Chart Brew</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chart Brew. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
