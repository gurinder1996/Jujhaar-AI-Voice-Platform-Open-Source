"use client"

import { Switch } from "@/components/ui/switch"

export function HumanizeSettings() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">Humanize Conversation</div>
        <p className="text-sm text-muted-foreground">
          Add vocal ticks such as hmm, umm etc. to your conversation
        </p>
      </div>
      <Switch />
    </div>
  )
}