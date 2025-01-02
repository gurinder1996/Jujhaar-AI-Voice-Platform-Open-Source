"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const agentDesignPaths = ['/agent-design', '/knowledge-base', '/workflows', '/settings', '/functions']

export function TopNavTabs() {
  const pathname = usePathname()

  // Only show tabs on agent design related pages
  if (!agentDesignPaths.includes(pathname)) {
    return null
  }

  const tabs = [
    {
      label: "Agent Design",
      href: "/agent-design",
    },
    {
      label: "Knowledge Base",
      href: "/knowledge-base",
    },
    {
      label: "Workflows",
      href: "/workflows",
    },
    {
      label: "Functions",
      href: "/functions",
    },
    {
      label: "Settings",
      href: "/settings",
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