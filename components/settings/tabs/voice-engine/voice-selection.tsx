"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

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
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Provider</Label>
        <Select defaultValue="11Labs">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {providers.map((provider) => (
              <SelectItem key={provider} value={provider}>
                {provider}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Voice</Label>
        <Select defaultValue="Sarah">
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

      <div className="space-y-2">
        <Label>Model</Label>
        <p className="text-sm text-muted-foreground">
          This is the model that will be used.
        </p>
        <Select defaultValue="eleven-flash-v2">
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
      </div>
    </div>
  )
}