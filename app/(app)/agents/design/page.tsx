"use client"

import { useState } from "react"
import { AIGreeting } from "@/components/agent-design/ai-greeting"
import { PersonalityGuidelines } from "@/components/agent-design/personality-guidelines"
import { FrequentlyAskedQuestions } from "@/components/agent-design/frequently-asked-questions"
import { TabButton } from "@/components/agent-design/tabs/tab-button"

export default function AgentDesignPage() {
  const [activeTab, setActiveTab] = useState<"personality" | "faq">("personality")

  return (
    <div className="space-y-8">
      <AIGreeting />
      
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
          <PersonalityGuidelines />
        ) : (
          <FrequentlyAskedQuestions />
        )}
      </div>
    </div>
  )
}