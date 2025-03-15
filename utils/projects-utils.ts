import { Project, ProjectCategory, ProjectStatus, CitizenReport } from "@/types/projects";

/**
 * Fetches project data from the data file
 */
export async function fetchProjectsData(): Promise<Project[]> {
  try {
    const response = await fetch("/data/projects/projects.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch projects data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
}

/**
 * Fetches a single project by ID
 */
export async function fetchProjectById(id: string): Promise<Project | null> {
  try {
    const projects = await fetchProjectsData();
    return projects.find(project => project.id === id) || null;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Filters projects by category
 */
export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory
): Project[] {
  return projects.filter(project => project.category === category);
}

/**
 * Filters projects by status
 */
export function filterProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): Project[] {
  return projects.filter(project => project.status === status);
}

/**
 * Filters projects by county
 */
export function filterProjectsByCounty(
  projects: Project[],
  county: string
): Project[] {
  return projects.filter(project => project.location.county === county);
}

/**
 * Filters projects by constituency
 */
export function filterProjectsByConstituency(
  projects: Project[],
  constituency: string
): Project[] {
  return projects.filter(project => project.location.constituency === constituency);
}

/**
 * Searches projects by name or description
 */
export function searchProjects(
  projects: Project[],
  query: string
): Project[] {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(
    project => 
      project.name.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Gets unique counties from projects
 */
export function getUniqueCounties(projects: Project[]): string[] {
  const counties = projects.map(project => project.location.county);
  return [...new Set(counties)].sort();
}

/**
 * Gets unique constituencies from projects
 */
export function getUniqueConstituencies(projects: Project[]): string[] {
  const constituencies = projects.map(project => project.location.constituency);
  return [...new Set(constituencies)].sort();
}

/**
 * Calculates budget efficiency for a project
 */
export function calculateBudgetEfficiency(allocated: number, spent: number): number {
  if (allocated === 0) return 0;
  // Higher is better - if spent less than allocated
  return Math.round(((allocated - spent) / allocated) * 100);
}

/**
 * Sorts projects by completion percentage
 */
export function sortProjectsByCompletion(
  projects: Project[],
  ascending = false
): Project[] {
  return [...projects].sort((a, b) => {
    const diff = a.timeline.completionPercentage - b.timeline.completionPercentage;
    return ascending ? diff : -diff;
  });
}

/**
 * Sorts projects by budget size
 */
export function sortProjectsByBudget(
  projects: Project[],
  ascending = false
): Project[] {
  return [...projects].sort((a, b) => {
    const diff = a.budget.allocated - b.budget.allocated;
    return ascending ? diff : -diff;
  });
}

/**
 * Gets projects with citizen reports
 */
export function getProjectsWithCitizenReports(projects: Project[]): Project[] {
  return projects.filter(project => project.citizenReports.length > 0);
}

/**
 * Gets the average citizen rating for a project
 */
export function getAverageCitizenRating(project: Project): number {
  if (project.citizenReports.length === 0) return 0;
  
  const totalProgress = project.citizenReports.reduce(
    (sum, report) => sum + report.rating.progress, 
    0
  );
  
  const totalQuality = project.citizenReports.reduce(
    (sum, report) => sum + report.rating.quality, 
    0
  );
  
  const totalImpact = project.citizenReports.reduce(
    (sum, report) => sum + report.rating.impact, 
    0
  );
  
  const totalReports = project.citizenReports.length;
  
  // Average of all three rating types
  return Math.round(
    ((totalProgress / totalReports) + 
     (totalQuality / totalReports) + 
     (totalImpact / totalReports)) / 3 * 10
  ) / 10; // Round to 1 decimal place
}

/**
 * Gets the status color for a project
 */
export function getProjectStatusColor(status: ProjectStatus): string {
  const colors: Record<ProjectStatus, string> = {
    "Planning": "bg-blue-100 text-blue-800",
    "Procurement": "bg-purple-100 text-purple-800",
    "InProgress": "bg-amber-100 text-amber-800",
    "OnHold": "bg-orange-100 text-orange-800",
    "Delayed": "bg-red-100 text-red-800",
    "Completed": "bg-green-100 text-green-800",
    "Cancelled": "bg-gray-100 text-gray-800"
  };
  
  return colors[status];
}

/**
 * Gets the category color for a project
 */
export function getProjectCategoryColor(category: ProjectCategory): string {
  const colors: Record<string, string> = {
    "Infrastructure": "bg-slate-100 text-slate-800",
    "Education": "bg-indigo-100 text-indigo-800",
    "Healthcare": "bg-rose-100 text-rose-800",
    "Water": "bg-cyan-100 text-cyan-800",
    "Agriculture": "bg-lime-100 text-lime-800",
    "Energy": "bg-yellow-100 text-yellow-800",
    "Technology": "bg-violet-100 text-violet-800",
    "Security": "bg-red-100 text-red-800",
    "Tourism": "bg-emerald-100 text-emerald-800",
    "Environment": "bg-teal-100 text-teal-800"
  };
  
  return colors[category] || "bg-gray-100 text-gray-800";
}

/**
 * Formats currency in KES
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats currency in abbreviated form (e.g., 1.2B, 45M, 500K)
 */
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)}B KSh`;
  } else if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M KSh`;
  } else if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}K KSh`;
  } else {
    return `${amount} KSh`;
  }
}

/**
 * Formats a date in a user-friendly format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

/**
 * Formats a date in a compact format (e.g., 15 Mar '25)
 */
export function formatDateCompact(dateString: string): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-KE', { month: 'short' });
  const year = date.getFullYear().toString().slice(2);
  
  return `${day} ${month} '${year}`;
}

