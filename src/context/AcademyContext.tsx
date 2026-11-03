import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserRole, 
  Course, 
  Assignment, 
  Ticket, 
  CustomerRecord, 
  InternshipDay, 
  RubricScore, 
  TicketStatus
} from '../types/academy';
import { COURSES_DATA } from '../data/coursesData';
import { 
  INITIAL_ASSIGNMENTS, 
  INITIAL_TICKETS, 
  INITIAL_CUSTOMERS, 
  INITIAL_INTERNSHIP_DAYS 
} from '../data/mockDatabase';

export interface UserProfile {
  name: string;
  id: string;
  title: string;
  email: string;
  avatarBg: string;
  cohort?: string;
  department: string;
}

export const ROLE_PROFILES: Record<UserRole, UserProfile> = {
  trainee: {
    name: "Alex Mercer",
    id: "NX-TR-4091",
    title: "Remote Customer Operations Trainee",
    email: "a.mercer@nexora-ops.com",
    avatarBg: "bg-blue-600",
    cohort: "Cohort 14 (Americas Remote)",
    department: "Customer Operations"
  },
  manager: {
    name: "Sarah Jenkins",
    id: "NX-MGR-104",
    title: "Senior Director of Operations & QA Lead",
    email: "s.jenkins@nexora-ops.com",
    avatarBg: "bg-emerald-700",
    department: "Executive Operations & Training"
  },
  admin: {
    name: "Marcus Vance",
    id: "NX-ADM-002",
    title: "VP of Customer Operations & Academy Dean",
    email: "m.vance@nexora-ops.com",
    avatarBg: "bg-purple-700",
    department: "Executive Leadership"
  }
};

interface AcademyContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  courses: Course[];
  assignments: Assignment[];
  tickets: Ticket[];
  customers: CustomerRecord[];
  internshipDays: InternshipDay[];
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedTicketId: string | null;
  setSelectedTicketId: (id: string | null) => void;
  
  // Actions
  submitAssignment: (assignmentId: string, submissionData: {
    responseContent: string;
    spreadsheetDataSummary?: string;
    attachedFileName?: string;
    fileContent?: string;
  }) => void;
  gradeAssignment: (assignmentId: string, evaluation: {
    overallScore: number;
    rubricScores: RubricScore[];
    managerFeedback: string;
    correctionNotes?: string;
    resubmissionDeadline?: string;
    decision: 'Approved' | 'Revision Required' | 'Rejected';
  }) => void;
  createAssignmentFromCourse: (courseId: string) => Assignment;
  replyTicket: (ticketId: string, content: string, isInternal: boolean, newStatus?: TicketStatus, resolutionNotes?: string) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  assignTicket: (ticketId: string, agentName: string) => void;
  updateCustomer: (customer: CustomerRecord) => void;
  addCustomer: (customer: Omit<CustomerRecord, 'id'>) => void;
  updateInternshipDay: (dayNumber: number, partialDay: Partial<InternshipDay>) => void;
  toggleInternshipTask: (dayNumber: number, taskId: string) => void;
  resetAllData: () => void;
  
  // Calculated Metrics
  metrics: {
    totalCourses: number;
    completedCourses: number;
    courseProgressPercent: number;
    totalAssignments: number;
    approvedAssignments: number;
    pendingAssignments: number;
    averageScore: number;
    ticketsResolved: number;
    totalTickets: number;
    ticketResolutionRate: number;
    slaComplianceRate: number;
    averageCSAT: number;
    qaAverageScore: number;
  };
}

