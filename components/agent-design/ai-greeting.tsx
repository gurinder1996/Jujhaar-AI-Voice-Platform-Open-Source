"use client"

import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Shield } from "lucide-react"
import { useParams } from "next/navigation"
import { useAgentField } from "@/hooks/use-agent-field"
import { useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function AIGreeting() {
  const { agentId } = useParams()
  const supabase = createClientComponentClient()
  
  const {
    value: greeting,
    error,
    isUpdating,
    onChange,
    onBlur,
    setValue
  } = useAgentField(
    agentId as string,
    ['greeting'],
    'greeting',
    ''
  )

  // Fetch initial greeting value
  useEffect(() => {
    async function fetchGreeting() {
      if (!agentId) return
      
      const { data, error } = await supabase
        .from('agents')
        .select('greeting')
        .eq('id', agentId)
        .single()
      
      if (data?.greeting) {
        setValue(data.greeting)
      }
    }
    
    fetchGreeting()
  }, [agentId, supabase, setValue])

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-medium">AI Greeting</h2>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">
        The first message Phonely will say when answering the phone.
      </p>
      <div className="space-y-2">
        <div className="text-sm font-medium">Greeting Message</div>
        <div className="relative">
          <Textarea
            value={greeting}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder="Thank you for calling! How can I help you today?"
            className="min-h-[100px] resize-none pr-24"
            disabled={isUpdating}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-block h-4 w-4">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 14.66a2.67 2.67 0 1 1 0-5.34 2.67 2.67 0 0 1 0 5.34Z" />
              </svg>
            </span>
            Scarlett (English)
          </div>
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    </Card>
  )
}