"use client"

import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Share2, Flag } from "lucide-react"
import Image from "next/image"

// Mock data - replace with API call later
const leaderData = {
  id: "1",
  name: "Johnson Sakaja",
  title: "Governor, Nairobi County",
  party: "UDA",
  tenure: "2022 - Present",
  imageUrl: "/placeholder.svg", // Replace with actual image path
  quickStats: {
    approvalRating: 3.2,
    totalVotes: 12500,
    wealthDeclared: "KES 38.8B",
    scandalCount: 3
  },
  about: {
    education: [
      "Bachelor in Actuarial Science, University of Nairobi",
      "Masters in Public Administration, Harvard Kennedy School"
    ],
    certifications: ["CPA(K)", "Project Management Professional (PMP)"],
    careerTimeline: [
      { period: "2022-Present", position: "Governor, Nairobi County" },
      { period: "2017-2022", position: "Senator, Nairobi County" }
    ],
    catchphrases: [
      "Let's make Nairobi work!",
      "For the youth, by the youth"
    ]
  },
  trackRecord: {
    projects: [
      {
        name: "Green Park Terminal",
        status: "Ongoing",
        budget: "KES 200M",
        completion: 65
      }
    ],
    legislative: {
      billsSponsored: 12,
      billsPassed: 8,
      attendance: 78
    },
    promises: [
      {
        made: "24-hour economy",
        delivered: "Partially implemented",
        status: "warning"
      }
    ]
  },
  scandals: [
    {
      title: "Degree Certificate Controversy",
      year: 2022,
      description: "Questions about academic credentials",
      source: "https://news-source.com/article",
      status: "Resolved",
      evidence: ["Court ruling.pdf", "University statement.pdf"]
    }
  ],
  wealth: {
    timeline: [
      {
        year: 2022,
        amount: "KES 38.8B",
        assets: ["Properties in Karen", "Shares in Tech Companies"]
      }
    ],
    conflicts: [
      "Board member of company bidding for county tenders"
    ]
  },
  perception: {
    trends: [
      { date: "2023-Q4", rating: 3.8 }
    ],
    endorsements: ["Business Community", "Youth Groups"],
    criticism: ["Slow project implementation", "Traffic congestion"]
  },
  contact: {
    office: "City Hall, 2nd Floor",
    email: "governor@nairobi.go.ke",
    publicMeetings: [
      {
        event: "Town Hall",
        date: "2024-03-15",
        location: "KICC"
      }
    ]
  }
}

export default function LeaderProfilePage() {
  const { slug } = useParams()
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
        <div className="absolute bottom-8 left-8 flex items-end gap-6">
          <div className="h-32 w-32 rounded-xl overflow-hidden border-4 border-white">
            <Image 
              src={leaderData.imageUrl} 
              alt={leaderData.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold">{leaderData.name}</h1>
            <p className="text-lg opacity-90">{leaderData.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {leaderData.party}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {leaderData.tenure}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-2xl font-bold">{leaderData.quickStats.approvalRating}/5</div>
          <div className="text-sm text-muted-foreground">Approval Rating</div>
          <div className="text-xs text-muted-foreground">
            {leaderData.quickStats.totalVotes.toLocaleString()} votes
          </div>
        </Card>
        {/* Add more stat cards */}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="track-record">Track Record</TabsTrigger>
          <TabsTrigger value="scandals">Scandals & Controversies</TabsTrigger>
          <TabsTrigger value="wealth">Wealth Declaration</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="grid gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <ul className="space-y-2">
                {leaderData.about.education.map((edu, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {edu}
                  </li>
                ))}
              </ul>
            </Card>
            {/* Add more about sections */}
          </div>
        </TabsContent>

        {/* Add more TabsContent sections */}
      </Tabs>

      {/* Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-2">
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