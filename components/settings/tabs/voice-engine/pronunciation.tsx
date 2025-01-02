"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function Pronunciation() {
  return (
    <div className="space-y-2">
      <Label>Pronunciation</Label>
      <p className="text-sm text-muted-foreground">
        Guide the model to pronounce a word, name, or phrase in a specific way.
      </p>
      <Button variant="outline" className="w-full justify-start">+ Add</Button>
    </div>
  )
}