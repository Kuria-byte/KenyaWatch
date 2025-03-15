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
import { HotTopics } from "@/components/hot-topics/HotTopics"
import PerformanceLeaderboard from "@/components/performance-leaderboard"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { BudgetVisualization } from "@/components/budget-visualization"
import { ScandalTracker } from "@/components/scandal-tracker"
import { AnimatedGreeting } from "@/components/animated-greeting"
import { ErrorBoundary } from "@/components/error-boundary"
import BudgetTreemap from "@/components/budget-treemap"
import DebtGrowthChart from "@/components/debt-growth-chart"
import CountyPerformanceChart from "@/components/county-performance-chart"
import { PriceImpactTracker } from "@/components/price-impact-tracker"
import { ExpandableStat } from "@/components/expanadable-stats"
import { WelcomeSection } from "@/components/welcome-section"
import DataVisualizationPanel from "@/components/data-visualization/DataVisualizationPanel"

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
          {/* Mobile Layout */}
          <div className="flex w-full md:hidden items-center justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Centered Logo */}
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <WatchingEyes />
              <span className="font-bold text-xl">KenyaWatch</span>
            </div>

            {/* Right-aligned Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Desktop Layout - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 pl-4">
            <div className="flex items-center gap-2">
              <WatchingEyes />
              <span className="font-bold text-xl">KenyaWatch</span>
            </div>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
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

          {/* Desktop Action Buttons - hidden on mobile */}
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

      <main className="flex-1 container py-6 px-8 md:px-10"> {/* Increased horizontal padding */}
        {/* <AnimatedGreeting /> */}
        <WelcomeSection />
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ExpandableStat
            title="Government Debt"
            value="KES 10.6T"
            subtitle="National Debt = KES 200K per Citizen"
            colorClass="bg-red-50 dark:bg-red-950/20"
            details={{
              internal: {
                amount: "KES 4.1T",
                breakdown: [
                  { category: "Treasury Bonds", amount: "KES 2.8T" },
                  { category: "Treasury Bills", amount: "KES 1.3T" },
                ]
              },
              external: {
                amount: "KES 6.1T",
                breakdown: [
                  { 
                    country: "China", 
                    amount: "KES 1.4T",
                    terms: "3.5% interest rate, 15-year maturity" 
                  },
                  { 
                    country: "World Bank", 
                    amount: "KES 1.2T",
                    terms: "2.8% interest rate, 20-year maturity" 
                  },
                  // Add more lenders...
                ]
              },
              history: [
                {
                  period: "2013-2022",
                  leader: "Uhuru Kenyatta",
                  amountAdded: "KES 7.2T",
                  keyProjects: ["SGR", "Expressway", "Laptop Project"]
                },
                {
                  period: "2022-2025",
                  leader: "William Ruto",
                  amountAdded: "KES 2.1T",
                  keyProjects: ["Affordable Housing", "Hustler Fund"]
                }
              ],
              paymentStatus: {
                paid: "KES 2.1T",
                remaining: "KES 8.1T",
                nextPayment: "KES 800B (June 2025)"
              },
              impact: [
                "Each Kenyan owes KES 200,000 in public debt",
                "50% of tax revenue goes to debt repayment",
                "Reduced funding for essential services",
                "Higher taxes to service debt"
              ],
              sources: [
                { title: "CBK Report 2024", url: "https://www.centralbank.go.ke" },
                { title: "Treasury Portal", url: "https://www.treasury.go.ke" }
              ]
            }}
          />

          {/* Annual Budget Stat */}
          <ExpandableStat
            title="Annual Budget"
            value="KES 3.9T"
            subtitle="2024/25 Financial Year"
            colorClass="bg-blue-50 dark:bg-blue-950/20"
            details={{
              internal: {
                amount: "KES 3.9T",
                breakdown: [
                  { category: "Recurrent Expenditure", amount: "KES 2.3T" },
                  { category: "Development", amount: "KES 1.1T" },
                  { category: "County Allocation", amount: "KES 385B" },
                ]
              },
              history: [
                {
                  period: "2023-2024",
                  leader: "William Ruto",
                  amountAdded: "KES 300B",
                  keyProjects: ["Housing Fund", "Universal Healthcare"]
                }
              ],
              paymentStatus: {
                paid: "KES 1.8T",
                remaining: "KES 2.1T",
                nextPayment: "KES 350B (July 2024)"
              },
              impact: [
                "Development budget reduced by 15%",
                "Increased taxation to fund budget",
                "Focus on Bottom-up economic model"
              ],
              sources: [
                { title: "Treasury Budget", url: "https://treasury.go.ke" },
                { title: "Parliamentary Reports", url: "#" }
              ]
            }}
          />

          {/* Unemployment Stat */}
          <ExpandableStat
            title="Unemployment Rate"
            value="12.3%"
            subtitle="5.3M Kenyans Unemployed"
            colorClass="bg-yellow-50 dark:bg-yellow-950/20"
            details={{
              internal: {
                amount: "5.3M",
                breakdown: [
                  { category: "Youth (18-35)", amount: "3.2M" },
                  { category: "Graduate Level", amount: "1.1M" },
                  { category: "Skilled Labor", amount: "1M" }
                ]
              },
              history: [
                {
                  period: "2022-2025",
                  leader: "William Ruto",
                  amountAdded: "Created 2.1M jobs",
                  keyProjects: ["Hustler Fund", "Digital Jobs"]
                }
              ],
              paymentStatus: {
                paid: "KES 50B",
                remaining: "KES 150B",
                nextPayment: "KES 30B (Youth Fund)"
              },
              impact: [
                "1 in 3 youth unemployed",
                "Rising informal sector",
                "Brain drain to foreign countries"
              ],
              sources: [
                { title: "KNBS Report", url: "https://knbs.go.ke" },
                { title: "World Bank Data", url: "#" }
              ]
            }}
          />

          {/* Inflation Rate Stat */}
          <ExpandableStat
            title="Inflation Rate"
            value="7.2%"
            subtitle="Above CBK Target of 5%"
            colorClass="bg-red-50 dark:bg-red-950/20"
            details={{
              internal: {
                amount: "7.2%",
                breakdown: [
                  { category: "Food & Beverages", amount: "9.4%" },
                  { category: "Transport", amount: "8.1%" },
                  { category: "Housing & Utilities", amount: "6.3%" }
                ]
              },
              history: [
                {
                  period: "2022-2025",
                  leader: "William Ruto",
                  amountAdded: "+2.1%",
                  keyProjects: ["Price Control Measures", "Fuel Subsidies"]
                }
              ],
              paymentStatus: {
                paid: "N/A",
                remaining: "N/A",
                nextPayment: "Monthly CBK Review"
              },
              impact: [
                "Rising cost of basic goods",
                "Reduced purchasing power",
                "Increased poverty levels"
              ],
              sources: [
                { title: "CBK Statistics", url: "https://centralbank.go.ke" },
                { title: "KNBS Price Index", url: "#" }
              ]
            }}
          />

          {/* Corruption Losses Stat */}
          <ExpandableStat
            title="Corruption Losses"
            value="KES 0.8T"
            subtitle="Annual Public Fund Loss"
            colorClass="bg-purple-50 dark:bg-purple-950/20"
            details={{
              internal: {
                amount: "KES 800B",
                breakdown: [
                  { category: "Public Procurement", amount: "KES 420B" },
                  { category: "Ghost Workers", amount: "KES 180B" },
                  { category: "Project Inflation", amount: "KES 200B" }
                ]
              },
              history: [
                {
                  period: "2022-2025",
                  leader: "William Ruto",
                  amountAdded: "KES 300B recovered",
                  keyProjects: ["Lifestyle Audits", "Digital Procurement"]
                }
              ],
              paymentStatus: {
                paid: "KES 50B recovered",
                remaining: "KES 750B pending",
                nextPayment: "Ongoing investigations"
              },
              impact: [
                "30% of annual budget lost",
                "Reduced service delivery",
                "Increased public debt"
              ],
              sources: [
                { title: "EACC Reports", url: "https://eacc.go.ke" },
                { title: "Auditor General", url: "#" }
              ]
            }}
          />

          {/* Poverty Rate Stat */}
          <ExpandableStat
            title="Poverty Rate"
            value="32.1%"
            subtitle="15.9M Living Below Poverty Line"
            colorClass="bg-orange-50 dark:bg-orange-950/20"
            details={{
              internal: {
                amount: "15.9M",
                breakdown: [
                  { category: "Rural Areas", amount: "10.2M" },
                  { category: "Urban Areas", amount: "4.1M" },
                  { category: "Extreme Poverty", amount: "1.6M" }
                ]
              },
              history: [
                {
                  period: "2022-2025",
                  leader: "William Ruto",
                  amountAdded: "-2% reduction",
                  keyProjects: ["Social Protection", "Food Security"]
                }
              ],
              paymentStatus: {
                paid: "KES 120B in aid",
                remaining: "Target: 25% by 2027",
                nextPayment: "Monthly cash transfers"
              },
              impact: [
                "1 in 3 Kenyans in poverty",
                "Limited access to basic needs",
                "Increased inequality"
              ],
              sources: [
                { title: "World Bank Data", url: "#" },
                { title: "KNBS Survey", url: "https://knbs.go.ke" }
              ]
            }}
          />
          
          {/* Add similar ExpandableStat components for other metrics... */}
        </motion.section>

        {/* Data Visualization Panel */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DataVisualizationPanel />
        </motion.section>

        {/* Hot Topics Section - Standalone section after Accountability Center */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <HotTopics />
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
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Accountablity Center
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Track performance metrics for elected officials</CardDescription>
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

              <div className="relative">
                {/* Add fade indicators for scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
                
                {/* Container for horizontal scrolling */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
                  {/* Update LeaderCard container to support snap scrolling */}
                  <div className="min-w-[300px] md:min-w-0 snap-center">
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
                  </div>

                  <div className="min-w-[300px] md:min-w-0 snap-center">
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
                  </div>

                  <div className="min-w-[300px] md:min-w-0 snap-center">
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
                </div>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Citizen Insights
              </CardTitle>
              <CardDescription>Community feedback and public opinion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Content for citizen insights will go here */}
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-1">Public Opinion Poll</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    What issue should the government prioritize?
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Healthcare</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Education</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Security</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Infrastructure</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>


        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <PriceImpactTracker />
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
