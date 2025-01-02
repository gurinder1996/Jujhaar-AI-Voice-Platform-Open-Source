"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BackgroundSound() {
  return (
    <div className="space-y-2">
      <Label>Background Sound</Label>
      <Select defaultValue="none">
        <SelectTrigger>
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="office">Office</SelectItem>
          <SelectItem value="cafe">Café</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}