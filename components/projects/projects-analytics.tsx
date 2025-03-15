"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Construction,
  MapPin,
  Users,
  Briefcase
} from "lucide-react"

import { Project, ProjectStatus, ProjectCategory } from "@/types/projects"
import { 
  formatCurrency, 
  getProjectStatusColor,
  getProjectCategoryColor,
  getUniqueCounties
} from "@/utils/projects-utils"

interface ProjectsAnalyticsProps {
  projects: Project[]
}

// Custom colors for charts
const CHART_COLORS = [
  "#0ea5e9", // sky-500
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
  "#06b6d4", // cyan-500
  "#84cc16", // lime-500
  "#6366f1", // indigo-500
  "#14b8a6"  // teal-500
]

export default function ProjectsAnalytics({ projects }: ProjectsAnalyticsProps) {
  const [selectedCounty, setSelectedCounty] = useState<string>("All")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [totalBudget, setTotalBudget] = useState<number>(0)
  const [totalBeneficiaries, setTotalBeneficiaries] = useState<number>(0)
  const [completedProjects, setCompletedProjects] = useState<number>(0)
  const [delayedProjects, setDelayedProjects] = useState<number>(0)
  
  const counties = ["All", ...getUniqueCounties(projects)]
  
  // Calculate analytics data when filtered projects change
  useEffect(() => {
    // Filter projects by county if selected
    let filtered = [...projects]
    if (selectedCounty !== "All") {
      filtered = filtered.filter(project => 
        project.location.county === selectedCounty
      )
    }
    
    setFilteredProjects(filtered)
    
    // Calculate metrics
    const budget = filtered.reduce((sum, project) => 
      sum + project.budget.allocated, 0
    )
    setTotalBudget(budget)
    
    const beneficiaries = filtered.reduce((sum, project) => 
      sum + project.impact.beneficiaries, 0
    )
    setTotalBeneficiaries(beneficiaries)
    
    const completed = filtered.filter(
      project => project.status === "Completed"
    ).length
    setCompletedProjects(completed)
    
    const delayed = filtered.filter(
      project => project.status === "Delayed"
    ).length
    setDelayedProjects(delayed)
    
  }, [projects, selectedCounty])
  
  // Prepare data for status distribution chart
  const getStatusDistributionData = () => {
    const statusCounts: Record<ProjectStatus, number> = {
      Planning: 0,
      Procurement: 0,
      InProgress: 0,
      OnHold: 0,
      Delayed: 0,
      Completed: 0,
      Cancelled: 0
    }
    
    filteredProjects.forEach(project => {
      statusCounts[project.status]++
    })
    
    return Object.entries(statusCounts)
      .filter(([_, count]) => count > 0)
      .map(([status, count]) => ({
        name: status,
        value: count,
        color: getProjectStatusColor(status as ProjectStatus).replace("bg-", "")
      }))
  }
  
  // Prepare data for category distribution chart
  const getCategoryDistributionData = () => {
    const categoryCounts: Partial<Record<ProjectCategory, number>> = {}
    
    filteredProjects.forEach(project => {
      if (categoryCounts[project.category]) {
        categoryCounts[project.category]!++
      } else {
        categoryCounts[project.category] = 1
      }
    })
    
    return Object.entries(categoryCounts)
      .filter(([_, count]) => count > 0)
      .map(([category, count]) => ({
        name: category,
        value: count
      }))
  }
  
  // Prepare data for budget allocation chart
  const getBudgetAllocationData = () => {
    const categoryBudgets: Partial<Record<ProjectCategory, number>> = {}
    
    filteredProjects.forEach(project => {
      if (categoryBudgets[project.category]) {
        categoryBudgets[project.category]! += project.budget.allocated
      } else {
        categoryBudgets[project.category] = project.budget.allocated
      }
    })
    
    return Object.entries(categoryBudgets)
      .filter(([_, budget]) => budget > 0)
      .map(([category, budget]) => ({
        name: category,
        value: budget / 1000000 // Convert to millions for better display
      }))
      .sort((a, b) => b.value - a.value) // Sort by budget, descending
  }
  
  // Prepare data for county projects count
  const getCountyProjectsData = () => {
    const countyCounts: Record<string, number> = {}
    
    projects.forEach(project => {
      const county = project.location.county
      if (countyCounts[county]) {
        countyCounts[county]++
      } else {
        countyCounts[county] = 1
      }
    })
    
    return Object.entries(countyCounts)
      .map(([county, count]) => ({
        name: county,
        value: count
      }))
      .sort((a, b) => b.value - a.value) // Sort by count, descending
      .slice(0, 10) // Take top 10 counties
  }
  
  // Prepare data for timeline completion chart
  const getCompletionTimelineData = () => {
    // Group projects by completion year and month
    const completionData: Record<string, number> = {}
    
    filteredProjects
      .filter(project => project.status === "Completed")
      .forEach(project => {
        const date = new Date(project.timeline.actualEnd || project.timeline.plannedEnd)
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
        
        if (completionData[yearMonth]) {
          completionData[yearMonth]++
        } else {
          completionData[yearMonth] = 1
        }
      })
    
    // Convert to array and sort by date
    return Object.entries(completionData)
      .map(([yearMonth, count]) => ({
        date: yearMonth,
        completed: count
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color || entry.fill }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="space-y-6">
      {/* Filter by county */}
      <div className="flex justify-end">
        <Select value={selectedCounty} onValueChange={setSelectedCounty}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by county" />
          </SelectTrigger>
          <SelectContent>
            {counties.map((county) => (
              <SelectItem key={county} value={county}>
                {county}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredProjects.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {completedProjects} completed ({Math.round((completedProjects / filteredProjects.length) * 100) || 0}%)
            </div>
            <Progress 
              value={(completedProjects / filteredProjects.length) * 100} 
              className="h-1 mt-2" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalBudget)}
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <Briefcase className="h-3 w-3 mr-1" />
              <span>Allocated across {filteredProjects.length} projects</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Beneficiaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBeneficiaries.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>Estimated impact across counties</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delayed Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {delayedProjects}
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>{Math.round((delayedProjects / filteredProjects.length) * 100) || 0}% of all projects</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>
                  Distribution of projects by status
                </CardDescription>
              </div>
              <PieChartIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getStatusDistributionData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {getStatusDistributionData().map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Project Category Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Project Categories</CardTitle>
                <CardDescription>
                  Distribution of projects by category
                </CardDescription>
              </div>
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getCategoryDistributionData()}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="#0ea5e9" 
                    name="Projects" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Budget Allocation by Category */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>
                  Budget allocation by project category (KES millions)
                </CardDescription>
              </div>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getBudgetAllocationData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    angle={-45} 
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="#10b981" 
                    name="Budget (millions)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Projects by County */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Counties</CardTitle>
                <CardDescription>
                  Counties with the most projects
                </CardDescription>
              </div>
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getCountyProjectsData()}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="#8b5cf6" 
                    name="Projects" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Project Completion Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Project Completion Timeline</CardTitle>
                <CardDescription>
                  Number of projects completed over time
                </CardDescription>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getCompletionTimelineData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    angle={-45} 
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#0ea5e9" 
                    name="Completed Projects"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
