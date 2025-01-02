"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { AgentInfo } from "./agent-info"
import { OrganizationInfo } from "./organization-info"
import { SettingsTabs } from "./settings-tabs"
import { SettingsTabContent } from "./tabs/settings-tab-content"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <AgentInfo />
      </Card>

      <Card className="p-6">
        <OrganizationInfo />
      </Card>

      <Card className="space-y-6 p-6">
        <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />
        <SettingsTabContent activeTab={activeTab} />
      </Card>
    </div>
  )
}