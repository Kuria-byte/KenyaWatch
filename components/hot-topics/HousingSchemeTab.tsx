import React from "react";
import { KeyStats } from "./KeyStats";
import { NewsItem } from "./NewsItem";
import { ActionCard } from "./ActionCard";
import { Home, Building, Coins, Users } from "lucide-react";
import { HousingAffordabilityCalculator } from "./HousingAffordabilityCalculator";

// Housing Scheme data
const housingStats = [
  {
    label: "Units Completed",
    value: "48,750",
    change: "16.3% of 300K target",
    trend: "up" as const,
  },
  {
    label: "Units Under Construction",
    value: "85,200",
    change: "+12,500 in 2025",
    trend: "up" as const,
  },
  {
    label: "Funds Allocated",
    value: "KES 62.8B",
    change: "78% utilized",
    trend: "neutral" as const,
  },
  {
    label: "Counties Covered",
    value: "32",
    change: "+8 in 2025",
    trend: "up" as const,
  },
  {
    label: "Jobs Created",
    value: "124,500",
    change: "Direct & indirect",
    trend: "up" as const,
  },
  {
    label: "Avg. Unit Cost",
    value: "KES 2.1M",
    change: "-8% from initial plan",
    trend: "up" as const,
  },
];

const housingNews = [
  {
    title: "Affordable Housing Levy Generates KES 18B in First Quarter of 2025",
    source: "National Treasury",
    date: "March 12, 2025",
    url: "https://treasury.go.ke/press-releases/housing-levy-q1-2025",
    snippet: "The National Treasury reports that the Affordable Housing Levy has collected KES 18 billion in the first quarter of 2025, exceeding projections by 12%.",
  },
  {
    title: "Government Launches Phase 3 of Affordable Housing in 8 New Counties",
    source: "State Department of Housing",
    date: "February 28, 2025",
    url: "https://housing.go.ke/phase-3-launch",
    snippet: "The State Department of Housing has launched Phase 3 of the Affordable Housing Program, extending to 8 new counties including Kisii, Nyeri, and Garissa.",
  },
  {
    title: "Court Dismisses Petition Against Housing Levy, Program to Continue",
    source: "The Daily Nation",
    date: "February 10, 2025",
    url: "https://nation.africa/kenya/news/court-dismisses-housing-levy-petition-4587",
    snippet: "The High Court has dismissed a petition challenging the constitutionality of the Affordable Housing Levy, allowing the government to continue with the program.",
  },
];

export function HousingSchemeTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Home className="h-5 w-5 text-green-500" />
        <h2 className="text-2xl font-bold">Housing Scheme</h2>
      </div>
      
      <KeyStats stats={housingStats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Latest Updates</h3>
          {housingNews.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title}
              source={news.source}
              date={news.date}
              url={news.url}
              snippet={news.snippet}
            />
          ))}
          
          <ActionCard
            title="Check Housing Allocation Status"
            description="If you've applied for a housing unit, check your application status and position in the allocation queue."
            buttonText="Check Application Status"
            buttonAction="https://bomayangu.go.ke/check-status"
            secondaryAction={{
              text: "Application Guide",
              url: "https://bomayangu.go.ke/how-to-apply",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Building className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Available Locations</div>
                  <div className="text-xs text-muted-foreground">32 Counties Nationwide</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Coins className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Payment Options</div>
                  <div className="text-xs text-muted-foreground">Mortgage, Tenant Purchase, Cash</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Home className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Unit Types</div>
                  <div className="text-xs text-muted-foreground">1BR, 2BR, 3BR Options</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Priority Groups</div>
                  <div className="text-xs text-muted-foreground">First-time homeowners, Essential workers</div>
                </div>
              </div>
            </div>
          </ActionCard>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Housing Affordability Calculator</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use this calculator to determine what housing options you can afford based on your income and savings.
            Adjust the sliders to see how changes in your financial situation affect your housing affordability.
          </p>
          
          <HousingAffordabilityCalculator />
        </div>
      </div>
    </div>
  );
}
