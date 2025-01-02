"use client"

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { TopNavTabs } from "./top-nav-tabs"

export function TopNav() {
  return (
    <div className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Jujhaar AI"
            className="h-9 w-[200px] rounded-md border bg-background px-3 text-sm"
          />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <TopNavTabs />
    </div>
  )
}