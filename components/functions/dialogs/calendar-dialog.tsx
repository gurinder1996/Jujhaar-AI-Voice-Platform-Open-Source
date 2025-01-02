"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarClock } from "lucide-react"
import { useState } from "react"
import type { Function } from "@/lib/data/functions"

interface CalendarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: Partial<Function>) => void
  defaultValues?: Partial<Function>
  type: "check" | "book"
}

export function CalendarDialog({
  open,
  onOpenChange,
  onSave,
  defaultValues,
  type
}: CalendarDialogProps) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || (type === "check" ? "check_calendar_availability" : "book_appointment"),
    description: defaultValues?.description || (type === "check" 
      ? "When users ask for availability, check the calendar and provide available slots."
      : "When users ask to book an appointment, book it on the calendar."),
    config: {
      apiKey: defaultValues?.config?.apiKey || "",
      eventTypeId: defaultValues?.config?.eventTypeId || "",
      timezone: defaultValues?.config?.timezone || "America/Los_Angeles"
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
            <CalendarClock className="h-5 w-5" />
            {type === "check" ? "Check Calendar Availability" : "Book on the Calendar"} (Cal.com)
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
            <Label>API Key (Cal.com)</Label>
            <Input
              value={formData.config.apiKey}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                config: { ...prev.config, apiKey: e.target.value }
              }))}
              placeholder="Enter Cal.com API key"
            />
          </div>

          <div>
            <Label>Event Type ID (Cal.com)</Label>
            <Input
              value={formData.config.eventTypeId}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                config: { ...prev.config, eventTypeId: e.target.value }
              }))}
              placeholder="Enter Event Type ID"
            />
          </div>

          <div>
            <Label>Timezone (Optional)</Label>
            <Input
              value={formData.config.timezone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                config: { ...prev.config, timezone: e.target.value }
              }))}
              placeholder="America/Los_Angeles"
            />
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