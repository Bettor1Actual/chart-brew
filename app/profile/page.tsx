import { redirect } from "next/navigation"

export default function ProfilePage() {
  // In a real app, this would get the current user's username from auth
  const currentUsername = "DungeonMaster42"

  // Redirect to the current user's profile page
  redirect(`/profile/${currentUsername}`)
}
