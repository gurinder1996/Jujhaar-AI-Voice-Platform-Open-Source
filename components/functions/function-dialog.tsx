"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Wrench } from "lucide-react"
import { useState } from "react"
import type { Function } from "@/lib/data/functions"

interface FunctionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: Function) => void
  defaultValues?: Partial<Function>
  isNew?: boolean
}

export function FunctionDialog({
  open,
  onOpenChange,
  onSave,
  defaultValues,
  isNew = false
}: FunctionDialogProps) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    description: defaultValues?.description || "",
    config: {
      url: "",
      apiTimeout: 120000,
      parameters: "",
      speakDuring: false,
      speakAfter: true,
      ...defaultValues?.config
    }
  })

  const handleSave = () => {
    if (onSave) {
      onSave({
        id: defaultValues?.id || `custom_${Date.now()}`,
        name: formData.name,
        description: formData.description,
        icon: Wrench,
        enabled: true,
        isCustom: true,
        config: formData.config
      })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader className="sticky top-0 z-10 bg-background pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Custom Function
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 pb-4">
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Enter the name of the custom function"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Enter the description of the custom function"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <Label>Your URL</Label>
            <Input
              placeholder="Enter the URL of the custom function"
              value={formData.config.url}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                config: { ...prev.config, url: e.target.value }
              }))}
            />
          </div>

          <div>
            <Label>API Timeout (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={formData.config.apiTimeout}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, apiTimeout: parseInt(e.target.value) }
                }))}
              />
              <span className="text-sm text-muted-foreground">milliseconds</span>
            </div>
          </div>

          <div>
            <Label>Parameters (Optional)</Label>
            <p className="mb-2 text-sm text-muted-foreground">
              JSON schema that defines the format in which the LLM will return. Please refer to the docs.
            </p>
            <div className="space-y-2">
              <Textarea
                className="min-h-[200px] bg-slate-950 font-mono text-white"
                placeholder="Enter JSON Schema here..."
                value={formData.config.parameters}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, parameters: e.target.value }
                }))}
              />
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">example 1</Button>
                <Button variant="secondary" size="sm">example 2</Button>
                <Button variant="secondary" size="sm">example 3</Button>
              </div>
              <Button variant="secondary" className="w-full">
                Format JSON
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="speakDuring"
                checked={formData.config.speakDuring}
                onCheckedChange={(checked) => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, speakDuring: checked as boolean }
                }))}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="speakDuring"
                  className="text-sm font-medium leading-none"
                >
                  Speak During Execution
                </label>
                <p className="text-sm text-muted-foreground">
                  If the function takes over 2 seconds, the agent can say something like "Let me check that for you."
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="speakAfter"
                checked={formData.config.speakAfter}
                onCheckedChange={(checked) => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, speakAfter: checked as boolean }
                }))}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="speakAfter"
                  className="text-sm font-medium leading-none"
                >
                  Speak After Execution
                </label>
                <p className="text-sm text-muted-foreground">
                  Unselect if you want to run the function silently, such as uploading the call result to the server silently.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex justify-end gap-2 border-t bg-background pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-black text-white hover:bg-black/90">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}