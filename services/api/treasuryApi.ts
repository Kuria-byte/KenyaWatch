// API Service for Kenya Treasury and Ministry of Finance
export class TreasuryApiService {
    private readonly BASE_URL = 'https://treasury.go.ke/api/v1';
    private readonly API_KEY = process.env.TREASURY_API_KEY;
  
    // Fetch national debt data with historical trends
    async getNationalDebt(startDate?: string, endDate?: string): Promise<DebtData[]> {
      const endpoint = '/debt/timeseries';
      const params = new URLSearchParams({
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
        format: 'json',
      });
      
      return this.fetchData(`${endpoint}?${params}`);
    }
  
    // Fetch current fiscal year budget execution rate
    async getBudgetExecution(fiscalYear: string, ministry?: string): Promise<BudgetExecutionData[]> {
      const endpoint = '/budget/execution';
      const params = new URLSearchParams({
        fiscal_year: fiscalYear,
        ...(ministry && { ministry }),
      });
      
      return this.fetchData(`${endpoint}?${params}`);
    }
  
    // Fetch revenue collection against targets
    async getRevenueCollection(fiscalYear: string): Promise<RevenueData[]> {
      const endpoint = '/revenue/collection';
      const params = new URLSearchParams({
        fiscal_year: fiscalYear,
      });
      
      return this.fetchData(`${endpoint}?${params}`);
    }
  
    private async fetchData(endpoint: string): Promise<any> {
      try {
        const response = await fetch(`${this.BASE_URL}${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Treasury API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching data from Treasury API:', error);
        throw error;
      }
    }
  }