"use client"

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { agentsData } from "@/lib/data/agents"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AgentsList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Agent Type</TableHead>
            <TableHead>Voice</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Edited by</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agentsData.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8" />
                  {agent.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {agent.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6" />
                  {agent.voice}
                </div>
              </TableCell>
              <TableCell>{agent.phone || "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{agent.editedAt}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}