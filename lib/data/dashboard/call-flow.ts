export const callFlowData = {
  nodes: [
    { id: "greeting", name: "(106) Greeting", value: 106 },
    { id: "product", name: "(35) Product Inquiry Handling", value: 35 },
    { id: "appointment", name: "(47) Appointment Scheduling", value: 47 },
    { id: "misc", name: "(18) Miscellaneous Inquiry Handling", value: 18 },
    { id: "assistance", name: "(54) Offer Further Assistance", value: 54 },
    { id: "close", name: "(72) Close Call", value: 72 },
    { id: "success", name: "(80) Objective met", value: 80 },
    { id: "failure", name: "(26) Objective not met", value: 26 }
  ],
  links: [
    { source: "greeting", target: "product", value: 35 },
    { source: "greeting", target: "appointment", value: 47 },
    { source: "greeting", target: "misc", value: 18 },
    { source: "product", target: "assistance", value: 35 },
    { source: "appointment", target: "assistance", value: 19 },
    { source: "appointment", target: "close", value: 16 },
    { source: "misc", target: "close", value: 10 },
    { source: "assistance", target: "close", value: 46 },
    { source: "close", target: "success", value: 80 },
    { source: "close", target: "failure", value: 26 }
  ]
};