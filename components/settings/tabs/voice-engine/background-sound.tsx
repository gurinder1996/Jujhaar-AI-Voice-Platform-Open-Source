"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useParams } from "next/navigation"
import { useAgentField } from "@/hooks/use-agent-field"

const backgroundSounds = [
  { value: "none", label: "None" },
  { value: "office", label: "Office Ambience" },
  { value: "cafe", label: "Café" },
  { value: "nature", label: "Nature Sounds" },
  { value: "white-noise", label: "White Noise" }
]

export function BackgroundSound() {
  const { agentId } = useParams()
  
  const {
    value,
    error,
    onChange,
    onBlur
  } = useAgentField(
    agentId as string,
    ['call_config', 'backgroundSound'],
    'call_config',
    'none'
  )

  return (
    <div className="space-y-2">
      <Label>Background Sound</Label>
      <p className="text-sm text-muted-foreground">
        Add ambient background noise to make the conversation feel more natural.
      </p>
      <Select 
        value={value}
        onValueChange={(newValue) => {
          onChange(newValue)
          onBlur()
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {backgroundSounds.map((sound) => (
            <SelectItem key={sound.value} value={sound.value}>
              {sound.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}