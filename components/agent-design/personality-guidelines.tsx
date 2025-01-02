"use client"

import { Card } from "@/components/ui/card"
import { AgentGuidelines } from "./sections/agent-guidelines"
import { PersonalitySettings } from "./sections/personality-settings"
import { HumanizeSettings } from "./sections/humanize-settings"

export function PersonalityGuidelines() {
  return (
    <Card className="space-y-8 p-6">
      <AgentGuidelines />
      <PersonalitySettings />
      <HumanizeSettings />
    </Card>
  )
}