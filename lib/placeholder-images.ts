// Collection of placeholder images for different contexts in the app

// Chart placeholders with fantasy themes
export const chartPlaceholders = [
  "/placeholders/fantasy-tavern.png",
  "/placeholders/fantasy-dungeon.png",
  "/placeholders/fantasy-forest.png",
  "/placeholders/fantasy-castle.png",
  "/placeholders/fantasy-treasure.png",
  "/placeholders/fantasy-battle.png",
  "/placeholders/fantasy-potion.png",
  "/placeholders/fantasy-scroll.png",
  "/placeholders/fantasy-market.png",
  "/placeholders/fantasy-library.png",
  "/placeholders/fantasy-ship.png",
  "/placeholders/fantasy-dragon.png",
  "/placeholders/fantasy-city.png",
  "/placeholders/fantasy-ritual.png",
  "/placeholders/fantasy-map.png",
  "/placeholders/fantasy-portal.png",
]

// Avatar placeholders for users and creators
export const avatarPlaceholders = [
  "/placeholders/avatar-wizard.png",
  "/placeholders/avatar-warrior.png",
  "/placeholders/avatar-rogue.png",
  "/placeholders/avatar-bard.png",
  "/placeholders/avatar-cleric.png",
]

// Get a random placeholder from the collection
export function getRandomChartPlaceholder(): string {
  return chartPlaceholders[Math.floor(Math.random() * chartPlaceholders.length)]
}

// Get a random avatar placeholder
export function getRandomAvatarPlaceholder(): string {
  return avatarPlaceholders[Math.floor(Math.random() * avatarPlaceholders.length)]
}

// Get a placeholder based on chart tags
export function getPlaceholderByTags(tags: string[]): string {
  // Map common tags to specific placeholders
  if (tags.some((tag) => tag.toLowerCase().includes("tavern") || tag.toLowerCase().includes("inn"))) {
    return "/placeholders/fantasy-tavern.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("dungeon") || tag.toLowerCase().includes("trap"))) {
    return "/placeholders/fantasy-dungeon.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("forest") || tag.toLowerCase().includes("wilderness"))) {
    return "/placeholders/fantasy-forest.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("castle") || tag.toLowerCase().includes("noble"))) {
    return "/placeholders/fantasy-castle.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("treasure") || tag.toLowerCase().includes("loot"))) {
    return "/placeholders/fantasy-treasure.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("battle") || tag.toLowerCase().includes("combat"))) {
    return "/placeholders/fantasy-battle.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("potion") || tag.toLowerCase().includes("magic"))) {
    return "/placeholders/fantasy-potion.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("market") || tag.toLowerCase().includes("shop"))) {
    return "/placeholders/fantasy-market.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("library") || tag.toLowerCase().includes("book"))) {
    return "/placeholders/fantasy-library.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("ship") || tag.toLowerCase().includes("sea"))) {
    return "/placeholders/fantasy-ship.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("dragon") || tag.toLowerCase().includes("monster"))) {
    return "/placeholders/fantasy-dragon.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("city") || tag.toLowerCase().includes("urban"))) {
    return "/placeholders/fantasy-city.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("ritual") || tag.toLowerCase().includes("cult"))) {
    return "/placeholders/fantasy-ritual.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("map") || tag.toLowerCase().includes("navigation"))) {
    return "/placeholders/fantasy-map.png"
  }
  if (tags.some((tag) => tag.toLowerCase().includes("portal") || tag.toLowerCase().includes("teleport"))) {
    return "/placeholders/fantasy-portal.png"
  }

  // Default to a random placeholder if no specific tags match
  return getRandomChartPlaceholder()
}