/**
 * Returns a relative date string if within 3 months, otherwise compact date
 */
export function formatDateRelative(dateString: string): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // If within 90 days in the future or past
  if (Math.abs(diffDays) <= 90) {
    if (diffDays > 0) {
      return `In ${diffDays} days`;
    } else if (diffDays < 0) {
      return `${Math.abs(diffDays)} days ago`;
    } else {
      return 'Today';
    }
  }
  
  // Otherwise use compact date format
  return formatDateCompact(dateString);
}

/**
 * Calculates days remaining or overdue for a project
 */
export function calculateDaysRemainingOrOverdue(endDate: string): number {
  if (!endDate) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const plannedEndDate = new Date(endDate);
  plannedEndDate.setHours(0, 0, 0, 0);
  
  const diffTime = plannedEndDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Gets the time status for a project
 */
export function getProjectTimeStatus(project: Project): string {
  if (project.status === 'Completed') {
    if (!project.timeline.actualEnd) return 'Completed';
    
    const plannedEnd = new Date(project.timeline.plannedEnd);
    const actualEnd = new Date(project.timeline.actualEnd);
    
    if (actualEnd > plannedEnd) {
      const diffTime = actualEnd.getTime() - plannedEnd.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Completed ${diffDays} days late`;
    } else if (actualEnd < plannedEnd) {
      const diffTime = plannedEnd.getTime() - actualEnd.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Completed ${diffDays} days early`;
    } else {
      return 'Completed on time';
    }
  }
  
  const daysRemaining = calculateDaysRemainingOrOverdue(project.timeline.plannedEnd);
  
  if (daysRemaining < 0) {
    return `${Math.abs(daysRemaining)} days overdue`;
  } else if (daysRemaining === 0) {
    return 'Due today';
  } else {
    return `${daysRemaining} days remaining`;
  }
}

/**
 * Gets the report status counts for a project
 */
export function getReportStatusCounts(project: Project): Record<CitizenReport['status'], number> {
  const counts: Record<CitizenReport['status'], number> = {
    'WorkInProgress': 0,
    'NoActivity': 0,
    'Completed': 0,
    'Issue': 0
  };
  
  project.citizenReports.forEach(report => {
    counts[report.status]++;
  });
  
  return counts;
}

/**
 * Gets the most recent citizen reports for a project
 */
export function getMostRecentReports(project: Project, count: number = 5): CitizenReport[] {
  return [...project.citizenReports]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, count);
}

/**
 * Gets the milestone completion percentage for a project
 */
export function getMilestoneCompletionPercentage(project: Project): number {
  if (project.milestones.length === 0) return 0;
  
  const completedMilestones = project.milestones.filter(m => m.completed).length;
  return Math.round((completedMilestones / project.milestones.length) * 100);
}

/**
 * Gets the budget utilization percentage for a project
 */
export function getBudgetUtilizationPercentage(project: Project): number {
  if (project.budget.allocated === 0) return 0;
  
  return Math.round((project.budget.spent / project.budget.allocated) * 100);
}
