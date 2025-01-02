"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/hooks/use-auth'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  GitBranch,
  Phone as PhoneIcon,
  History,
  Share2,
  HelpCircle,
  LogOut,
  PlayCircle,
  Users
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function Sidebar() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const { isAuthenticated, user } = useAuth()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      section: "main"
    },
    {
      label: "Agents",
      icon: Users,
      href: "/agents",
      section: "main"
    },
    {
      label: "Agent Design",
      icon: GitBranch,
      href: "/agents/design",
      section: "main"
    },
    {
      label: "Simulation",
      icon: PlayCircle,
      href: "/simulation",
      section: "main"
    },
    {
      label: "Call History",
      icon: History,
      href: "/agents/call-history",
      section: "main"
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      section: "secondary"
    },
    {
      label: "Help Center",
      icon: HelpCircle,
      href: "/help",
      section: "secondary"
    }
  ]

  const mainRoutes = routes.filter(route => route.section === "main")
  const secondaryRoutes = routes.filter(route => route.section === "secondary")

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 z-30 flex h-full flex-col border-r bg-card transition-all duration-300",
          isHovered ? "w-64" : "w-16"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn(
          "flex h-16 items-center border-b px-4",
          isHovered ? "justify-start" : "justify-center"
        )}>
          <Link href="/" className="flex items-center gap-2">
            <PhoneIcon className="h-6 w-6" />
            {isHovered && <span className="font-semibold">Voice AI Daddy</span>}
          </Link>
        </div>

        <div className="flex-1 space-y-1 p-2">
          {mainRoutes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-secondary",
                !isHovered && "justify-center"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-5 w-5" />
                {isHovered && <span className="ml-2">{route.label}</span>}
              </Link>
            </Button>
          ))}
        </div>

        <div className="space-y-1 border-t p-2">
          {secondaryRoutes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                !isHovered && "justify-center"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-5 w-5" />
                {isHovered && <span className="ml-2">{route.label}</span>}
              </Link>
            </Button>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full",
                  isHovered ? "justify-start" : "justify-center"
                )}
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {user?.name?.[0] || user?.email?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
                {isHovered && (
                  <span className="ml-2">{user?.name || user?.email}</span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated ? (
                <>
                  <DropdownMenuLabel>{user?.name || user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Add a spacer div to offset the main content */}
      <div className="w-16 flex-shrink-0" aria-hidden="true" />
    </>
  )
}