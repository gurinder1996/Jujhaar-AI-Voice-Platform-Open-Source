"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export function AgentInfo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Agent Info</h2>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
      
      <div className="grid gap-4">
        <div>
          <div className="text-sm font-medium">Agent Name</div>
          <Input defaultValue="Jujhaar AI" className="mt-1.5" />
        </div>

        <div>
          <div className="text-sm font-medium">Business Phone Number</div>
          <div className="mt-1.5">
            <Button variant="secondary" className="w-[140px]">
              Get a Number
            </Button>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium">Agent ID</div>
          <div className="mt-1.5 flex items-center gap-2">
            <code className="rounded bg-muted px-2 py-1 text-sm">
              r9Kh2S5FzQP2uvPkE6
            </code>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}