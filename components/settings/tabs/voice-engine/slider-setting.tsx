"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface SliderSettingProps {
  label: string
  value: number
  description?: string
  min?: number
  max?: number
  step?: number
}

export function SliderSetting({ 
  label, 
  value, 
  description, 
  min = 0, 
  max = 1, 
  step = 0.1 
}: SliderSettingProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-sm">{value}</span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <Slider defaultValue={[value]} min={min} max={max} step={step} />
    </div>
  )
}