import { 
  Ticket, 
  Assignment, 
  LiveChatScenario, 
  CustomerRecord, 
  InternshipDay 
} from '../types/academy';

export const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: "NX-CUST-1001",
    name: "Marcus Brody",
    email: "m.brody@texastech.edu",
    phone: "+1 (512) 555-0192",
    tier: "Gold VIP",
    lifetimeOrders: 28,
    lifetimeSpend: 4890.50,
    joinDate: "2023-04-12",
    accountStatus: "Active",
    riskScore: "Low",
    notes: "VIP Gamer & Hardware Enthusiast. Very sensitive to shipping transit delays. Appreciates direct tracking updates.",
    address: "742 Evergreen Terrace, Austin, TX 78701"
  },
  {
    id: "NX-CUST-1002",
    name: "Elena Rostova",
    email: "elena.rostova@windycity.org",
    phone: "+1 (312) 555-8491",
    tier: "Silver",
    lifetimeOrders: 14,
    lifetimeSpend: 1850.25,
    joinDate: "2023-06-19",
    accountStatus: "Active",
    riskScore: "Low",
    notes: "Corporate accounts purchaser. Frequent small appliance buyer. Professional, values written invoices.",
    address: "1200 N Lake Shore Dr, Apt 14B, Chicago, IL 60610"
  },
  {
    id: "NX-CUST-1003",
    name: "Jonathan Reyes",
    email: "jreyes.graphicdesign@gmail.com",
    phone: "+1 (305) 555-3210",
    tier: "Standard",
    lifetimeOrders: 3,
    lifetimeSpend: 312.00,
    joinDate: "2024-01-08",
    accountStatus: "Active",
    riskScore: "Medium",
    notes: "Tends to submit multiple duplicate tickets across chat and email when anxious about delivery dates.",
    address: "440 Ocean Drive, Suite 302, Miami, FL 33139"
  },
  {
    id: "NX-CUST-1004",
    name: "Victoria Sterling",
    email: "v.sterling@sterlingholdings.com",
    phone: "+1 (212) 555-7700",
    tier: "Gold VIP",
    lifetimeOrders: 42,
    lifetimeSpend: 14250.00,
    joinDate: "2022-11-04",
    accountStatus: "Active",
    riskScore: "Low",
    notes: "High LTV Enterprise Executive. Entitled to instant complimentary reshipments and dedicated phone concierge.",
    address: "884 Park Avenue, Penthouse B, New York, NY 10021"
  },
  {
    id: "NX-CUST-1005",
    name: "David K. Vance",
    email: "d.vance.contracting@outlook.com",
    phone: "+1 (206) 555-9182",
    tier: "Standard",
    lifetimeOrders: 1,
    lifetimeSpend: 89.95,
    joinDate: "2024-03-15",
    accountStatus: "Under Review",
    riskScore: "High",
    notes: "Attempted 3 unauthorized password resets from unverified VPN IP address. PII check strictly required.",
    address: "210 Pike Street, Unit 5, Seattle, WA 98101"
  },
  {
    id: "NX-CUST-1006",
    name: "Rachel Zhao",
    email: "rachel.zhao@bayarea-innovate.io",
    phone: "+1 (408) 555-6321",
    tier: "Silver",
    lifetimeOrders: 9,
    lifetimeSpend: 1120.00,
    joinDate: "2023-09-22",
    accountStatus: "Active",
    riskScore: "Low",
    notes: "Tech savvy. Often provides console logs when encountering checkout anomalies.",
    address: "500 Santana Row, San Jose, CA 95128"
  },
  {
    id: "NX-CUST-1007",
    name: "Amira Patel",
    email: "amira.patel@rockymountain.net",
    phone: "+1 (303) 555-4819",
    tier: "Gold VIP",
    lifetimeOrders: 31,
    lifetimeSpend: 6420.75,
    joinDate: "2023-02-17",
    accountStatus: "Active",
    riskScore: "Low",
    notes: "Prefers email communications. Very polite and patient when given clear realistic turnaround times.",
    address: "1850 Larimer St, Denver, CO 80202"
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: "NX-9011",
    customerId: "NX-CUST-1001",
    customerName: "Marcus Brody",
    customerEmail: "m.brody@texastech.edu",
    customerTier: "Gold VIP",
    issueCategory: "Angry Customer Escalation",
    priority: "Urgent",
    orderReference: "ORD-88104",
    orderAmount: 899.00,
    orderDate: "2026-03-02",
    courier: "FedEx Priority",
    trackingNumber: "789123450044",
    slaDeadlineMinutes: 15,
    slaRemainingMinutes: 8,
    status: "Open",
    channel: "Email",
    assignedAgent: "Alex Mercer",
    messages: [
      {
        id: "m-1",
        sender: "customer",
        senderName: "Marcus Brody",
        timestamp: "2026-03-03 08:14",
        content: "I have been waiting 11 days for my $899 UltraWide gaming monitor. Your tracking says 'Delivery Exception - In Transit' with no movement since Friday. This is unacceptable for a Gold VIP customer! If I do not have a working tracking number or immediate replacement dispatched today, I am calling Chase Bank to file a credit card chargeback and taking this to Reddit."
      }
    ],
    resolutionNotes: ""
  },
  {
    id: "NX-9012",
    customerId: "NX-CUST-1002",
    customerName: "Elena Rostova",
    customerEmail: "elena.rostova@windycity.org",
    customerTier: "Silver",
    issueCategory: "Damaged Goods",
    priority: "High",
    orderReference: "ORD-88106",
    orderAmount: 185.00,
    orderDate: "2026-03-03",
    courier: "UPS Ground",
    trackingNumber: "1Z999999010066",
    slaDeadlineMinutes: 30,
    slaRemainingMinutes: 19,
    status: "Open",
    channel: "Web Portal",
    assignedAgent: "Alex Mercer",
    messages: [
      {
        id: "m-2",
        sender: "customer",
        senderName: "Elena Rostova",
        timestamp: "2026-03-03 08:45",
        content: "Hello Nexora Team. I just unboxed my Espresso Precision Grinder (Order #ORD-88106). Unfortunately, the glass bean hopper is completely shattered in transit. The outer cardboard box also shows deep puncture marks from UPS handling. I have photos of both the broken glass and shipping label ready. Please advise how we can get a replacement dispatched."
      }
    ]
  },
  {
    id: "NX-9013",
    customerId: "NX-CUST-1003",
    customerName: "Jonathan Reyes",
    customerEmail: "jreyes.graphicdesign@gmail.com",
    customerTier: "Standard",
    issueCategory: "Missing Package",
    priority: "Medium",
    orderReference: "ORD-88103",
    orderAmount: 79.95,
    orderDate: "2026-03-02",
    courier: "USPS Ground",
    trackingNumber: "94001118992233",
    slaDeadlineMinutes: 60,
    slaRemainingMinutes: 44,
    status: "Open",
    channel: "Chat",
    assignedAgent: "Alex Mercer",
    messages: [
      {
        id: "m-3",
        sender: "customer",
        senderName: "Jonathan Reyes",
        timestamp: "2026-03-03 09:10",
        content: "Hey, USPS tracking says my drawing tablet stand was delivered yesterday at 3:15 PM on my front porch, but I was home all afternoon and nothing was ever dropped off. I checked my apartment mail locker and asked my neighbor, nothing. Is it lost? Can you send another one?"
      }
    ]
  },
  {
    id: "NX-9014",
    customerId: "NX-CUST-1004",
    customerName: "Victoria Sterling",
    customerEmail: "v.sterling@sterlingholdings.com",
    customerTier: "Gold VIP",
    issueCategory: "Refund Request",
    priority: "High",
    orderReference: "ORD-88102",
    orderAmount: 1250.00,
    orderDate: "2026-03-01",
    courier: "UPS Next Day",
    trackingNumber: "1Z999999010022",
    slaDeadlineMinutes: 30,
    slaRemainingMinutes: 24,
    status: "Open",
    channel: "Email",
    assignedAgent: "Alex Mercer",
    messages: [
      {
        id: "m-4",
        sender: "customer",
        senderName: "Victoria Sterling",
        timestamp: "2026-03-03 09:25",
        content: "Good morning Sarah and team. We ordered the Executive Conference Soundbar for our boardroom, but our IT team informed us our displays require optical bypass rather than HDMI eARC. The unit is completely pristine and unopened in original packaging. We would like to initiate an immediate return for store credit or card refund."
      }
    ]
  },
  {
    id: "NX-9015",
    customerId: "NX-CUST-1005",
    customerName: "David K. Vance",
    customerEmail: "d.vance.contracting@outlook.com",
    customerTier: "Standard",
    issueCategory: "Account Access",
    priority: "Urgent",
    orderReference: "ORD-88105",
    orderAmount: 89.95,
    orderDate: "2026-03-02",
    courier: "FedEx Ground",
    trackingNumber: "789123450055",
    slaDeadlineMinutes: 15,
    slaRemainingMinutes: 5,
    status: "Open",
    channel: "Email",
    assignedAgent: "Alex Mercer",
    messages: [
      {
        id: "m-5",
        sender: "customer",
        senderName: "David K. Vance",
        timestamp: "2026-03-03 09:40",
        content: "I cannot log in to my account. It says 'Account locked due to suspicious activity'. I need to change the shipping address on my recent order immediately to an address in Atlanta because I am traveling. Here is the new address: 99 Peachtree Rd, Atlanta GA. Send me the password reset link directly to my alternate email davevance99@gmail.com."
      }
    ]
  },
  {
    id: "NX-9016",
    customerId: "NX-CUST-1006",
    customerName: "Rachel Zhao",
    customerEmail: "rachel.zhao@bayarea-innovate.io",
    customerTier: "Silver",
    issueCategory: "Duplicate Charge",
    priority: "High",
    orderReference: "ORD-88121",
    orderAmount: 175.00,
    orderDate: "2026-03-08",
    courier: "UPS Ground",
    trackingNumber: "1Z999999010121",
    slaDeadlineMinutes: 30,
    slaRemainingMinutes: 28,
    status: "Open",
    channel: "Chat",
    assignedAgent: "Alex Mercer",
    messages: [
      {
        id: "m-6",
        sender: "customer",
        senderName: "Rachel Zhao",
        timestamp: "2026-03-03 09:55",
        content: "Hi there. Looking at my online Wells Fargo banking app right now. I see two identical pending charges of $175.00 from 'NEXORA RETAIL CHICAGO' for Order #ORD-88121. I only clicked the checkout button once, but the screen spun for a few seconds. Can you check your Stripe ledger and reverse the duplicate pre-auth?"
      }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: "WO-1001",
    courseId: "CRS-01",
    courseTitle: "Nexora Corporate Culture, Remote Work Protocols & Toolset Setup",
    department: "Human Resources & Operations",
    title: "Remote Workstation Compliance & Shift Adherence Memo",
    description: "Submit signed verification of your home workstation, secondary monitor verification, and the 5-point emergency power/ISP failure contingency plan.",
    priority: "High",
    assignedDate: "2026-03-01",
    dueDate: "2026-03-05",
    requiredOutput: "Formal Remote Employee Readiness Memorandum signed by Trainee Alex Mercer.",
    status: "Approved",
    submission: {
      submittedAt: "2026-03-02 14:30",
      responseContent: "MEMORANDUM\nTO: Sarah Jenkins, Senior Operations Director\nFROM: Alex Mercer, Remote Operations Trainee (NX-TR-4091)\nSUBJECT: Remote Workstation & Adherence Compliance Verification\n\n1. Workstation & Hardware: Dual 27-inch displays verified, Jabra Evolve 65 noise-canceling headset tested, 350 Mbps fiber connection verified with 12ms latency.\n2. Emergency Contingency Plan: In case of local ISP downtime, secondary 5G cellular hotspot (Verizon Unlimited) initiates within 3 minutes. Operations manager notified via Slack SMS gateway.\n3. Scheduled Shift Commitment: 08:30 - 17:00 CST Monday through Friday with 45-minute scheduled lunch block at 12:30 CST.",
      attachedFileName: "alex_mercer_workstation_audit_signed.pdf"
    },
    managerEvaluation: {
      evaluatedAt: "2026-03-02 16:15",
      evaluatedBy: "Sarah Jenkins, Operations Director",
      overallScore: 98,
      rubricScores: [
        { criteriaId: "r1", name: "Operational Accuracy", score: 25, maxPoints: 25 },
        { criteriaId: "r2", name: "Professional Tone", score: 24, maxPoints: 25 },
        { criteriaId: "r3", name: "SOP Compliance", score: 25, maxPoints: 25 },
        { criteriaId: "r4", name: "Problem Solving", score: 24, maxPoints: 25 }
      ],
      managerFeedback: "Excellent, pristine workstation verification Alex. Your backup cellular failover meets our Tier-1 enterprise redundancy standards. Approved for live shift queue.",
      decision: "Approved"
    }
  },
  {
    id: "WO-1002",
    courseId: "CRS-02",
    courseTitle: "Customer Data Privacy (GDPR, CCPA) & PCI-DSS Secure Practices",
    department: "Security & Administration",
    title: "PII Security Audit & 3-Point Verification Script",
    description: "Audit 5 simulated customer transcripts, identify severe privacy violations, and script the approved verification refusal for third-party callers.",
    priority: "Urgent",
    assignedDate: "2026-03-02",
    dueDate: "2026-03-06",
    requiredOutput: "PII Security Audit Matrix & Standard Compliant Verification Refusal Script.",
    status: "Approved",
    submission: {
      submittedAt: "2026-03-02 18:20",
      responseContent: "PII & PCI-DSS AUDIT FINDINGS:\n- Transcript 1 (Pass): Agent verified Billing Zip & Order Number before discussing contents.\n- Transcript 2 (SEVERE VIOLATION): Agent asked customer to type full 16-digit credit card number into plain chat. Immediate remediation required.\n- Transcript 3 (Pass): Agent refused to disclose delivery address to spouse without 3-point authorization.\n- Transcript 4 (SEVERE VIOLATION): Agent stored CVV in internal notes. Must be purged immediately.\n- Transcript 5 (Pass): Compliant redaction performed on attached driver license.\n\nSTANDARD REFUSAL SCRIPT:\n'For your privacy and the security of the account holder under federal data regulations, I am unable to confirm or disclose account details to third parties without prior authorization. The registered account holder may contact us directly or add your name as an authorized representative via their secure portal settings.'",
      attachedFileName: "pii_transcript_audit_matrix_v1.xlsx"
    },
    managerEvaluation: {
      evaluatedAt: "2026-03-03 07:30",
      evaluatedBy: "Sarah Jenkins, Operations Director",
      overallScore: 95,
      rubricScores: [
        { criteriaId: "r1", name: "Operational Accuracy", score: 24, maxPoints: 25 },
        { criteriaId: "r2", name: "Professional Tone", score: 24, maxPoints: 25 },
        { criteriaId: "r3", name: "SOP Compliance", score: 25, maxPoints: 25 },
        { criteriaId: "r4", name: "Problem Solving", score: 22, maxPoints: 25 }
      ],
      managerFeedback: "Spot on analysis of the CVV violation in Transcript #4. You correctly applied SOP-05. Good job protecting customer records.",
      decision: "Approved"
    }
  },
  {
    id: "WO-1003",
    courseId: "CRS-11",
    courseTitle: "Spreadsheet Fundamentals: SUM, COUNT, COUNTA & Data Cleaning",
    department: "Operations & Data Administration",
    title: "Customer Database Cleansing & Summary Workbook",
    description: "Clean the 25-row raw customer dataset, format currency values, eliminate trailing spaces, and construct the KPI summary block using SUM, COUNT, and COUNTA.",
    priority: "High",
    assignedDate: "2026-03-03",
    dueDate: "2026-03-07",
    requiredOutput: "Exported XLSX Workbook with working SUM, COUNTA, and AVERAGE formulas.",
    status: "Submitted",
    submission: {
      submittedAt: "2026-03-03 09:15",
      responseContent: "Customer Database Cleansing completed in Nexora Spreadsheet Workspace.\n- Total Customers audited: 25 accounts (Formula: =COUNTA(A2:A26))\n- Total Lifetime Spend: $81,385.45 (Formula: =SUM(E2:E26))\n- Average Spend per Customer: $3,255.42 (Formula: =AVERAGE(E2:E26))\n- Gold VIP Count: 8 accounts (Formula: =COUNTIF(C2:C26, \"Gold VIP\"))\n- Cleaned all email whitespaces and standardized phone numbers to E.164 format.",
      spreadsheetDataSummary: "A2:I26 Cleansed. J2:K6 KPI Summary Block created.",
      attachedFileName: "nexora_customer_database_cleansed_master.xlsx"
    }
  },
  {
    id: "WO-1004",
    courseId: "CRS-06",
    courseTitle: "The HEAT De-escalation Model for Frustrated & Impatient Customers",
    department: "Customer Service",
    title: "HEAT De-escalation Case File (Ticket #NX-9011 Marcus Brody)",
    description: "Apply Hear, Empathize, Apologize, Take Action to resolve Marcus Brody's delayed $899 monitor. Defuse chargeback threat without violating company authority limits.",
    priority: "Urgent",
    assignedDate: "2026-03-03",
    dueDate: "2026-03-04",
    requiredOutput: "Customer Email Reply + Internal CRM Investigation Note.",
    status: "In Progress"
  },
  {
    id: "WO-1005",
    courseId: "CRS-12",
    courseTitle: "Conditional Aggregation: COUNTIF, SUMIF & Category Breakdown",
    department: "Operations & Data Administration",
    title: "Automated Refund Category Breakdown Model",
    description: "Calculate conditional counts and sums across 20 returns using =COUNTIF and =SUMIF to report total refund liability per return reason.",
    priority: "Medium",
    assignedDate: "2026-03-03",
    dueDate: "2026-03-08",
    requiredOutput: "Category Breakdown Table with % share of returns.",
    status: "Assigned"
  }
];

