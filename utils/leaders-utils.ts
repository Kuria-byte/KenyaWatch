import { Leader, Project } from "@/types/leaders";

/**
 * Fetches leaders data from the JSON file
 * @returns Array of leader objects
 */
export async function fetchLeadersData(): Promise<Leader[]> {
  try {
    // Use absolute path for public directory
    const response = await fetch('/data/leaders/leaders.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch leaders data: ${response.status}`);
    }
    
    const data = await response.json();
    return data.leaders || [];
  } catch (error) {
    console.error("Error fetching leaders data:", error);
    // Return empty array instead of throwing to prevent page crashes
    return [];
  }
}

/**
 * Fetches a specific leader by ID
 * @param id Leader ID
 * @returns Leader object
 */
export async function fetchLeaderById(id: string): Promise<Leader | null> {
  try {
    const leaders = await fetchLeadersData();
    return leaders.find(leader => leader.id === id) || null;
  } catch (error) {
    console.error(`Error fetching leader with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Filters leaders by position
 * @param leaders Array of leaders
 * @param position Position to filter by
 * @returns Filtered array of leaders
 */
export function filterLeadersByPosition(
  leaders: Leader[], 
  position: Leader['position'] | 'All'
): Leader[] {
  if (position === 'All') {
    return leaders;
  }
  return leaders.filter(leader => leader.position === position);
}

/**
 * Filters leaders by county
 * @param leaders Array of leaders
 * @param county County to filter by
 * @returns Filtered array of leaders
 */
export function filterLeadersByCounty(
  leaders: Leader[],
  county: string | 'All'
): Leader[] {
  if (county === 'All') {
    return leaders;
  }
  return leaders.filter(leader => leader.county === county);
}

/**
 * Filters leaders by party
 * @param leaders Array of leaders
 * @param party Party to filter by
 * @returns Filtered array of leaders
 */
export function filterLeadersByParty(
  leaders: Leader[],
  party: string | 'All'
): Leader[] {
  if (party === 'All') {
    return leaders;
  }
  return leaders.filter(leader => leader.party === party);
}

/**
 * Searches leaders by name
 * @param leaders Array of leaders
 * @param query Search query
 * @returns Filtered array of leaders
 */
export function searchLeadersByName(
  leaders: Leader[],
  query: string
): Leader[] {
  if (!query.trim()) {
    return leaders;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  return leaders.filter(leader => 
    leader.name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Calculates the average project completion rate for a leader
 * @param leader Leader object
 * @returns Average completion rate as a percentage
 */
export function calculateProjectCompletionRate(leader: Leader): number {
  if (!leader?.projects || !Array.isArray(leader.projects) || leader.projects.length === 0) {
    return 0;
  }

  const completedProjects = leader.projects.filter(project => project.status === 'completed');
  return (completedProjects.length / leader.projects.length) * 100;
}

/**
 * Calculates the promise fulfillment rate for a leader
 * @param leader Leader object
 * @returns Object with counts and percentages
 */
export function calculatePromiseFulfillment(leader: Leader): {
  fulfilled: number;
  inProgress: number;
  broken: number;
  pending: number;
  fulfillmentRate: number;
} {
  if (!leader?.promises || !Array.isArray(leader.promises)) {
    return {
      fulfilled: 0,
      inProgress: 0,
      broken: 0,
      pending: 0,
      fulfillmentRate: 0
    };
  }

  const fulfilled = leader.promises.filter(p => p.status === 'fulfilled').length;
  const inProgress = leader.promises.filter(p => p.status === 'in-progress').length;
  const broken = leader.promises.filter(p => p.status === 'broken').length;
  const pending = leader.promises.filter(p => p.status === 'pending').length;
  
  const total = leader.promises.length || 1; // Avoid division by zero
  const fulfillmentRate = Math.round((fulfilled / total) * 100);
  
  return {
    fulfilled,
    inProgress,
    broken,
    pending,
    fulfillmentRate
  };
}

/**
 * Calculates the attendance rate for a leader
 * @param leader Leader object
 * @returns Attendance rate as a percentage
 */
export function calculateAttendanceRate(leader: Leader): number {
  if (!leader.attendance || !leader.attendance.length) {
    return 0;
  }
  
  const totalPresent = leader.attendance.reduce(
    (sum, record) => sum + record.present, 
    0
  );
  
  const totalSessions = leader.attendance.reduce(
    (sum, record) => sum + record.total, 
    0
  );
  
  return Math.round((totalPresent / totalSessions) * 100);
}

/**
 * Gets all unique counties from the leaders data
 * @param leaders Array of leaders
 * @returns Array of unique counties
 */
export function getUniqueCounties(leaders: Leader[]): string[] {
  const counties = new Set<string>();
  
  leaders.forEach(leader => {
    if (leader.county) {
      counties.add(leader.county);
    }
  });
  
  return Array.from(counties).sort();
}

/**
 * Gets all unique parties from the leaders data
 * @param leaders Array of leaders
 * @returns Array of unique parties
 */
export function getUniqueParties(leaders: Leader[]): string[] {
  const parties = new Set<string>();
  
  leaders.forEach(leader => {
    if (leader.party) {
      parties.add(leader.party);
    }
  });
  
  return Array.from(parties).sort();
}

/**
 * Calculates the total declared wealth
 * @param wealth Array of wealth objects
 * @returns Total declared wealth as a string
 */
export function getTotalDeclaredWealth(wealth: { year: number; amount: number }[]): string {
  if (!wealth || wealth.length === 0) return 'KES 0';
  
  // Get the latest year's amount
  const latestWealth = wealth.reduce((prev, current) => 
    (current.year > prev.year) ? current : prev
  );
  
  return `KES ${latestWealth.amount.toLocaleString()}`;
}


/**
 * Calculates the leader's tenure
 * @param electedDate The date the leader was elected
 * @returns The leader's tenure as a string
 */

export function getLeaderTenure(electedDate: string, endDate?: string): string {
  const startYear = new Date(electedDate).getFullYear();
  const currentYear = new Date().getFullYear();
  
  if (endDate) {
    const endYear = new Date(endDate).getFullYear();
    return `${startYear} - ${endYear}`;
  }
  
  return `${startYear} - Present`;
  
}


/**
 * Counts the number of active projects
 * @param projects Array of project objects
 * @returns Number of active projects
 */


export function countActiveProjects(projects: Project[]): number {
  if (!projects) return 0;
  return projects.filter(project => project.status === "ongoing").length;
}