"use client"

import { cn } from "@/lib/utils"
import { Settings, Volume2, Bell, Settings2, Mic } from "lucide-react"

interface Tab {
  icon: React.ElementType
  label: string
  value: string
}

const tabs: Tab[] = [
  { icon: Settings, label: "General", value: "general" },
  { icon: Volume2, label: "Voice Engine", value: "voice" },
  { icon: Mic, label: "Transcriber", value: "transcriber" },
  { icon: Bell, label: "Notifications", value: "notifications" },
  { icon: Settings2, label: "Advanced", value: "advanced" },
]

interface SettingsTabsProps {
  activeTab: string
  onChange: (value: string) => void
}

export function SettingsTabs({ activeTab, onChange }: SettingsTabsProps) {
  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeTab === tab.value
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}