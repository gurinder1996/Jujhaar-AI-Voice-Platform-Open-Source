"use client"

import { FunctionsList } from "@/components/functions/functions-list"
import { FunctionDialog } from "@/components/functions/function-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Function } from "@/lib/data/functions"

export default function FunctionsPage() {
  const [open, setOpen] = useState(false)
  const [customFunctions, setCustomFunctions] = useState<Function[]>([])

  const handleSave = (functionData: Function) => {
    setCustomFunctions(prev => [...prev, {
      ...functionData,
      id: `custom_${Date.now()}`,
      enabled: true,
      isCustom: true
    }])
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Functions</h2>
          <p className="text-sm text-muted-foreground">
            Add custom functions to enhance your voice agent&apos;s capabilities.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2 bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" />
          Add Function
        </Button>
      </div>

      <FunctionsList customFunctions={customFunctions} />
      
      <FunctionDialog 
        open={open} 
        onOpenChange={setOpen}
        onSave={handleSave}
        isNew={true}
      />
    </div>
  )
}