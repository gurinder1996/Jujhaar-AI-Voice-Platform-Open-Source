"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const providers = [
  "deepgram",
  "talkscriber",
  "gladia",
  "assembly-ai",
  "azure"
]

const languages = [
  { code: "en", name: "English" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "da-DK", name: "Danish (Denmark)" },
  { code: "de", name: "German" },
  { code: "de-CH", name: "German (Switzerland)" },
  { code: "el", name: "Greek" },
  { code: "en-AU", name: "English (Australia)" }
]

const models = [
  { id: "nova-2", name: "Nova 2" },
  { id: "nova-2-phonecall", name: "Nova 2 Phonecall" },
  { id: "nova-2-finance", name: "Nova 2 Finance" },
  { id: "nova-2-conversational-ai", name: "Nova 2 Conversational AI" },
  { id: "nova-2-voicemail", name: "Nova 2 Voicemail" },
  { id: "nova-2-video", name: "Nova 2 Video" },
  { id: "nova-2-medical", name: "Nova 2 Medical" },
  { id: "nova-2-drive-thru", name: "Nova 2 Drive Thru" },
  { id: "nova-2-automotive", name: "Nova 2 Automotive" }
]

export function TranscriberSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Transcription</h3>
        <p className="text-sm text-muted-foreground">
          This section allows you to configure the transcription settings for the assistant.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Provider</Label>
          <Select defaultValue="deepgram">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Pro tip: If you want to support both English and Spanish, you can set the language to multi and use ElevenLabs Turbo 2.5 in the Voice tab.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Model</Label>
        <Select defaultValue="nova-2">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Background Denoising Enabled</Label>
          <p className="text-sm text-muted-foreground">
            Filter background noise while the user is talking.
          </p>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  )
}