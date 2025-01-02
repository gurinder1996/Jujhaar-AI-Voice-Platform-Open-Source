export interface AgentBreakdown {
  name: string
  calls: number
}

export const agentsBreakdownData: AgentBreakdown[] = [
  { name: "Agent 1", calls: 150 },
  { name: "Agent 2", calls: 120 },
  { name: "Agent 3", calls: 90 },
  { name: "Agent 4", calls: 60 }
];