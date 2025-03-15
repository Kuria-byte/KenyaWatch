import React from "react";
import { KeyStats } from "./KeyStats";
import { NewsItem } from "./NewsItem";
import { ActionCard } from "./ActionCard";
import { Activity, Stethoscope, Users, Wallet } from "lucide-react";

// SHIF (Social Health Insurance Fund) data
const shifStats = [
  {
    label: "Enrollment",
    value: "12.4M",
    change: "+2.1M since launch",
    trend: "up" as const,
  },
  {
    label: "Monthly Contributions",
    value: "KES 1.8B",
    change: "+15% YoY",
    trend: "up" as const,
  },
  {
    label: "Coverage Rate",
    value: "24.8%",
    change: "Target: 70% by 2027",
    trend: "neutral" as const,
  },
  {
    label: "Facilities Onboarded",
    value: "3,245",
    change: "+512 in 2025",
    trend: "up" as const,
  },
  {
    label: "Claims Processed",
    value: "845K",
    change: "93% approval rate",
    trend: "up" as const,
  },
  {
    label: "Avg. Processing Time",
    value: "8 days",
    change: "-3 days from 2024",
    trend: "up" as const,
  },
];

const shifNews = [
  {
    title: "SHIF Expands Coverage to Include Dental Services",
    source: "Ministry of Health",
    date: "March 10, 2025",
    url: "https://health.go.ke/shif-expands-coverage",
    snippet: "The Social Health Insurance Fund has announced the expansion of its coverage to include basic dental services starting April 1, 2025, benefiting millions of Kenyans.",
  },
  {
    title: "Government Launches SHIF Mobile Registration Centers",
    source: "Kenya News Agency",
    date: "February 28, 2025",
    url: "https://www.kna.go.ke/articles/4500",
    snippet: "In an effort to increase enrollment, the government has launched mobile registration centers targeting rural areas and informal settlements.",
  },
  {
    title: "SHIF Contributions to Remain Unchanged Despite Inflation",
    source: "The Standard",
    date: "February 15, 2025",
    url: "https://www.standardmedia.co.ke/health/article/2001492345",
    snippet: "The Ministry of Health has confirmed that SHIF contribution rates will remain unchanged for the 2025/2026 financial year despite rising inflation.",
  },
];

export function ShifTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-red-500" />
        <h2 className="text-2xl font-bold">Social Health Insurance Fund (SHIF)</h2>
      </div>
      
      <KeyStats stats={shifStats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Latest Updates</h3>
          {shifNews.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title}
              source={news.source}
              date={news.date}
              url={news.url}
              snippet={news.snippet}
            />
          ))}
        </div>
        
        <div className="space-y-6">
          <ActionCard
            title="Check Your SHIF Eligibility"
            description="Find out if you're eligible for SHIF benefits and what coverage you qualify for based on your contribution level."
            buttonText="Check Eligibility"
            buttonAction="https://shif.health.go.ke/eligibility-checker"
            secondaryAction={{
              text: "View Benefits Guide",
              url: "https://shif.health.go.ke/benefits-guide",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Contribution Rates</div>
                  <div className="text-xs text-muted-foreground">From KES 300/month</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Stethoscope className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Coverage Options</div>
                  <div className="text-xs text-muted-foreground">Basic to Comprehensive</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Family Coverage</div>
                  <div className="text-xs text-muted-foreground">Up to 5 dependents</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Facility Network</div>
                  <div className="text-xs text-muted-foreground">3,245+ nationwide</div>
                </div>
              </div>
            </div>
          </ActionCard>
          
          <ActionCard
            title="Report SHIF Service Issues"
            description="Experienced problems with your SHIF coverage or service at a healthcare facility? Report it directly to the SHIF oversight committee."
            buttonText="File a Complaint"
            buttonAction="https://shif.health.go.ke/complaints"
            secondaryAction={{
              text: "View Service Charter",
              url: "https://shif.health.go.ke/service-charter",
            }}
          />
        </div>
      </div>
    </div>
  );
}
