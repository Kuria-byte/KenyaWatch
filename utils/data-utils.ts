/**
 * Data Utilities for Government Dashboard
 * 
 * This file contains utilities for fetching, validating, and processing data
 * for the data visualization components.
 */

/**
 * Types for budget allocation data
 */
export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  trend: string;
  insights?: string[];
}

export interface BudgetData {
  year: number;
  totalBudget: number;
  currency: string;
  unit: string;
  source: string;
  categories: BudgetCategory[];
  insights: string[];
  lastUpdated?: string;
  fiscalYear?: string;
}

/**
 * Types for county performance data
 */
export interface CountyMetrics {
  projectCompletion: number;
  fundsAllocated: number;
  fundsUtilized: number;
  developmentExpenditure: number;
  recurrentExpenditure: number;
  utilizationRate?: number; // Calculated field
}

export interface County {
  name: string;
  region: string;
  metrics: CountyMetrics;
  keyProjects: string[];
  insights?: string[];
  code?: string;
}

export interface CountyData {
  fiscalYear: string;
  source: string;
  counties: County[];
  insights: string[];
  year?: number;
  quarter?: number;
  currency?: string;
  unit?: string;
  lastUpdated?: string;
}

/**
 * Types for debt growth data
 */
export interface DebtYearData {
  year: number;
  total: number;
  domestic: number;
  external: number;
  debtToGDP: number;
  perCapita: number;
}

export interface Creditor {
  name: string;
  amount: number;
  percentage: number;
  projects: string[];
}

export interface DebtData {
  source: string;
  unit: string;
  currency: string;
  title?: string;
  lastUpdated?: string;
  description?: string;
  data: DebtYearData[];
  majorCreditors: Creditor[];
  insights: string[];
}

/**
 * Fetches data from the specified JSON file
 * @param path Path to the JSON file relative to the data directory
 * @returns The parsed JSON data
 */
