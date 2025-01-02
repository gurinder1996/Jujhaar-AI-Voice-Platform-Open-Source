"use client"

import { AgentsList } from "@/components/agents/agents-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input 
          placeholder="Search..." 
          className="max-w-xs"
        />
        <Button className="gap-2 bg-black text-white hover:bg-black/90">
          <Plus className="h-4 w-4" />
          Create an Agent
        </Button>
      </div>
      <AgentsList />
    </div>
  )
}