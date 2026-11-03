import { CompanySOP } from '../types/academy';

export const COMPANY_PROFILE = {
  name: "NEXORA CUSTOMER OPERATIONS",
  tagline: "Global Tier-1 Customer Experience & Operations Partner",
  industry: "Omnichannel E-commerce, Marketplace Logistics & Digital Services",
  founded: "2018",
  headquarters: "Chicago, IL (Operating 100% Remote / Distributed Workforce)",
  workforceCount: "1,450+ Remote Specialists across 34 Countries",
  supportedLanguages: ["English", "Spanish", "German", "French", "Japanese"],
  slaStandard: "First Response < 15m (VIP) / < 60m (Standard); CSAT Target ≥ 92%",
  cultureValues: [
    "Customer Empathy without Compromising Protocol",
    "Radical Accuracy in Spreadsheet & CRM Logging",
    "Transparent Ownership & Clear Shift Handover",
    "Continuous Quality Improvement & Active Listening"
  ],
  leadership: [
    {
      name: "Marcus Vance",
      title: "Vice President of Operations & Academy Dean",
      email: "m.vance@nexora-ops.com",
      role: "System Administrator & Executive Sponsor"
    },
    {
      name: "Sarah Jenkins",
      title: "Senior Director of Operations & QA Lead",
      email: "s.jenkins@nexora-ops.com",
      role: "Training Manager & Senior Evaluator"
    },
    {
      name: "Elena Rostova",
      title: "Lead Technical Trainer & Workforce Manager",
      email: "e.rostova@nexora-ops.com",
      role: "SOP Architect & QA Specialist"
    },
    {
      name: "Tariq Al-Mansoor",
      title: "Tier 2 Escalations & Fraud Investigation Lead",
      email: "t.almansoor@nexora-ops.com",
      role: "Senior Operations Coach"
    }
  ],
  departments: [
    {
      name: "Customer Support (CS)",
      head: "Sarah Jenkins",
      scope: "Omnichannel ticket management, live chat support, order status, return authorization, empathy handling."
    },
    {
      name: "Operations & Logistics (Ops)",
      head: "Tariq Al-Mansoor",
      scope: "Courier fulfillment auditing, tracking investigation, carrier claims, inventory discrepancy analysis."
    },
    {
      name: "Quality Assurance & Workforce (QA)",
      head: "Elena Rostova",
      scope: "Weekly ticket auditing, CSAT root-cause reporting, agent scorecards, adherence monitoring."
    },
    {
      name: "Finance & Dispute Operations (FinOps)",
      head: "Rachel Zhao",
      scope: "Chargeback mitigation, payment gateway reconciliation, high-value refund overrides."
    }
  ]
};

