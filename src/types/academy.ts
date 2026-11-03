export type UserRole = 'trainee' | 'manager' | 'admin';

export type AssignmentStatus = 
  | 'Assigned' 
  | 'In Progress' 
  | 'Submitted' 
  | 'Under Review' 
  | 'Revision Required' 
  | 'Approved' 
  | 'Completed';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketStatus = 'Open' | 'Pending' | 'Solved' | 'Escalated' | 'Closed';
export type TicketChannel = 'Email' | 'Chat' | 'Web Portal' | 'Phone';

export interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
}

export interface RubricScore {
  criteriaId: string;
  name: string;
  score: number;
  maxPoints: number;
  comments?: string;
}

export interface Course {
  id: string; // e.g. "CRS-01"
  number: number; // 1 to 50
  level: number; // 1 to 10
  levelTitle: string;
  department: string;
  title: string;
  durationHours: number;
  summary: string;
  scenario: string;
  managerInstruction: string;
  sopReference: string;
  sopId: string;
  toolsRequired: string[];
  rawDatasetName: string;
  rawDatasetType: 'customers' | 'orders' | 'refunds' | 'tickets' | 'csat' | 'productivity' | 'general';
  practicalAssignment: {
    taskTitle: string;
    description: string;
    stepByStep: string[];
    expectedDeliverables: string[];
  };
  rubric: RubricCriteria[];
  sampleSolution?: string;
}

export interface Assignment {
  id: string; // e.g. "WO-1001"
  courseId: string;
  courseTitle: string;
  department: string;
  title: string;
  description: string;
  priority: TicketPriority;
  assignedDate: string;
  dueDate: string;
  requiredOutput: string;
  status: AssignmentStatus;
  submission?: {
    submittedAt: string;
    responseContent: string;
    spreadsheetDataSummary?: string;
    attachedFileName?: string;
    fileContent?: string;
  };
  managerEvaluation?: {
    evaluatedAt: string;
    evaluatedBy: string;
    overallScore: number; // 0 - 100
    rubricScores: RubricScore[];
    managerFeedback: string;
    correctionNotes?: string;
    resubmissionDeadline?: string;
    decision: 'Approved' | 'Revision Required' | 'Rejected';
  };
}

export interface TicketMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  senderName: string;
  timestamp: string;
  content: string;
  isInternal?: boolean;
}

export interface Ticket {
  id: string; // e.g. "NX-8492"
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerTier: 'Standard' | 'Silver' | 'Gold VIP';
  issueCategory: 
    | 'Late Delivery' 
    | 'Missing Package' 
    | 'Refund Request' 
    | 'Payment Failure' 
    | 'Duplicate Charge' 
    | 'Damaged Goods' 
    | 'Account Access' 
    | 'Incorrect Item' 
    | 'Angry Customer Escalation' 
    | 'Subscription Dispute';
  priority: TicketPriority;
  orderReference?: string;
  orderAmount?: number;
  orderDate?: string;
  courier?: string;
  trackingNumber?: string;
  slaDeadlineMinutes: number;
  slaRemainingMinutes: number;
  status: TicketStatus;
  channel: TicketChannel;
  messages: TicketMessage[];
  assignedAgent?: string;
  resolutionNotes?: string;
  qaScore?: number;
  customerSatisfaction?: number; // 1-5
}

export interface ChatMessage {
  id: string;
  sender: 'trainee' | 'customer' | 'system';
  text: string;
  timestamp: string;
}

export interface LiveChatScenario {
  id: string;
  customerName: string;
  customerEmail: string;
  customerTier: 'Standard' | 'Gold VIP';
  issue: string;
  customerPersonality: 'Impatient' | 'Angry' | 'Confused' | 'Polite' | 'Frustrated';
  initialMessage: string;
  potentialResponses: {
    traineeInputKeywords: string[];
    customerReply: string;
    sentimentShift: number; // -1, 0, +1
  }[];
  resolutionGoal: string;
  orderId?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'Standard' | 'Silver' | 'Gold VIP';
  lifetimeOrders: number;
  lifetimeSpend: number;
  joinDate: string;
  accountStatus: 'Active' | 'Suspended' | 'Under Review';
  riskScore: 'Low' | 'Medium' | 'High';
  notes: string;
  address: string;
}

export interface CompanySOP {
  id: string; // e.g. "SOP-01"
  code: string;
  title: string;
  department: string;
  lastUpdated: string;
  version: string;
  summary: string;
  scope: string;
  procedureSteps: {
    stepNumber: number;
    title: string;
    action: string;
    rules: string[];
  }[];
  escalationRules: string[];
  exemptions: string[];
}

export interface InternshipDay {
  dayNumber: number;
  dayTitle: string;
  focusArea: string;
  targetTasks: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    evidenceNeeded: string;
  }[];
  shiftHandoverNotes: string;
  managerSignOff: boolean;
  managerScore?: number;
  managerFeedback?: string;
}
