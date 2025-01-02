"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CallRecord, callHistoryData } from "@/lib/data/call-history"

export function CallHistoryTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Call Duration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Call ID</TableHead>
            <TableHead>Disconnection Reason</TableHead>
            <TableHead>Call Status</TableHead>
            <TableHead>User Sentiment</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Call Successful</TableHead>
            <TableHead>End to End Latency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {callHistoryData.map((call) => (
            <TableRow key={call.callId}>
              <TableCell className="whitespace-nowrap">{call.time}</TableCell>
              <TableCell>{call.duration}</TableCell>
              <TableCell>{call.type}</TableCell>
              <TableCell>{call.cost}</TableCell>
              <TableCell className="font-mono text-xs max-w-[200px] truncate">
                {call.callId}
              </TableCell>
              <TableCell>{call.disconnectionReason}</TableCell>
              <TableCell>
                <Badge variant="outline">{call.callStatus}</Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    call.userSentiment === "Positive" 
                      ? "success" 
                      : call.userSentiment === "Negative" 
                      ? "destructive" 
                      : "secondary"
                  }
                >
                  {call.userSentiment}
                </Badge>
              </TableCell>
              <TableCell>{call.from}</TableCell>
              <TableCell>{call.to}</TableCell>
              <TableCell>
                <Badge 
                  variant={call.callSuccessful ? "success" : "destructive"}
                >
                  {call.callSuccessful ? "Successful" : "Unsuccessful"}
                </Badge>
              </TableCell>
              <TableCell>{call.endToEndLatency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}