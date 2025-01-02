"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const agentDesignPaths = [
  '/agents/design',
  '/agents/knowledge-base',
  '/agents/workflows',
  '/agents/settings',
  '/agents/functions'
]

export function TopNavTabs() {
  const pathname = usePathname()

  // Only show tabs on agent design related pages
  if (!agentDesignPaths.some(path => pathname.startsWith(path))) {
    return null
  }

  const tabs = [
    {
      label: "Agent Design",
      href: "/agents/design",
    },
    {
      label: "Knowledge Base",
      href: "/agents/knowledge-base",
    },
    {
      label: "Workflows",
      href: "/agents/workflows",
    },
    {
      label: "Functions",
      href: "/agents/functions",
    },
    {
      label: "Settings",
      href: "/agents/settings",
    },
  ]

  return (
    <div className="flex justify-center border-b bg-[#F8F9FC]">
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              pathname === tab.href
                ? "bg-white text-foreground"
                : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  )
}