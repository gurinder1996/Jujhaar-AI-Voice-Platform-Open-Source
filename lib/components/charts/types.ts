// Common types for chart components
export interface ChartDataPoint {
  name: string
  value: number
}

export interface BarChartDataPoint {
  label: string
  value: number
}

export interface ChartProps {
  data: ChartDataPoint[] | BarChartDataPoint[]
  height?: number
  className?: string
}