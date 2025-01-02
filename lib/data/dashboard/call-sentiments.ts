export interface CallSentiment {
  sentiment: string
  count: number
  percentage: number
}

export const callSentimentsData: CallSentiment[] = [
  { sentiment: "Positive", count: 450, percentage: 45 },
  { sentiment: "Neutral", count: 350, percentage: 35 },
  { sentiment: "Negative", count: 200, percentage: 20 }
];