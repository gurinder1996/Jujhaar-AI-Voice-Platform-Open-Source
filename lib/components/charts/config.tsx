// Chart theme configuration
export const chartTheme = {
  colors: {
    primary: "#E6007A",
    secondary: "#4A1D96",
    success: "#4CAF50",
    failure: "#F44336",
    unsure: "#9E9E9E"
  },
  axis: {
    fontSize: 12,
    stroke: "#E2E8F0",
    tickColor: "#94A3B8"
  }
} as const

export const chartColors = chartTheme.colors

// Axis configurations with explicit defaults
export const createAxisProps = (customProps = {}) => ({
  type: "number",
  tickLine: false,
  axisLine: true,
  fontSize: chartTheme.axis.fontSize,
  stroke: chartTheme.axis.stroke,
  tick: { fill: chartTheme.axis.tickColor },
  ...customProps
})