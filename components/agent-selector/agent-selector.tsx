"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Plus, Search, Copy } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NewAgentDialog } from "./new-agent-dialog"
import { useAgent } from "@/contexts/agent-context"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"

type Agent = {
  id: string
  name: string
  organization_id: string
}

export function AgentSelector() {
  const [open, setOpen] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [showNewAgentDialog, setShowNewAgentDialog] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { selectedAgent, setSelectedAgent } = useAgent()
  const { toast } = useToast()
  const { data: session } = useSession()

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Check both auth systems
        const { data: { user: supabaseUser } } = await supabase.auth.getUser()
        console.log('Auth Debug:', {
          nextAuthSession: session,
          supabaseUser,
        })

        // Get organizations first to debug RLS
        const { data: orgs, error: orgError } = await supabase
          .from("organizations")
          .select("id, name, owner_id")
        console.log('Organizations:', orgs, 'Error:', orgError)

        const { data, error } = await supabase
          .from("agents")
          .select("id, name, organization_id")
          .order("name")
        
        console.log('Agents query:', { data, error })
        
        if (error) {
          console.error("Error fetching agents:", error)
          return
        }

        const agentsList = data || []
        setAgents(agentsList)
        
        // If there's at least one agent and none selected, select the first one
        if (agentsList.length > 0 && !selectedAgent) {
          setSelectedAgent(agentsList[0])
          router.push(`/agents/design/${agentsList[0].id}`)
        }
      } catch (error) {
        console.error("Error in fetchAgents:", error)
      }
    }

    if (session) {
      fetchAgents()
    }
  }, [supabase, selectedAgent, setSelectedAgent, router, session])

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
    setOpen(false)
    router.push(`/agents/design/${agent.id}`)
  }

  const handleCreateAgent = () => {
    setOpen(false)
    setShowNewAgentDialog(true)
  }

  const handleAgentCreated = () => {
    // Refresh the agents list
    const fetchAgents = async () => {
      const { data } = await supabase.from("agents").select("id, name, organization_id").order("name")
      if (data) {
        setAgents(data)
      }
    }
    fetchAgents()
  }

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation() // Prevent triggering the CommandItem click
    navigator.clipboard.writeText(id)
    toast({
      title: "Copied!",
      description: "Agent ID copied to clipboard",
      duration: 2000,
    })
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{selectedAgent?.name ?? "Select an agent..."}</span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search agent..." className="h-9" />
            <CommandList>
              <CommandEmpty>No agent found.</CommandEmpty>
              <CommandGroup>
                {Array.isArray(agents) && agents.map((agent) => (
                  <CommandItem
                    key={agent.id}
                    onSelect={() => handleAgentSelect(agent)}
                    className="cursor-pointer group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{agent.name}</span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-muted-foreground">
                          {agent.id}
                        </span>
                        <Copy 
                          className="h-3 w-3 cursor-pointer hover:text-foreground" 
                          onClick={(e) => handleCopyId(e, agent.id)}
                        />
                        {selectedAgent?.id === agent.id && (
                          <Check className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
                <CommandItem
                  onSelect={handleCreateAgent}
                  className="cursor-pointer border-t"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Agent
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <NewAgentDialog 
        open={showNewAgentDialog}
        onOpenChange={setShowNewAgentDialog}
        onAgentCreated={handleAgentCreated}
      />
    </>
  )
}
