"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Info } from "lucide-react"
import { useParams } from "next/navigation"
import { useAgentField } from "@/hooks/use-agent-field"

interface SwitchSettingProps {
  label: string
  description: string
  showInfo?: boolean
  fieldPath: string[]
}

export function SwitchSetting({ 
  label, 
  description, 
  showInfo,
  fieldPath
}: SwitchSettingProps) {
  const { agentId } = useParams()
  
  const {
    value,
    error,
    onChange,
    onBlur
  } = useAgentField(
    agentId as string,
    fieldPath,
    'voice_config',
    false
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>{label}</Label>
          {showInfo && <Info className="h-4 w-4 text-muted-foreground" />}
        </div>
        <Switch 
          checked={value} 
          onCheckedChange={(checked) => {
            onChange(checked)
            onBlur()
          }}
        />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}