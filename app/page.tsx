"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { WatchingEyes } from "@/components/watching-eyes"
import { KenyaFlag } from "@/components/kenya-flag"
import { UwaziBot } from "@/components/uwazi-bot"
import {
  Building2,
  GraduationCap,
  HeartPulse,
  AlertTriangle,
  Users,
  Menu,
  X,
  Search,
  Bell,
  Flag,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Book,
  Heart,
} from "lucide-react"
import LeaderCard from "@/components/leader-card"
import CitizenAlert from "@/components/citizen-alert"
import PerformanceLeaderboard from "@/components/performance-leaderboard"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { BudgetVisualization } from "@/components/budget-visualization"
import { ScandalTracker } from "@/components/scandal-tracker"
import { AnimatedGreeting } from "@/components/animated-greeting"

// Real Kenyan political figures data
const leaders = [
  {
    name: "Johnson Sakaja",
    position: "Governor, Nairobi County",
    metrics: {
      projectsExecuted: 15,
      projectsPromised: 35,
      fundsAllocated: "KES 38.8B",
      fundsUtilized: "KES 28.2B",
      attendance: "78%",
    },
    approvalRating: {
      performance: 3.2,
      integrity: 3.5,
      wouldVoteAgain: 3.1,
    },
    imageUrl: "/placeholder.svg?height=100&width=100", // Replace with actual image
  },
  {
    name: "Kimani Ichung'wah",
    position: "MP, Kikuyu Constituency",
    metrics: {
      projectsExecuted: 12,
      projectsPromised: 20,
      fundsAllocated: "KES 137M",
      fundsUtilized: "KES 98M",
      attendance: "92%",
    },
    approvalRating: {
      performance: 4.1,
      integrity: 3.8,
      wouldVoteAgain: 3.9,
    },
    imageUrl: "/placeholder.svg?height=100&width=100", // Replace with actual image
  },
  // Add more leaders...
]

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <WatchingEyes />
              <span className="font-bold text-xl">KenyaWatch</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Leaders
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Projects
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Reports
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="gap-2">
              <Flag className="h-4 w-4" />
              Report Fraud
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t bg-background"
            >
              <nav className="container py-4 space-y-4">
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
                  <Building2 className="h-5 w-5" />
                  Dashboard
                </a>
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
                  <Users className="h-5 w-5" />
                  Leaders
                </a>
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
                  <GraduationCap className="h-5 w-5" />
                  Projects
                </a>
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
                  <HeartPulse className="h-5 w-5" />
                  Reports
                </a>
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
                  <Book className="h-5 w-5" />
                  Civic Education
                </a>
                <div className="pt-4 border-t">
                  <Button className="w-full" size="sm">
                    Sign In
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 container py-6 px-4 md:px-6">
        {/* Add the greeting section */}
        <AnimatedGreeting />

        {/* Key Impact Stats */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-red-50 dark:bg-red-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Government Debt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES 10.2T</div>
              <p className="text-sm text-muted-foreground">National Debt = KES 200K per Citizen</p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Unemployment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34%</div>
              <p className="text-sm text-muted-foreground">Youth Unemployment (15–34 yrs)</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Annual Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES 4.2T</div>
              <p className="text-sm text-muted-foreground">2024 Budget | 30% Allocated to Debt Repayment</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Inflation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.1%</div>
              <p className="text-sm text-muted-foreground">Food Prices Up 15%</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Corruption Losses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES 1.2B</div>
              <p className="text-sm text-muted-foreground">Lost to Scandals in 2024</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Poverty Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">36%</div>
              <p className="text-sm text-muted-foreground">Live Below KES 200/day</p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Data Visualization Panel */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Budget Allocation</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <select className="px-2 py-1 border rounded-md text-sm">
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                </div>
              </div>
              <CardDescription>Explore government spending across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetVisualization />
            </CardContent>
          </Card>
        </motion.section>

        {/* Corruption Impact CTA */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                Scandal Spotlight
              </CardTitle>
              <CardDescription>See the real impact of corruption on public services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">KES 1B NHIF Scandal (2023)</h3>
                  <p className="text-muted-foreground">
                    Could Have Built 10 Level 4 Hospitals or Paid 5,000 Doctors for 6 Months
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funds Lost</span>
                      <span>KES 1B</span>
                    </div>
                    <Progress value={100} className="h-2 bg-red-200" />
                    <div className="flex justify-between text-sm">
                      <span>Potential Impact</span>
                      <span>10 Hospitals</span>
                    </div>
                    <Progress value={0} className="h-2 bg-green-200" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">KES 500M Road Scandal</h3>
                  <p className="text-muted-foreground">Equivalent to 200km of Paved Roads in Rural Areas</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funds Lost</span>
                      <span>KES 500M</span>
                    </div>
                    <Progress value={100} className="h-2 bg-red-200" />
                    <div className="flex justify-between text-sm">
                      <span>Potential Impact</span>
                      <span>200km Roads</span>
                    </div>
                    <Progress value={0} className="h-2 bg-green-200" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="gap-2">
                  <Flag className="h-4 w-4" />
                  Report Fraud
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Hold Leaders Accountable */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Hold Leaders Accountable
              </CardTitle>
              <CardDescription>Track performance metrics and approval ratings for elected officials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search for a leader..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <LeaderCard
                  name="Johnson Sakaja"
                  position="Governor, Nairobi County"
                  metrics={{
                    projectsExecuted: 15,
                    projectsPromised: 35,
                    fundsAllocated: "KES 38.8B",
                    fundsUtilized: "KES 28.2B",
                    attendance: "78%",
                  }}
                  approvalRating={{
                    performance: 3.2,
                    integrity: 3.5,
                    wouldVoteAgain: 3.1,
                  }}
                  imageUrl="/placeholder.svg?height=100&width=100"
                />

                <LeaderCard
                  name="Kimani Ichung'wah"
                  position="MP, Kikuyu Constituency"
                  metrics={{
                    projectsExecuted: 12,
                    projectsPromised: 20,
                    fundsAllocated: "KES 137M",
                    fundsUtilized: "KES 98M",
                    attendance: "92%",
                  }}
                  approvalRating={{
                    performance: 4.1,
                    integrity: 3.8,
                    wouldVoteAgain: 3.9,
                  }}
                  imageUrl="/placeholder.svg?height=100&width=100"
                />

                <LeaderCard
                  name="David Kamau"
                  position="MCA, Eastern Ward"
                  metrics={{
                    projectsExecuted: 5,
                    projectsPromised: 10,
                    fundsAllocated: "KES 50M",
                    fundsUtilized: "KES 25M",
                    attendance: "78%",
                  }}
                  approvalRating={{
                    performance: 3.1,
                    integrity: 3.5,
                    wouldVoteAgain: 3.0,
                  }}
                  imageUrl="/placeholder.svg?height=100&width=100"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="destructive" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Impeach Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Social Action Panel */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Citizen Alerts
              </CardTitle>
              <CardDescription>Current issues requiring immediate public attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <CitizenAlert
                  title="Lecturers Strike: Day 6"
                  description="2M Students Affected. Share to #SaveEducation."
                  severity="high"
                />

                <CitizenAlert
                  title="Nairobi County Halts Garbage Collection"
                  description="Demand Action from County Officials!"
                  severity="medium"
                />

                <CitizenAlert
                  title="Water Shortage in Eastern Counties"
                  description="Affecting 500,000 residents. Share to raise awareness."
                  severity="high"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance Leaderboard
              </CardTitle>
              <CardDescription>Best and worst performing counties and officials</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="best">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="best" className="flex-1">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Best Performers
                  </TabsTrigger>
                  <TabsTrigger value="worst" className="flex-1">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Worst Performers
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="best">
                  <PerformanceLeaderboard
                    type="best"
                    items={[
                      { name: "Makueni County", metric: "97% Projects Completed", rank: 1 },
                      { name: "Nakuru County", metric: "92% Projects Completed", rank: 2 },
                      { name: "Kiambu County", metric: "88% Projects Completed", rank: 3 },
                    ]}
                  />
                </TabsContent>
                <TabsContent value="worst">
                  <PerformanceLeaderboard
                    type="worst"
                    items={[
                      { name: "Nairobi County", metric: "12% Projects Completed", rank: 47 },
                      { name: "Mombasa County", metric: "23% Projects Completed", rank: 46 },
                      { name: "Kisumu County", metric: "31% Projects Completed", rank: 45 },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.section>

        {/* Add Scandal Tracker at the bottom */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <ScandalTracker />
        </motion.section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <KenyaFlag />
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.div>
              for Kenyans
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              About
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Contact
            </Button>
          </div>
        </div>
      </footer>

      {/* UwaziBot */}
      <UwaziBot />
    </div>
  )
}

