"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LLMModelSelection } from "./general/llm-model-selection"

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">General Settings</h3>
      
      <div className="space-y-6">
        <LLMModelSelection />

        <div className="space-y-2">
          <Label>Time Zone</Label>
          <Input />
        </div>

        <div className="space-y-2">
          <Label>Max Call Duration</Label>
          <p className="text-sm text-muted-foreground">
            The maximum time a customer can remain on a call with Phonely. Default is 20 mins.
          </p>
          <div className="flex items-center gap-4">
            <Slider
              defaultValue={[20]}
              max={60}
              step={1}
              className="flex-1"
            />
            <div className="w-12 text-sm">20m</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Silence Detection</Label>
            <p className="text-sm text-muted-foreground">
              Configure how the agent handles prolonged silence during calls.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>Silence Timeout</Label>
                <div className="text-sm">30s</div>
              </div>
              <Slider
                defaultValue={[30]}
                max={45}
                step={1}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>Max Retries</Label>
                <div className="text-sm">3</div>
              </div>
              <Slider
                defaultValue={[3]}
                max={5}
                step={1}
              />
            </div>

            <div>
              <Label>Silence Message</Label>
              <Textarea
                className="mt-2"
                placeholder="Hello, are you still there?"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Spam Call Detection</Label>
            <p className="text-sm text-muted-foreground">
              When enabled this automatically detects and auto hangs up on spam calls/robocalls.
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Call Recordings</Label>
            <p className="text-sm text-muted-foreground">
              When disabled, no call recording will be available. Transcripts will still be enabled.
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>HIPAA Compliant</Label>
            <p className="text-sm text-muted-foreground">
              When enabled, no call recordings, call logs, or transcripts will be recorded. Only enable for sensitive industries.
            </p>
          </div>
          <Switch />
        </div>
      </div>

      <Button className="bg-primary text-primary-foreground">Save Changes</Button>
    </div>
  )
}