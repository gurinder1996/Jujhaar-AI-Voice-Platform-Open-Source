"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useParams } from "next/navigation"
import { useAgentField } from "@/hooks/use-agent-field"

interface SliderSettingProps {
  label: string
  description: string
  fieldPath: string[]
}

export function SliderSetting({ 
  label, 
  description,
  fieldPath
}: SliderSettingProps) {
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
    0.5
  )

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
      <Slider 
        value={[value]} 
        onValueChange={([newValue]) => onChange(newValue)}
        onValueCommit={onBlur}
        min={0} 
        max={1} 
        step={0.1} 
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}