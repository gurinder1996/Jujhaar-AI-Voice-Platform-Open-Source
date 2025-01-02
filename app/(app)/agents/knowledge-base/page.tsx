"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, Search } from "lucide-react"

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-medium">Data Sources</h2>
          <p className="text-sm text-muted-foreground">
            Provide Phonely with your company&apos;s knowledge, so it can answer customers&apos; questions with accurate and relevant information.
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Blank Document
          </Button>
        </div>

        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter documents..." className="pl-8" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Last Updated By</TableHead>
              <TableHead>Last Updated At</TableHead>
              <TableHead>Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">No documents found</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