export const LIVE_CHAT_SCENARIOS: LiveChatScenario[] = [
  {
    id: "chat-scen-1",
    customerName: "Carlos Mendez",
    customerEmail: "carlos.mendez99@gmail.com",
    customerTier: "Standard",
    issue: "Discount Code Not Working at Checkout",
    customerPersonality: "Impatient",
    initialMessage: "Hi, I am trying to use the promo code 'SPRING25' on my cart ($185 cart value) and it keeps saying 'Code invalid or minimum purchase not met'. What is going on? I am ready to buy right now if you fix this.",
    orderId: "CART-9941",
    resolutionGoal: "Verify promo terms (SPRING25 requires $200 min or non-sale items). Offer courtesy $15 concession code or explain qualifying cart adjustment politely.",
    potentialResponses: [
      {
        traineeInputKeywords: ["policy", "minimum", "200", "terms", "check", "apologize"],
        customerReply: "Ah, I see! My cart is $185 so I am $15 short of the $200 threshold! Let me just add a screen cleaning kit to get over $200. Thank you for checking that so quickly!",
        sentimentShift: 1
      },
      {
        traineeInputKeywords: ["cannot", "not my fault", "invalid", "read"],
        customerReply: "That is frustrating. Other stores don't make it this confusing. Can you just give me a 10% code that actually works?",
        sentimentShift: -1
      }
    ]
  },
  {
    id: "chat-scen-2",
    customerName: "Amira Patel",
    customerEmail: "amira.patel@rockymountain.net",
    customerTier: "Gold VIP",
    issue: "Change Shipping Address on Shipped Order",
    customerPersonality: "Frustrated",
    initialMessage: "Hello! I placed Order #ORD-88116 thirty minutes ago, but autofill put my old apartment address in Denver instead of my new home in Boulder! Can you please change the address before it leaves your warehouse?",
    orderId: "ORD-88116",
    resolutionGoal: "Perform 3-point verification, intercept fulfillment wave in OrderTracker, update address to Boulder, and send updated confirmation.",
    potentialResponses: [
      {
        traineeInputKeywords: ["verify", "update", "intercept", "order", "boulder", "happy to help", "done"],
        customerReply: "Thank goodness! What a relief. You caught it right in time before dispatch! I really appreciate the prompt assistance, this is why I remain a Gold VIP member with Nexora.",
        sentimentShift: 1
      },
      {
        traineeInputKeywords: ["too late", "cannot change", "shipped already", "call carrier"],
        customerReply: "What do you mean you can't change it? It was placed 30 minutes ago! It hasn't even been picked up by the truck yet! Please transfer me to a supervisor.",
        sentimentShift: -1
      }
    ]
  },
  {
    id: "chat-scen-3",
    customerName: "Liam Gallagher",
    customerEmail: "liam.gallagher82@yahoo.com",
    customerTier: "Standard",
    issue: "Demanding Cash Refund for 90-Day-Old Item",
    customerPersonality: "Angry",
    initialMessage: "I bought these noise-canceling headphones back in December (Order #ORD-77401). The headband just cracked today. I want an immediate full cash refund back to my Visa. Don't tell me about 30 days, these are defective goods!",
    orderId: "ORD-77401",
    resolutionGoal: "Apply HEAT framework. Empathize with breakage. Explain 30-day refund window per SOP-01, but offer 1-year manufacturer warranty replacement or store credit exception.",
    potentialResponses: [
      {
        traineeInputKeywords: ["warranty", "replacement", "hear", "understand", "store credit", "help", "option"],
        customerReply: "Okay, I appreciate that you're offering the 1-year warranty replacement. That is fair enough as long as the replacement unit is brand new. What do I need to send you?",
        sentimentShift: 1
      },
      {
        traineeInputKeywords: ["denied", "past 30 days", "policy is policy", "no"],
        customerReply: "Unbelievable. Your customer service is terrible. I'm posting this conversation on Twitter right now to warn everyone.",
        sentimentShift: -1
      }
    ]
  }
];

