"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Share2,
  Star,
  AlertTriangle,
  Briefcase,
  FileText,
  Users,
  TrendingUp,
  Mail,
  ExternalLink,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApprovalTrend } from "./approval-trend"
import { WealthDeclaration } from "./wealth-declaration"
import { ProjectTracker } from "./project-tracker"
import { ScandalTimeline } from "./scandal-timeline"
import { QuickStat } from "./quick-stat"
import { AboutSection } from "./about-section";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TrackRecordSection } from "./track-record-section"

interface LeaderProfile {
  id: string
  name: string
  title: string
  party: string
  tenure: string
  imageUrl: string
  quickStats: {
    approvalRating: number
    totalVotes: number
    wealthDeclared: string
    scandalCount: number
  }
  about: {
    education: string[]
    certifications: string[]
    careerTimeline: {
      period: string
      position: string
    }[]
    catchphrases: string[]
  }
  trackRecord: {
    projects: {
      name: string
      status: string
      budget: string
      completion: number
    }[]
    legislative: {
      billsSponsored: number
      billsPassed: number
      attendance: number
    }
    promises: {
      made: string
      delivered: string
      status: "success" | "warning" | "danger"
    }[]
  }
  scandals: {
    title: string
    year: number
    description: string
    source: string
    status: string
    evidence: string[]
  }[]
  wealth: {
    timeline: {
      year: number
      amount: string
      assets: string[]
    }[]
    conflicts: string[]
  }
  perception: {
    trends: {
      date: string
      rating: number
    }[]
    endorsements: string[]
    criticism: string[]
  }
  contact: {
    office: string
    email: string
    publicMeetings: {
      event: string
      date: string
      location: string
    }[]
  }
}

export function LeaderProfile({ leader }: { leader: LeaderProfile }) {
  const [activeTab, setActiveTab] = useState("about")
  
  return (
    <div className="container max-w-4xl mx-auto py-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
          <div className="absolute bottom-4 left-4 flex items-end gap-4">
            <div className="h-24 w-24 rounded-lg overflow-hidden border-4 border-white">
              <img 
                src={leader.imageUrl} 
                alt={leader.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-white mb-2">
              <h1 className="text-2xl font-bold">{leader.name}</h1>
              <p className="text-sm opacity-90">
                {leader.title} | {leader.party}
              </p>
              <p className="text-xs opacity-75">{leader.tenure}</p>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b">
          <QuickStat
            icon={Star}
            label="Approval Rating"
            value={`${leader.quickStats.approvalRating}/5`}
            subtext={`${leader.quickStats.totalVotes} votes`}
          />
          <QuickStat
            icon={Briefcase}
            label="Wealth Declared"
            value={leader.quickStats.wealthDeclared}
            subtext="Last Updated 2024"
          />
          <QuickStat
            icon={AlertTriangle}
            label="Active Scandals"
            value={leader.quickStats.scandalCount.toString()}
            subtext="Click for details"
          />
          <div className="flex justify-end items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="track-record">Track Record</TabsTrigger>
            <TabsTrigger value="scandals">Scandals</TabsTrigger>
            <TabsTrigger value="wealth">Wealth</TabsTrigger>
            <TabsTrigger value="perception">Perception</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <AboutSection data={leader.about} />
          </TabsContent>

          <TabsContent value="track-record" className="mt-6">
            <TrackRecordSection data={leader.trackRecord} />
          </TabsContent>

          {/* Scandals & Controversies */}
          <TabsContent value="scandals" className="mt-6">
  {leader.scandals && leader.scandals.length > 0 ? (
    <ScandalTimeline scandals={leader.scandals} />
  ) : (
    <div className="text-center p-6 text-muted-foreground">
      No scandals or controversies recorded
    </div>
  )}
</TabsContent>

          {/* Wealth Declaration */}
          <TabsContent value="wealth" className="mt-6">
            <WealthDeclaration wealth={leader.wealth} />
          </TabsContent>

          {/* Perception Tab */}
          <TabsContent value="perception" className="mt-6">
            <ApprovalTrend trends={leader.perception.trends} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Endorsements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {leader.perception.endorsements.map((endorsement, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{endorsement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Criticisms</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {leader.perception.criticism.map((criticism, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{criticism}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Office Location</h3>
                  <p className="text-sm">{leader.contact.office}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm">{leader.contact.email}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Upcoming Public Meetings</h3>
                  <div className="space-y-2">
                    {leader.contact.publicMeetings.map((meeting, i) => (
                      <div key={i} className="text-sm">
                        <p className="font-medium">{meeting.event}</p>
                        <p className="text-muted-foreground">
                          {meeting.date} at {meeting.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Buttons */}
      <motion.div 
        className="fixed bottom-6 right-6 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100">
          <Flag className="h-4 w-4 mr-2" />
          Report Inaccuracy
        </Button>
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Follow Updates
        </Button>
      </motion.div>
    </div>
  )
}