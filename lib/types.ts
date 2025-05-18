export interface Chart {
  id: string
  title: string
  author: string
  authorId: string
  description: string
  image: string
  diceType: string
  entries: number
  tags: string[]
  downloads: number
  favorites: number
  createdAt: string
}

export interface Creator {
  id: string
  username: string
  title: string
  avatar: string
  charts: number
  downloads: number
  followers: number
}

export interface ChartEntry {
  minRoll: number
  maxRoll: number
  result: string
}