export const INITIAL_INTERNSHIP_DAYS: InternshipDay[] = [
  {
    dayNumber: 1,
    dayTitle: "Day 1: Onboarding, SOP Review & Customer Database Hygiene",
    focusArea: "System Setup, SOP Compliance Verification & Raw Data Cleansing",
    targetTasks: [
      {
        id: "d1-t1",
        title: "Workstation Setup & SOP Handbook Sign-off",
        description: "Review SOP-01 through SOP-08. Verify system credentials and sign company adherence policy.",
        completed: true,
        evidenceNeeded: "Workstation memo signed (WO-1001)"
      },
      {
        id: "d1-t2",
        title: "Cleanse Customer Master Database in Sheets",
        description: "Eliminate duplicates and compute SUM/COUNTA totals in the Spreadsheet Workspace.",
        completed: true,
        evidenceNeeded: "Cleaned XLSX export submitted (WO-1003)"
      },
      {
        id: "d1-t3",
        title: "Resolve Initial Onboarding Tickets",
        description: "Process Tickets #NX-9011 and #NX-9012 with 100% SOP compliance.",
        completed: false,
        evidenceNeeded: "Nexora Desk solved ticket records"
      },
      {
        id: "d1-t4",
        title: "Submit Day 1 Shift Handover Memo",
        description: "Draft comprehensive end-of-shift report for incoming lead.",
        completed: false,
        evidenceNeeded: "Shift Handover Log entry"
      }
    ],
    shiftHandoverNotes: "Shift in progress. Workstation verified. Customer database cleaned. Working through remaining ticket queue.",
    managerSignOff: false,
    managerScore: 92,
    managerFeedback: "Great first day start Alex. Finish the two open tickets and submit your shift handover."
  },
  {
    dayNumber: 2,
    dayTitle: "Day 2: Multichannel Ticket Surge & Live Chat Handling",
    focusArea: "Concurrency, First Response Speed & Live De-escalation",
    targetTasks: [
      {
        id: "d2-t1",
        title: "Tackle 5 Concurrent Queue Inquiries",
        description: "Achieve First Response Time < 15 minutes across all queue items.",
        completed: false,
        evidenceNeeded: "Ticket Desk FRT metric log"
      },
      {
        id: "d2-t2",
        title: "Complete Live Chat De-escalation Simulation",
        description: "Successfully navigate Carlos Mendez's promo code dispute with positive CSAT.",
        completed: false,
        evidenceNeeded: "Live Chat Transcript export"
      },
      {
        id: "d2-t3",
        title: "Deploy Standardized Macro Suite",
        description: "Use 3 personalized macros without leaving placeholders unedited.",
        completed: false,
        evidenceNeeded: "Nexora Desk message history"
      }
    ],
    shiftHandoverNotes: "",
    managerSignOff: false
  },
  {
    dayNumber: 3,
    dayTitle: "Day 3: Complex Refunds, Fraud & Carrier Claim Audits",
    focusArea: "Financial Policy Enforcement, Restocking Fees & Courier Loss Claims",
    targetTasks: [
      {
        id: "d3-t1",
        title: "Audit 3 High-Value Refund Cases in Sheets",
        description: "Calculate net refund amounts after restocking fee deductions per SOP-01.",
        completed: false,
        evidenceNeeded: "Spreadsheet calculation summary"
      },
      {
        id: "d3-t2",
        title: "File Carrier Damage Claim for Order #ORD-88106",
        description: "Verify broken glass photos and file UPS claim packet.",
        completed: false,
        evidenceNeeded: "Carrier claim reference ID"
      },
      {
        id: "d3-t3",
        title: "Flag Account David K. Vance for Security Review",
        description: "Document unauthorized VPN password reset attempts under SOP-05.",
        completed: false,
        evidenceNeeded: "Fraud ticket note"
      }
    ],
    shiftHandoverNotes: "",
    managerSignOff: false
  },
  {
    dayNumber: 4,
    dayTitle: "Day 4: CSAT Root Cause Analysis & QA Scorecards",
    focusArea: "Quality Auditing, Detractor Analytics & Continuous Improvement",
    targetTasks: [
      {
        id: "d4-t1",
        title: "Conduct 5 Colleague QA Ticket Audits",
        description: "Grade 5 transcripts using the 100-point rubric in the QA hub.",
        completed: false,
        evidenceNeeded: "Completed QA scorecards"
      },
      {
        id: "d4-t2",
        title: "Analyze 20 CSAT Survey Comments in Sheets",
        description: "Categorize detractor comments by root cause using COUNTIF.",
        completed: false,
        evidenceNeeded: "CSAT Pareto spreadsheet table"
      },
      {
        id: "d4-t3",
        title: "Author Weekly Quality Improvement Brief",
        description: "Propose 3 systemic recommendations to eliminate recurring carrier delays.",
        completed: false,
        evidenceNeeded: "1-Page Executive QA memo"
      }
    ],
    shiftHandoverNotes: "",
    managerSignOff: false
  },
  {
    dayNumber: 5,
    dayTitle: "Day 5: Backlog Clearance, Final WBR & Manager Certification",
    focusArea: "Operational Mastery, Executive Presentation & Program Graduation",
    targetTasks: [
      {
        id: "d5-t1",
        title: "Zero-Inbox Backlog Clearance",
        description: "Resolve all remaining active tickets in assigned queue.",
        completed: false,
        evidenceNeeded: "0 Open Tickets in Personal Queue"
      },
      {
        id: "d5-t2",
        title: "Compile Master Operations WBR Dashboard",
        description: "Build final executive spreadsheet with full KPI formulas.",
        completed: false,
        evidenceNeeded: "Final WBR XLSX Workbook"
      },
      {
        id: "d5-t3",
        title: "Attend Executive Manager Review & Portfolio Defense",
        description: "Submit portfolio to Director Sarah Jenkins for final certification sign-off.",
        completed: false,
        evidenceNeeded: "Verified Academy Certificate"
      }
    ],
    shiftHandoverNotes: "",
    managerSignOff: false
  }
];
