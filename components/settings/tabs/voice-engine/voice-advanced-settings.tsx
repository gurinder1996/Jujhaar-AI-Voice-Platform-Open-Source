"use client"

import { Label } from "@/components/ui/label"
import { SliderSetting } from "./slider-setting"
import { SwitchSetting } from "./switch-setting"
import { useParams } from "next/navigation"
import { useAgentField } from "@/hooks/use-agent-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const STYLE_OPTIONS = [
  { value: "0", label: "Default" },
  { value: "1", label: "Formal" },
  { value: "2", label: "Casual" },
  { value: "3", label: "Friendly" },
  { value: "4", label: "Professional" }
]

export function VoiceAdvancedSettings() {
  const { agentId } = useParams()

  const {
    value: style,
    error: styleError,
    isUpdating: styleUpdating,
    onChange: onStyleChange,
    onBlur: onStyleBlur
  } = useAgentField(
    agentId as string,
    ['voice_config', 'style'],
    'voice_config',
    '0'
  )

  return (
    <div className="space-y-6">
      <h4 className="font-medium">Voice Settings</h4>
      
      <SliderSetting 
        label="Stability"
        description="Controls the consistency and reliability of the voice output."
        fieldPath={['voice_config', 'stability']}
        min={0}
        max={1}
        step={0.1}
        defaultValue={0.5}
      />

      <SliderSetting 
        label="Similarity Boost"
        description="Enhances the similarity to the original voice."
        fieldPath={['voice_config', 'similarityBoost']}
        min={0}
        max={1}
        step={0.1}
        defaultValue={0.7}
      />

      <div className="space-y-2">
        <Label>Style</Label>
        <p className="text-sm text-muted-foreground">
          Choose the speaking style of the voice.
        </p>
        <Select 
          value={style} 
          onValueChange={(value) => {
            onStyleChange(value)
            onStyleBlur()
          }}
          disabled={styleUpdating}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            {STYLE_OPTIONS.map((styleOpt) => (
              <SelectItem key={styleOpt.value} value={styleOpt.value}>
                {styleOpt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {styleError && (
          <p className="text-sm text-destructive">{styleError}</p>
        )}
      </div>

      <SwitchSetting 
        label="Speaker Boost"
        description="Enhances the speaker's voice characteristics."
        fieldPath={['voice_config', 'useSpeakerBoost']}
      />

      <SwitchSetting 
        label="Optimize Streaming Latency"
        description="Reduces latency during voice streaming."
        fieldPath={['voice_config', 'optimizeStreamingLatency']}
      />

      <SwitchSetting 
        label="Enable SSML Parsing"
        description="Enables Speech Synthesis Markup Language for more control over voice output."
        fieldPath={['voice_config', 'enableSsmlParsing']}
      />
    </div>
  )
}
