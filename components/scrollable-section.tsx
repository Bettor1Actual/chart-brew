import type { ReactNode } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ScrollableSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export default function ScrollableSection({ title, description, children }: ScrollableSectionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-max space-x-4 p-1">{children}</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
