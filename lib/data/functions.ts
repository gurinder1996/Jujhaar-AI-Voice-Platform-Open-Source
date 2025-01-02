import { LucideIcon, Phone, Calendar, CalendarClock, Grid3X3, Wrench } from "lucide-react"

export interface Function {
  id: string
  name: string
  description: string
  icon: LucideIcon
  enabled: boolean
  isCustom?: boolean
  config?: {
    transferTo?: string
    transferType?: "cold" | "warm"
    displayedNumber?: "retell" | "transferee"
    apiKey?: string
    eventTypeId?: string
    timezone?: string
    pauseDetectionDelay?: number
    url?: string
    apiTimeout?: number
    parameters?: string
    speakDuring?: boolean
    speakAfter?: boolean
  }
}

export const defaultFunctions: Function[] = [
  {
    id: "end_call",
    name: "End Call",
    description: "End the current call",
    icon: Phone,
    enabled: true
  },
  {
    id: "call_transfer",
    name: "Call Transfer",
    description: "Transfer call to another agent or department",
    icon: Phone,
    enabled: true
  },
  {
    id: "check_calendar_availability",
    name: "Check Calendar Availability",
    description: "Check available slots in Cal.com calendar",
    icon: CalendarClock,
    enabled: true
  },
  {
    id: "book_appointment",
    name: "Book on the Calendar",
    description: "Book an appointment on Cal.com calendar",
    icon: Calendar,
    enabled: true
  },
  {
    id: "press_digit",
    name: "Press Digit",
    description: "Navigate IVR menu options",
    icon: Grid3X3,
    enabled: true
  }
]