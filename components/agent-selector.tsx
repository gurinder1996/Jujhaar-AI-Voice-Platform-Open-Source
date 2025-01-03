"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

interface Agent {
  id: string
  name: string
  organization_id: string
}

export function AgentSelector() {
  const [open, setOpen] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string>("")
  const [selectedAgentName, setSelectedAgentName] = useState<string>("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchAgents() {
      const { data: agents, error } = await supabase
        .from("agents")
        .select("id, name, organization_id")
        .order("name")

      if (error) {
        console.error("Error fetching agents:", error)
        return
      }

      setAgents(agents || [])
      // Select the first agent by default if none is selected
      if (agents?.length && !selectedAgent) {
        setSelectedAgent(agents[0].id)
        setSelectedAgentName(agents[0].name)
      }
    }

    fetchAgents()
  }, [supabase, selectedAgent])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedAgentName || "Select an agent..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search agents..." />
          <CommandEmpty>No agent found.</CommandEmpty>
          <CommandGroup>
            {agents.map((agent) => (
              <CommandItem
                key={agent.id}
                value={agent.id}
                onSelect={(currentValue) => {
                  setSelectedAgent(currentValue === selectedAgent ? "" : currentValue)
                  setSelectedAgentName(agent.name)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedAgent === agent.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {agent.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
