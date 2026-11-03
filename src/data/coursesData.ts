import { Course } from '../types/academy';

const standardRubric = [
  { id: "r1", name: "Operational Accuracy & Completeness", description: "All required steps, data fields, and calculations are strictly correct.", maxPoints: 25 },
  { id: "r2", name: "Professional Communication & Tone", description: "Adheres to Nexora empathy guidelines, professional phrasing, zero hostility or defensiveness.", maxPoints: 25 },
  { id: "r3", name: "SOP & Policy Compliance", description: "Follows corporate guidelines, authorization thresholds, and data protection rules.", maxPoints: 25 },
  { id: "r4", name: "Problem Solving & Time Management", description: "Delivers realistic, actionable resolutions within standard SLA constraints.", maxPoints: 25 }
];

export const COURSES_DATA: Course[] = [
  // ================= LEVEL 01 (Courses 01-05) =================
  {
    id: "CRS-01",
    number: 1,
    level: 1,
    levelTitle: "Level 01: Company Onboarding & Remote Work Foundation",
    department: "Human Resources & Operations",
    title: "Nexora Corporate Culture, Remote Work Protocols & Toolset Setup",
    durationHours: 3,
    summary: "Master Nexora's operational standards, security baselines, remote attendance tracking, and distributed workplace communication etiquette.",
    scenario: "You are beginning your first week as a Remote Customer Operations Trainee at Nexora. You need to configure your workstation, review remote shift adherence standards, and complete your initial workstation verification audit.",
    managerInstruction: "Review company handbook and SOP-06. Set up your secure remote workstation profile, document emergency offline procedures, and log your official scheduled shift availability.",
    sopReference: "SOP-06: Remote Work Administration, Attendance & Shift Handover",
    sopId: "SOP-06",
    toolsRequired: ["Nexora Desk", "Slack Workforce Channel", "TimeDoctor / Clockify Simulator"],
    rawDatasetName: "nexora_employee_shift_matrix.csv",
    rawDatasetType: "productivity",
    practicalAssignment: {
      taskTitle: "Workstation Compliance & Shift Adherence Plan",
      description: "Produce a formal Remote Work Readiness & Adherence Submission including verified home internet latency check, emergency power failure protocol, and weekly 40-hour schedule commitment.",
      stepByStep: [
        "Review Nexora Remote Work Attendance Policy (SOP-06).",
        "Document required hardware verification (headset noise-cancellation, secondary display).",
        "Draft the 5-point emergency response protocol if ISP internet disconnects during a live shift.",
        "Submit your signed Remote Employee Readiness Memorandum to Operations Director Sarah Jenkins."
      ],
      expectedDeliverables: [
        "Remote Work Readiness Memorandum (Text/Doc)",
        "Emergency Escalation Contact Chain",
        "Verified Shift Schedule Declaration"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-02",
    number: 2,
    level: 1,
    levelTitle: "Level 01: Company Onboarding & Remote Work Foundation",
    department: "Security & Administration",
    title: "Customer Data Privacy (GDPR, CCPA) & PCI-DSS Secure Practices",
    durationHours: 4,
    summary: "Learn strict international data protection regulations, identity verification protocols, and forbidden payment storage procedures.",
    scenario: "An agitated caller demands the shipping address and last known credit card on an account registered to their spouse. Releasing this without authorization violates PCI-DSS and federal privacy laws.",
    managerInstruction: "Audit 5 simulated customer verification transcripts. Flag PII violations, specify correct 3-point authentication rules, and explain why CVV numbers must never be recorded.",
    sopReference: "SOP-05: Customer Data Privacy, PII & PCI-DSS Security",
    sopId: "SOP-05",
    toolsRequired: ["Nexora Security Vault", "PII Redaction Engine", "Nexora Desk"],
    rawDatasetName: "customer_privacy_audit_log.csv",
    rawDatasetType: "customers",
    practicalAssignment: {
      taskTitle: "PII Security Audit & Verification Protocol Response",
      description: "Analyze 5 simulated customer transcripts, identify the severe PII breaches in Transcripts #2 and #4, and write a compliant verification refusal message for an unauthorized third party.",
      stepByStep: [
        "Audit the provided dataset of 5 verification inquiries.",
        "Mark which records pass the 3-point verification standard and which violate GDPR/PCI-DSS.",
        "Write the exact script agents must use when denying account access to an unauthorized family member.",
        "Detail the exact steps to report unauthorized data requests to fraud@nexora-ops.com."
      ],
      expectedDeliverables: [
        "Audit Matrix of 5 Transcripts (Pass/Fail with citations)",
        "Standard Compliant De-identification Script",
        "Data Breach Incident Ticket Draft"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-03",
    number: 3,
    level: 1,
    levelTitle: "Level 01: Company Onboarding & Remote Work Foundation",
    department: "Operations & HR",
    title: "Shift Handover Documentation & Team Asynchronous Workflow",
    durationHours: 3,
    summary: "Establish rigorous end-of-shift handover procedures to ensure 24/7 continuous operations across time zones without dropped customer cases.",
    scenario: "Your shift ends at 17:00 CST with 4 open tier-2 courier investigations and 1 impending VIP SLA breach. Handing this off poorly will trigger customer churn and manager escalation.",
    managerInstruction: "Review your active queue. Create an actionable Shift Handover Memo using Nexora's standardized 4-part structure (Resolved, In-Flight, Blockers, VIP Alerts).",
    sopReference: "SOP-06: Remote Work Administration, Attendance & Shift Handover",
    sopId: "SOP-06",
    toolsRequired: ["Nexora Desk", "Shift Handover Dashboard", "Google Docs / Markdown"],
    rawDatasetName: "shift_handover_queue_snapshot.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Comprehensive Shift Handover Memo",
      description: "Synthesize an active queue of 12 tickets into a clean operational handover report for the incoming Asia-Pacific shift lead.",
      stepByStep: [
        "Filter queue snapshot for tickets with SLA deadlines under 3 hours.",
        "Categorize cases by department (Logistics, Finance, Frontline CS).",
        "Formulate action items for incoming Lead Elena Rostova.",
        "Submit the formatted memo and verify all tracking links are active."
      ],
      expectedDeliverables: [
        "Executive Shift Handover Report",
        "Pending Ticket Action Matrix with Assigned Owners",
        "SLA Risk Warning Flag Table"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-04",
    number: 4,
    level: 1,
    levelTitle: "Level 01: Company Onboarding & Remote Work Foundation",
    department: "Customer Service",
    title: "Remote Professional Writing, Grammar & Brand Voice Guidelines",
    durationHours: 3,
    summary: "Develop clear, concise, empathetic corporate prose free of jargon, passive aggression, or mechanical robotic phrasing.",
    scenario: "A customer received an email containing typos, defensive phrasing ('You should have read our return policy'), and vague delivery timelines. You must rewrite the correspondence to restore customer trust.",
    managerInstruction: "Analyze 3 poorly phrased agent drafts. Rewrite them following Nexora's brand voice: warm, authoritative, accountable, and solutions-oriented.",
    sopReference: "SOP-04: Professional De-escalation & Angry Customer Handling",
    sopId: "SOP-04",
    toolsRequired: ["Nexora Voice Guide", "Nexora Desk Email Composer"],
    rawDatasetName: "unprocessed_email_drafts.csv",
    rawDatasetType: "general",
    practicalAssignment: {
      taskTitle: "Brand Voice Transformation & Macro Rewrites",
      description: "Rewrite 3 defective customer emails into gold-standard Nexora communications with clear next steps and proactive empathy.",
      stepByStep: [
        "Review Nexora Tone & Voice Matrix (Warmth, Clarity, Accountability).",
        "Identify defensive idioms (e.g., 'As per our policy', 'You failed to notify us').",
        "Draft professional rewrites for: (A) Delayed custom order, (B) Partial shipment split, (C) Out-of-stock cancellation.",
        "Add personalized closing signatures with direct tracking lookup links."
      ],
      expectedDeliverables: [
        "3 Rewritten Customer Email Communications",
        "Side-by-side Critique of Deficiencies in Original Drafts",
        "Reusable Macro Template Snippets for Future Shifts"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-05",
    number: 5,
    level: 1,
    levelTitle: "Level 01: Company Onboarding & Remote Work Foundation",
    department: "Operations",
    title: "Understanding Operational KPIs: CSAT, FCR, FRT & SLA Adherence",
    durationHours: 4,
    summary: "Deconstruct the foundational quantitative metrics of contact center operations and learn how personal efficiency influences departmental SLAs.",
    scenario: "The weekly operations report indicates a drop in First Contact Resolution (FCR) from 78% to 64% and an average First Response Time (FRT) climb to 42 minutes.",
    managerInstruction: "Calculate weekly KPI aggregates from raw ticket logs. Identify root causes for SLA slippage and produce an executive KPI summary with 3 corrective actions.",
    sopReference: "SOP-03: Service Level Agreement (SLA) & Priority Triage",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Spreadsheet Workspace", "KPI Calculator", "Nexora Analytics"],
    rawDatasetName: "weekly_agent_kpi_dataset.csv",
    rawDatasetType: "productivity",
    practicalAssignment: {
      taskTitle: "KPI Calculation & Operational Performance Brief",
      description: "Using the raw agent activity log, compute FRT, MTTR (Mean Time to Resolve), FCR %, and CSAT average. Present findings in a structured operational brief.",
      stepByStep: [
        "Import the weekly agent performance dataset into the Spreadsheet Workspace.",
        "Apply AVERAGE and COUNTIF formulas to calculate team benchmark metrics.",
        "Determine which channel (Email vs Chat) experienced the highest breach percentage.",
        "Author a 1-page memo explaining performance bottlenecks and recommended queue balancing."
      ],
      expectedDeliverables: [
        "Completed Excel Workbook with Calculated KPI Table",
        "Variance Analysis vs Target SLAs",
        "Corrective Action Memo to Operations Manager"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 02 (Courses 06-10) =================
  {
    id: "CRS-06",
    number: 6,
    level: 2,
    levelTitle: "Level 02: Customer Service Fundamentals",
    department: "Customer Service",
    title: "The HEAT De-escalation Model for Frustrated & Impatient Customers",
    durationHours: 4,
    summary: "Master psychological de-escalation techniques (Hear, Empathize, Apologize, Take Action) to calm angry customers and resolve disputes.",
    scenario: "Customer Marcus Brody has been waiting 11 days for his high-ticket gaming monitor ($899). He threatens to file a credit card chargeback and post negative viral reviews unless resolved immediately.",
    managerInstruction: "Follow SOP-04. Formulate an end-to-end de-escalation response that defuses anger, accepts company ownership, and delivers an immediate resolution path.",
    sopReference: "SOP-04: Professional De-escalation & Angry Customer Handling (HEAT Framework)",
    sopId: "SOP-04",
    toolsRequired: ["Nexora Desk", "HEAT Response Framework Guide", "OrderTracker"],
    rawDatasetName: "escalated_customer_complaints.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "HEAT De-escalation Case File & Live Dialogue Simulation",
      description: "Author a complete response applying all four HEAT components to Marcus Brody's ticket, and draft the internal resolution ticket note.",
      stepByStep: [
        "Break down customer's message into emotional vs operational pain points.",
        "Draft the opening empathetic acknowledgment without using defensive phrases.",
        "Formulate a compensation offer within frontline limits ($25 store credit + priority overnight reship).",
        "Document the interaction in an internal note for Senior Manager Sarah Jenkins."
      ],
      expectedDeliverables: [
        "Comprehensive De-escalation Email Reply to Customer",
        "Internal CRM Audit Note detailing root cause",
        "Customer Compensation Voucher Authorization Request"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-07",
    number: 7,
    level: 2,
    levelTitle: "Level 02: Customer Service Fundamentals",
    department: "Customer Service",
    title: "Active Listening, Paraphrasing & Identifying Underlying Needs",
    durationHours: 3,
    summary: "Extract critical diagnostic information from convoluted customer narratives to address implicit needs and prevent repeat inquiries.",
    scenario: "A customer submits a 400-word rambling email mentioning delivery issues, broken zipper, billing confusion, and an upcoming anniversary party.",
    managerInstruction: "Deconstruct the multi-layered complaint. Paraphrase the key priorities back to the customer and construct a structured resolution roadmap.",
    sopReference: "SOP-04: Professional De-escalation & Angry Customer Handling",
    sopId: "SOP-04",
    toolsRequired: ["Nexora Desk", "Customer Narrative Analyzer"],
    rawDatasetName: "complex_customer_narratives.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Multi-Issue Customer Triage & Clear Resolution Roadmap",
      description: "Extract the 4 distinct operational issues from customer narrative #1042, organize them into a bulleted action checklist, and formulate the response.",
      stepByStep: [
        "Highlight all factual claims vs personal commentary in the customer's text.",
        "Create a 4-point action checklist addressing each specific question.",
        "Draft the customer reply using numbered clarity to make reading effortless.",
        "Create child sub-tasks in Nexora Desk for Logistics and Billing teams."
      ],
      expectedDeliverables: [
        "Structured Resolution Email with Itemized Answers",
        "Child Task Dispatches for Cross-Functional Teams",
        "FCR Prevention Note"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-08",
    number: 8,
    level: 2,
    levelTitle: "Level 02: Customer Service Fundamentals",
    department: "Customer Support",
    title: "Professional Omnichannel Email Support & Thread Architecture",
    durationHours: 4,
    summary: "Structure clean, professional, multi-party email correspondence including CC hygiene, attachment referencing, and clear calls to action.",
    scenario: "You are coordinating a replacement order involving the buyer, the third-party warehouse dispatcher, and the regional freight carrier.",
    managerInstruction: "Draft a 3-way email communication thread that keeps the customer informed while instructing the warehouse on expedited dispatch.",
    sopReference: "SOP-07: Damaged Goods & Carrier Claims Procedure",
    sopId: "SOP-07",
    toolsRequired: ["Nexora Email Client", "Courier Portal", "Nexora Desk"],
    rawDatasetName: "omnichannel_email_threads.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Multi-Stakeholder Email Dispatch & Coordination",
      description: "Construct the customer notification email and the B2B warehouse dispatch order for an urgent replacement under SOP-07.",
      stepByStep: [
        "Verify order details (SKU: NX-AUDIO-PRO, Order #88219).",
        "Author clear instructions to warehouse operations lead with SKU, shipping tier, and packing slips.",
        "Author the customer reassurance email with expected dispatch tracking ETA.",
        "Submit both drafts and verify tone compliance."
      ],
      expectedDeliverables: [
        "Customer Progress Email with Tracking Link Placeholder",
        "B2B Warehouse Fulfillment Order Dispatch Note",
        "Thread Summary Log"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-09",
    number: 9,
    level: 2,
    levelTitle: "Level 02: Customer Service Fundamentals",
    department: "Customer Support",
    title: "Live Chat Speed, Multitasking & Concurrent Session Management",
    durationHours: 4,
    summary: "Manage 3 concurrent live chat conversations simultaneously without degradation of response speed, accuracy, or personal connection.",
    scenario: "Peak sale hour: You are simultaneously handling (1) a customer inquiring about ring sizing, (2) an upset buyer with a failed discount code, and (3) an address change before order ships.",
    managerInstruction: "Simulate handling all three chats. Maintain an average response time < 45 seconds while following respective SOPs and verifying security.",
    sopReference: "SOP-05: Customer Data Privacy & SOP-03 SLA Standards",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Live Chat Simulator", "Quick Macros Library", "OrderTracker"],
    rawDatasetName: "concurrent_live_chat_sessions.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Triple Concurrent Live Chat Simulation Run",
      description: "Successfully navigate three concurrent chat sessions in the Live Chat Simulator, achieving >90% satisfaction and zero SLA breaches.",
      stepByStep: [
        "Open the Live Chat Simulation workspace.",
        "Accept Chat A (Address Change), Chat B (Promo Code Issue), and Chat C (Product Sizing).",
        "Deploy relevant canned macros with personalized edits.",
        "Export the conversation logs and submit performance scorecard."
      ],
      expectedDeliverables: [
        "3 Complete Chat Transcript Logs",
        "Concurrent Handling Self-Evaluation Report",
        "Macro Efficiency Improvement Suggestions"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-10",
    number: 10,
    level: 2,
    levelTitle: "Level 02: Customer Service Fundamentals",
    department: "Customer Service & Voice",
    title: "Phone Support Etiquette, Call Control & Professional Phrasing",
    durationHours: 4,
    summary: "Develop verbal call control techniques, professional hold procedures, active listening markers, and polite redirection during voice support.",
    scenario: "A customer on phone queue has been waiting 14 minutes and immediately starts speaking rapidly about a missing delivery. You must calm them and steer the conversation efficiently.",
    managerInstruction: "Review audio transcript. Create a call control flow diagram, script professional hold statements, and write the concluding call wrap-up documentation.",
    sopReference: "SOP-04: Professional De-escalation & SOP-08 Lost In Transit",
    sopId: "SOP-04",
    toolsRequired: ["Nexora Voice Portal Simulator", "Call Wrap-Up Logger"],
    rawDatasetName: "phone_call_audio_transcripts.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Call Scripting & Post-Call Wrap-up Documentation",
      description: "Write the verbatim dialogue script showing call control, hold placement, resolution agreement, and create the subsequent CRM Call Wrap-Up record.",
      stepByStep: [
        "Identify 3 points where the caller diverged from the core issue.",
        "Script polite redirection techniques ('I understand completely; to get your refund approved right now, may I verify your billing zip code?').",
        "Draft the 2-minute hold authorization and return acknowledgment.",
        "Complete the Nexora Call Log Record with disposition tags."
      ],
      expectedDeliverables: [
        "Verbatim Call Control Script",
        "Completed CRM Call Wrap-up Log",
        "Hold Time & Wrap Time Optimization Analysis"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 03 (Courses 11-15) =================
  {
    id: "CRS-11",
    number: 11,
    level: 3,
    levelTitle: "Level 03: Spreadsheet & Data Administration",
    department: "Operations & Data Administration",
    title: "Spreadsheet Fundamentals: SUM, COUNT, COUNTA & Data Cleaning",
    durationHours: 5,
    summary: "Cleanse dirty e-commerce customer exports, remove trailing whitespaces, correct malformed phone numbers, and calculate baseline totals.",
    scenario: "Marketing uploaded a messy CSV of 100 customer records with duplicate entries, blank cells, inconsistent casing, and missing totals. Operations cannot import this into the new CRM without sanitization.",
    managerInstruction: "Open the raw customer dataset in the Spreadsheet Workspace. Apply TRIM, proper casing, detect duplicates, and compute total customer count and aggregate spend using SUM and COUNTA.",
    sopReference: "SOP-05: Customer Data Privacy & Data Administration Guidelines",
    sopId: "SOP-05",
    toolsRequired: ["Nexora Spreadsheet Workspace", "Excel / Google Sheets Engine"],
    rawDatasetName: "raw_customer_database_uncleaned.csv",
    rawDatasetType: "customers",
    practicalAssignment: {
      taskTitle: "Customer Database Cleansing & Summary Workbook",
      description: "Sanitize the 100-row customer database, eliminate duplicates, and construct a summary statistics table using SUM, COUNT, and COUNTA formulas.",
      stepByStep: [
        "Load 'raw_customer_database_uncleaned.csv' into the Spreadsheet Workspace.",
        "Detect and highlight duplicate Customer IDs.",
        "Clean email addresses and format currency columns.",
        "Calculate Total Customers (COUNTA), Total Lifetime Spend (SUM), and Average Spend in the KPI block.",
        "Export the verified XLSX and submit the formula summary."
      ],
      expectedDeliverables: [
        "Cleaned Downloadable XLSX Workbook",
        "Audit Trail of Removed Duplicates & Errors",
        "Formula Syntax Summary Sheet"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-12",
    number: 12,
    level: 3,
    levelTitle: "Level 03: Spreadsheet & Data Administration",
    department: "Operations & Data Administration",
    title: "Conditional Aggregation: COUNTIF, SUMIF & Category Breakdown",
    durationHours: 5,
    summary: "Analyze customer support ticket volumes and refund amounts by category and tier using conditional formulas.",
    scenario: "Management needs to know the total refund dollars issued specifically for 'Damaged Goods' versus 'Buyer Remorse', and how many tickets each support agent resolved.",
    managerInstruction: "Use COUNTIF and SUMIF to build an automated Category Breakdown Table in the Spreadsheet Workspace. Compare VIP refunds versus Standard refunds.",
    sopReference: "SOP-01: Return Authorization & SOP-03 SLA Standards",
    sopId: "SOP-01",
    toolsRequired: ["Nexora Spreadsheet Workspace", "Excel / CSV Exporter"],
    rawDatasetName: "refunds_and_returns_raw_log.csv",
    rawDatasetType: "refunds",
    practicalAssignment: {
      taskTitle: "Automated Refund Category & Agent Volume Breakdown",
      description: "Calculate conditional sums and counts across 60 refund records. Generate a manager summary showing total payout by return reason.",
      stepByStep: [
        "Open the refunds dataset in the Spreadsheet Workspace.",
        "Create formula cells: =COUNTIF(Range, \"Damaged Goods\"), =SUMIF(Range, \"Damaged Goods\", AmountRange).",
        "Build a summary table for all 4 primary return reasons.",
        "Calculate the % share of total refunds for each category.",
        "Export the workbook and write a 3-bullet insight memo."
      ],
      expectedDeliverables: [
        "Completed Spreadsheet with Working COUNTIF & SUMIF Formulas",
        "Refund Category Breakdown Table with Percentage Shares",
        "Executive Summary Memo on Top Refund Drivers"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-13",
    number: 13,
    level: 3,
    levelTitle: "Level 03: Spreadsheet & Data Administration",
    department: "Operations & Data Administration",
    title: "Logical Functions: IF, AND, OR, IFERROR & SLA Flags",
    durationHours: 5,
    summary: "Build dynamic logical columns that automatically flag SLA breaches, high-value refunds requiring manager approval, and churn risk accounts.",
    scenario: "Operations needs an automated column in the ticket log that flags 'SLA BREACH' if resolution time exceeds 24 hours, and 'URGENT OVERRIDE' if refund is over $250.",
    managerInstruction: "Implement nested IF and IFERROR statements to automate risk scoring and approval requirements on 50 operational cases.",
    sopReference: "SOP-01: Refund Protocol & SOP-03 SLA Management",
    sopId: "SOP-01",
    toolsRequired: ["Nexora Spreadsheet Workspace", "Excel Formula Engine"],
    rawDatasetName: "operational_tickets_sla_log.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Dynamic SLA & Approval Flag Logic Model",
      description: "Add 3 calculated logic columns using IF and IFERROR: (1) Breach Status, (2) Manager Override Required, (3) Risk Level.",
      stepByStep: [
        "Import the operational ticket log into the Spreadsheet.",
        "Construct Column G formula: =IF(HoursToResolve>24, \"BREACHED\", \"COMPLIANT\").",
        "Construct Column H formula: =IF(RefundAmount>250, \"MGR OVERRIDE REQUIRED\", \"AUTO-APPROVE\").",
        "Wrap all formulas in IFERROR to prevent broken #N/A or #VALUE cells.",
        "Verify count of breached tickets and export sheet."
      ],
      expectedDeliverables: [
        "Spreadsheet with Nested IF and IFERROR Logic Columns",
        "Summary of Flagged High-Risk & Breached Records",
        "Audit Verification Checklist"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-14",
    number: 14,
    level: 3,
    levelTitle: "Level 03: Spreadsheet & Data Administration",
    department: "Operations & Data Administration",
    title: "Relational Lookups: VLOOKUP & Modern XLOOKUP for Customer Records",
    durationHours: 6,
    summary: "Master VLOOKUP and XLOOKUP to link customer transactions, tracking IDs, customer loyalty tiers, and contact details across distinct sheets.",
    scenario: "You have a list of 40 unassigned warranty claims that only contain Customer IDs. You must pull customer email, lifetime spend, and membership tier from the Master Customer Database.",
    managerInstruction: "Perform relational lookups using both VLOOKUP and modern XLOOKUP. Handle missing IDs gracefully without formulas erroring out.",
    sopReference: "SOP-05: Customer Data Administration & Verification",
    sopId: "SOP-05",
    toolsRequired: ["Nexora Spreadsheet Workspace", "VLOOKUP/XLOOKUP Engine"],
    rawDatasetName: "warranty_claims_unlinked.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Relational CRM Data Integration via XLOOKUP",
      description: "Enrich the 40 warranty claim records by populating Customer Name, Tier, and Spend from the Customer Master sheet using XLOOKUP/VLOOKUP.",
      stepByStep: [
        "Open the dual-sheet workbook in the Spreadsheet Workspace.",
        "Enter lookup formula in Column C: =XLOOKUP(A2, Master!A:A, Master!B:B, \"Not Found\").",
        "Enter lookup formula for Customer Tier and Lifetime Spend.",
        "Identify 3 invalid Customer IDs that failed lookups and investigate.",
        "Export the enriched dataset as XLSX."
      ],
      expectedDeliverables: [
        "Enriched 40-Row Warranty Dataset with Functional Lookups",
        "Discrepancy Log for Unmatched Customer IDs",
        "Comparative Analysis of VLOOKUP vs XLOOKUP Syntax"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-15",
    number: 15,
    level: 3,
    levelTitle: "Level 03: Spreadsheet & Data Administration",
    department: "Operations & Data Administration",
    title: "Pivot Tables, Filters & Conditional Formatting for Daily Ops Reports",
    durationHours: 5,
    summary: "Transform raw contact center tabular logs into dynamic visual management dashboards highlighting top ticket drivers and agent productivity.",
    scenario: "Director Sarah Jenkins needs a daily operational reporting dashboard showing total tickets handled per agent, average CSAT by channel, and heat-mapped SLA breach zones.",
    managerInstruction: "Create a Pivot Table summary and apply Conditional Formatting rules (Green for CSAT ≥ 4.5, Red for SLA Breaches) to the weekly operations log.",
    sopReference: "SOP-03: SLA Management & Operations Standards",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Spreadsheet Workspace", "Pivot Table Engine", "Excel Exporter"],
    rawDatasetName: "weekly_contact_center_master_log.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Daily Operations Pivot Dashboard & Heatmap",
      description: "Generate a multi-dimensional summary table aggregating ticket volume by Agent and Channel, formatted with color scales and KPI cards.",
      stepByStep: [
        "Import the master log of 80 contacts into the Spreadsheet Workspace.",
        "Filter by date to isolate the current operational workweek.",
        "Group records by Support Channel (Email, Chat, Phone) and calculate average CSAT.",
        "Apply 3-tier conditional color formatting across SLA resolution time.",
        "Export the final report as an XLSX workbook."
      ],
      expectedDeliverables: [
        "Interactive Daily Operations Pivot Table Report",
        "Color-Coded Heatmap Sheet with SLA Highlighting",
        "1-Page Executive Operations Briefing Memo"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 04 (Courses 16-20) =================
  {
    id: "CRS-16",
    number: 16,
    level: 4,
    levelTitle: "Level 04: CRM & Ticketing System",
    department: "Customer Operations",
    title: "Nexora Desk Architecture: Ticket Life Cycle, Views & Status Flow",
    durationHours: 4,
    summary: "Navigate enterprise ticketing platforms (Zendesk / Freshdesk style), master ticket statuses (New, Open, Pending, Solved, Closed), and custom views.",
    scenario: "A batch of 25 incoming customer tickets was dumped into the unassigned queue. Some are urgent VIP payment failures, while others are general marketing inquiries.",
    managerInstruction: "Triage the incoming queue. Sort tickets by priority, assign them to correct department views, and apply initial triage tags.",
    sopReference: "SOP-03: SLA & Priority Triage",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Desk", "Ticket Triage Engine", "Queue Views"],
    rawDatasetName: "unassigned_ticket_dump.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Incoming Ticket Triage & Queue Organization",
      description: "Classify 20 raw tickets into their respective departmental queues (Support, Logistics, Billing) and assign priority flags (Urgent, High, Med, Low).",
      stepByStep: [
        "Open Nexora Desk and navigate to Unassigned Tickets.",
        "Review each ticket subject and customer history.",
        "Apply correct Status (Open vs Pending), Priority, and Department tag.",
        "Ensure all Gold VIP tickets are tagged #VIP-URGENT with <15m SLA target.",
        "Submit the triaged queue confirmation."
      ],
      expectedDeliverables: [
        "Triaged Queue Audit Sheet with 20 Classified Records",
        "SLA Assignment Summary Matrix",
        "Queue Health Health Check Report"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-17",
    number: 17,
    level: 4,
    levelTitle: "Level 04: CRM & Ticketing System",
    department: "Customer Operations",
    title: "Canned Responses, Macros & Dynamic Field Personalization",
    durationHours: 4,
    summary: "Utilize macro automation safely without sounding robotic by personalizing customer placeholders, order references, and empathy openers.",
    scenario: "Customer complaints show that agents are sending canned macros without changing the placeholder text (e.g., 'Dear [Customer Name]'). This severely hurts CSAT.",
    managerInstruction: "Create 4 standardized Nexora Macros for common scenarios. Test them in simulated tickets by properly injecting personalized variables and contextual advice.",
    sopReference: "SOP-04: Professional De-escalation & Brand Voice",
    sopId: "SOP-04",
    toolsRequired: ["Nexora Desk Macro Studio", "CRM Template Engine"],
    rawDatasetName: "macro_templates_library.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Standardized Macro Suite Creation & Personalized Deployment",
      description: "Develop 4 compliant macro templates (Refund Confirmation, Courier Delay, Damaged Goods Photo Request, Address Verification) with dynamic variables.",
      stepByStep: [
        "Write macro templates utilizing variables like {{customer.first_name}}, {{order.id}}, and {{carrier.tracking_link}}.",
        "Deploy each macro into an active simulated ticket in Nexora Desk.",
        "Add tailored personalized sentences to prove human ownership.",
        "Verify macro adherence to brand voice and submit."
      ],
      expectedDeliverables: [
        "4 Standardized Production-Ready Macro Templates",
        "3 Sample Applied Ticket Responses demonstrating customization",
        "Macro Quality Control Checklist"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-18",
    number: 18,
    level: 4,
    levelTitle: "Level 04: CRM & Ticketing System",
    department: "Customer Operations",
    title: "Internal Notes, Cross-Department Mentions & Collaboration Etiquette",
    durationHours: 3,
    summary: "Document case history cleanly using internal private notes that colleagues and managers can immediately understand without exposing internal commentary to the customer.",
    scenario: "A package was lost due to a warehouse mispick. You must communicate with Warehouse Logistics and Billing without putting sensitive internal blame on the customer-facing reply.",
    managerInstruction: "Document the ticket using private internal notes (@warehouse-lead). Ensure confidential fulfillment codes and internal carrier claim numbers remain private.",
    sopReference: "SOP-02: Incident Escalation & Tier-2 Transfer Matrix",
    sopId: "SOP-02",
    toolsRequired: ["Nexora Desk Internal Notes", "OrderTracker Internal Log"],
    rawDatasetName: "warehouse_discrepancy_tickets.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Private Internal Note Logging & Cross-Department Dispatch",
      description: "Draft both the customer-facing update and the private internal note for Case #NX-9918 detailing warehouse mispick and carrier claim #CL-4410.",
      stepByStep: [
        "Review Case #NX-9918 details.",
        "Draft the Private Internal Note using the standard 4-point structure (Issue, Root Cause, Action Taken, Next Step).",
        "Draft the polite, reassuring public customer response.",
        "Verify that no private notes were accidentally marked as public."
      ],
      expectedDeliverables: [
        "Internal Note Record with @mention dispatch syntax",
        "Public Customer Reassurance Message",
        "Confidentiality & Internal Security Checklist"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-19",
    number: 19,
    level: 4,
    levelTitle: "Level 04: CRM & Ticketing System",
    department: "Customer Operations",
    title: "Ticket Merging, Splitting, Tagging & Contact History Hygiene",
    durationHours: 4,
    summary: "Maintain pristine CRM contact records by merging duplicate customer tickets, splitting unrelated inquiries, and applying taxonomy tags.",
    scenario: "Customer Jonathan Reyes submitted 4 separate tickets in 2 hours via chat, web form, and email regarding the same delayed order #5512.",
    managerInstruction: "Identify duplicate tickets, execute a clean ticket merge into the primary ticket with audit notes, and tag with #MERGED-DUPLICATE.",
    sopReference: "SOP-03: SLA Standards & Queue Management",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Desk Merge Utility", "Customer 360 CRM"],
    rawDatasetName: "duplicate_customer_inquiries.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "CRM Ticket Consolidation & Contact Record Audit",
      description: "Perform simulated merge of 4 redundant tickets from Jonathan Reyes into Master Ticket #NX-3301 and clean the customer CRM timeline.",
      stepByStep: [
        "Inspect the 4 incoming tickets from Jonathan Reyes.",
        "Designate the primary ticket containing the most complete context.",
        "Execute the simulated merge with explanatory internal note.",
        "Apply uniform tagging taxonomy (#SHIPPING-DELAY, #CARRIER-FEDEX, #TIER-STANDARD).",
        "Submit the consolidated ticket record."
      ],
      expectedDeliverables: [
        "Master Merged Ticket Summary Log",
        "Audit Trail of Closed Secondary Tickets",
        "CRM Contact History Hygiene Documentation"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-20",
    number: 20,
    level: 4,
    levelTitle: "Level 04: CRM & Ticketing System",
    department: "Customer Operations",
    title: "SLA Countdown Management, Breach Avoidance & Re-open Handling",
    durationHours: 4,
    summary: "Monitor active countdown timers, manage automated reminders, and prevent ticket re-open loops caused by thank-you replies.",
    scenario: "Your assigned queue has 6 tickets with less than 20 minutes before SLA breach. Additionally, 3 solved tickets re-opened because customers replied 'Thank you!'.",
    managerInstruction: "Prioritize the at-risk tickets, send intermediate touchpoints to reset first-response SLA, and properly resolve the re-opened thank-you tickets.",
    sopReference: "SOP-03: SLA & Priority Triage",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Desk SLA Radar", "Queue Triage Bar"],
    rawDatasetName: "at_risk_sla_tickets.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "SLA Emergency Clearance & Re-open Queue Protocol",
      description: "Clear an urgent queue of 6 at-risk tickets, preventing 100% of breaches, and properly categorize the 3 re-opened thank-you tickets.",
      stepByStep: [
        "Sort tickets by Remaining SLA in ascending order.",
        "Deploy high-priority interim touchpoint messages to the 2 imminent breach cases.",
        "Review the 3 re-opened cases; confirm all customer concerns were resolved.",
        "Close the re-opened tickets with tag #RESOLVED-THANK-YOU to prevent false reopen metrics.",
        "Submit final queue compliance report."
      ],
      expectedDeliverables: [
        "SLA Breach Prevention Log showing 0 Breaches",
        "Customer Interim Touchpoint Transcripts",
        "Re-open Rate Mitigation Analysis"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 05 (Courses 21-25) =================
  {
    id: "CRS-21",
    number: 21,
    level: 5,
    levelTitle: "Level 05: Advanced Customer Support",
    department: "Escalations & Customer Support",
    title: "Managing Highly Combative Customers, Harassment & Disconnection Protocols",
    durationHours: 4,
    summary: "Apply boundary setting, formal warning scripts, and authorized disconnection protocols when facing personal insults or profanity.",
    scenario: "A customer in live chat uses personal insults against an agent after being told a return is 4 months past policy. The agent must enforce company boundaries professionally.",
    managerInstruction: "Follow SOP-04 strict boundary rules. Issue the standard 2-strike warning, document verbatim quotes in the internal log, and execute clean disconnection if abuse continues.",
    sopReference: "SOP-04: Professional De-escalation & Boundary Protocols",
    sopId: "SOP-04",
    toolsRequired: ["Nexora Desk Chat Logger", "Harassment Incident Report Form"],
    rawDatasetName: "abusive_customer_transcript.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Harassment Boundary Enforcement & Incident Log",
      description: "Produce the verbatim agent script following the 2-strike rule and complete the formal Harassment & Account Review Incident Report.",
      stepByStep: [
        "Review the abusive chat transcript.",
        "Draft Warning 1: Professional boundary setting.",
        "Draft Warning 2: Final notice of session termination.",
        "Draft closing termination statement.",
        "Complete the HR/Security Incident Form and submit for manager review."
      ],
      expectedDeliverables: [
        "Verbatim 2-Strike Warning Sequence Script",
        "Formal Incident Escalation Form to Security",
        "Post-Incident Customer Profile Risk Assessment"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-22",
    number: 22,
    level: 5,
    levelTitle: "Level 05: Advanced Customer Support",
    department: "Escalations & Legal Ops",
    title: "Handling Threats of Legal Action, Regulatory Agencies & Chargebacks",
    durationHours: 4,
    summary: "Safely navigate customers claiming 'I am contacting my lawyer / the FTC / filing a credit card dispute' without admitting company liability.",
    scenario: "A customer states: 'I am filing a formal complaint with the State Attorney General and disputing this $420 charge with Chase Bank unless I get cash back today.'",
    managerInstruction: "Adhere to SOP-02 Legal Escalation guidelines. Cease informal negotiations, deliver the approved Legal Channel Statement, and transfer ticket to Executive Operations.",
    sopReference: "SOP-02: Incident Escalation & Tier-2 Transfer Matrix",
    sopId: "SOP-02",
    toolsRequired: ["Nexora Desk Legal Queue", "Legal Dispatch Macro"],
    rawDatasetName: "regulatory_threat_cases.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Legal Threat Quarantine & Executive Escalate Protocol",
      description: "Draft the legally compliant customer communication, freeze direct modifications, and tag ticket #LEGAL-ESC for Executive Ops review.",
      stepByStep: [
        "Identify the legal trigger keywords in Case #NX-7741.",
        "Draft the customer reply strictly adhering to SOP-02 approved legal language.",
        "Apply the #LEGAL-ESC tag and transfer ticket to Tier-2 Legal queue.",
        "Write the internal summary note for Legal Counsel."
      ],
      expectedDeliverables: [
        "Compliant Legal Channel Customer Notification",
        "Executive Summary Note for In-House Legal Team",
        "Risk Mitigation Checklist"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-23",
    number: 23,
    level: 5,
    levelTitle: "Level 05: Advanced Customer Support",
    department: "Fraud & Trust Operations",
    title: "Friendly Fraud, Chargeback Prevention & Transaction Discrepancies",
    durationHours: 5,
    summary: "Identify friendly fraud patterns (wardrobing, false 'item not received' claims, chargeback threats) and collect dispute defense evidence.",
    scenario: "Customer has initiated 3 returns in 45 days, claiming the box was empty each time, while courier weight scans show 4.2 kg at delivery point.",
    managerInstruction: "Audit the customer's transaction and courier weight logs. Compile evidence package for Fraud Lead Tariq Al-Mansoor to dispute the bank chargeback.",
    sopReference: "SOP-05: PII & Security & SOP-08 Lost In Transit Investigations",
    sopId: "SOP-08",
    toolsRequired: ["Nexora Fraud Tracker", "Courier Weight Verification Portal"],
    rawDatasetName: "fraud_investigation_dossier.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Friendly Fraud Investigation Dossier & Chargeback Defense",
      description: "Analyze courier weight scans, delivery photos, and account purchase history to build an evidence packet contesting Fraud Claim #FB-902.",
      stepByStep: [
        "Compare shipping weight at dispatch (4.2 kg) vs carrier delivery scan.",
        "Cross-reference customer IP location with delivery GPS coordinates.",
        "Synthesize evidence into the Nexora Chargeback Defense Document.",
        "Submit recommendation for account restriction or warning."
      ],
      expectedDeliverables: [
        "Chargeback Defense Evidence Packet",
        "Courier Discrepancy Timeline Analysis",
        "Account Risk Status Recommendation (Active/Flagged/Banned)"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-24",
    number: 24,
    level: 5,
    levelTitle: "Level 05: Advanced Customer Support",
    department: "VIP Operations",
    title: "White-Glove VIP Support & High Lifetime-Value (LTV) Account Handling",
    durationHours: 4,
    summary: "Deliver personalized, proactive, high-touch support to Gold VIP accounts whose lifetime spend exceeds $10,000.",
    scenario: "VIP client Victoria Sterling (LTV $18,400) received a damaged designer silk dress 2 hours before a televised gala. Standard return protocol will destroy the relationship.",
    managerInstruction: "Exercise VIP policy exemptions per SOP-01 and SOP-07. Authorize immediate courier messenger replacement or emergency local concierge reimbursement.",
    sopReference: "SOP-01: Return Authorization & SOP-07 Carrier Claims",
    sopId: "SOP-01",
    toolsRequired: ["VIP Concierge Portal", "Emergency Expense Authorizer"],
    rawDatasetName: "vip_customer_profiles.csv",
    rawDatasetType: "customers",
    practicalAssignment: {
      taskTitle: "VIP White-Glove Emergency Resolution Plan",
      description: "Formulate an urgent bespoke resolution plan for Victoria Sterling, author the personal phone script/email, and draft the manager expense override.",
      stepByStep: [
        "Review Victoria Sterling's VIP profile and order history.",
        "Identify allowable VIP exemptions under Nexora SOPs.",
        "Draft the high-touch personalized email offering immediate local courier dispatch.",
        "Submit the VIP Expense Override Voucher ($180) to Manager Sarah Jenkins."
      ],
      expectedDeliverables: [
        "High-Touch VIP Communication Draft",
        "Emergency Expense Override Justification Form",
        "VIP Retention Follow-Up Schedule"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-25",
    number: 25,
    level: 5,
    levelTitle: "Level 05: Advanced Customer Support",
    department: "Crisis Communications",
    title: "Crisis Communications: Warehouse Fires, Carrier Outages & Mass Delays",
    durationHours: 5,
    summary: "Coordinate large-scale crisis customer communications during systemic delivery failures, hurricane shutdowns, and carrier network outages.",
    scenario: "A major snowstorm in Memphis shut down FedEx hub operations, delaying 1,400 Nexora orders by 4 to 6 business days. Incoming ticket volume surged by 400%.",
    managerInstruction: "Draft the public customer broadcast email, build a proactive tracking notification macro, and establish priority triage for critical medicinal/perishable orders.",
    sopReference: "SOP-03: SLA Standards & SOP-04 De-escalation",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Broadcast Center", "Nexora Desk Mass Actions"],
    rawDatasetName: "weather_delay_manifest_1400_orders.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Mass Delay Crisis Communication & Queue Shield Plan",
      description: "Author the proactive crisis email to affected buyers, create the crisis macro for frontline agents, and design a priority triage filter for perishable shipments.",
      stepByStep: [
        "Analyze the delayed shipment manifest to isolate medical and urgent orders.",
        "Draft the mass customer notification with clear carrier updates and honest timelines.",
        "Create the frontline 'Snowstorm Crisis' quick macro.",
        "Submit the crisis triage action plan to Director Sarah Jenkins."
      ],
      expectedDeliverables: [
        "Proactive Crisis Email Broadcast Copy",
        "Frontline Agent Rapid-Response Macro",
        "High-Risk Perishable Order Triage Matrix"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 06 (Courses 26-30) =================
  {
    id: "CRS-26",
    number: 26,
    level: 6,
    levelTitle: "Level 06: E-commerce & Marketplace Operations",
    department: "E-Commerce Operations",
    title: "E-Commerce Order Management Systems (OMS) & Fulfillment Workflows",
    durationHours: 4,
    summary: "Track the complete lifecycle of e-commerce orders from placement, payment capture, warehouse picking/packing, to carrier handoff and delivery.",
    scenario: "Customer order #88921 has been stuck in 'Processing - Pick Wave 14' for 72 hours while inventory shows 0 units available in the Chicago warehouse.",
    managerInstruction: "Investigate OrderTracker status. Identify warehouse stockout, execute split-shipment routing from the Dallas warehouse, and notify customer.",
    sopReference: "SOP-07: Logistics & Fulfillment Guidelines",
    sopId: "SOP-07",
    toolsRequired: ["Nexora OrderTracker", "Warehouse Inventory Hub"],
    rawDatasetName: "order_lifecycle_tracking_log.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "OMS Order Flow Investigation & Split-Shipment Reroute",
      description: "Analyze the stuck order record, document the fulfillment bottleneck, execute the multi-warehouse routing order, and draft the customer update.",
      stepByStep: [
        "Open OrderTracker and query Order #88921.",
        "Identify the inventory deficit for SKU NX-GEAR-09.",
        "Issue the split-shipment reroute order to Warehouse #2 (Dallas).",
        "Send customer update detailing that items will arrive in 2 separate shipments with distinct tracking IDs."
      ],
      expectedDeliverables: [
        "Fulfillment Bottleneck Incident Report",
        "Split-Shipment Rerouting Order Confirmation",
        "Customer Transparent Delivery Update Email"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-27",
    number: 27,
    level: 6,
    levelTitle: "Level 06: E-commerce & Marketplace Operations",
    department: "Finance & Operations",
    title: "Payment Gateways: Stripe, PayPal, Authorizations & Captured Funds",
    durationHours: 4,
    summary: "Understand credit card authorization holds, payment capture, settlements, gateway charge errors, and duplicate pending charges.",
    scenario: "A customer sees two pending charges of $149.99 on their Chase card for a single order and furiously claims Nexora stole their money.",
    managerInstruction: "Check payment gateway log. Differentiate between an authorization hold and a settled transaction. Write the banking explanation email to calm customer.",
    sopReference: "SOP-01: Refund Protocol & SOP-05 PCI-DSS",
    sopId: "SOP-01",
    toolsRequired: ["Nexora Payment Gateway Terminal", "Stripe Simulator"],
    rawDatasetName: "payment_gateway_transaction_logs.csv",
    rawDatasetType: "refunds",
    practicalAssignment: {
      taskTitle: "Authorization vs Capture Reconciliation & Customer Explanation",
      description: "Review payment transaction IDs, identify the voided pending pre-authorization, and draft the financial clarification email to the customer.",
      stepByStep: [
        "Inspect Stripe transaction log for Order #55410.",
        "Confirm Transaction A is Settled ($149.99) and Transaction B is Voided/Pending ($149.99).",
        "Author the customer email clearly explaining banking hold mechanics (3-5 business days release).",
        "Provide bank ARN (Acquirer Reference Number) for customer's credit card company."
      ],
      expectedDeliverables: [
        "Customer Financial Clarification Email with Bank ARN",
        "Gateway Audit Log Screenshot Summary",
        "Payment Dispute Avoidance Guide"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-28",
    number: 28,
    level: 6,
    levelTitle: "Level 06: E-commerce & Marketplace Operations",
    department: "Logistics Operations",
    title: "Processing Return Merchandise Authorizations (RMA) & Restocking Fees",
    durationHours: 4,
    summary: "Generate prepaid return labels, audit return conditions upon warehouse receipt, and calculate restocking deductions per policy.",
    scenario: "Customer returned an espresso machine that was used, unboxed, and missing the portafilter accessory. SOP-01 stipulates a 20% restocking fee for missing parts.",
    managerInstruction: "Calculate net refund amount after 20% restocking fee deduction. Draft RMA outcome letter with photo breakdown explaining the deduction.",
    sopReference: "SOP-01: Return Authorization & Refund Protocol",
    sopId: "SOP-01",
    toolsRequired: ["Nexora RMA Portal", "Nexora Spreadsheet Workspace"],
    rawDatasetName: "warehouse_rma_inspection_reports.csv",
    rawDatasetType: "refunds",
    practicalAssignment: {
      taskTitle: "RMA Inspection Assessment & Restocking Deduction Notice",
      description: "Process RMA #RMA-8840, calculate net refund ($199.99 purchase - $39.99 restocking fee = $160.00), and write the customer notification.",
      stepByStep: [
        "Review Warehouse Inspection Report for RMA #RMA-8840.",
        "Verify missing parts against SKU BOM (Bill of Materials).",
        "Compute exact deduction and net payout.",
        "Author professional, policy-compliant explanation email citing SOP-01 guidelines."
      ],
      expectedDeliverables: [
        "RMA Financial Calculation Worksheet",
        "Customer Restocking Fee Notice with Itemized Breakdown",
        "Warehouse Final Sign-Off Memo"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-29",
    number: 29,
    level: 6,
    levelTitle: "Level 06: E-commerce & Marketplace Operations",
    department: "Inventory Operations",
    title: "Inventory Discrepancies, Backorders, Dropshipping & Stockouts",
    durationHours: 4,
    summary: "Manage inventory synchronization failures between Shopify/Amazon and ERP, communicate backorder timelines, and offer suitable product substitutions.",
    scenario: "A flash sale caused 80 orders for SKU NX-WATCH-BLK to oversell due to API lag. Replacement stock will not arrive for 3 weeks.",
    managerInstruction: "Draft an operational backorder management plan. Offer customers choice between waiting with 15% discount, immediate refund, or upgraded model.",
    sopReference: "SOP-03: SLA Standards & SOP-01 Refund Protocol",
    sopId: "SOP-01",
    toolsRequired: ["Nexora ERP Simulator", "Nexora Desk Email Hub"],
    rawDatasetName: "backordered_sku_manifest.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Oversell Crisis Management & 3-Choice Customer Resolution",
      description: "Build the customer choice matrix (Wait + Discount, Immediate Full Refund, or Complimentary Upgrade to NX-WATCH-PRO) and script the communications.",
      stepByStep: [
        "Examine the 80 affected orders and customer lifetime values.",
        "Draft the 3-option customer notification email.",
        "Create an operational tracking sheet to record customer responses.",
        "Submit the project plan to Operations Director Sarah Jenkins."
      ],
      expectedDeliverables: [
        "Customer 3-Choice Resolution Email Draft",
        "Backorder Choice Tracking Template (Spreadsheet)",
        "Financial Impact & Margin Analysis"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-30",
    number: 30,
    level: 6,
    levelTitle: "Level 06: E-commerce & Marketplace Operations",
    department: "Logistics Operations",
    title: "Carrier Investigations: FedEx, UPS, DHL & Freight Claims Filing",
    durationHours: 5,
    summary: "File official carrier loss and damage claims, track GPS scan coordinates, and recover company funds from shipping couriers.",
    scenario: "A shipment of 5 commercial drones ($3,200) was marked delivered by FedEx at 14:22, but the delivery photo shows an unfamiliar vacant commercial lot.",
    managerInstruction: "Gather shipping manifest, GPS coordinates, and commercial invoice. File official FedEx Freight Claim #CL-9982 per SOP-08.",
    sopReference: "SOP-08: Lost In Transit & SOP-07 Carrier Claims",
    sopId: "SOP-08",
    toolsRequired: ["FedEx / UPS Carrier Claims Portal", "Nexora Claims Logger"],
    rawDatasetName: "carrier_freight_claim_dossier.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Formal Courier Claim Filing & Customer Replacement",
      description: "Complete the official Carrier Claim Form with GPS variance proof, and authorize the high-value replacement shipment for the enterprise customer.",
      stepByStep: [
        "Extract shipment manifest and delivery geo-coordinates.",
        "Compare delivery photo GPS with customer verified address.",
        "Complete Carrier Loss Claim Submission with commercial invoice.",
        "Draft customer update confirming zero liability and dispatching priority replacement."
      ],
      expectedDeliverables: [
        "Completed Carrier Loss Claim Packet",
        "GPS Delivery Discrepancy Evidence Brief",
        "Customer Priority Reshipment Notice"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 07 (Courses 31-35) =================
  {
    id: "CRS-31",
    number: 31,
    level: 7,
    levelTitle: "Level 07: Customer Experience & Quality Assurance",
    department: "Quality Assurance",
    title: "QA Auditing: 5-Pillar Scorecard (Accuracy, Tone, SOP, Grammar, Speed)",
    durationHours: 5,
    summary: "Perform objective QA audits on junior agent ticket transcripts using Nexora's standardized 100-point quality assurance scorecard.",
    scenario: "You are acting as an Assistant QA Auditor. You must evaluate 5 randomly selected ticket interactions handled by Trainee Kevin Park and score them objectively.",
    managerInstruction: "Audit all 5 tickets against the 5-pillar rubric. Point out specific areas where Kevin skipped PII verification or used defensive language.",
    sopReference: "SOP-04: Professional De-escalation & SOP-05 Data Privacy",
    sopId: "SOP-05",
    toolsRequired: ["Nexora QA Audit Hub", "Agent Scorecard Engine"],
    rawDatasetName: "trainee_transcripts_for_qa_audit.csv",
    rawDatasetType: "csat",
    practicalAssignment: {
      taskTitle: "Comprehensive 5-Ticket QA Audit & Coaching Feedback",
      description: "Evaluate 5 agent ticket transcripts using the 100-point rubric, calculate individual and aggregate QA scores, and write constructive coaching notes.",
      stepByStep: [
        "Audit Transcript 1 through 5 in the QA Audit Hub.",
        "Deduct points with specific SOP citations for errors.",
        "Calculate the agent's overall QA score (Target: ≥ 88%).",
        "Write a constructive 1-on-1 coaching feedback summary for the agent."
      ],
      expectedDeliverables: [
        "5 Completed QA Scorecards with Itemized Deductions",
        "Aggregate QA Score Summary Table",
        "Constructive Coaching Action Plan"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-32",
    number: 32,
    level: 7,
    levelTitle: "Level 07: Customer Experience & Quality Assurance",
    department: "Customer Experience & Insights",
    title: "CSAT & Net Promoter Score (NPS) Root Cause Analysis",
    durationHours: 5,
    summary: "Analyze customer satisfaction survey comments to identify systemic organizational friction points, recurring product bugs, and shipping pain points.",
    scenario: "Last month's CSAT score dipped to 84% (target 92%). Management received 200 customer feedback comments ranging from 1 to 5 stars.",
    managerInstruction: "Categorize 100 survey comments by root cause (Shipping, Product Quality, Agent Attitude, Billing). Use Excel COUNTIF to quantify the top 3 drivers of detraction.",
    sopReference: "SOP-03: SLA Standards & Continuous Improvement",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Spreadsheet Workspace", "CSAT Sentiment Analyzer"],
    rawDatasetName: "csat_survey_feedback_100_records.csv",
    rawDatasetType: "csat",
    practicalAssignment: {
      taskTitle: "CSAT Detractor Analysis & Root Cause Pareto Chart",
      description: "Group survey verbatims into root-cause buckets, calculate percentage share of negative feedback, and formulate 3 systemic recommendations.",
      stepByStep: [
        "Load CSAT survey responses into Spreadsheet Workspace.",
        "Add a 'Root Cause Category' column and tag each 1-star and 2-star response.",
        "Build a summary table calculating total detractors per department.",
        "Produce an executive presentation memo recommending process fixes."
      ],
      expectedDeliverables: [
        "Categorized CSAT Survey Analysis Workbook",
        "Pareto Distribution Table of Customer Complaints",
        "Executive CX Remediation Proposal"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-33",
    number: 33,
    level: 7,
    levelTitle: "Level 07: Customer Experience & Quality Assurance",
    department: "Customer Experience",
    title: "Customer Journey Mapping: Reducing Customer Effort Score (CES)",
    durationHours: 4,
    summary: "Map the customer touchpoints during a replacement return to identify friction, repetitive steps, and opportunities to streamline effort.",
    scenario: "A customer currently has to fill out 3 forms, contact chat twice, and wait 10 days for a replacement. Customer Effort Score (CES) is dangerously high.",
    managerInstruction: "Map the current 7-step customer return journey. Propose an optimized 3-step 'Zero-Friction' return workflow that reduces customer effort by 60%.",
    sopReference: "SOP-01: Return Authorization Protocol",
    sopId: "SOP-01",
    toolsRequired: ["Journey Mapping Canvas", "Process Flow Designer"],
    rawDatasetName: "customer_journey_touchpoint_metrics.csv",
    rawDatasetType: "general",
    practicalAssignment: {
      taskTitle: "Customer Journey Friction Audit & Redesign",
      description: "Document the existing high-effort return workflow, pinpoint the 4 major friction bottlenecks, and deliver the streamlined Future State Journey Map.",
      stepByStep: [
        "Analyze touchpoint duration metrics for current return flow.",
        "Identify high-effort steps (e.g., printing manual paper forms).",
        "Design the simplified 3-step digital return flow with QR code drop-off.",
        "Submit the comparative before/after flow document."
      ],
      expectedDeliverables: [
        "Current vs Future State Customer Journey Comparison",
        "Customer Effort Score (CES) Reduction Projections",
        "Frontline Implementation SOP Amendments"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-34",
    number: 34,
    level: 7,
    levelTitle: "Level 07: Customer Experience & Quality Assurance",
    department: "Quality Assurance & Training",
    title: "Conducting Calibration Sessions & Inter-Rater Reliability",
    durationHours: 4,
    summary: "Standardize grading criteria among QA auditors to eliminate grading variance, subjective bias, and inconsistent scoring.",
    scenario: "Two team leaders graded the same agent interaction: Leader A gave 95% while Leader B gave 72%. Such variance causes severe agent frustration and mistrust.",
    managerInstruction: "Lead a simulated QA calibration session. Re-grade the disputed ticket against exact SOP wording to establish the authoritative benchmark score.",
    sopReference: "SOP-04: Professional De-escalation & SOP-05 Security",
    sopId: "SOP-04",
    toolsRequired: ["Calibration Matrix", "Nexora Desk QA Engine"],
    rawDatasetName: "calibration_disputed_ticket.csv",
    rawDatasetType: "csat",
    practicalAssignment: {
      taskTitle: "Disputed QA Ticket Calibration & Official Benchmark",
      description: "Re-evaluate the disputed case line-by-line, reconcile the scoring discrepancy between Leader A and B, and establish the official calibration ruling.",
      stepByStep: [
        "Review the disputed transcript and conflicting scorecards.",
        "Examine each point deduction against SOP guidelines.",
        "Write the official calibration adjudication memo.",
        "Formulate updated scoring rules to prevent future grader variance."
      ],
      expectedDeliverables: [
        "Official Calibrated QA Scorecard",
        "Variance Reconciliation Commentary",
        "Auditor Alignment Guidance Document"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-35",
    number: 35,
    level: 7,
    levelTitle: "Level 07: Customer Experience & Quality Assurance",
    department: "Operations & QA",
    title: "Building Continuous Improvement Feedback Loops with Product Teams",
    durationHours: 4,
    summary: "Bridge the gap between front-line customer complaints and engineering/product teams to permanently fix root causes.",
    scenario: "Customers are repeatedly returning Bluetooth Earbuds SKU NX-EAR-02 claiming 'Battery drains in 30 minutes', which was traced to a faulty firmware v2.1.",
    managerInstruction: "Aggregate 35 customer tickets into an Engineering Bug Report with reproduction steps, customer device logs, and financial return impact.",
    sopReference: "SOP-07: Damaged Goods & Defective Claims",
    sopId: "SOP-07",
    toolsRequired: ["Product Bug Tracker Simulator", "Nexora Desk"],
    rawDatasetName: "product_defect_ticket_cluster.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Customer-Driven Engineering Bug Report & Impact Analysis",
      description: "Synthesize 35 support tickets into a high-priority Product Bug Dossier for the Hardware Engineering team with return rate cost calculations.",
      stepByStep: [
        "Extract hardware version, firmware numbers, and symptoms from ticket cluster.",
        "Calculate total refund costs incurred by company ($6,300).",
        "Draft the Engineering Jira Bug Report with customer reproduction steps.",
        "Submit the report with customer support macro mitigation recommendation."
      ],
      expectedDeliverables: [
        "Engineering Bug Report with Reproduction Steps",
        "Financial Return Cost Impact Breakdown",
        "Temporary Frontline Customer Troubleshooting Macro"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 08 (Courses 36-40) =================
  {
    id: "CRS-36",
    number: 36,
    level: 8,
    levelTitle: "Level 08: Operations & Business Administration",
    department: "Operations Management",
    title: "Workforce Management (WFM): Forecasting, Shrinkage & Erlang C",
    durationHours: 5,
    summary: "Understand contact center staffing models, calculate shrinkage (breaks, PTO, training), and determine required headcount to meet SLAs.",
    scenario: "Marketing is launching a 48-hour Cyber Monday sale. Historical data predicts 4,200 incoming contacts with an average handle time (AHT) of 360 seconds.",
    managerInstruction: "Calculate required agent staffing using standard contact center workload formulas. Account for 28% shrinkage to ensure sufficient shift coverage.",
    sopReference: "SOP-03: SLA Standards & SOP-06 Shift Adherence",
    sopId: "SOP-06",
    toolsRequired: ["Nexora Spreadsheet Workspace", "WFM Staffing Calculator"],
    rawDatasetName: "hourly_contact_volume_forecast.csv",
    rawDatasetType: "productivity",
    practicalAssignment: {
      taskTitle: "Cyber Monday Workforce Staffing & Shift Schedule Model",
      description: "Calculate gross workload hours, apply 28% shrinkage, and build a 48-hour hourly staffing schedule covering peak contact spikes.",
      stepByStep: [
        "Import hourly contact volume forecast into Spreadsheet Workspace.",
        "Calculate Total Workload Hours: (Contacts × AHT in seconds) / 3600.",
        "Add 28% shrinkage factor to calculate Required FTE (Full Time Equivalents).",
        "Distribute FTEs across three 8-hour shift bands (Morning, Swing, Graveyard).",
        "Export the final schedule workbook."
      ],
      expectedDeliverables: [
        "48-Hour WFM Hourly Staffing Spreadsheet",
        "Shrinkage & Headcount Summary Calculations",
        "Shift Allocation Strategy Memo"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-37",
    number: 37,
    level: 8,
    levelTitle: "Level 08: Operations & Business Administration",
    department: "Operations",
    title: "Daily & Weekly Operations Reporting (WBR / MBR Executive Packs)",
    durationHours: 5,
    summary: "Design and compile executive Weekly Business Review (WBR) reporting packs summarizing SLA performance, costs per contact, and headcount adherence.",
    scenario: "Executive VP Marcus Vance requires the Monday morning WBR Operations slide deck covering last week's performance across all 4 customer channels.",
    managerInstruction: "Consolidate weekly data into the executive WBR format. Highlight wins, quantify SLA misses, and provide 3 forward-looking operational initiatives.",
    sopReference: "SOP-03: SLA Management & Operations Standards",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Spreadsheet Workspace", "Executive Presentation Template"],
    rawDatasetName: "weekly_executive_wbr_dataset.csv",
    rawDatasetType: "productivity",
    practicalAssignment: {
      taskTitle: "Executive Weekly Business Review (WBR) Operations Pack",
      description: "Compile the 5-page Executive WBR Report covering Ticket Volumes, Channel Distribution, SLA Adherence, Top Escalations, and Headcount Adherence.",
      stepByStep: [
        "Aggregate weekly totals from the raw multi-channel operational log.",
        "Calculate Cost Per Contact ($14.20 Email vs $8.50 Chat).",
        "Build the 4 primary KPI tables (Volume, SLA %, CSAT, QA Average).",
        "Write executive commentary explaining weekly anomalies and planned interventions."
      ],
      expectedDeliverables: [
        "Complete WBR Operations Executive Report",
        "Tabular Summary of Key Variance Indicators",
        "Next Week Operational Priority Action Items"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-38",
    number: 38,
    level: 8,
    levelTitle: "Level 08: Operations & Business Administration",
    department: "Training & Knowledge Base",
    title: "Knowledge Base Management: Creating & Auditing Internal SOPs",
    durationHours: 4,
    summary: "Draft, format, and audit standard operating procedures so frontline agents have instant access to accurate, step-by-step guidance.",
    scenario: "Nexora launched a new 'Same-Day Courier Delivery' service in Chicago, but no standard operating procedure exists. Frontline agents are giving conflicting answers.",
    managerInstruction: "Draft official SOP-09 (Same-Day Courier Fulfillment & Delivery Exceptions) using Nexora's standardized SOP template with step-by-step rules.",
    sopReference: "SOP-06: Operations Documentation Standards",
    sopId: "SOP-06",
    toolsRequired: ["Nexora Knowledge Base Editor", "Markdown Documentation Engine"],
    rawDatasetName: "same_day_delivery_pilot_metrics.csv",
    rawDatasetType: "general",
    practicalAssignment: {
      taskTitle: "Authoring Official SOP-09: Same-Day Delivery Operations",
      description: "Write the comprehensive SOP document including Scope, 4 Step-by-Step Procedures, Cut-off Deadlines, Escalation Rules, and Exemption Matrix.",
      stepByStep: [
        "Review pilot performance data and carrier constraints.",
        "Draft Section 1: Purpose & Eligibility Criteria (13:00 CST daily cutoff).",
        "Draft Section 2: Step-by-step Dispatch and Carrier Failure Protocols.",
        "Draft Section 3: Tier-2 Escalations and Customer Compensation Caps.",
        "Submit SOP-09 for review and publication to the Knowledge Base."
      ],
      expectedDeliverables: [
        "Official Standard Operating Procedure Document (SOP-09)",
        "Frontline Agent Quick-Reference Cheat Sheet",
        "Knowledge Base Search Keyword Tagging Schema"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-39",
    number: 39,
    level: 8,
    levelTitle: "Level 08: Operations & Business Administration",
    department: "Operations Management",
    title: "Cost per Contact & Operational Budgeting for Support Teams",
    durationHours: 4,
    summary: "Calculate operational unit economics including fully loaded labor rates, cost per resolved ticket across channels, and ROI of self-service initiatives.",
    scenario: "Finance is reviewing the support budget. Chat costs $6.20 per resolution, while Phone costs $18.50. You must analyze the financial impact of shifting 30% of call volume to chat.",
    managerInstruction: "Build a financial sensitivity model in the Spreadsheet Workspace showing monthly savings generated by chat channel migration and self-service FAQ deflection.",
    sopReference: "SOP-03: SLA Standards & Budget Guidelines",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Spreadsheet Workspace", "Cost Modeling Sheet"],
    rawDatasetName: "contact_channel_cost_model.csv",
    rawDatasetType: "productivity",
    practicalAssignment: {
      taskTitle: "Cost-Per-Contact Model & Channel Optimization Projections",
      description: "Calculate baseline monthly contact center operating costs and project annual cost savings from a 30% shift from Phone to Live Chat.",
      stepByStep: [
        "Import baseline channel volumes and labor expenses into the Spreadsheet.",
        "Calculate Fully Loaded Cost Per Contact for Phone, Email, and Chat.",
        "Model the volume migration scenario (30% phone deflection).",
        "Calculate net projected annual savings and return on investment.",
        "Present the business case to Finance Lead Rachel Zhao."
      ],
      expectedDeliverables: [
        "Cost Per Contact Financial Model (Spreadsheet with formulas)",
        "Annual Cost Savings Sensitivity Analysis",
        "Executive Business Case Proposal"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-40",
    number: 40,
    level: 8,
    levelTitle: "Level 08: Operations & Business Administration",
    department: "Operations & HR",
    title: "Remote Team Leadership: 1-on-1s, Performance Improvement Plans (PIP)",
    durationHours: 4,
    summary: "Conduct constructive 1-on-1 coaching sessions, diagnose performance dips with data, and construct supportive, measurable Performance Improvement Plans.",
    scenario: "Agent Derek Miller's CSAT has dropped from 94% to 76% over the last 30 days, and his average handling time has doubled due to personal burnout.",
    managerInstruction: "Draft a supportive 30-day Performance Improvement Plan (PIP) with weekly measurable milestones, coaching sessions, and clear success criteria.",
    sopReference: "SOP-06: Remote Work Attendance & Performance Standards",
    sopId: "SOP-06",
    toolsRequired: ["Nexora PIP Framework", "Coaching Session Planner"],
    rawDatasetName: "underperforming_agent_30day_history.csv",
    rawDatasetType: "productivity",
    practicalAssignment: {
      taskTitle: "Empathetic 30-Day Performance Improvement Plan (PIP)",
      description: "Draft a formal, encouraging, and metrics-driven 30-day PIP for Derek Miller, establishing weekly check-ins and objective milestones.",
      stepByStep: [
        "Analyze Derek's historical metrics to identify when performance dropped.",
        "Structure Week 1-4 incremental milestones (CSAT rebound to 85%, AHT under 400s).",
        "Define manager support commitments (shadowing, refresher training).",
        "Author the formal PIP agreement and submit to HR."
      ],
      expectedDeliverables: [
        "Structured 30-Day PIP Document with Weekly Milestones",
        "Manager Coaching Guide & 1-on-1 Agenda",
        "Progress Tracking Scorecard Template"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 09 (Courses 41-45) =================
  {
    id: "CRS-41",
    number: 41,
    level: 9,
    levelTitle: "Level 09: Advanced Remote Support Specialist",
    department: "Advanced Support",
    title: "Handling B2B Enterprise Client Accounts & Commercial SLA Penalties",
    durationHours: 5,
    summary: "Support high-stakes B2B corporate accounts with contractually binding SLAs, liquidated delay damages, and dedicated account managers.",
    scenario: "Enterprise client 'Apex Logistics' (Order #CORP-902, 50 rugged tablets, $32,000) was delivered with missing activation keys, halting their warehouse shift.",
    managerInstruction: "Review commercial SLA agreement. Deploy emergency technical activation keys within 60 minutes to prevent contract breach penalties ($500/hr delay fee).",
    sopReference: "SOP-03: SLA & SOP-02 Escalations",
    sopId: "SOP-03",
    toolsRequired: ["Nexora B2B Corporate Desk", "Enterprise Key Vault"],
    rawDatasetName: "b2b_enterprise_sla_contracts.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Emergency B2B Corporate Resolution & Executive Briefing",
      description: "Authorize emergency digital license batch dispatch, communicate with Apex Logistics' VP of Procurement, and draft the B2B post-incident report.",
      stepByStep: [
        "Verify Apex Logistics contract terms and penalty thresholds.",
        "Generate and dispatch 50 emergency master activation keys.",
        "Author formal executive apology letter to VP of Procurement.",
        "Complete commercial SLA penalty avoidance audit."
      ],
      expectedDeliverables: [
        "Executive B2B Client Communication Draft",
        "Emergency Key Dispatch Audit Log",
        "Post-Mortem Root Cause Analysis for VP Marcus Vance"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-42",
    number: 42,
    level: 9,
    levelTitle: "Level 09: Advanced Remote Support Specialist",
    department: "Technical Operations",
    title: "Technical Support Triage: Network APIs, Webhooks & Cart Errors",
    durationHours: 5,
    summary: "Diagnose frontend checkout errors, identify HTTP 500/403 API response codes, inspect browser console errors, and submit actionable engineering tickets.",
    scenario: "14 customers report being unable to checkout during checkout step 2, receiving error message: 'Payment Tokenizer Failed: HTTP 502 Bad Gateway'.",
    managerInstruction: "Replicate checkout flow in simulator. Inspect payload error, verify payment gateway webhook status, and create high-priority bug report for DevSecOps.",
    sopReference: "SOP-02: Incident Escalation & Security",
    sopId: "SOP-02",
    toolsRequired: ["Developer Console Simulator", "Webhook Monitor", "Nexora Desk"],
    rawDatasetName: "api_server_error_log_stream.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Technical Checkout Failure Triage & DevSecOps Bug Ticket",
      description: "Analyze HTTP error payloads, isolate failing payment webhook endpoint, and draft the Tier-3 Engineering incident ticket with technical logs.",
      stepByStep: [
        "Inspect the server error log stream.",
        "Identify failing endpoint (/api/v2/checkout/tokenize).",
        "Document browser types, user agents, and error timestamps.",
        "Write the Engineering Jira Incident Ticket with full technical parameters.",
        "Provide frontline support workaround instructions for affected customers."
      ],
      expectedDeliverables: [
        "Technical Incident Bug Report with Payload Diagnostics",
        "Frontline Workaround Script for Inbound Callers",
        "Post-Incident Customer Outreach Script"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-43",
    number: 43,
    level: 9,
    levelTitle: "Level 09: Advanced Remote Support Specialist",
    department: "Operations & Automation",
    title: "Workflow Automation: Triggers, Webhooks & Automated Dispatch Rules",
    durationHours: 5,
    summary: "Architect automated ticketing business rules, triggers, auto-responders, and escalation webhooks to eliminate manual triage overhead.",
    scenario: "Operations spends 15 hours weekly manually routing damaged goods emails to the logistics team. We need an automated trigger rule in Nexora Desk.",
    managerInstruction: "Design a conditional workflow automation trigger (IF Subject contains 'Damaged' AND Customer Tier = 'Gold', THEN Action: Assign to Logistics & Add Tag).",
    sopReference: "SOP-03: SLA Standards & Automation Guidelines",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Desk Automation Engine", "Trigger Builder"],
    rawDatasetName: "ticketing_automation_rules_matrix.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Automated Ticketing Trigger Architecture & Testing",
      description: "Design 3 automated workflow rules (Damaged Goods Auto-Route, VIP SLA Escalation Alert, Dormant Ticket Auto-Close after 72 Hours).",
      stepByStep: [
        "Map trigger conditions (All conditions vs Any conditions).",
        "Define actions (Priority change, queue transfer, email notification).",
        "Simulate rule execution against 10 test tickets.",
        "Document safety guardrails to prevent infinite automated loops."
      ],
      expectedDeliverables: [
        "3 Complete Workflow Trigger Schemas",
        "Test Simulation Execution Results Table",
        "Loop Prevention Safety Protocol"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-44",
    number: 44,
    level: 9,
    levelTitle: "Level 09: Advanced Remote Support Specialist",
    department: "Logistics Operations",
    title: "International Shipping, Customs Duties & Cross-Border Logistics",
    durationHours: 4,
    summary: "Navigate international commercial invoices, HS tariff codes, customs delays, VAT / import taxes, and cross-border carrier handoffs.",
    scenario: "A customer in London is being charged £48.50 in unexpected customs VAT by Royal Mail for order #UK-8819 shipped from our US warehouse.",
    managerInstruction: "Review DDP (Delivered Duty Paid) vs DDU terms. Verify if customer's order included pre-collected VAT. Formulate the resolution per international policy.",
    sopReference: "SOP-01: Refund Protocol & International Shipping Rules",
    sopId: "SOP-01",
    toolsRequired: ["International Customs Hub", "HS Code Navigator"],
    rawDatasetName: "cross_border_shipping_manifest.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Cross-Border Customs Dispute & VAT Reimbursement Audit",
      description: "Audit commercial invoice for Order #UK-8819, verify pre-collected taxes, authorize carrier VAT fee credit, and write the explanation email.",
      stepByStep: [
        "Review shipping manifest and Incoterms (DDP vs DDU).",
        "Confirm that checkout system collected UK VAT at time of purchase.",
        "Authorize immediate reimbursement of double-charged carrier clearance fee (£48.50).",
        "Author clear, empathetic customer message explaining customs brokerage mechanics."
      ],
      expectedDeliverables: [
        "Customs Fee Reimbursement Authorization Voucher",
        "Customer International Tax Clarification Email",
        "Carrier Customs Billing Discrepancy Ticket"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-45",
    number: 45,
    level: 9,
    levelTitle: "Level 09: Advanced Remote Support Specialist",
    department: "Operations Leadership",
    title: "Change Management, Incident Retrospectives & Post-Mortem Authoring",
    durationHours: 5,
    summary: "Conduct blameless post-mortem reviews following major operational failures and author structured retrospective reports for executive leadership.",
    scenario: "Last Tuesday, an erroneous email promo code gave 90% discounts instead of 10%, generating 1,200 orders in 40 minutes before being halted, causing $45k margin loss.",
    managerInstruction: "Lead the Blameless Retrospective. Construct timeline of events, identify 5-Whys root cause, and establish preventive systemic guardrails.",
    sopReference: "SOP-02: Incident Escalation & SOP-06 Operations Standards",
    sopId: "SOP-02",
    toolsRequired: ["Retrospective Canvas", "5-Whys Root Cause Engine"],
    rawDatasetName: "promo_code_incident_event_timeline.csv",
    rawDatasetType: "orders",
    practicalAssignment: {
      taskTitle: "Executive Incident Retrospective & 5-Whys Post-Mortem",
      description: "Write the formal 4-page Post-Mortem Document covering Executive Summary, Chronological Timeline, 5-Whys Root Cause, and 4 Corrective Action Items.",
      stepByStep: [
        "Reconstruct the minute-by-minute timeline from the event log.",
        "Perform the 5-Whys Root Cause Analysis.",
        "Determine which orders will be honored vs cancelled with goodwill credit.",
        "Author the finalized Blameless Post-Mortem Report for VP Marcus Vance."
      ],
      expectedDeliverables: [
        "Official Blameless Post-Mortem Document",
        "5-Whys Root Cause Diagrammatic Breakdown",
        "Action Item Tracking Table with Assigned Executive Owners"
      ]
    },
    rubric: standardRubric
  },

  // ================= LEVEL 10 (Courses 46-50) =================
  {
    id: "CRS-46",
    number: 46,
    level: 10,
    levelTitle: "Level 10: Final Corporate Simulation & Manager Assessment",
    department: "Executive Operations",
    title: "Day 1 Simulation: Corporate Onboarding, SOP Audit & Data Hygiene",
    durationHours: 6,
    summary: "Day 1 of the 5-Day Workplace Simulation: Complete live corporate setup, audit the company customer database, and submit your initial shift report.",
    scenario: "It is 08:30 CST on Monday morning. You have officially clocked into the Nexora Operations Queue. Director Sarah Jenkins has assigned your Day 1 work orders.",
    managerInstruction: "Review all 8 SOPs, clean and audit the incoming customer dataset, and execute your scheduled onboarding tickets before the 17:00 CST shift close.",
    sopReference: "SOP-06: Remote Work Attendance & SOP-05 Data Privacy",
    sopId: "SOP-06",
    toolsRequired: ["Nexora Desk", "Spreadsheet Workspace", "Attendance Punch"],
    rawDatasetName: "internship_day1_customer_cleaning_raw.csv",
    rawDatasetType: "customers",
    practicalAssignment: {
      taskTitle: "Day 1 Operational Onboarding Deliverables & Data Hygiene",
      description: "Execute the Day 1 simulation deliverables: Clean 50 customer records in the Spreadsheet, resolve 2 initial tickets, and submit your Day 1 Shift Handover.",
      stepByStep: [
        "Clock into your remote shift in the simulated portal.",
        "Sanitize and validate 'internship_day1_customer_cleaning_raw.csv'.",
        "Resolve Day 1 Assigned Tickets #NX-SIM-101 and #NX-SIM-102.",
        "Draft and submit the Day 1 End-of-Shift Handover Report."
      ],
      expectedDeliverables: [
        "Cleaned Day 1 Customer Spreadsheet (XLSX)",
        "2 Completed Customer Ticket Resolutions",
        "Day 1 Official Shift Handover Memo"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-47",
    number: 47,
    level: 10,
    levelTitle: "Level 10: Final Corporate Simulation & Manager Assessment",
    department: "Executive Operations",
    title: "Day 2 Simulation: Multichannel Ticket Surge & Live Chat Handling",
    durationHours: 6,
    summary: "Day 2 of the 5-Day Workplace Simulation: Handle high-volume multichannel queues, live customer chat sessions, and maintain SLA adherence.",
    scenario: "Tuesday peak hours: Nexora is running a 24-hour flash sale. Incoming tickets and live chats are arriving simultaneously across email, chat, and portal.",
    managerInstruction: "Manage the simulated surge queue. Maintain First Response Time < 15 minutes, handle 3 live chat scenarios in real-time, and log CRM touchpoints.",
    sopReference: "SOP-03: SLA Standards & SOP-04 De-escalation",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Desk", "Live Chat Simulator", "CRM 360"],
    rawDatasetName: "internship_day2_ticket_surge_batch.csv",
    rawDatasetType: "tickets",
    practicalAssignment: {
      taskTitle: "Day 2 Multichannel Ticket Surge & Live Chat Performance",
      description: "Clear the 5 surge tickets, successfully navigate the angry customer live chat session, and submit the Day 2 queue performance metrics.",
      stepByStep: [
        "Open Nexora Desk and tackle the 5 queued surge tickets.",
        "Launch the Live Chat Simulator and complete the angry customer chat interaction.",
        "Apply correct resolution codes, tags, and internal notes.",
        "Submit the Day 2 shift summary to Operations Director Sarah Jenkins."
      ],
      expectedDeliverables: [
        "5 Solved Ticket Logs with Custom Responses",
        "Live Chat Transcript with ≥90% CSAT Rating",
        "Day 2 SLA Adherence Summary"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-48",
    number: 48,
    level: 10,
    levelTitle: "Level 10: Final Corporate Simulation & Manager Assessment",
    department: "Executive Operations",
    title: "Day 3 Simulation: High-Value Refunds, Fraud & Priority Escalations",
    durationHours: 6,
    summary: "Day 3 of the 5-Day Workplace Simulation: Investigate complex refund claims, audit carrier proof of delivery, and resolve contentious escalations.",
    scenario: "Wednesday operations: 3 high-value disputes have hit your desk including a $450 damaged goods claim and an alleged missing parcel marked delivered.",
    managerInstruction: "Enforce SOP-01, SOP-07, and SOP-08. Verify evidence, calculate net refunds and restocking fees, and write manager override requests where required.",
    sopReference: "SOP-01: Refund Protocol & SOP-08 Lost In Transit",
    sopId: "SOP-01",
    toolsRequired: ["Nexora Claims Hub", "Spreadsheet Workspace", "Nexora Desk"],
    rawDatasetName: "internship_day3_refund_investigations.csv",
    rawDatasetType: "refunds",
    practicalAssignment: {
      taskTitle: "Day 3 Complex Refund Audits & Tier-2 Escalation Packet",
      description: "Process the 3 complex cases in the Spreadsheet Workspace, determine approval vs rejection, and author the customer resolution notices.",
      stepByStep: [
        "Audit Case A ($450 damaged item with photo proof).",
        "Audit Case B (Return delivered empty - potential fraud).",
        "Audit Case C (Buyer remorse return with restocking fee).",
        "Submit the Day 3 Investigation Dossier and Manager Override Requests."
      ],
      expectedDeliverables: [
        "Refund Decision Matrix Spreadsheet with Calculations",
        "Customer Formal Resolution Notices",
        "Tier-2 Fraud Escalation Brief"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-49",
    number: 49,
    level: 10,
    levelTitle: "Level 10: Final Corporate Simulation & Manager Assessment",
    department: "Executive Operations",
    title: "Day 4 Simulation: CSAT Root Cause Analysis & Shift Quality Audit",
    durationHours: 6,
    summary: "Day 4 of the 5-Day Workplace Simulation: Audit team ticket quality, analyze weekly CSAT detractor surveys, and prepare shift handover analytics.",
    scenario: "Thursday operations: Management needs a quality assurance audit of 5 colleague transcripts and an analysis of this week's customer feedback scores.",
    managerInstruction: "Execute 5 QA scorecards, identify recurring defect themes, compile the CSAT Root Cause Table in Sheets, and author the Day 4 Quality Brief.",
    sopReference: "SOP-03: SLA Standards & SOP-04 De-escalation",
    sopId: "SOP-03",
    toolsRequired: ["Nexora QA Audit Hub", "Spreadsheet Workspace"],
    rawDatasetName: "internship_day4_qa_and_csat_records.csv",
    rawDatasetType: "csat",
    practicalAssignment: {
      taskTitle: "Day 4 QA Audit Scorecards & CSAT Detractor Analysis",
      description: "Complete 5 objective QA audits, calculate team average QA %, analyze 20 CSAT survey entries, and draft the weekly Quality Improvement Memo.",
      stepByStep: [
        "Evaluate the 5 sample colleague interactions in the QA Hub.",
        "Calculate aggregate scores and identify top coaching opportunities.",
        "Group negative survey feedback by operational department.",
        "Submit the finalized Day 4 Quality Assurance Dossier."
      ],
      expectedDeliverables: [
        "5 Completed QA Scorecards with Detailed Feedback",
        "CSAT Detractor Analysis Spreadsheet",
        "Executive Quality Improvement Memo"
      ]
    },
    rubric: standardRubric
  },
  {
    id: "CRS-50",
    number: 50,
    level: 10,
    levelTitle: "Level 10: Final Corporate Simulation & Manager Assessment",
    department: "Executive Operations",
    title: "Day 5 Simulation: Final Backlog Clearance, WBR Pack & Certification Review",
    durationHours: 8,
    summary: "Day 5 Capstone: Clear remaining ticket backlog, build the Weekly Operations KPI Dashboard, and submit your full portfolio for final Manager Certification.",
    scenario: "Friday final shift: You are completing your remote residency. You must clear the remaining operational backlog, finalize your Master Spreadsheet Workbook, and present your operational achievements to Operations Director Sarah Jenkins.",
    managerInstruction: "Finalize all outstanding assignments, ensure all 50 courses are documented, calculate final KPI metrics, and submit your graduation portfolio for executive sign-off.",
    sopReference: "SOP-03: SLA Standards & SOP-06 Shift Handover",
    sopId: "SOP-03",
    toolsRequired: ["Nexora Desk", "Spreadsheet Workspace", "Certification Portal"],
    rawDatasetName: "internship_day5_final_ops_master.csv",
    rawDatasetType: "productivity",
    practicalAssignment: {
      taskTitle: "Final Master Portfolio & Executive Operations Capstone",
      description: "Submit the Master Operations Workbook containing your calculated KPIs, resolve final pending tickets, and request executive manager evaluation for certification.",
      stepByStep: [
        "Clear all pending simulated tickets in Nexora Desk.",
        "Finalize the Master KPI Workbook showing total tickets, CSAT %, and SLA adherence.",
        "Assemble your portfolio of key deliverables (SOPs, sheets, emails).",
        "Submit the portfolio to Director Sarah Jenkins for final graduation scoring."
      ],
      expectedDeliverables: [
        "Master Operations Spreadsheet Workbook (Calculated KPIs)",
        "Trainee Professional Work Portfolio Dossier",
        "Executive Manager Performance Review Request"
      ]
    },
    rubric: [
      { id: "r1", name: "Comprehensive Operational Mastery", description: "Demonstrates complete operational competence across ticketing, CRM, and SOPs.", maxPoints: 25 },
      { id: "r2", name: "Spreadsheet & Data Rigor", description: "Flawless formula execution, clean data validation, and accurate aggregation.", maxPoints: 25 },
      { id: "r3", name: "Professional Communication & Empathy", description: "Consistently warm, authoritative, brand-aligned customer communications.", maxPoints: 25 },
      { id: "r4", name: "Executive Readiness & Reliability", description: "Punctual submissions, rigorous handover notes, and readiness for autonomous remote employment.", maxPoints: 25 }
    ]
  }
];
