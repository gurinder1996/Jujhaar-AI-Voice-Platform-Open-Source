"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function Sidebar() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
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
      icon: PhoneIcon,
      href: "/agent-design",
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
      href: "/call-history",
      section: "main"
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      section: "secondary"
    },
    {
      label: "Referrals",
      icon: Share2,
      href: "/referrals",
      section: "secondary"
    },
    {
      label: "Help Center",
      icon: HelpCircle,
      href: "/help",
      section: "secondary"
    },
    {
      label: "Log out",
      icon: LogOut,
      href: "/logout",
      section: "secondary"
    }
  ]

  const mainRoutes = routes.filter(route => route.section === "main")
  const secondaryRoutes = routes.filter(route => route.section === "secondary")

  return (
    <div className="relative">
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
                !isHovered && "px-2"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {isHovered && <span className="ml-2">{route.label}</span>}
              </Link>
            </Button>
          ))}
        </div>

        <div className="mt-auto space-y-1 border-t p-2">
          {secondaryRoutes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                !isHovered && "px-2"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {isHovered && <span className="ml-2">{route.label}</span>}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="w-16" aria-hidden="true" />
    </div>
  )
}