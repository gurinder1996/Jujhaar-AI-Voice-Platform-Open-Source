"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AgentSelector } from "@/components/agent-selector/agent-selector"

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
    <div className="flex h-14 items-center justify-between border-b bg-[#F8F9FC] px-6">
      <div className="w-[240px]">
        <AgentSelector />
      </div>
      <div className="flex-1 flex justify-center">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              pathname.startsWith(tab.href) &&
                "border-b-2 border-primary text-foreground"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="w-[240px]" />
    </div>
  )
}