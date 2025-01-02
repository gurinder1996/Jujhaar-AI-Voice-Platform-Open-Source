"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Phone } from "lucide-react"
import { useState } from "react"
import type { Function } from "@/lib/data/functions"

interface TransferCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: Partial<Function>) => void
  defaultValues?: Partial<Function>
}

export function TransferCallDialog({
  open,
  onOpenChange,
  onSave,
  defaultValues
}: TransferCallDialogProps) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "transfer_call",
    description: defaultValues?.description || "When user is angry or requests a human agent, transfer the call to a human.",
    config: {
      transferTo: defaultValues?.config?.transferTo || "",
      transferType: defaultValues?.config?.transferType || "cold",
      displayedNumber: defaultValues?.config?.displayedNumber || "retell",
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
            <Phone className="h-5 w-5" />
            Transfer Call
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
            <Label>Transfer to</Label>
            <Input
              value={formData.config.transferTo}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                config: { ...prev.config, transferTo: e.target.value }
              }))}
              placeholder="+14154154155"
            />
          </div>

          <div>
            <Label>Type</Label>
            <RadioGroup
              value={formData.config.transferType}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                config: { ...prev.config, transferType: value as "cold" | "warm" }
              }))}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="cold" id="cold" />
                <Label htmlFor="cold" className="flex-1">
                  <div className="font-medium">Cold Transfer</div>
                  <div className="text-sm text-muted-foreground">
                    AI transfers the call to the next agent without a debrief.
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="warm" id="warm" />
                <Label htmlFor="warm" className="flex-1">
                  <div className="font-medium">Warm Transfer</div>
                  <div className="text-sm text-muted-foreground">
                    AI provides a debrief to the next agent after transferring the call.
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Displayed Phone Number</Label>
            <RadioGroup
              value={formData.config.displayedNumber}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                config: { ...prev.config, displayedNumber: value as "retell" | "transferee" }
              }))}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="retell" id="retell" />
                <Label htmlFor="retell" className="flex-1">
                  <div className="font-medium">Retell Agent&apos;s Number</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="transferee" id="transferee" />
                <Label htmlFor="transferee" className="flex-1">
                  <div className="font-medium">Transferee&apos;s Number</div>
                  <div className="text-sm text-muted-foreground">
                    If you are using custom telephony, enable SIP REFER and PSTN transfer.
                  </div>
                </Label>
              </div>
            </RadioGroup>
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