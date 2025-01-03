"use client"

import { Input } from "@/components/ui/input"
import { useParams } from "next/navigation"
import { useAgent } from "@/contexts/agent-context"
import { Label } from "@/components/ui/label"

export function OrganizationInfo() {
  const { agentId } = useParams()
  const { selectedAgent } = useAgent()

  console.log('OrganizationInfo - selectedAgent:', selectedAgent)
  console.log('OrganizationInfo - organization:', selectedAgent?.organization)

  // Organization name (read-only)
  const orgName = selectedAgent?.organization?.name || 'Not connected'

  // Organization ID (read-only)
  const orgId = selectedAgent?.organization?.id || 'Not connected'

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Organization Info</h2>
      
      <div className="grid gap-4">
        <div>
          <Label className="text-sm font-medium">Organization Name</Label>
          <Input 
            value={orgName}
            disabled={true}
            className="mt-1.5" 
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Organization ID</Label>
          <Input 
            value={orgId}
            disabled={true}
            className="mt-1.5" 
          />
        </div>
      </div>
    </div>
  )
}