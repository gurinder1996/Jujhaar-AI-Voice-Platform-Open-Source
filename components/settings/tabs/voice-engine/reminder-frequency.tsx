"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function ReminderFrequency() {
  return (
    <div className="space-y-2">
      <Label>Reminder Message Frequency</Label>
      <p className="text-sm text-muted-foreground">
        Control how often AI will send a reminder message.
      </p>
      <div className="flex items-center gap-2">
        <Input type="number" defaultValue="10" className="w-20" />
        <span className="text-sm text-muted-foreground">seconds</span>
        <Input type="number" defaultValue="1" className="w-20" />
        <span className="text-sm text-muted-foreground">times</span>
      </div>
    </div>
  )
}