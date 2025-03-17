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
import { fetchLeadersData, getTotalDeclaredWealth, getLeaderTenure } from "@/utils/leaders-utils"
import { Leader } from "@/types/leaders"


export default async function LeaderProfilePage({ params }: { params: { slug: string } }) {
  const leadersData = await fetchLeadersData();
  const leaderData = leadersData.find((leader: Leader) => leader.id === params.slug);

  if (!leaderData) {
    return <div>Leader not found</div>;
  }

  // Calculate quick stats
  const scandalCount = leaderData.scandals?.length || 0;
  const activeProjects = leaderData.projects?.filter(p => p.status === 'ongoing').length || 0;

  return (
    <div className="container px-4 sm:px-6 py-4 sm:py-8 mx-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[200px] sm:h-[300px] rounded-xl overflow-hidden mb-4 sm:mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden border-4 border-white bg-primary flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-bold text-white">
              {leaderData.name.charAt(0)}
            </span>
          </div>
          <div className="text-white">
            <h1 className="text-2xl sm:text-3xl font-bold">{leaderData.name}</h1>
            <p className="text-base sm:text-lg opacity-90">{leaderData.position}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">
                {leaderData.party}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">
              {getLeaderTenure(leaderData.electedDate, leaderData.endDate)}

              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="p-4">
          <div className="text-2xl font-bold">{leaderData.approvalRating}/5</div>
          <div className="text-sm text-muted-foreground">Approval Rating</div>
          <div className="text-xs text-muted-foreground">
            {leaderData.totalVotes.toLocaleString()} votes
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{getTotalDeclaredWealth(leaderData.wealth)}</div>
          <div className="text-sm text-muted-foreground">Declared Wealth</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{activeProjects}</div>
          <div className="text-sm text-muted-foreground">Active Projects</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{scandalCount}</div>
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
                  {leaderData.education?.map((edu: string, index: number) => (
                    <li key={`education-${index}`} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Legislative Record Section */}
              {leaderData.legislativeRecord && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Legislative Record</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-2xl font-bold">{leaderData.legislativeRecord.billsSponsored}</p>
                      <p className="text-sm text-muted-foreground">Bills Sponsored</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{leaderData.legislativeRecord.billsPassed}</p>
                      <p className="text-sm text-muted-foreground">Bills Passed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{leaderData.legislativeRecord.motions}</p>
                      <p className="text-sm text-muted-foreground">Motions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{leaderData.legislativeRecord.committees.length}</p>
                      <p className="text-sm text-muted-foreground">Committees</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Committee Memberships:</h4>
                    <div className="flex flex-wrap gap-2">
                      {leaderData.legislativeRecord.committees.map((committee, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded-full text-sm">
                          {committee}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Contact Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Office Location</p>
                    <p className="text-muted-foreground">{leaderData.contact.office}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{leaderData.contact.email}</p>
                  </div>
                  {leaderData.contact.socialMedia && (
                    <div>
                      <p className="font-medium">Social Media</p>
                      {leaderData.contact.socialMedia.twitter && (
                        <a href={`https://twitter.com/${leaderData.contact.socialMedia.twitter.replace('@', '')}`} 
                           className="text-primary hover:underline"
                           target="_blank"
                           rel="noopener noreferrer">
                          {leaderData.contact.socialMedia.twitter}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="track-record">
            <TrackRecordSection 
              projects={leaderData.projects}
              promises={leaderData.promises}
              attendance={leaderData.attendance}
              keyAchievements={leaderData.keyAchievements}
            />
          </TabsContent>

          <TabsContent value="scandals">
            <ScandalTimeline scandals={leaderData.scandals || []} />
          </TabsContent>

          <TabsContent value="wealth">
            <WealthDeclaration wealth={leaderData.wealth || []} />
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