export const COMPANY_SOPS: CompanySOP[] = [
  {
    id: "SOP-01",
    code: "NX-SOP-RET-01",
    title: "E-Commerce Return Authorization & Refund Protocol",
    department: "Customer Support & Finance",
    lastUpdated: "2026-01-15",
    version: "3.4",
    summary: "Standard operating procedure for validating return eligibility, generating prepaid return labels, and issuing refunds across payment gateways.",
    scope: "All front-line customer service agents, tier-2 escalation specialists, and refund operations coordinators.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "Order Date & Policy Window Verification",
        action: "Confirm customer order delivery timestamp is within 30 calendar days. If past 30 days, verify if eligible for store credit (up to 45 days max).",
        rules: [
          "Item must be unworn, undamaged, and in original packaging.",
          "Items marked 'Final Sale' or perishable goods are strictly non-refundable."
        ]
      },
      {
        stepNumber: 2,
        title: "Return Reason Categorization",
        action: "Classify reason in CRM dropdown: Defective/Damaged, Wrong Item Sent, Customer Remorse, or Carrier Transit Loss.",
        rules: [
          "If damaged or defective, customer photo evidence is required before approving label.",
          "Company covers return shipping if defective or wrong item sent."
        ]
      },
      {
        stepNumber: 3,
        title: "Refund Processing & Restocking Fee Assessment",
        action: "Calculate net refund amount. Deduct $5.99 return shipping fee for buyer's remorse unless customer is Gold VIP tier.",
        rules: [
          "Refunds must always route to the original payment method.",
          "Processing window is 3 to 5 business days for card issuers."
        ]
      }
    ],
    escalationRules: [
      "Refunds exceeding $250.00 require Tier-2 Manager override approval.",
      "Any suspected policy abuse (more than 3 returns in 60 days) must be flagged for Risk Review."
    ],
    exemptions: [
      "Gold VIP customers are granted complimentary return shipping on all eligible purchases."
    ]
  },
  {
    id: "SOP-02",
    code: "NX-SOP-ESC-02",
    title: "Incident Escalation & Tier-2 Transfer Matrix",
    department: "Operations & QA",
    lastUpdated: "2026-02-01",
    version: "2.8",
    summary: "Clear guidelines on identifying situations requiring manager intervention, legal escalations, or security team alerts.",
    scope: "All remote support agents and team leaders.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "Triage & Root Cause Determination",
        action: "Assess whether the customer request falls outside frontline tier-1 authority limits (e.g., chargebacks, legal threats, bulk courier failures).",
        rules: [
          "Do not promise unauthorized outcomes to placate agitated customers.",
          "Never offer supervisor transfer as a first response without attempting resolution."
        ]
      },
      {
        stepNumber: 2,
        title: "Internal Escalation Warm Transfer",
        action: "Add an Internal Note in the ticket containing: Issue Summary, Order ID, What Has Been Offered, and Why Frontline Cannot Resolve.",
        rules: [
          "Set priority to 'High' or 'Urgent'.",
          "Inform customer: 'I have engaged our Senior Specialist team who will respond within 4 business hours.'"
        ]
      }
    ],
    escalationRules: [
      "Explicit threats of legal action or regulatory complaints (FTC, BBB) must be transferred immediately to Legal & Executive Ops with ticket tag #LEGAL-ESC.",
      "Reported unauthorized account takeovers or security breaches must freeze account immediately."
    ],
    exemptions: [
      "Minor delays under 48 hours with active carrier scans do not qualify for Tier-2 escalation."
    ]
  },
  {
    id: "SOP-03",
    code: "NX-SOP-SLA-03",
    title: "Service Level Agreement (SLA) & Priority Triage",
    department: "Operations",
    lastUpdated: "2026-01-20",
    version: "4.1",
    summary: "Mandatory response and resolution timelines across omnichannel queues.",
    scope: "Entire remote workforce.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "Priority Classification Upon Ingestion",
        action: "Tickets are automatically or manually tagged based on customer tier and severity: Urgent (Down system/VIP fraud), High (Payment issue/Lost delivery), Medium (Return/Order edit), Low (General inquiry).",
        rules: [
          "Urgent: First Response < 15 minutes; Full Resolution < 4 hours.",
          "High: First Response < 30 minutes; Full Resolution < 12 hours.",
          "Medium: First Response < 60 minutes; Full Resolution < 24 hours.",
          "Low: First Response < 120 minutes; Full Resolution < 48 hours."
        ]
      },
      {
        stepNumber: 2,
        title: "Breach Prevention Protocol",
        action: "Tickets with less than 20% SLA buffer time must be highlighted in amber/red on the dashboard queue.",
        rules: [
          "Send interim touchpoint if investigation takes longer than initial estimate.",
          "Never close or solve a ticket without verified customer agreement or resolution proof."
        ]
      }
    ],
    escalationRules: [
      "Any queue with >5% breach rate triggers automated manager alert for shift rebalancing."
    ],
    exemptions: [
      "Public carrier delivery delays caused by declared national weather emergencies."
    ]
  },
  {
    id: "SOP-04",
    code: "NX-SOP-DEC-04",
    title: "Professional De-escalation & Angry Customer Handling (HEAT Framework)",
    department: "Customer Service",
    lastUpdated: "2026-02-10",
    version: "3.0",
    summary: "Instructional framework for navigating hostile, impatient, and emotionally charged customer interactions.",
    scope: "Customer Service and Chat specialists.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "H - Hear Them Out (Active Listening)",
        action: "Allow the customer to express their frustration without interrupting or offering immediate defensive counterpoints.",
        rules: [
          "Do not say 'Calm down' or 'It's not our fault'.",
          "Identify the underlying functional problem versus emotional venting."
        ]
      },
      {
        stepNumber: 2,
        title: "E - Empathize Sincerely",
        action: "Acknowledge the inconvenience with professional empathy: 'I understand how frustrating it is to wait for a gift intended for a birthday.'",
        rules: [
          "Avoid robotic scripted apologies that sound dismissive."
        ]
      },
      {
        stepNumber: 3,
        title: "A - Apologize & Take Ownership",
        action: "Apologize on behalf of Nexora for the friction caused and state clear personal accountability: 'I am taking charge of this case right now.'",
        rules: [
          "Focus on what you CAN do, not what policy restricts."
        ]
      },
      {
        stepNumber: 4,
        title: "T - Take Action & Follow Through",
        action: "Present a concrete two-step solution plan with specific timelines.",
        rules: [
          "Provide reference ID and commitment to update."
        ]
      }
    ],
    escalationRules: [
      "Severe profanity or personal verbal abuse: Agent provides ONE polite warning. If repeated, agent is authorized to disconnect after logging ticket note."
    ],
    exemptions: ["None"]
  },
  {
    id: "SOP-05",
    code: "NX-SOP-SEC-05",
    title: "Customer Data Privacy, PII & Payment Card Industry (PCI-DSS) Security",
    department: "Security & Administration",
    lastUpdated: "2026-01-05",
    version: "5.0",
    summary: "Strict legal rules on customer verification, credit card data handling, and identity validation.",
    scope: "All employees across all divisions.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "Customer Identity Verification (3-Point Check)",
        action: "Prior to disclosing order details, shipping address, or account data, verify at least two items: Full Billing Address, Phone Number on file, or Last 4 digits of payment card.",
        rules: [
          "NEVER ask for or accept CVV / CVC 3-digit security codes.",
          "Never type full 16-digit credit card numbers into chat, email, or tickets."
        ]
      },
      {
        stepNumber: 2,
        title: "PII Masking & Redaction",
        action: "If a customer emails or attaches a photo showing sensitive IDs or card numbers, agent must immediately redact the file using the Nexora Desk tool.",
        rules: [
          "Do not send passwords in plain text under any circumstances."
        ]
      }
    ],
    escalationRules: [
      "Suspected identity spoofing must be reported to fraud@nexora-ops.com."
    ],
    exemptions: ["None"]
  },
  {
    id: "SOP-06",
    code: "NX-SOP-REM-06",
    title: "Remote Work Administration, Attendance & Shift Handover",
    department: "HR & Operations",
    lastUpdated: "2026-01-10",
    version: "2.5",
    summary: "Workplace expectations, Slack presence, punch-in/out, and shift handover logging.",
    scope: "All remote contractors and full-time team members.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "Shift Punch-in & Slack Status",
        action: "Log in 5 minutes before scheduled queue time. Set Slack status to 'Active - Queue #3'.",
        rules: [
          "Breaks must be scheduled and logged in the attendance system.",
          "Unannounced away time exceeding 15 minutes is logged as an adherence discrepancy."
        ]
      },
      {
        stepNumber: 2,
        title: "End-of-Shift Handover Report",
        action: "At the end of every 8-hour shift, compile and post the handover summary: Total tickets resolved, pending investigations, high-priority watch items.",
        rules: [
          "Handover reports must be submitted before logging off."
        ]
      }
    ],
    escalationRules: [
      "Emergency absences must be communicated at least 2 hours before shift start."
    ],
    exemptions: ["Documented medical emergencies."]
  },
  {
    id: "SOP-07",
    code: "NX-SOP-CAR-07",
    title: "Damaged Goods & Carrier Claims Procedure",
    department: "Logistics Operations",
    lastUpdated: "2026-02-15",
    version: "3.2",
    summary: "Filing courier transit claims (FedEx, UPS, DHL) and initiating replacement shipments.",
    scope: "Support specialists and operations coordinators.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "Inspection & Photographic Evidence Gathering",
        action: "Request two clear photos: (1) Damaged item showing defect/breakage, (2) Outer parcel box showing shipping label.",
        rules: [
          "No replacement can be dispatched without verified photo evidence if item value > $40."
        ]
      },
      {
        stepNumber: 2,
        title: "Replacement Dispatch & Carrier Claim Filing",
        action: "Create a Zero-Dollar Replacement Order in OrderTracker with priority courier flag. File claim reference with tracking courier.",
        rules: [
          "Customer is not required to return shattered glass or hazardous liquids."
        ]
      }
    ],
    escalationRules: [
      "Damaged items exceeding $500 require carrier inspection hold."
    ],
    exemptions: ["Gold VIP customers receive instant replacement upon first notification."]
  },
  {
    id: "SOP-08",
    code: "NX-SOP-TRK-08",
    title: "Lost In Transit & 'Marked Delivered But Missing' Investigation",
    department: "Logistics & Support",
    lastUpdated: "2026-02-18",
    version: "3.1",
    summary: "Standard investigation workflow for packages that show delivered on tracking but customer claims non-receipt.",
    scope: "Customer service agents.",
    procedureSteps: [
      {
        stepNumber: 1,
        title: "Delivery Buffer & Neighborhood Check",
        action: "Advise customer that couriers frequently scan packages as 'delivered' up to 24 hours prior to actual drop-off. Request checking porches, mailrooms, and neighbors.",
        rules: [
          "Wait 24 business hours from marked delivery before classifying as lost.",
          "Check carrier GPS delivery coordinates via internal courier portal."
        ]
      },
      {
        stepNumber: 2,
        title: "Address Verification & Affidavit of Loss",
        action: "Verify unit/apartment number with customer. If coordinates show misdelivery, approve immediate reshipment.",
        rules: [
          "If customer reports recurring package theft, require 'Signature Required' delivery for reshipment."
        ]
      }
    ],
    escalationRules: [
      "Orders over $300 require formal police report / courier affidavit before reshipment."
    ],
    exemptions: ["None"]
  }
];
