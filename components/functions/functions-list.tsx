"use client"

import { useState } from "react"
import { Function, defaultFunctions } from "@/lib/data/functions"
import { FunctionCard } from "./function-card"
import { Wrench } from "lucide-react"

interface FunctionsListProps {
  customFunctions: Function[]
}

export function FunctionsList({ customFunctions }: FunctionsListProps) {
  const [functions, setFunctions] = useState<Function[]>(defaultFunctions)

  const handleToggle = (id: string) => {
    setFunctions(prev =>
      prev.map(func =>
        func.id === id ? { ...func, enabled: !func.enabled } : func
      )
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {functions.map((func) => (
        <FunctionCard
          key={func.id}
          {...func}
          onToggle={() => handleToggle(func.id)}
        />
      ))}
      {customFunctions.map((func) => (
        <FunctionCard
          key={func.id}
          {...func}
          icon={Wrench}
          isCustom={true}
        />
      ))}
    </div>
  )
}