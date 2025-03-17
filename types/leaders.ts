/**
 * Types for Leaders data
 */

export interface Project {
  id: string;
  name: string;
  status: "completed" | "ongoing" | "delayed" | "cancelled";
  budget: number;
  spent: number;
  completion: number;
  startDate: string;
  endDate: string;
  beneficiaries: number;
  location: string;
}

export interface Promise {
  id: string;
  description: string;
  category: string;
  madeDate: string;
  dueDate: string;
  status: "fulfilled" | "in-progress" | "broken" | "pending";
  evidence?: string;
}

export interface Attendance {
  period: string;
  present: number;
  absent: number;
  total: number;
}

export interface Scandal {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "alleged" | "under-investigation" | "cleared" | "convicted";
  impact: number; // Financial impact in KES
  sources: string[];
}

export interface WealthRecord {
  year: number;
  amount: number;
  growthPercent: number;
  assets: string[];
  liabilities: string[];
}

export interface Leader {
  id: string;
  name: string;
  position: "President" | "Deputy President" | "Cabinet Secretary" | "Governor" | "Senator" | "MP";
  county?: string;
  constituency?: string;
  party: string;
  imageUrl: string;
  electedDate: string;
  endDate?: string;
  approvalRating: number;
  totalVotes: number;
  contact: {
    email: string;
    phone?: string;
    office: string;
    socialMedia?: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
  };
  education: string[];
  projects: Project[];
  promises: Promise[];
  attendance: Attendance[];
  scandals: Scandal[];
  wealth: WealthRecord[];
  legislativeRecord?: {
    billsSponsored: number;
    billsPassed: number;
    motions: number;
    committees: string[];
  };
  keyAchievements: string[];
  publicPerception?: {
    favorability: number; // Percentage of favorable public opinion
    trustIndex: number; // Scale of 1-10
    mediaAppearances: number; // Number of media appearances in the last year
    controversyIndex: number; // Scale of 1-10
  };
  budgetUtilization?: {
    allocated: number; // Amount allocated in KES
    utilized: number; // Amount utilized in KES
    efficiency: number; // Percentage of efficient utilization
    transparency: number; // Rating of transparency in budget use (1-10)
  };
  developmentIndex?: {
    infrastructureScore: number; // Scale of 1-10
    economicGrowth: number; // Percentage growth in their area
    povertyReduction: number; // Percentage reduction
    jobsCreated: number; // Number of jobs created
  };
  constituencyEngagement?: {
    townHallsMeetings: number; // Number of town halls held
    constituentIssuesResolved: number; // Number of issues resolved
    localInitiatives: number; // Number of local initiatives started
    communityFeedback: number; // Rating based on community feedback (1-10)
  };
  quickStats?: {
    scandalCount: number;
    // ...other quick stats
  };
}
