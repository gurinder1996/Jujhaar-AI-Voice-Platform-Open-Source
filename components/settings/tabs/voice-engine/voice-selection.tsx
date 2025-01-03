"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useParams } from "next/navigation"
import { useAgentField } from "@/hooks/use-agent-field"

const providers = [
  "Cartesia",
  "11Labs",
  "Rime-AI", 
  "Play.ht",
  "lmnt",
  "Deepgram",
  "OpenAI",
  "Azure",
  "Neets",
  "Tavus"
]

const voices = [
  { name: "Sarah", description: "Professional female voice" },
  { name: "Theron", description: "Authentic, friendly, sharp", gender: "male" },
  { name: "Pablo", description: "Warm Spanish accent" },
  { name: "Fanni2", description: "Clear and articulate" },
  { name: "Marko", description: "German Male Deep Voice", gender: "male" },
  { name: "Rachel", description: "Natural conversational tone" },
  { name: "Alex", description: "Energetic and engaging" },
  { name: "Emma", description: "British accent, professional" }
]

const models = [
  {
    name: "Eleven Flash V2",
    description: "Our Newest Model, Flash, Generates Speech In ~75ms (Excluding Network/Application Latency)."
  },
  {
    name: "Eleven Multilingual V2",
    description: "Our State Of The Art Multilingual Speech Synthesis Model, Able To Generate Life-Like Speech In 29 Languages."
  },
  {
    name: "Eleven Turbo V2",
    description: "Our Cutting-Edge Turbo Model Is Ideally Suited For Tasks Demanding Extremely Low Latency."
  },
  {
    name: "Eleven Turbo V2.5",
    description: ""
  },
  {
    name: "Eleven Flash V2.5",
    description: ""
  },
  {
    name: "Eleven English V1",
    description: "Use Our Standard English Language Model To Generate Speech In A Variety Of Voices, Styles And Moods."
  }
]

export function VoiceSelection() {
  const { agentId } = useParams()
  
  const {
    value: provider,
    error: providerError,
    onChange: onProviderChange,
    onBlur: onProviderBlur
  } = useAgentField(
    agentId as string,
    ['voice_config', 'provider'],
    'voice_config',
    '11Labs'
  )

  const {
    value: voiceId,
    error: voiceError,
    onChange: onVoiceChange,
    onBlur: onVoiceBlur
  } = useAgentField(
    agentId as string,
    ['voice_config', 'voiceId'],
    'voice_config',
    'Sarah'
  )

  const {
    value: model,
    error: modelError,
    onChange: onModelChange,
    onBlur: onModelBlur
  } = useAgentField(
    agentId as string,
    ['voice_config', 'model'],
    'voice_config',
    'eleven-flash-v2'
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Provider</Label>
        <Select 
          value={provider} 
          onValueChange={(value) => {
            onProviderChange(value)
            onProviderBlur()
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {providers.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {providerError && (
          <p className="text-sm text-destructive">{providerError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Voice</Label>
        <Select 
          value={voiceId}
          onValueChange={(value) => {
            onVoiceChange(value)
            onVoiceBlur()
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <div className="flex items-center border-b px-3 pb-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search voice..."
                className="h-8 w-full border-none bg-transparent p-0 focus-visible:ring-0"
              />
            </div>
            {voices.map((voice) => (
              <SelectItem key={voice.name} value={voice.name}>
                <div className="flex flex-col">
                  <span>{voice.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {voice.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {voiceError && (
          <p className="text-sm text-destructive">{voiceError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Model</Label>
        <p className="text-sm text-muted-foreground">
          This is the model that will be used.
        </p>
        <Select 
          value={model}
          onValueChange={(value) => {
            onModelChange(value)
            onModelBlur()
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover max-h-[300px]">
            {models.map((model) => (
              <SelectItem 
                key={model.name} 
                value={model.name.toLowerCase().replace(/\s+/g, '-')}
              >
                <div className="flex flex-col py-1">
                  <span>{model.name}</span>
                  {model.description && (
                    <span className="text-xs text-muted-foreground">
                      {model.description}
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {modelError && (
          <p className="text-sm text-destructive">{modelError}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="manual-voice" />
        <label
          htmlFor="manual-voice"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Add Voice ID Manually
        </label>
      </div>
    </div>
  )
}