"use client"

import { useState } from "react"
import { Plus, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface NewAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAgentCreated?: () => void
}

export function NewAgentDialog({
  open,
  onOpenChange,
  onAgentCreated,
}: NewAgentDialogProps) {
  const [name, setName] = useState("")
  const [organization, setOrganization] = useState("")

  const handleCreate = async () => {
    // TODO: Implement agent creation logic
    onOpenChange(false)
    if (onAgentCreated) {
      onAgentCreated()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New Agent
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-accent">
              <div className="rounded-full bg-blue-100 p-2">
                <Plus className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-sm font-medium">Create</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-accent">
              <div className="rounded-full bg-green-100 p-2">
                <Copy className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-sm font-medium">Duplicate</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input 
                placeholder="Agent name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Organization</label>
              <Select value={organization} onValueChange={setOrganization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="org1">Organization 1</SelectItem>
                  <SelectItem value="org2">Organization 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleCreate}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
