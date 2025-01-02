"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PersonalitySettings() {
  return (
    <div>
      <div className="mb-4">
        <div className="text-sm font-medium">Personality</div>
        <p className="text-sm text-muted-foreground">
          Set the conversational style of your agent.
        </p>
      </div>
      <Select defaultValue="casual">
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="casual">😊 Casual</SelectItem>
          <SelectItem value="professional">👔 Professional</SelectItem>
          <SelectItem value="friendly">🤗 Friendly</SelectItem>
          <SelectItem value="formal">📝 Formal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}