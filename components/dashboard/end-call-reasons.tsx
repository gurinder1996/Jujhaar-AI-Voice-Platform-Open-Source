"use client"

import { Card } from "@/components/ui/card"

export function EndCallReasons() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium">End Call Reasons</h3>
        <p className="text-xs text-muted-foreground">
          Automatically detected reasons that the call was ended
        </p>
      </div>
      <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
        No data available
      </div>
    </Card>
  )
}