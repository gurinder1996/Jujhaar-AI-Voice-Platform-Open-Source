"use client"

import { VoiceEngineSettings } from "./voice-engine-settings"
import { NotificationSettings } from "./notification-settings"
import { AdvancedSettings } from "./advanced-settings"
import { GeneralSettings } from "../general-settings"
import { TranscriberSettings } from "./transcriber-settings"

interface SettingsTabContentProps {
  activeTab: string
}

export function SettingsTabContent({ activeTab }: SettingsTabContentProps) {
  switch (activeTab) {
    case "voice":
      return <VoiceEngineSettings />
    case "notifications":
      return <NotificationSettings />
    case "advanced":
      return <AdvancedSettings />
    case "transcriber":
      return <TranscriberSettings />
    default:
      return <GeneralSettings />
  }
}