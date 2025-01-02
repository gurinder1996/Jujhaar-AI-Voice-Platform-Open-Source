export const nodeColors = {
  greeting: "#87CEEB",
  appointment: "#FF9999",
  product: "#66B2FF",
  misc: "#FFB366",
  assistance: "#90EE90",
  close: "#98FB98",
  success: "#90EE90",
  failure: "#FFB366"
} as const

export type NodeColorKey = keyof typeof nodeColors