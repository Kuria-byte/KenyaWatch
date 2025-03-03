"use client"

import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Share2, Flag } from "lucide-react"
import Image from "next/image"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react"
import { TrackRecordSection } from "@/components/leader-profile/track-record-section"
import { ScandalTimeline } from "@/components/leader-profile/scandal-timeline"
import { WealthDeclaration } from "@/components/leader-profile/wealth-declaration"

interface LeaderProfile {
  id: string;
  name: string;
  title: string;
  party: string;
  tenure: string;
  imageUrl: string;
  quickStats: {
    approvalRating: number;
    totalVotes: number;
    wealthDeclared: string;
    scandalCount: number;
  };
  about: {
    education: string[];
    certifications: string[];
    careerTimeline: Array<{
      period: string;
      position: string;
    }>;
    catchphrases: string[];
  };
  trackRecord: {
    projects: Array<{
      name: string;
      status: string;
      budget: string;
      completion: number;
    }>;
    legislative: {
      billsSponsored: number;
      billsPassed: number;
      attendance: number;
    };
    promises: Array<{
      made: string;
      delivered: string;
      status: "success" | "warning" | "danger";
    }>;
  };
  scandals: Array<{
    title: string;
    year: number;
    description: string;
    source: string;
    status: string;
    evidence: string[];
  }>;
  wealth: {
    timeline: Array<{
      year: number;
      amount: string;
      assets: string[];
    }>;
    conflicts: string[];
  };
  perception: {
    trends: Array<{
      date: string;
      rating: number;
    }>;
    endorsements: string[];
    criticism: string[];
  };
  contact: {
    office: string;
    email: string;
    publicMeetings: Array<{
      event: string;
      date: string;
      location: string;
    }>;
  };
}

// Mock data - replace with API call later
const leaderData: LeaderProfile = {
  id: "sakaja-johnson",
  name: "Johnson Sakaja",
  title: "Governor, Nairobi County",
  party: "UDA",
  tenure: "2022 - Present",
  imageUrl: "/leaders/sakaja.jpg", // Update with actual image
  quickStats: {
    approvalRating: 3.2,
    totalVotes: 835453, // Actual 2022 election votes
    wealthDeclared: "KES 1.2B",
    scandalCount: 3
  },
  about: {
    education: [
      "Bachelor of Actuarial Science, University of Nairobi (2006)",
      "Masters in Public Policy & Administration, Africa Leadership University (Ongoing)",
      "Executive Leadership Program, Kenya School of Government (2023)"
    ],
    certifications: [
      "Certified Public Accountant (CPA-K)",
      "Project Management Professional (PMP)",
      "Strategic Leadership Development Program (SLDP)"
    ],
    careerTimeline: [
      { period: "2022-Present", position: "Governor, Nairobi County" },
      { period: "2017-2022", position: "Senator, Nairobi County" },
      { period: "2013-2017", position: "Nominated Member of Parliament" },
      { period: "2011-2013", position: "TNA Party Chairman" },
      { period: "2008-2011", position: "Financial Analyst, PwC Kenya" }
    ],
    catchphrases: [
      "Let's Make Nairobi Work!",
      "For the Youth, By the Youth",
      "A City of Order and Dignity"
    ]
  },
  trackRecord: {
    projects: [
      {
        name: "Green Park Terminus",
        status: "In Progress",
        budget: "KES 248M",
        completion: 85
      },
      {
        name: "Nairobi Rivers Rehabilitation",
        status: "Ongoing",
        budget: "KES 1.4B",
        completion: 40
      },
      {
        name: "County Digital Payment System",
        status: "Completed",
        budget: "KES 180M",
        completion: 100
      },
      {
        name: "School Feeding Program",
        status: "Ongoing",
        budget: "KES 420M",
        completion: 75
      }
    ],
    legislative: {
      billsSponsored: 12,
      billsPassed: 8,
      attendance: 78
    },
    promises: [
      {
        made: "24-hour economy implementation",
        delivered: "Partially achieved - Extended business hours in CBD",
        status: "warning"
      },
      {
        made: "Free WiFi in CBD",
        delivered: "Not implemented",
        status: "danger"
      },
      {
        made: "Digital Revenue Collection",
        delivered: "Fully implemented",
        status: "success"
      }
    ]
  },
  scandals: [
    {
      title: "University Degree Verification Controversy",
      year: 2022,
      description: "Questions raised about the authenticity of degree certificate from Team University Uganda",
      source: "https://nation.africa/kenya/news/politics/sakaja-degree-3851060",
      status: "Resolved",
      evidence: [
        "CUE Verification Report",
        "Team University Statement",
        "Court Documents"
      ]
    },
    {
      title: "Matatu CBD Ban Controversy",
      year: 2023,
      description: "Contested decision to remove matatus from CBD without adequate alternative",
      source: "https://www.standardmedia.co.ke/nairobi/article/2001471477/",
      status: "Ongoing",
      evidence: [
        "County Assembly Reports",
        "Public Participation Documents"
      ]
    }
  ],
  wealth: {
    timeline: [
      {
        year: 2022,
        amount: "KES 1.2B",
        assets: [
          "Karen Residential Property (KES 380M)",
          "Shares in Tech Companies (KES 150M)",
          "Rental Properties in Westlands (KES 420M)",
          "Investment in Saccos (KES 85M)",
          "Personal Vehicles (KES 28M)"
        ]
      },
      {
        year: 2017,
        amount: "KES 750M",
        assets: [
          "Residential Property",
          "Company Shares",
          "Government Bonds"
        ]
      }
    ],
    conflicts: [
      "Board member of company bidding for county waste management tender",
      "Family ownership in public transport sector during reform period"
    ]
  },
  perception: {
    trends: [
      { date: "2024-Q1", rating: 3.2 },
      { date: "2023-Q4", rating: 3.4 },
      { date: "2023-Q3", rating: 3.6 },
      { date: "2023-Q2", rating: 3.8 },
      { date: "2023-Q1", rating: 4.0 }
    ],
    endorsements: [
      "Nairobi Business Community",
      "Youth Advocacy Groups",
      "Kenya Private Sector Alliance",
      "Matatu Owners Association"
    ],
    criticism: [
      "Slow implementation of promised projects",
      "Increased parking fees without consultation",
      "Poor garbage collection services",
      "Traffic congestion management"
    ]
  },
  contact: {
    office: "City Hall, 2nd Floor, City Hall Way",
    email: "governor@nairobi.go.ke",
    publicMeetings: [
      {
        event: "Town Hall - CBD Development",
        date: "2024-03-15",
        location: "KICC, Ground Floor"
      },
      {
        event: "Youth Employment Summit",
        date: "2024-03-28",
        location: "Charter Hall"
      },
      {
        event: "County Budget Reading",
        date: "2024-04-10",
        location: "County Assembly Hall"
      }
    ]
  }
};

