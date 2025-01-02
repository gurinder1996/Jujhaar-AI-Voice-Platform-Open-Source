"use client"

import { Button } from "@/components/ui/button"
import { BackgroundSound } from "./voice-engine/background-sound"
import { SliderSetting } from "./voice-engine/slider-setting"
import { SwitchSetting } from "./voice-engine/switch-setting"
import { ReminderFrequency } from "./voice-engine/reminder-frequency"
import { Pronunciation } from "./voice-engine/pronunciation"
import { VoiceSelection } from "./voice-engine/voice-selection"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function VoiceEngineSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Voice Engine Settings</h3>
      
      <div className="space-y-6">
        <VoiceSelection />
        
        <BackgroundSound />

        <SliderSetting 
          label="Responsiveness"
          value={1}
          description="Control how fast the agent responds after users finish speaking."
        />

        <SliderSetting 
          label="Interruption Sensitivity"
          value={0.8}
          description="Control how sensitively AI can be interrupted by human speech."
        />

        <SwitchSetting 
          label="Enable Backchanneling"
          description="Enables the agent to use affirmations like 'yeah' or 'uh-huh' during conversations, indicating active listening and engagement."
        />

        <div className="space-y-2">
          <Label>Boosted Keywords</Label>
          <p className="text-sm text-muted-foreground">
            Provide a customized list of keywords to expand our model's vocabulary.
          </p>
          <Input placeholder="Split by comma. Example: Retail,Walmart" />
        </div>

        <SwitchSetting 
          label="Enable Speech Normalization"
          description="It converts text elements like numbers, currency, and dates into human-like spoken forms."
          showInfo
        />

        <SwitchSetting 
          label="Disable Transcript Formatting"
          description="Prevent agent errors like phone numbers being formatted as timestamps."
        />

        <ReminderFrequency />

        <Pronunciation />
      </div>

      <Button className="bg-primary text-primary-foreground">Save Changes</Button>
    </div>
  )
}