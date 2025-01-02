"use client"

import { Input } from "@/components/ui/input"

export function OrganizationInfo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Organization Info</h2>
      
      <div className="grid gap-4">
        <div>
          <div className="text-sm font-medium">Org Name</div>
          <Input defaultValue="Jujhaar AI" className="mt-1.5" />
        </div>

        <div>
          <div className="text-sm font-medium">Team Size</div>
          <Input defaultValue="1" className="mt-1.5" />
        </div>
      </div>
    </div>
  )
}