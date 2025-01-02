"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { LucideIcon } from "lucide-react"
import { useState } from "react"
import { FunctionDialog } from "./function-dialog"
import { TransferCallDialog } from "./dialogs/transfer-call-dialog"
import { CalendarDialog } from "./dialogs/calendar-dialog"
import { PressDigitDialog } from "./dialogs/press-digit-dialog"
import type { Function } from "@/lib/data/functions"

interface FunctionCardProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  enabled: boolean
  onToggle?: () => void
  isCustom?: boolean
}

export function FunctionCard({
  id,
  name,
  description,
  icon: Icon,
  enabled,
  onToggle,
  isCustom
}: FunctionCardProps) {
  const [open, setOpen] = useState(false)

  const renderDialog = () => {
    const defaultValues = { id, name, description, enabled, isCustom }

    if (isCustom) {
      return (
        <FunctionDialog 
          open={open} 
          onOpenChange={setOpen}
          defaultValues={defaultValues}
        />
      )
    }

    switch (id) {
      case "call_transfer":
        return (
          <TransferCallDialog
            open={open}
            onOpenChange={setOpen}
            defaultValues={defaultValues}
          />
        )
      case "check_calendar_availability":
        return (
          <CalendarDialog
            open={open}
            onOpenChange={setOpen}
            defaultValues={defaultValues}
            type="check"
          />
        )
      case "book_appointment":
        return (
          <CalendarDialog
            open={open}
            onOpenChange={setOpen}
            defaultValues={defaultValues}
            type="book"
          />
        )
      case "press_digit":
        return (
          <PressDigitDialog
            open={open}
            onOpenChange={setOpen}
            defaultValues={defaultValues}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Card className="flex flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onToggle}
            aria-label={`Toggle ${name}`}
          />
        </div>
        <Button
          variant="outline"
          className="mt-auto w-full"
          onClick={() => setOpen(true)}
        >
          Configure
        </Button>
      </Card>
      {renderDialog()}
    </>
  )
}