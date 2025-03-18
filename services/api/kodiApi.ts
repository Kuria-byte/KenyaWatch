import { BudgetAllocationData } from "@/types/budget";
import { Project } from "@/types/projects";

// API Service for Kenya Open Data Initiative
export class KodiApiService {
    private readonly BASE_URL = 'https://www.opendata.go.ke/api/v2';
    private readonly API_KEY = process.env.KODI_API_KEY;
  
    // Fetch budget allocation data by sector and fiscal year
    async getBudgetAllocation(fiscalYear: string, sector?: string): Promise<BudgetAllocationData[]> {
      const endpoint = '/resource/budget-allocation.json';
      const params = new URLSearchParams({
        fiscal_year: fiscalYear,
        ...(sector && { sector }),
        $limit: '5000',
      });
      
      return this.fetchData(`${endpoint}?${params}`);
    }
  
    // Fetch project implementation status across counties
    async getProjectStatus(county?: string, status?: Project["status"]): Promise<Project[]> {
      const endpoint = '/resource/government-projects.json';
      const params = new URLSearchParams({
        ...(county && { county }),
        ...(status && { status }),
        $limit: '10000',
      });
      
      return this.fetchData(`${endpoint}?${params}`);
    }
  
    // Fetch demographic data by county
    async getCountyDemographics(countyCode?: string): Promise<CountyDemographicData[]> {
      const endpoint = '/resource/county-demographics.json';
      const params = new URLSearchParams({
        ...(countyCode && { county_code: countyCode }),
      });
      
      return this.fetchData(`${endpoint}?${params}`);
    }
  
    private async fetchData(endpoint: string): Promise<any> {
      if (!this.API_KEY) {
        throw new Error('API key is not configured');
      }
      try {
        const response = await fetch(`${this.BASE_URL}${endpoint}`, {
          headers: {
            'X-App-Token': this.API_KEY as string,
          },
        });
        
        if (!response.ok) {
          throw new Error(`KODI API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching data from KODI:', error);
        throw error;
      }
    }
  }