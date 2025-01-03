"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { useAgent } from "@/contexts/agent-context"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

const agentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long")
})

export function AgentInfo() {
  const params = useParams()
  const { selectedAgent, updateSelectedAgent, isLoading } = useAgent()
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const [isUpdating, setIsUpdating] = useState(false)
  const [localName, setLocalName] = useState("")
  const [lastUpdateTime, setLastUpdateTime] = useState(0)

  // Get agentId from URL params or selectedAgent
  const agentId = params.agentId as string || selectedAgent?.id

  useEffect(() => {
    if (selectedAgent?.name && !isUpdating) {
      console.log('Updating local name from selectedAgent:', selectedAgent.name, 'Agent ID:', selectedAgent.id)
      setLocalName(selectedAgent.name)
    }
  }, [selectedAgent?.name, isUpdating])

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    console.log('Name change:', newName)
    setLocalName(newName)
  }, [])

  const handleNameBlur = useCallback(async (e: React.FocusEvent<HTMLInputElement>) => {
    const currentAgentId = selectedAgent?.id // Get the latest agentId
    const newName = e.target.value.trim()
    console.log('Name blur:', newName, 'Agent ID:', currentAgentId)
    
    // Prevent duplicate updates within 1 second
    const now = Date.now()
    if (now - lastUpdateTime < 1000) {
      console.log('Skipping update - too soon after last update')
      return
    }
    
    if (!newName || !currentAgentId || isUpdating) {
      console.log('Skipping update - invalid state:', { newName, currentAgentId, isUpdating })
      return
    }

    if (newName === selectedAgent?.name) {
      console.log('Skipping update - name unchanged')
      return
    }

    setIsUpdating(true)
    setLastUpdateTime(now)
    console.log('Updating name in Supabase:', newName, 'Agent ID:', currentAgentId)

    try {
      // Validate the new name
      agentSchema.parse({ name: newName })

      const { data, error } = await supabase
        .from('agents')
        .update({ name: newName })
        .eq('id', currentAgentId)
        .select()
        .single()

      console.log('Supabase update result:', { data, error })

      if (error) throw error

      if (data) {
        console.log('Update successful, updating context with:', data)
        updateSelectedAgent(data)
        toast({
          title: "Name updated",
          description: "Agent name has been saved",
          duration: 2000,
        })
      }
    } catch (error) {
      console.error('Error updating name:', error)
      
      // Reset to current name on error
      setLocalName(selectedAgent?.name || "")
      
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid name",
          description: error.errors[0]?.message || "Name validation failed",
          variant: "destructive",
          duration: 3000,
        })
      } else {
        toast({
          title: "Update failed",
          description: error instanceof Error ? error.message : "Failed to update agent name",
          variant: "destructive",
          duration: 3000,
        })
      }
    } finally {
      setIsUpdating(false)
    }
  }, [selectedAgent, updateSelectedAgent, supabase, toast, isUpdating, lastUpdateTime])

  const handleCopyId = () => {
    const currentAgentId = selectedAgent?.id
    if (currentAgentId) {
      navigator.clipboard.writeText(currentAgentId)
      toast({
        title: "Copied!",
        description: "Agent ID copied to clipboard",
        duration: 2000,
      })
    }
  }

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
          <Input 
            key={`${selectedAgent?.id}-${isUpdating}`}
            value={localName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            disabled={isUpdating || isLoading}
            className="mt-1.5" 
            placeholder={isLoading ? "Loading..." : "Enter agent name"}
          />
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
              {isLoading ? "Loading..." : selectedAgent?.id}
            </code>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCopyId}
              disabled={isLoading || !selectedAgent?.id}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}