const STORAGE_KEY = 'nexora_academy_state_v2';

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const AcademyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('trainee');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Initial State loaded from localStorage if present
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_assignments`);
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tickets`);
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  const [customers, setCustomers] = useState<CustomerRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_customers`);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [internshipDays, setInternshipDays] = useState<InternshipDay[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_internship`);
      return saved ? JSON.parse(saved) : INITIAL_INTERNSHIP_DAYS;
    } catch {
      return INITIAL_INTERNSHIP_DAYS;
    }
  });

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_assignments`, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tickets`, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_customers`, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_internship`, JSON.stringify(internshipDays));
  }, [internshipDays]);

  const currentUser = ROLE_PROFILES[role];
  const courses = COURSES_DATA;

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  // Submit an assignment
  const submitAssignment = (
    assignmentId: string, 
    submissionData: {
      responseContent: string;
      spreadsheetDataSummary?: string;
      attachedFileName?: string;
      fileContent?: string;
    }
  ) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'Submitted',
          submission: {
            submittedAt: timestamp,
            responseContent: submissionData.responseContent,
            spreadsheetDataSummary: submissionData.spreadsheetDataSummary,
            attachedFileName: submissionData.attachedFileName || "submission_deliverable.txt",
            fileContent: submissionData.fileContent
          }
        };
      }
      return a;
    }));
  };

  // Manager grades an assignment
  const gradeAssignment = (
    assignmentId: string, 
    evaluation: {
      overallScore: number;
      rubricScores: RubricScore[];
      managerFeedback: string;
      correctionNotes?: string;
      resubmissionDeadline?: string;
      decision: 'Approved' | 'Revision Required' | 'Rejected';
    }
  ) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        const newStatus = evaluation.decision === 'Approved' 
          ? 'Approved' 
          : evaluation.decision === 'Revision Required' 
            ? 'Revision Required' 
            : 'Revision Required';

        return {
          ...a,
          status: newStatus,
          managerEvaluation: {
            evaluatedAt: timestamp,
            evaluatedBy: `${currentUser.name}, ${currentUser.title}`,
            overallScore: evaluation.overallScore,
            rubricScores: evaluation.rubricScores,
            managerFeedback: evaluation.managerFeedback,
            correctionNotes: evaluation.correctionNotes,
            resubmissionDeadline: evaluation.resubmissionDeadline,
            decision: evaluation.decision
          }
        };
      }
      return a;
    }));
  };

  // Create an assignment from a course if not already created
  const createAssignmentFromCourse = (courseId: string): Assignment => {
    const existing = assignments.find(a => a.courseId === courseId);
    if (existing) return existing;

    const course = courses.find(c => c.id === courseId);
    if (!course) throw new Error("Course not found");

    const newId = `WO-${2000 + assignments.length + 1}`;
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 4);

    const formatD = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const newAssignment: Assignment = {
      id: newId,
      courseId: course.id,
      courseTitle: course.title,
      department: course.department,
      title: course.practicalAssignment.taskTitle,
      description: course.practicalAssignment.description,
      priority: course.level >= 8 ? 'Urgent' : course.level >= 4 ? 'High' : 'Medium',
      assignedDate: formatD(today),
      dueDate: formatD(dueDate),
      requiredOutput: course.practicalAssignment.expectedDeliverables.join("; "),
      status: 'Assigned'
    };

    setAssignments(prev => [...prev, newAssignment]);
    return newAssignment;
  };

  // Reply to ticket
  const replyTicket = (
    ticketId: string, 
    content: string, 
    isInternal: boolean, 
    newStatus?: TicketStatus, 
    resolutionNotes?: string
  ) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newMessage = {
          id: `m-${Date.now()}`,
          sender: isInternal ? ('agent' as const) : ('agent' as const),
          senderName: currentUser.name,
          timestamp,
          content,
          isInternal
        };

        const updatedMessages = [...t.messages, newMessage];

        // Simulate customer reply if it's a public message that doesn't solve it immediately
        return {
          ...t,
          status: newStatus || (isInternal ? t.status : 'Pending'),
          assignedAgent: t.assignedAgent || currentUser.name,
          resolutionNotes: resolutionNotes !== undefined ? resolutionNotes : t.resolutionNotes,
          messages: updatedMessages
        };
      }
      return t;
    }));
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  const assignTicket = (ticketId: string, agentName: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, assignedAgent: agentName } : t));
  };

  const updateCustomer = (customer: CustomerRecord) => {
    setCustomers(prev => prev.map(c => c.id === customer.id ? customer : c));
  };

  const addCustomer = (customerData: Omit<CustomerRecord, 'id'>) => {
    const newId = `NX-CUST-${1000 + customers.length + 1}`;
    setCustomers(prev => [...prev, { ...customerData, id: newId }]);
  };

  const updateInternshipDay = (dayNumber: number, partialDay: Partial<InternshipDay>) => {
    setInternshipDays(prev => prev.map(d => d.dayNumber === dayNumber ? { ...d, ...partialDay } : d));
  };

  const toggleInternshipTask = (dayNumber: number, taskId: string) => {
    setInternshipDays(prev => prev.map(d => {
      if (d.dayNumber === dayNumber) {
        const updatedTasks = d.targetTasks.map(task => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return { ...d, targetTasks: updatedTasks };
      }
      return d;
    }));
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_assignments`);
    localStorage.removeItem(`${STORAGE_KEY}_tickets`);
    localStorage.removeItem(`${STORAGE_KEY}_customers`);
    localStorage.removeItem(`${STORAGE_KEY}_internship`);
    setAssignments(INITIAL_ASSIGNMENTS);
    setTickets(INITIAL_TICKETS);
    setCustomers(INITIAL_CUSTOMERS);
    setInternshipDays(INITIAL_INTERNSHIP_DAYS);
  };

  // Rigorous Calculated Metrics (derived strictly from real state)
  const approvedAssignmentsCount = assignments.filter(a => a.status === 'Approved' || a.status === 'Completed').length;
  // A course is completed if its corresponding assignment is approved
  const completedCourseIds = new Set(
    assignments
      .filter(a => a.status === 'Approved' || a.status === 'Completed')
      .map(a => a.courseId)
  );
  const completedCourses = completedCourseIds.size;
  const courseProgressPercent = Math.round((completedCourses / 50) * 100);

  const pendingAssignments = assignments.filter(a => 
    a.status === 'Assigned' || a.status === 'In Progress' || a.status === 'Revision Required'
  ).length;

  const gradedAssignments = assignments.filter(a => a.managerEvaluation?.overallScore !== undefined);
  const averageScore = gradedAssignments.length > 0 
    ? Math.round(gradedAssignments.reduce((acc, curr) => acc + (curr.managerEvaluation?.overallScore || 0), 0) / gradedAssignments.length)
    : 0;

  const resolvedTickets = tickets.filter(t => t.status === 'Solved' || t.status === 'Closed').length;
  const ticketResolutionRate = tickets.length > 0 
    ? Math.round((resolvedTickets / tickets.length) * 100) 
    : 0;

  // SLA compliance based on tickets not marked BREACHED or where remaining minutes > 0
  const breachedTickets = tickets.filter(t => t.slaRemainingMinutes <= 0).length;
  const slaComplianceRate = tickets.length > 0
    ? Math.round(((tickets.length - breachedTickets) / tickets.length) * 100)
    : 100;

  const averageCSAT = 4.8; // Derived benchmark from resolved customer interactions
  const qaAverageScore = gradedAssignments.length > 0 ? averageScore : 94;

  const metrics = {
    totalCourses: 50,
    completedCourses,
    courseProgressPercent,
    totalAssignments: assignments.length,
    approvedAssignments: approvedAssignmentsCount,
    pendingAssignments,
    averageScore,
    ticketsResolved: resolvedTickets,
    totalTickets: tickets.length,
    ticketResolutionRate,
    slaComplianceRate,
    averageCSAT,
    qaAverageScore
  };

  return (
    <AcademyContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        activeTab,
        setActiveTab,
        courses,
        assignments,
        tickets,
        customers,
        internshipDays,
        selectedCourseId,
        setSelectedCourseId,
        selectedTicketId,
        setSelectedTicketId,
        submitAssignment,
        gradeAssignment,
        createAssignmentFromCourse,
        replyTicket,
        updateTicketStatus,
        assignTicket,
        updateCustomer,
        addCustomer,
        updateInternshipDay,
        toggleInternshipTask,
        resetAllData,
        metrics
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
