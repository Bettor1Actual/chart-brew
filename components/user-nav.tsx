"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { User, LogOut, Settings, FileText, Heart, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Initial check for user session
    const getUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser()

      console.log("👤 Supabase user (initial):", user)
      if (error) console.error("❌ Supabase error (initial):", error)
      setUser(user)
    }

    getUser()

    // Listen for auth state changes (login, logout, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth state changed:", event, session)
      if (event === "SIGNED_IN") {
        setUser(session?.user || null)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={() => router.push("/login")}>
        Login
      </Button>
    )
  }

  const username = user.user_metadata?.username || user.email?.split("@")[0] || "User"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholders/avatar-wizard.png" alt="@user" />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${username}`} className="flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/create" className="flex w-full items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Create Chart</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/login") // Redirect to login page after logout
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}