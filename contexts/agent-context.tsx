"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { createClientComponentClient, type RealtimeChannel } from "@supabase/auth-helpers-nextjs"
import { useParams } from "next/navigation"

type Agent = {
  id: string
  name: string
  organization: {
    id: string
    name: string | null
  } | null
  owner: {
    id: string
    email: string
  } | null
}

type AgentContextType = {
  selectedAgent: Agent | null
  setSelectedAgent: (agent: Agent | null) => void
  isLoading: boolean
  fetchAgent: (agentId: string) => Promise<Agent | null>
}

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()
  const params = useParams()
  const agentId = params?.agentId as string

  const fetchAgent = async (agentId: string) => {
    console.log('Fetching agent:', agentId);
    try {
      // Get the agent data first
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .select('id, name, organization_id')
        .eq('id', agentId)
        .single();

      console.log('Raw agent data:', agentData);

      if (agentError) {
        console.error('Error fetching agent:', agentError);
        return null;
      }

      // Create organization object from the agent data
      const organization = agentData?.organization_id ? {
        id: agentData.organization_id,
        name: null
      } : null;

      // If we have an organization, fetch its name using auth
      if (organization) {
        console.log('Fetching organization name for id:', organization.id);
        try {
          const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select(`
              name,
              owner:owner_id (
                id
              )
            `)
            .eq('id', organization.id)
            .or(`owner_id.eq.${await supabase.auth.getUser().then(res => res.data.user?.id)}`);

          console.log('Organization query response:', { 
            data: orgData, 
            error: orgError
          });

          if (orgError) {
            console.error('Error fetching organization:', orgError);
          } else if (orgData && orgData.length > 0) {
            organization.name = orgData[0].name;
          }
        } catch (error) {
          console.error('Exception in organization fetch:', error);
        }
      }

      // Return the agent data with organization
      const finalAgentData = {
        id: agentData.id,
        name: agentData.name,
        organization: organization
      };

      console.log('Final agent data:', finalAgentData);
      return finalAgentData;
    } catch (error) {
      console.error('Error in fetchAgent:', error);
      return null;
    }
  };

  // Initial agent fetch
  useEffect(() => {
    if (!agentId) return

    setIsLoading(true)
    console.log('Initial agent fetch for:', agentId)
    fetchAgent(agentId).then(agent => {
      console.log('Setting initial agent:', agent)
      setSelectedAgent(agent)
      setIsLoading(false)
    })
  }, [agentId])

  // Set up subscriptions
  useEffect(() => {
    if (!agentId) return
    console.log('Setting up subscriptions for agent:', agentId)

    // Subscribe to agent changes
    const agentSubscription = supabase
      .channel(`agent-${agentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agents',
          filter: `id=eq.${agentId}`
        },
        async (payload) => {
          console.log('Agent changed:', payload)
          const agent = await fetchAgent(agentId)
          console.log('Setting agent after change:', agent)
          setSelectedAgent(agent)
        }
      )
      .subscribe()

    // Subscribe to organization changes if we have an organization
    let orgSubscription: RealtimeChannel | null = null
    if (selectedAgent?.organization?.id) {
      console.log('Setting up organization subscription for:', selectedAgent.organization.id)
      orgSubscription = supabase
        .channel(`org-${selectedAgent.organization.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'organizations',
            filter: `id=eq.${selectedAgent.organization.id}`
          },
          async () => {
            console.log('Organization changed, refetching agent')
            const agent = await fetchAgent(agentId)
            console.log('Setting agent after org change:', agent)
            setSelectedAgent(agent)
          }
        )
        .subscribe()
    }

    return () => {
      console.log('Cleaning up subscriptions')
      agentSubscription.unsubscribe()
      if (orgSubscription) {
        orgSubscription.unsubscribe()
      }
    }
  }, [agentId, selectedAgent?.organization?.id])

  return (
    <AgentContext.Provider
      value={{
        selectedAgent,
        setSelectedAgent,
        isLoading,
        fetchAgent
      }}
    >
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent() {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error("useAgent must be used within an AgentProvider")
  }
  return context
}
