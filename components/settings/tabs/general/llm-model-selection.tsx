"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"

const providers = [
  "vapi",
  "openai",
  "together-ai",
  "anyscale",
  "openrouter",
  "perplexity-ai",
  "deepinfra",
  "groq",
  "anthropic",
  "google",
  "xai"
]

const models = [
  {
    name: "GPT 4o Cluster",
    latency: "450ms",
    cost: "$0.03",
    tags: ["Fastest", "Cheapest"]
  },
  {
    name: "GPT 4o Mini Cluster",
    latency: "300ms",
    cost: "$0.01",
    tags: ["Fastest", "Cheapest"]
  },
  {
    name: "GPT 3.5 Turbo Cluster",
    latency: "250ms",
    cost: "$0.01"
  },
  {
    name: "GPT 4 Turbo Cluster",
    latency: "800ms",
    cost: "$0.11"
  },
  {
    name: "GPT α1 Cluster",
    latency: "7000ms",
    cost: "$0.16"
  },
  {
    name: "GPT α1 Mini Cluster",
    latency: "5000ms",
    cost: "$0.08"
  }
]

export function LLMModelSelection() {
  return (
    <div className="space-y-4">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Provider</Label>
          <Select defaultValue="openai">
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider} value={provider} className="cursor-pointer">
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label className="text-sm text-muted-foreground">Model</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Select defaultValue="gpt-4o">
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem 
                  key={model.name} 
                  value={model.name.toLowerCase().replace(/\s+/g, '-')}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col py-1">
                    <div className="flex items-center gap-2">
                      <span>{model.name}</span>
                      {model.tags?.map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ⏱ {model.latency} • 💰 {model.cost}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}