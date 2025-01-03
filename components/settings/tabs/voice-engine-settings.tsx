"use client"

import { Button } from "@/components/ui/button"
import { BackgroundSound } from "./voice-engine/background-sound"
import { SliderSetting } from "./voice-engine/slider-setting"
import { SwitchSetting } from "./voice-engine/switch-setting"
import { ReminderFrequency } from "./voice-engine/reminder-frequency"
import { Pronunciation } from "./voice-engine/pronunciation"
import { VoiceSelection } from "./voice-engine/voice-selection"
import { LanguageSelection } from "./voice-engine/language-selection"
import { VoiceAdvancedSettings } from "./voice-engine/voice-advanced-settings"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"
import { useAgentField } from "@/hooks/use-agent-field"

export function VoiceEngineSettings() {
  const { agentId } = useParams()
  
  const {
    value: boostedKeywords,
    error: keywordsError,
    onChange: onKeywordsChange,
    onBlur: onKeywordsBlur
  } = useAgentField(
    agentId as string,
    ['voice_config', 'boostedKeywords'],
    'voice_config',
    []
  )

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Voice Engine Settings</h3>
      
      <div className="space-y-6">
        <VoiceSelection />
        
        <LanguageSelection />

        <VoiceAdvancedSettings />
        
        <BackgroundSound />

        <SliderSetting 
          label="Responsiveness"
          description="Control how fast the agent responds after users finish speaking."
          fieldPath={['voice_config', 'responsiveness']}
        />

        <SliderSetting 
          label="Interruption Sensitivity"
          description="Control how sensitively AI can be interrupted by human speech."
          fieldPath={['voice_config', 'interruptionSensitivity']}
        />

        <SwitchSetting 
          label="Enable Backchanneling"
          description="Enables the agent to use affirmations like 'yeah' or 'uh-huh' during conversations, indicating active listening and engagement."
          fieldPath={['voice_config', 'backchanneling']}
        />

        <div className="space-y-2">
          <Label>Boosted Keywords</Label>
          <p className="text-sm text-muted-foreground">
            Provide a customized list of keywords to expand our model's vocabulary.
          </p>
          <Input 
            placeholder="Split by comma. Example: Retail,Walmart" 
            value={boostedKeywords.join(',')}
            onChange={(e) => onKeywordsChange(e.target.value.split(','))}
            onBlur={onKeywordsBlur}
          />
          {keywordsError && (
            <p className="text-sm text-destructive">{keywordsError}</p>
          )}
        </div>

        <SwitchSetting 
          label="Enable Speech Normalization"
          description="It converts text elements like numbers, currency, and dates into human-like spoken forms."
          showInfo
          fieldPath={['voice_config', 'speechNormalization']}
        />

        <SwitchSetting 
          label="Disable Transcript Formatting"
          description="Prevent agent errors like phone numbers being formatted as timestamps."
          fieldPath={['voice_config', 'disableTranscriptFormatting']}
        />

        <ReminderFrequency />

        <Pronunciation />
      </div>

      <Button className="bg-primary text-primary-foreground">Save Changes</Button>
    </div>
  )
}