"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Info } from "lucide-react"

interface SwitchSettingProps {
  label: string
  description: string
  showInfo?: boolean
}

export function SwitchSetting({ label, description, showInfo }: SwitchSettingProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>{label}</Label>
          {showInfo && <Info className="h-4 w-4 text-muted-foreground" />}
        </div>
        <Switch />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}