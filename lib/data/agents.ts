export interface Agent {
  id: string
  name: string
  type: "Multi Prompt" | "Single Prompt"
  voice: string
  phone: string | null
  editedAt: string
}

export const agentsData: Agent[] = [
  {
    id: "1",
    name: "UnitedRX live MULTI PROMPT (copy2)",
    type: "Multi Prompt",
    voice: "Shimmer",
    phone: null,
    editedAt: "12/27/2024, 16:11"
  },
  {
    id: "2",
    name: "VAA CS15 PLANTA Restaurant",
    type: "Single Prompt",
    voice: "Chloe",
    phone: null,
    editedAt: "12/20/2024, 09:55"
  },
  {
    id: "3",
    name: "UnitedRX live MULTI PROMPT (copy)",
    type: "Multi Prompt",
    voice: "Myra",
    phone: null,
    editedAt: "12/17/2024, 17:57"
  },
  {
    id: "4",
    name: "UnitedRX live MULTI PROMPT",
    type: "Multi Prompt",
    voice: "Myra",
    phone: null,
    editedAt: "12/17/2024, 12:40"
  },
  {
    id: "5",
    name: "UnitedRX live (copy)",
    type: "Single Prompt",
    voice: "Myra",
    phone: null,
    editedAt: "12/17/2024, 12:39"
  },
  {
    id: "6",
    name: "UnitedRX live",
    type: "Single Prompt",
    voice: "Myra",
    phone: null,
    editedAt: "12/14/2024, 15:57"
  },
  {
    id: "7",
    name: "DanGarcia (copy)",
    type: "Multi Prompt",
    voice: "John",
    phone: null,
    editedAt: "12/14/2024, 11:34"
  },
  {
    id: "8",
    name: "DanGarcia",
    type: "Multi Prompt",
    voice: "John",
    phone: null,
    editedAt: "12/14/2024, 11:16"
  },
  {
    id: "9",
    name: "UnitedRX advanced",
    type: "Single Prompt",
    voice: "Julia",
    phone: null,
    editedAt: "12/13/2024, 20:03"
  },
  {
    id: "10",
    name: "Electrician Receptionist",
    type: "Multi Prompt",
    voice: "Chloe",
    phone: null,
    editedAt: "12/06/2024, 11:26"
  },
  {
    id: "11",
    name: "Lead Qualification (Multi-Prompt)",
    type: "Multi Prompt",
    voice: "Anna",
    phone: null,
    editedAt: "11/12/2024, 18:39"
  }
]