export async function fetchData<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`/data/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    throw error;
  }
}

/**
 * Validates that the data contains the expected fields
 * @param data The data to validate
 * @param requiredFields Array of required field names
 * @returns Boolean indicating if the data is valid
 */
export function validateData(data: any, requiredFields: string[]): boolean {
  if (!data) return false;
  
  return requiredFields.every(field => {
    const hasField = field in data;
    if (!hasField) {
      console.warn(`Data is missing required field: ${field}`);
    }
    return hasField;
  });
}

/**
 * Utility function to read JSON data
 * @param filePath Path to the JSON file
 * @returns The parsed JSON data
 */
async function readJsonFile(filePath: string) {
  try {
    // In a browser environment, we'd use fetch
    console.log(`Fetching data from: ${filePath}`);
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load data from ${filePath}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

/**
 * Fetches budget allocation data for a specific year
 * @param year The year to fetch data for (defaults to 2024)
 * @returns Budget allocation data
 */
export async function fetchBudgetData(year: number = 2024): Promise<BudgetData> {
  try {
    // Use consistent path format
    const data = await fetchData<BudgetData>(`budget-allocation/${year}.json`);
    
    // Transform the data to match our expected interface if needed
    const transformedData: BudgetData = {
      year: data.year,
      totalBudget: data.totalBudget,
      currency: data.currency,
      unit: data.unit,
      source: data.source,
      categories: data.categories.map(category => ({
        name: category.name,
        amount: category.amount,
        percentage: category.percentage,
        color: category.color,
        trend: category.trend || "",
        insights: []
      })),
      insights: data.insights || []
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching budget data:', error);
    // Return mock data if file not found or error occurs
    return {
      year: year,
      totalBudget: 3.5,
      currency: "KES",
      unit: "trillion",
      source: "National Treasury and Planning",
      categories: [
        { name: "Debt Repayment", amount: 1.3, percentage: 36.9, color: "#FF6B6B", trend: "Increasing" },
        { name: "Education", amount: 0.6, percentage: 17.1, color: "#4ECDC4", trend: "Stable" },
        { name: "Infrastructure", amount: 0.45, percentage: 12.9, color: "#45B7D1", trend: "Increasing" },
        { name: "Health", amount: 0.35, percentage: 10.0, color: "#98D8C8", trend: "Increasing" },
        { name: "Security", amount: 0.25, percentage: 7.1, color: "#F9C74F", trend: "Stable" },
        { name: "Agriculture", amount: 0.15, percentage: 4.3, color: "#90BE6D", trend: "Decreasing" },
        { name: "Judiciary", amount: 0.1, percentage: 2.9, color: "#577590", trend: "Stable" },
        { name: "Others", amount: 0.3, percentage: 8.8, color: "#9D8189", trend: "Stable" }
      ],
      insights: [
        "Debt repayment consumes the largest share of the national budget at 36.9%",
        "Education remains the second-highest funded sector at 17.1%",
        "Health sector saw a significant increase of 5.6% from the previous year",
        "Agricultural funding decreased by 4.3%, raising concerns about food security"
      ]
    };
  }
}

/**
 * Fetches county performance data
 * @param specificCounty Optional county name to fetch specific county data
 * @returns County performance data
 */
export async function fetchCountyData(specificCounty?: string): Promise<CountyData> {
  try {
    const data = await fetchData<CountyData>('county-performance/all-counties.json');
    
    // Transform the data to match our expected interface if needed
    const transformedData: CountyData = {
      fiscalYear: data.fiscalYear,
      source: data.source,
      counties: data.counties.map(county => ({
        name: county.name,
        region: county.region,
        metrics: {
          projectCompletion: county.metrics.projectCompletion,
          fundsAllocated: county.metrics.fundsAllocated,
          fundsUtilized: county.metrics.fundsUtilized,
          developmentExpenditure: county.metrics.developmentExpenditure,
          recurrentExpenditure: county.metrics.recurrentExpenditure,
          utilizationRate: county.metrics.utilizationRate
        },
        keyProjects: county.keyProjects
      })),
      insights: data.insights || []
    };
    
    // If a specific county is requested, filter the data
    if (specificCounty) {
      const filteredData = { ...transformedData };
      filteredData.counties = transformedData.counties.filter(county => 
        county.name.toLowerCase() === specificCounty.toLowerCase()
      );
      return filteredData;
    }
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching county data:', error);
    // Return mock data if file not found or error occurs
    const mockData: CountyData = {
      fiscalYear: "2023/2024",
      source: "Controller of Budget, Kenya",
      counties: [
        {
          name: "Makueni",
          region: "Eastern",
          metrics: {
            projectCompletion: 97,
            fundsAllocated: 8500,
            fundsUtilized: 7650,
            developmentExpenditure: 4500,
            recurrentExpenditure: 3150,
            utilizationRate: 90
          },
          keyProjects: [
            "Makueni County Fruit Processing Plant",
            "Thwake Multi-purpose Dam",
            "Kibwezi-Kitui Road"
          ]
        },
        {
          name: "Machakos",
          region: "Eastern",
          metrics: {
            projectCompletion: 85,
            fundsAllocated: 10200,
            fundsUtilized: 8160,
            developmentExpenditure: 5100,
            recurrentExpenditure: 3060,
            utilizationRate: 80
          },
          keyProjects: [
            "Machakos People's Park",
            "Machakos Level 5 Hospital Expansion",
            "Mwala-Makutano Road"
          ]
        },
        {
          name: "Kiambu",
          region: "Central",
          metrics: {
            projectCompletion: 78,
            fundsAllocated: 12500,
            fundsUtilized: 8750,
            developmentExpenditure: 5000,
            recurrentExpenditure: 3750,
            utilizationRate: 70
          },
          keyProjects: [
            "Kiambu Level 5 Hospital Upgrade",
            "Juja Water Supply Project",
            "Thika Industrial Park"
          ]
        },
        {
          name: "Kisumu",
          region: "Nyanza",
          metrics: {
            projectCompletion: 72,
            fundsAllocated: 11800,
            fundsUtilized: 7670,
            developmentExpenditure: 4500,
            recurrentExpenditure: 3170,
            utilizationRate: 65
          },
          keyProjects: [
            "Kisumu Port Revitalization",
            "Jaramogi Oginga Odinga Sports Complex",
            "Ahero Irrigation Scheme"
          ]
        },
        {
          name: "Nakuru",
          region: "Rift Valley",
          metrics: {
            projectCompletion: 68,
            fundsAllocated: 13200,
            fundsUtilized: 7920,
            developmentExpenditure: 4500,
            recurrentExpenditure: 3420,
            utilizationRate: 60
          },
          keyProjects: [
            "Nakuru Airport",
            "Gilgil-Nyahururu Road",
            "Naivasha Industrial Park"
          ]
        },
        {
          name: "Mombasa",
          region: "Coast",
          metrics: {
            projectCompletion: 65,
            fundsAllocated: 14500,
            fundsUtilized: 8700,
            developmentExpenditure: 5000,
            recurrentExpenditure: 3700,
            utilizationRate: 60
          },
          keyProjects: [
            "Mombasa Port Expansion",
            "Dongo Kundu Special Economic Zone",
            "Likoni Pedestrian Bridge"
          ]
        },
        {
          name: "Uasin Gishu",
          region: "Rift Valley",
          metrics: {
            projectCompletion: 62,
            fundsAllocated: 9800,
            fundsUtilized: 5390,
            developmentExpenditure: 3000,
            recurrentExpenditure: 2390,
            utilizationRate: 55
          },
          keyProjects: [
            "Eldoret Bypass",
            "Ziwa Level 4 Hospital",
            "Chebara Water Project"
          ]
        },
        {
          name: "Kajiado",
          region: "Rift Valley",
          metrics: {
            projectCompletion: 58,
            fundsAllocated: 8900,
            fundsUtilized: 4450,
            developmentExpenditure: 2500,
            recurrentExpenditure: 1950,
            utilizationRate: 50
          },
          keyProjects: [
            "Ngong-Kiserian-Isinya Road",
            "Kajiado Referral Hospital",
            "Namanga Border Point Upgrade"
          ]
        },
        {
          name: "Nairobi",
          region: "Nairobi",
          metrics: {
            projectCompletion: 45,
            fundsAllocated: 35600,
            fundsUtilized: 11392,
            developmentExpenditure: 6000,
            recurrentExpenditure: 5392,
            utilizationRate: 32
          },
          keyProjects: [
            "Nairobi Expressway",
            "Dandora Stadium",
            "Nairobi River Rehabilitation"
          ]
        }
      ],
      insights: [
        "Makueni County leads in project completion rate (97%) and fund utilization efficiency",
        "Nairobi County, despite receiving the highest allocation, has the lowest utilization rate (32%)",
        "Counties with higher development to recurrent expenditure ratios show better project completion rates",
        "Eastern region counties (Makueni, Machakos) demonstrate above-average performance metrics"
      ]
    };
    
    // If a specific county is requested, filter the mock data
    if (specificCounty) {
      const filteredData = { ...mockData };
      filteredData.counties = mockData.counties.filter(county => 
        county.name.toLowerCase() === specificCounty.toLowerCase()
      );
      return filteredData;
    }
    
    return mockData;
  }
}

/**
 * Fetches debt growth historical data
 * @returns Debt growth data
 */
export async function fetchDebtData(): Promise<DebtData> {
  try {
    // Use consistent path format
    const data = await fetchData<DebtData>('debt-growth/historical.json');
    
    // Transform the data to match our expected interface if needed
    const transformedData: DebtData = {
      source: data.source,
      unit: data.unit,
      currency: data.currency,
      title: data.title,
      lastUpdated: data.lastUpdated,
      description: data.description,
      data: data.data,
      majorCreditors: data.majorCreditors || [],
      insights: data.insights || []
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching debt data:', error);
    // Return mock data if file not found or error occurs
    return {
      title: "Kenya National Debt (2013-2024)",
      description: "Historical data on Kenya's national debt growth",
      lastUpdated: "March 2025",
      source: "National Treasury and Central Bank of Kenya",
      unit: "trillion",
      currency: "KES",
      data: [
        { year: 2013, total: 1.8, domestic: 0.9, external: 0.9, debtToGDP: 41.2, perCapita: 43500 },
        { year: 2014, total: 2.1, domestic: 1.1, external: 1.0, debtToGDP: 44.5, perCapita: 49800 },
        { year: 2015, total: 2.5, domestic: 1.3, external: 1.2, debtToGDP: 48.6, perCapita: 58200 },
        { year: 2016, total: 3.2, domestic: 1.6, external: 1.6, debtToGDP: 52.1, perCapita: 73100 },
        { year: 2017, total: 4.1, domestic: 2.0, external: 2.1, debtToGDP: 56.9, perCapita: 91800 },
        { year: 2018, total: 5.0, domestic: 2.5, external: 2.5, debtToGDP: 60.2, perCapita: 109500 },
        { year: 2019, total: 5.8, domestic: 2.9, external: 2.9, debtToGDP: 62.1, perCapita: 124600 },
        { year: 2020, total: 6.7, domestic: 3.4, external: 3.3, debtToGDP: 65.8, perCapita: 141200 },
        { year: 2021, total: 7.6, domestic: 3.9, external: 3.7, debtToGDP: 67.9, perCapita: 157300 },
        { year: 2022, total: 8.4, domestic: 4.3, external: 4.1, debtToGDP: 69.4, perCapita: 170500 },
        { year: 2023, total: 9.2, domestic: 4.7, external: 4.5, debtToGDP: 71.2, perCapita: 183000 },
        { year: 2024, total: 9.6, domestic: 4.9, external: 4.7, debtToGDP: 72.8, perCapita: 184300 }
      ],
      majorCreditors: [
        { name: "China", amount: 1.2, percentage: 25.5, projects: ["SGR", "Expressway", "Energy"] },
        { name: "World Bank", amount: 1.0, percentage: 21.3, projects: ["Healthcare", "Education", "Agriculture"] },
        { name: "IMF", amount: 0.8, percentage: 17.0, projects: ["Budget Support", "Economic Reforms"] },
        { name: "AfDB", amount: 0.6, percentage: 12.8, projects: ["Infrastructure", "Water", "Sanitation"] },
        { name: "Japan", amount: 0.4, percentage: 8.5, projects: ["Transport", "Energy", "Urban Development"] },
        { name: "Others", amount: 0.7, percentage: 14.9, projects: ["Various Projects"] }
      ],
      insights: [
        "Kenya's national debt has increased more than fivefold from 2013 to 2024",
        "The debt-to-GDP ratio has risen from 41.2% to 72.8% in the same period",
        "Per capita debt burden has quadrupled to KES 184,300 per citizen",
        "China has emerged as the largest bilateral creditor, accounting for over 25% of external debt"
      ]
    };
  }
}

/**
 * Fetches data sources information
 * @returns Data sources information
 */
export async function fetchDataSources(): Promise<{sources: any[], lastUpdated: string}> {
  try {
    // Use consistent path format
    return await fetchData<{sources: any[], lastUpdated: string}>('sources/data-sources.json');
  } catch (error) {
    console.error('Error fetching data sources:', error);
    return {
      sources: [
        { name: "National Treasury", url: "https://treasury.go.ke", description: "Official source for budget and debt data" },
        { name: "Kenya National Bureau of Statistics", url: "https://knbs.or.ke", description: "Official statistics on economic indicators" },
        { name: "Controller of Budget", url: "https://cob.go.ke", description: "County budget implementation reports" },
        { name: "Central Bank of Kenya", url: "https://centralbank.go.ke", description: "Monetary policy and debt management data" }
      ],
      lastUpdated: "March 2025"
    };
  }
}

/**
 * Formats currency values with the appropriate unit
 * @param value The numeric value to format
 * @param currency The currency code (e.g., 'KES')
 * @param unit The unit (e.g., 'billion', 'million')
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string, unit: string): string {
  if (!value && value !== 0) return 'N/A';
  
  const formatter = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  
  return `${currency} ${formatter.format(value)} ${unit}`;
}

/**
 * Formats percentage values
 * @param value The percentage value
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number): string {
  if (!value && value !== 0) return 'N/A';
  
  const formatter = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    style: 'percent'
  });
  
  return formatter.format(value / 100);
}

/**
 * Gets available years for a specific data type
 * @param dataType The type of data ('budget', 'county', 'debt')
 * @returns Array of available years
 */
export async function getAvailableYears(dataType: 'budget' | 'county' | 'debt'): Promise<number[]> {
  // In a real implementation, this would scan the data directory
  // For this example, we'll return mock data
  
  switch (dataType) {
    case 'budget':
      return [2020, 2021, 2022, 2023, 2024, 2025];
    case 'county':
      return [2021, 2022, 2023, 2024];
    case 'debt':
      return [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    default:
      return [];
  }
}
