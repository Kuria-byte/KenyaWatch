export interface Project {
  id: string;
  name: string;
  description: string;
  location: {
    county: string;
    constituency: string;
    subcounty?: string;
    ward?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  category: ProjectCategory;
  status: ProjectStatus;
  budget: {
    allocated: number; // In KES
    spent: number; // In KES
    efficiency?: number; // Calculated field (percentage)
    fundingSources?: {
      type: string;
      name: string;
      amount: number;
    }[];
    breakdown?: {
      category: string;
      amount: number;
    }[];
    quarterlyExpenditures?: {
      quarter: string;
      planned: number;
      actual: number;
    }[];
    notes?: string;
  };
  timeline: {
    start: string; // ISO date
    plannedEnd: string; // ISO date
    actualEnd?: string; // ISO date
    completionPercentage: number; // 0-100
  };
  milestones: Milestone[];
  impact: {
    beneficiaries: number;
    jobsCreated: number;
    economicImpact?: number; // In KES
    sdgGoals?: string[];
    description?: string;
  };
  media: {
    images: ProjectImage[];
    videos: ProjectVideo[];
    documents: ProjectDocument[];
  };
  citizenReports: CitizenReport[];
  responsibleParties: {
    lead: string;
    implementingAgency: string;
    contractors: string[];
    officials: OfficialReference[];
  };
}

export type ProjectCategory = 
  | "Infrastructure" 
  | "Education" 
  | "Healthcare" 
  | "Water" 
  | "Agriculture" 
  | "Energy" 
  | "Technology" 
  | "Security" 
  | "Tourism" 
  | "Environment";

export type ProjectStatus = 
  | "Planning" 
  | "Procurement" 
  | "InProgress" 
  | "OnHold" 
  | "Delayed" 
  | "Completed" 
  | "Cancelled";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  plannedDate: string; // ISO date
  actualDate?: string; // ISO date
  completed: boolean;
  deliverables?: string[];
  notes?: string;
}

export interface ProjectImage {
  id?: string;
  url: string;
  caption?: string;
  date?: string; // ISO date
  isBeforeImage?: boolean;
  isAfterImage?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  source?: "Official" | "Citizen";
}

export interface ProjectVideo {
  id?: string;
  url: string;
  title?: string;
  description?: string;
  date?: string; // ISO date
  thumbnail?: string;
}

export interface ProjectDocument {
  id?: string;
  title: string;
  url: string;
  type?: string;
  date?: string; // ISO date
}

export interface CitizenReport {
  id: string;
  projectId: string;
  username: string;
  timestamp: string; // ISO date
  description: string;
  mediaUrls: string[];
  status: "WorkInProgress" | "NoActivity" | "Completed" | "Issue";
  rating: {
    progress: number; // 1-5
    quality: number; // 1-5
    impact: number; // 1-5
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  governmentResponse?: string;
}

export interface OfficialReference {
  id: string;
  name: string;
  position: string;
  contactEmail?: string;
  phoneNumber?: string;
}
