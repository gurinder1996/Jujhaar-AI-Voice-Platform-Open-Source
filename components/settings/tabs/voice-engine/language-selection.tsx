"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAgentField } from "@/hooks/use-agent-field"
import { useParams } from "next/navigation"

const LANGUAGES = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish (Spain)" },
  { value: "fr-FR", label: "French (France)" },
  { value: "de-DE", label: "German (Germany)" },
  { value: "it-IT", label: "Italian (Italy)" },
  { value: "pt-BR", label: "Portuguese (Brazil)" },
  { value: "hi-IN", label: "Hindi (India)" },
  { value: "ja-JP", label: "Japanese (Japan)" },
  { value: "ko-KR", label: "Korean (South Korea)" }
]

export function LanguageSelection() {
  const { agentId } = useParams()

  const {
    value: language,
    error,
    isUpdating,
    onChange,
    onBlur
  } = useAgentField(
    agentId as string,
    ['voice_config', 'language'],
    'voice_config',
    'en-US'
  )

  return (
    <div className="space-y-2">
      <Label>Language</Label>
      <p className="text-sm text-muted-foreground">
        Select the language for the agent's voice.
      </p>
      <Select 
        value={language} 
        onValueChange={(value) => {
          onChange(value)
          onBlur()
        }}
        disabled={isUpdating}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
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
