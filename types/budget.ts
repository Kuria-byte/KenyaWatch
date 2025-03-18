// types/budget.ts
export interface BudgetAllocationData {
    fiscalYear: string;
    sector: string;
    amount: number;
    percentage: number;
    previousYearAmount?: number;
    changePercentage?: number;
    spentToDate?: number;
  }
  
  export interface BudgetExecutionData {
    fiscalYear: string;
    ministry: string;
    allocatedAmount: number;
    spentAmount: number;
    executionRate: number;
    lastUpdated: Date;
  }