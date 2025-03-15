import React, { useState } from "react";
import { KeyStats } from "./KeyStats";
import { NewsItem } from "./NewsItem";
import { ActionCard } from "./ActionCard";
import { Shield, AlertTriangle, FileText, Mail } from "lucide-react";
import { AbductionReportForm } from "./AbductionReportForm";
import { AbductionStatusTracker } from "./AbductionStatusTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Security data - Abductions
const securityStats = [
  {
    label: "Reported Abductions",
    value: "87",
    change: "+12 from 2024",
    trend: "down" as const,
  },
  {
    label: "Resolved Cases",
    value: "42",
    change: "48.3% resolution rate",
    trend: "up" as const,
  },
  {
    label: "Ongoing Investigations",
    value: "45",
    change: "51.7% of total cases",
    trend: "neutral" as const,
  },
  {
    label: "Avg. Resolution Time",
    value: "18 days",
    change: "-3 days from 2024",
    trend: "up" as const,
  },
  {
    label: "High-Risk Areas",
    value: "4 Counties",
    change: "-2 counties from 2024",
    trend: "up" as const,
  },
  {
    label: "Prosecutions",
    value: "23",
    change: "54.8% of resolved cases",
    trend: "up" as const,
  },
];

const securityNews = [
  {
    title: "Government Forms Special Task Force to Address Rising Abduction Cases",
    source: "Office of the President",
    date: "March 14, 2025",
    url: "https://president.go.ke/statements/abduction-task-force",
    snippet: "President William Ruto has announced the formation of a special multi-agency task force to address the rising cases of abductions across the country.",
  },
  {
    title: "Human Rights Commission Calls for Urgent Action on Enforced Disappearances",
    source: "Kenya Human Rights Commission",
    date: "March 5, 2025",
    url: "https://www.khrc.or.ke/press-releases/enforced-disappearances",
    snippet: "The Kenya Human Rights Commission has called for urgent government action to address what it terms as a 'disturbing pattern of enforced disappearances' in the country.",
  },
  {
    title: "Police Rescue 12 Victims in Major Anti-Abduction Operation",
    source: "National Police Service",
    date: "February 28, 2025",
    url: "https://www.nationalpolice.go.ke/news/anti-abduction-operation",
    snippet: "The National Police Service has successfully rescued 12 abduction victims in a major operation conducted across three counties, arresting 8 suspects in the process.",
  },
];

export function SecurityTab() {
  const [activeSubTab, setActiveSubTab] = useState("report");

  const handleDemandAction = () => {
    // In a real implementation, this would generate an email with pre-filled content
    const subject = encodeURIComponent("Urgent Action Needed on Abduction Cases");
    const body = encodeURIComponent(
      "Dear Chief Justice,\n\n" +
      "I am writing to express my deep concern about the rising cases of abductions in Kenya. " +
      "As a citizen, I demand immediate action to ensure that:\n\n" +
      "1. All abduction cases are expedited in our court system\n" +
      "2. Maximum penalties are imposed on convicted perpetrators\n" +
      "3. Special protection is provided for witnesses in these cases\n" +
      "4. Judicial officers are assigned specifically to handle abduction cases\n\n" +
      "The safety and security of Kenyans must be prioritized, and our judicial system must demonstrate that these crimes will not be tolerated.\n\n" +
      "Sincerely,\n" +
      "[Your Name]"
    );
    
    window.open(`mailto:chief.justice@judiciary.go.ke?subject=${subject}&body=${body}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-red-500" />
        <h2 className="text-2xl font-bold">Security - Abductions</h2>
      </div>
      
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-700 dark:text-red-400">Emergency Information</h3>
            <p className="text-sm text-red-700/80 dark:text-red-400/80 mb-2">
              If you or someone you know has been abducted or is in immediate danger, contact authorities immediately:
            </p>
            <ul className="text-sm text-red-700/80 dark:text-red-400/80 list-disc list-inside space-y-1">
              <li>National Police Helpline: <strong>999</strong> or <strong>112</strong></li>
              <li>DCI Hotline: <strong>0800 722 203</strong></li>
              <li>Missing Persons Hotline: <strong>0800 MISSING (647-7464)</strong></li>
            </ul>
          </div>
        </div>
      </div>
      
      <KeyStats stats={securityStats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Latest Updates</h3>
          {securityNews.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title}
              source={news.source}
              date={news.date}
              url={news.url}
              snippet={news.snippet}
            />
          ))}
          
          <div className="space-y-4 mt-6">
            <ActionCard
              title="Demand Action from the Chief Justice"
              description="Send a pre-formatted email to the Chief Justice demanding expedited handling of abduction cases in our court system."
              buttonText="Send Email to Chief Justice"
              buttonAction="#"
              secondaryAction={{
                text: "View Judiciary Response",
                url: "https://judiciary.go.ke/statements/abduction-cases",
              }}
            >
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg mb-4">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Pre-formatted Email Includes:</div>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1 mt-1">
                    <li>Request for expedited court processes</li>
                    <li>Call for maximum penalties for perpetrators</li>
                    <li>Demand for witness protection</li>
                    <li>Request for dedicated judicial officers</li>
                  </ul>
                </div>
              </div>
              <Button onClick={handleDemandAction} className="w-full mb-2">
                <Mail className="h-4 w-4 mr-2" />
                Open Email Template
              </Button>
            </ActionCard>
            
            <ActionCard
              title="Legal Help for Families"
              description="Access free legal resources and support for families of abduction victims."
              buttonText="Find Legal Help"
              buttonAction="https://legalaid.go.ke/abduction-support"
              secondaryAction={{
                text: "Know Your Rights",
                url: "https://legalaid.go.ke/rights-guide",
              }}
            >
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg mb-4">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Available Resources:</div>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1 mt-1">
                    <li>Pro bono legal representation</li>
                    <li>Court process navigation assistance</li>
                    <li>Habeas corpus filing templates</li>
                    <li>Psychological support referrals</li>
                  </ul>
                </div>
              </div>
            </ActionCard>
          </div>
        </div>
        
        <div className="space-y-6">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="report">Report Abduction</TabsTrigger>
              <TabsTrigger value="track">Track Status</TabsTrigger>
            </TabsList>
            
            <TabsContent value="report" className="pt-4">
              <AbductionReportForm />
            </TabsContent>
            
            <TabsContent value="track" className="pt-4">
              <AbductionStatusTracker />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
