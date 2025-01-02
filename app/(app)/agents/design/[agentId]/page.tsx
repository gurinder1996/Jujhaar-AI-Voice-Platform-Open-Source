"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useParams } from "next/navigation"
import { AIGreeting } from "@/components/agent-design/ai-greeting"
import { PersonalityGuidelines } from "@/components/agent-design/personality-guidelines"
import { FrequentlyAskedQuestions } from "@/components/agent-design/frequently-asked-questions"
import { TabButton } from "@/components/agent-design/tabs/tab-button"

export default function AgentDesignPage() {
  const params = useParams()
  const agentId = params.agentId as string
  const [activeTab, setActiveTab] = useState<"personality" | "faq">("personality")
  const [agent, setAgent] = useState(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchAgent = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", agentId)
        .single()

      if (data) {
        setAgent(data)
      }
    }

    if (agentId) {
      fetchAgent()
    }
  }, [agentId])

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel(`agent_${agentId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "agents",
          filter: `id=eq.${agentId}`,
        },
        (payload) => {
          setAgent(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [agentId])

  return (
    <div className="space-y-8">
      <AIGreeting agent={agent} />
      
      <div>
        <div className="mb-6 border-b">
          <div className="flex space-x-8">
            <TabButton
              active={activeTab === "personality"}
              onClick={() => setActiveTab("personality")}
            >
              Personality and Guidelines
            </TabButton>
            <TabButton
              active={activeTab === "faq"}
              onClick={() => setActiveTab("faq")}
            >
              Frequently Asked Questions
            </TabButton>
          </div>
        </div>

        {activeTab === "personality" ? (
          <PersonalityGuidelines agent={agent} />
        ) : (
          <FrequentlyAskedQuestions agent={agent} />
        )}
      </div>
    </div>
  )
}
