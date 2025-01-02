export interface CallOutcome {
  outcome: string
  count: number
}

export const callOutcomesData: CallOutcome[] = [
  { outcome: "Issue Resolved", count: 145 },
  { outcome: "Escalated to Support", count: 89 },
  { outcome: "Follow-up Required", count: 67 },
  { outcome: "Information Provided", count: 56 },
  { outcome: "Callback Scheduled", count: 34 }
];