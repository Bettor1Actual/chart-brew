import type { Chart, Creator } from "./types"

export const featuredCharts: Chart[] = [
  {
    id: "chart-1",
    title: "Goblin Names",
    author: "TheArchivist",
    authorId: "creator-1",
    description:
      "A collection of unique goblin names for your fantasy RPG. Perfect for quickly generating names for goblin NPCs, enemies, or even goblin PCs in a pinch.",
    image: "/placeholders/fantasy-forest.png",
    diceType: "d8",
    entries: 8,
    tags: ["Names", "Goblin", "NPC"],
    downloads: 7,
    favorites: 3,
    createdAt: "2024-04-15",
  },
  {
    id: "chart-2",
    title: "Tavern Rumors",
    author: "WitchCrafted",
    authorId: "creator-2",
    description:
      "Colorful rumors and gossip that can be overheard in taverns. Use these to add flavor to your tavern scenes or as hooks for side quests.",
    image: "/placeholders/fantasy-tavern.png",
    diceType: "d10",
    entries: 10,
    tags: ["Tavern", "Rumors", "Plot Hooks"],
    downloads: 5,
    favorites: 2,
    createdAt: "2024-04-22",
  },
  {
    id: "chart-3",
    title: "Magic Mishaps",
    author: "TheArchivist",
    authorId: "creator-1",
    description:
      "What happens when spells go wrong? This chart provides entertaining and sometimes dangerous magical mishaps for when a spell fails or a magical experiment goes awry.",
    image: "/placeholders/fantasy-potion.png",
    diceType: "d6",
    entries: 6,
    tags: ["Magic", "Mishaps", "Spells"],
    downloads: 9,
    favorites: 4,
    createdAt: "2024-04-18",
  },
]

export const recentCharts: Chart[] = [
  {
    id: "chart-4",
    title: "Critical Fumbles",
    author: "WitchCrafted",
    authorId: "creator-2",
    description:
      "What happens when you roll a natural 1 on an attack? This chart provides interesting and balanced consequences for critical fumbles.",
    image: "/placeholders/fantasy-battle.png",
    diceType: "d6",
    entries: 6,
    tags: ["Combat", "Critical", "Fumble"],
    downloads: 4,
    favorites: 1,
    createdAt: "2024-05-01",
  },
  {
    id: "chart-5",
    title: "Dungeon Traps",
    author: "TheArchivist",
    authorId: "creator-1",
    description:
      "Simple but effective traps for your dungeon. Each trap includes detection difficulty, effects, and disarming methods.",
    image: "/placeholders/fantasy-dungeon.png",
    diceType: "d8",
    entries: 8,
    tags: ["Traps", "Dungeon", "Hazards"],
    downloads: 6,
    favorites: 2,
    createdAt: "2024-04-28",
  },
]

export const topCreators: Creator[] = [
  {
    id: "creator-1",
    username: "TheArchivist",
    title: "Chart Collector",
    avatar: "",
    charts: 3,
    downloads: 18,
    followers: 2,
  },
  {
    id: "creator-2",
    username: "WitchCrafted",
    title: "Magical Chart Creator",
    avatar: "",
    charts: 2,
    downloads: 9,
    followers: 1,
  },
]

export const topContributors: Creator[] = [
  {
    id: "contributor-1",
    username: "TheArchivist",
    title: "Chart Collector",
    avatar: "",
    charts: 2,
    downloads: 18,
    followers: 2,
  },
  {
    id: "contributor-2",
    username: "WitchCrafted",
    title: "Magical Chart Creator",
    avatar: "",
    charts: 1,
    downloads: 9,
    followers: 1,
  },
]
