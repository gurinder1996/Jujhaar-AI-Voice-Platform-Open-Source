"use client"

import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AdvancedSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Advanced Settings</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Custom Voice Clone</label>
            <Badge variant="secondary" className="text-xs">Enterprise</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Create a custom voice or clone any voice. Only available on an enterprise plan.
          </p>
          <Select defaultValue="disabled">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disabled">Disabled</SelectItem>
              <SelectItem value="enabled">Enabled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Voice LLM Model</label>
            <Badge variant="secondary" className="text-xs">Enterprise</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Let Phonely build a custom voice language model specifically for your business. Enterprise plan only.
          </p>
          <Select defaultValue="gpt">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt">GPT-4x (Recommended)</SelectItem>
              <SelectItem value="other">Other Models</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Number of words to interrupt</label>
          <p className="text-sm text-muted-foreground">
            Number of words that Phonely will wait before interrupting assistant. Words like 'stop', 'actually', 'no', etc. will always interrupt immediately regardless of this value. Defaults to 2 words.
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <Slider
                defaultValue={[2]}
                min={1}
                max={15}
                step={1}
                className="flex-1"
              />
              <div className="w-16 text-sm">Words: 2</div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1 word</span>
              <span>15 words</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Response Delay</label>
          <p className="text-sm text-muted-foreground">
            A forced delay before the AI starts talking back to the user. Operates in parallel with server latency. Default is 0.4 seconds.
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <Slider
                defaultValue={[0.4]}
                min={0.1}
                max={1}
                step={0.1}
                className="flex-1"
              />
              <div className="w-24 text-sm">Seconds: 0.4</div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0.1 seconds</span>
              <span>1 second</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Interruption Delay</label>
          <p className="text-sm text-muted-foreground">
            The time after an interruption is detected before the assistant resumes.
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <Slider
                defaultValue={[2]}
                min={0}
                max={5}
                step={0.1}
                className="flex-1"
              />
              <div className="w-24 text-sm">Seconds: 2</div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 sec</span>
              <span>5 sec</span>
            </div>
          </div>
        </div>
      </div>

      <Button className="bg-primary text-primary-foreground">Save Changes</Button>
    </div>
  )
}