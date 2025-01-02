"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Grid3X3 } from "lucide-react"
import { useState } from "react"
import type { Function } from "@/lib/data/functions"

interface PressDigitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: Partial<Function>) => void
  defaultValues?: Partial<Function>
}

export function PressDigitDialog({
  open,
  onOpenChange,
  onSave,
  defaultValues
}: PressDigitDialogProps) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "press_digit",
    description: defaultValues?.description || "Navigate to the human agent of sales department",
    config: {
      pauseDetectionDelay: defaultValues?.config?.pauseDetectionDelay || 1000
    }
  })

  const handleSave = () => {
    if (onSave) {
      onSave(formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5" />
            Press Digit (IVR Navigation)
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div>
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label>Description (Optional)</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <Label>Pause Detection Delay (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={formData.config.pauseDetectionDelay}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, pauseDetectionDelay: parseInt(e.target.value) }
                }))}
              />
              <span className="text-sm text-muted-foreground">milliseconds</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}