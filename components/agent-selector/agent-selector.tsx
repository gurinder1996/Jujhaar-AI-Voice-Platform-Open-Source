"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Plus, Search } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Agent = {
  id: string
  name: string
}

export function AgentSelector() {
  const [open, setOpen] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("id, name")
      
      if (data) {
        setAgents(data)
        // If there's at least one agent and none selected, select the first one
        if (data.length > 0 && !selectedAgent) {
          setSelectedAgent(data[0])
        }
      }
    }

    fetchAgents()
  }, [])

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
    setOpen(false)
    // Update URL with selected agent ID
    router.push(`/agents/design/${agent.id}`)
  }

  const handleCreateAgent = () => {
    router.push("/agents/create")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            {selectedAgent?.name ?? "Select an agent..."}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search agent..." className="h-9" />
          <CommandEmpty>No agent found.</CommandEmpty>
          <CommandGroup>
            {agents.map((agent) => (
              <CommandItem
                key={agent.id}
                onSelect={() => handleAgentSelect(agent)}
                className="cursor-pointer"
              >
                {agent.name}
                {selectedAgent?.id === agent.id && (
                  <Check className="ml-auto h-4 w-4" />
                )}
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
        </Command>
      </PopoverContent>
    </Popover>
  )
}