export default function LeaderProfilePage() {
  const { slug } = useParams()
  
  return (
    <div className="container px-4 sm:px-6 py-4 sm:py-8 mx-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[200px] sm:h-[300px] rounded-xl overflow-hidden mb-4 sm:mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden border-4 border-white">
            <Image 
              src={leaderData.imageUrl} 
              alt={leaderData.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="text-2xl sm:text-3xl font-bold">{leaderData.name}</h1>
            <p className="text-base sm:text-lg opacity-90">{leaderData.title}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">
                {leaderData.party}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">
                {leaderData.tenure}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="p-4">
          <div className="text-2xl font-bold">{leaderData.quickStats.approvalRating}/5</div>
          <div className="text-sm text-muted-foreground">Approval Rating</div>
          <div className="text-xs text-muted-foreground">
            {leaderData.quickStats.totalVotes.toLocaleString()} votes
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{leaderData.quickStats.wealthDeclared}</div>
          <div className="text-sm text-muted-foreground">Declared Wealth</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{leaderData.trackRecord.projects.length}</div>
          <div className="text-sm text-muted-foreground">Active Projects</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{leaderData.quickStats.scandalCount}</div>
          <div className="text-sm text-muted-foreground">Major Controversies</div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        <Tabs defaultValue="about" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-auto inline-flex min-w-full sm:min-w-0">
              <TabsTrigger value="about" className="text-sm">About</TabsTrigger>
              <TabsTrigger value="track-record" className="text-sm whitespace-nowrap">Track Record</TabsTrigger>
              <TabsTrigger value="scandals" className="text-sm whitespace-nowrap">Scandals & Controversies</TabsTrigger>
              <TabsTrigger value="wealth" className="text-sm whitespace-nowrap">Wealth Declaration</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about" className="mt-4">
            <div className="grid gap-4 sm:gap-6">
              {/* Education Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Education</h3>
                <ul className="space-y-2">
                  {leaderData.about.education.map((edu: string, index: number) => (
                    <li key={`education-${index}`} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Certifications Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Professional Certifications</h3>
                <ul className="space-y-2">
                  {leaderData.about.certifications.map((cert: string, index: number) => (
                    <li key={`cert-${index}`} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Career Timeline Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Career Timeline</h3>
                <div className="relative pl-6 border-l-2 border-muted space-y-6">
                  {leaderData.about.careerTimeline.map((career, index: number) => (
                    <div 
                      key={`career-${index}`} 
                      className="relative"
                    >
                      <span className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary border-4 border-background" />
                      <div className="space-y-1">
                        <p className="font-medium">{career.position}</p>
                        <p className="text-sm text-muted-foreground">{career.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Catchphrases Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notable Quotes & Catchphrases</h3>
                <div className="grid gap-4">
                  {leaderData.about.catchphrases.map((phrase: string, index: number) => (
                    <div
                      key={`phrase-${index}`}
                      className="p-4 rounded-lg bg-muted/50 italic text-center"
                    >
                      "{phrase}"
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="track-record">
            <TrackRecordSection data={leaderData.trackRecord} />
          </TabsContent>

          <TabsContent value="scandals">
            <ScandalTimeline scandals={leaderData.scandals} />
          </TabsContent>

          <TabsContent value="wealth">
            <WealthDeclaration wealth={leaderData.wealth} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Move Action Buttons to a fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4 flex justify-center gap-3 sm:hidden">
        <Button className="flex-1" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="destructive" className="flex-1" size="sm">
          <Flag className="h-4 w-4 mr-2" />
          Report
        </Button>
      </div>

      {/* Keep desktop action buttons */}
      <div className="hidden sm:flex fixed bottom-6 right-6 gap-2">
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share Profile
        </Button>
        <Button variant="destructive" size="sm">
          <Flag className="h-4 w-4 mr-2" />
          Report Inaccuracy
        </Button>
      </div>
    </div>
  )
}