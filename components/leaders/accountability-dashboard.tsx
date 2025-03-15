"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  Cell,
  PieChart,
  Pie
} from "recharts"
import { 
  CheckSquare, 
  Calendar, 
  PieChart as PieChartIcon,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Info,
  ExternalLink
} from "lucide-react"
import { Leader } from "@/types/leaders"
import { calculatePromiseFulfillment } from "@/utils/leaders-utils"
import Link from "next/link"

interface AccountabilityDashboardProps {
  leaders: Leader[]
}

export default function AccountabilityDashboard({ leaders }: AccountabilityDashboardProps) {
  const [activeTab, setActiveTab] = useState("promises")
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-[600px]">
          <TabsTrigger value="promises" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span>Promise Tracker</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            <span>Budget Utilization</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="promises" className="space-y-4">
          <PromiseTracker leaders={leaders} />
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <AttendanceRecords leaders={leaders} />
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-4">
          <BudgetUtilization leaders={leaders} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PromiseTracker({ leaders }: { leaders: Leader[] }) {
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  
  // Get all promises from all leaders
  const allPromises = leaders.flatMap(leader => 
    leader.promises.map(promise => ({
      ...promise,
      leaderName: leader.name,
      leaderId: leader.id,
      leaderPosition: leader.position,
      leaderImageUrl: leader.imageUrl
    }))
  )
  
  // Get unique categories
  const categories = ["All", ...new Set(allPromises.map(promise => promise.category))]
  
  // Filter promises
  const filteredPromises = allPromises.filter(promise => {
    if (categoryFilter !== "All" && promise.category !== categoryFilter) {
      return false
    }
    if (statusFilter !== "All" && promise.status !== statusFilter) {
      return false
    }
    return true
  })
  
  // Calculate overall statistics
  const totalPromises = filteredPromises.length
  const fulfilledPromises = filteredPromises.filter(p => p.status === "fulfilled").length
  const inProgressPromises = filteredPromises.filter(p => p.status === "in-progress").length
  const brokenPromises = filteredPromises.filter(p => p.status === "broken").length
  const pendingPromises = filteredPromises.filter(p => p.status === "pending").length
  
  const fulfillmentRate = totalPromises > 0 
    ? Math.round((fulfilledPromises / totalPromises) * 100) 
    : 0
  
  // Data for pie chart
  const promiseStatusData = [
    { name: "Fulfilled", value: fulfilledPromises, color: "#10b981" },
    { name: "In Progress", value: inProgressPromises, color: "#3b82f6" },
    { name: "Broken", value: brokenPromises, color: "#ef4444" },
    { name: "Pending", value: pendingPromises, color: "#f59e0b" }
  ].filter(item => item.value > 0)
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "fulfilled":
        return <Badge className="bg-green-100 text-green-800">Fulfilled</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "broken":
        return <Badge className="bg-red-100 text-red-800">Broken</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Promise Fulfillment Overview</CardTitle>
            <CardDescription>
              Tracking {totalPromises} promises from {leaders.length} leaders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={promiseStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {promiseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} promises`, ""]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Fulfillment Rate</span>
                <span>{fulfillmentRate}%</span>
              </div>
              <Progress value={fulfillmentRate} className="h-2" />
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Performing Leaders</CardTitle>
            <CardDescription>
              Leaders with highest promise fulfillment rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaders
                .map(leader => ({
                  ...leader,
                  fulfillmentRate: calculatePromiseFulfillment(leader).fulfillmentRate
                }))
                .sort((a, b) => b.fulfillmentRate - a.fulfillmentRate)
                .slice(0, 5)
                .map(leader => (
                  <div key={leader.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={leader.imageUrl} 
                        alt={leader.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-sm">{leader.name}</h4>
                          <p className="text-xs text-muted-foreground">{leader.position}</p>
                        </div>
                        <div className="font-medium">{leader.fulfillmentRate}%</div>
                      </div>
                      <Progress value={leader.fulfillmentRate} className="h-1.5 mt-1" />
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Promise Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Track and monitor promises made by government leaders
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="fulfilled">Fulfilled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="broken">Broken</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredPromises.map((promise) => (
          <Card key={promise.id}>
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src={promise.leaderImageUrl} 
                      alt={promise.leaderName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link href={`/leader/${promise.leaderId}`} className="font-medium hover:underline">
                      {promise.leaderName}
                    </Link>
                    <p className="text-xs text-muted-foreground">{promise.leaderPosition}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-1">
                    {getStatusBadge(promise.status)}
                    <Badge variant="outline">{promise.category}</Badge>
                  </div>
                  <p className="text-sm">{promise.description}</p>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Made: {promise.madeDate}</span>
                    <span>Due: {promise.dueDate}</span>
                  </div>
                </div>
                
                {promise.evidence && (
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={promise.evidence} target="_blank" rel="noopener noreferrer">
                        <Info className="h-4 w-4 mr-1" />
                        Evidence
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
        
        {filteredPromises.length === 0 && (
          <div className="text-center p-8 border rounded-lg">
            <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No promises found</h3>
            <p className="text-sm text-muted-foreground">
              Try changing your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function AttendanceRecords({ leaders }: { leaders: Leader[] }) {
  const [periodFilter, setPeriodFilter] = useState<string>("All")
  
  // Get all attendance records
  const allAttendance = leaders.flatMap(leader => 
    leader.attendance.map(record => ({
      ...record,
      leaderName: leader.name,
      leaderId: leader.id,
      leaderPosition: leader.position,
      attendanceRate: Math.round((record.present / record.total) * 100)
    }))
  )
  
  // Get unique periods
  const periods = ["All", ...new Set(allAttendance.map(record => record.period))]
  
  // Filter attendance records
  const filteredAttendance = allAttendance.filter(record => {
    if (periodFilter !== "All" && record.period !== periodFilter) {
      return false
    }
    return true
  })
  
  // Group by leader for the chart
  const leaderAttendanceData = leaders.map(leader => {
    const leaderRecords = filteredAttendance.filter(record => record.leaderId === leader.id)
    const totalPresent = leaderRecords.reduce((sum, record) => sum + record.present, 0)
    const totalSessions = leaderRecords.reduce((sum, record) => sum + record.total, 0)
    const attendanceRate = totalSessions > 0 ? Math.round((totalPresent / totalSessions) * 100) : 0
    
    return {
      name: leader.name,
      position: leader.position,
      attendanceRate,
      present: totalPresent,
      total: totalSessions
    }
  }).sort((a, b) => b.attendanceRate - a.attendanceRate)
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Attendance Records</h3>
          <p className="text-sm text-muted-foreground">
            Track parliamentary and official meeting attendance
          </p>
        </div>
        <div>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Attendance Rate by Leader</CardTitle>
          <CardDescription>
            Showing data for {periodFilter === "All" ? "all periods" : periodFilter}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaderAttendanceData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, "Attendance Rate"]}
                  labelFormatter={(value) => leaderAttendanceData.find(d => d.name === value)?.position || ""}
                />
                <Legend />
                <Bar 
                  dataKey="attendanceRate" 
                  name="Attendance Rate" 
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Detailed Attendance Records</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAttendance.map((record, index) => (
            <Card key={`${record.leaderId}-${record.period}-${index}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Link 
                      href={`/leader/${record.leaderId}`} 
                      className="font-medium hover:underline"
                    >
                      {record.leaderName}
                    </Link>
                    <p className="text-xs text-muted-foreground">{record.leaderPosition}</p>
                  </div>
                  <Badge variant="outline">{record.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attendance Rate</span>
                      <span>{record.attendanceRate}%</span>
                    </div>
                    <Progress value={record.attendanceRate} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-2xl font-bold">{record.present}</div>
                      <div className="text-xs text-muted-foreground">Present</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-2xl font-bold">{record.absent}</div>
                      <div className="text-xs text-muted-foreground">Absent</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredAttendance.length === 0 && (
          <div className="text-center p-8 border rounded-lg">
            <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No attendance records found</h3>
            <p className="text-sm text-muted-foreground">
              Try changing your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function BudgetUtilization({ leaders }: { leaders: Leader[] }) {
  // Calculate budget utilization from projects
  const leaderBudgetData = leaders.map(leader => {
    const totalBudget = leader.projects.reduce(
      (sum, project) => sum + project.budget, 
      0
    )
    
    const totalSpent = leader.projects.reduce(
      (sum, project) => sum + project.spent, 
      0
    )
    
    const utilizationRate = totalBudget > 0 
      ? Math.round((totalSpent / totalBudget) * 100) 
      : 0
    
    const efficiency = leader.projects.length > 0
      ? leader.projects.reduce((sum, project) => sum + project.completion, 0) / leader.projects.length
      : 0
    
    const efficiencyRate = Math.round(efficiency)
    
    // Calculate a score based on completion vs spending
    // Higher score means more completion with less spending
    const efficiencyScore = utilizationRate > 0 
      ? Math.round((efficiencyRate / utilizationRate) * 100) 
      : 0
    
    return {
      id: leader.id,
      name: leader.name,
      position: leader.position,
      imageUrl: leader.imageUrl,
      totalBudget,
      totalSpent,
      utilizationRate,
      efficiencyRate,
      efficiencyScore,
      projects: leader.projects.length
    }
  }).sort((a, b) => b.efficiencyScore - a.efficiencyScore)
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Budget Utilization</h3>
        <p className="text-sm text-muted-foreground">
          How effectively leaders are using allocated funds
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Budget Utilization vs. Project Completion</CardTitle>
            <CardDescription>
              Comparing spending efficiency with project outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={leaderBudgetData.slice(0, 10)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="utilizationRate" 
                    name="Budget Utilization" 
                    fill="#3b82f6"
                  />
                  <Bar 
                    dataKey="efficiencyRate" 
                    name="Project Completion" 
                    fill="#10b981"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Efficient Budget Utilizers</CardTitle>
            <CardDescription>
              Leaders with highest efficiency scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderBudgetData.slice(0, 5).map(leader => (
                <div key={leader.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src={leader.imageUrl} 
                      alt={leader.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <Link 
                          href={`/leader/${leader.id}`} 
                          className="font-medium text-sm hover:underline"
                        >
                          {leader.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{leader.position}</p>
                      </div>
                      <div className="font-medium">
                        {leader.efficiencyScore > 100 ? 100 : leader.efficiencyScore}%
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Spent: {Math.round(leader.utilizationRate)}%</span>
                      <span>Completed: {leader.efficiencyRate}%</span>
                    </div>
                    <Progress 
                      value={leader.efficiencyScore > 100 ? 100 : leader.efficiencyScore} 
                      className="h-1.5 mt-1" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Detailed Budget Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Leader</th>
                  <th className="text-left py-2 px-3">Position</th>
                  <th className="text-right py-2 px-3">Budget Allocated</th>
                  <th className="text-right py-2 px-3">Budget Spent</th>
                  <th className="text-center py-2 px-3">Utilization</th>
                  <th className="text-center py-2 px-3">Completion</th>
                  <th className="text-center py-2 px-3">Efficiency Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderBudgetData.map((leader) => (
                  <tr key={leader.id} className="border-b">
                    <td className="py-2 px-3 font-medium">
                      <Link href={`/leader/${leader.id}`} className="hover:underline">
                        {leader.name}
                      </Link>
                    </td>
                    <td className="py-2 px-3">{leader.position}</td>
                    <td className="text-right py-2 px-3">{formatCurrency(leader.totalBudget)}</td>
                    <td className="text-right py-2 px-3">{formatCurrency(leader.totalSpent)}</td>
                    <td className="text-center py-2 px-3">
                      {leader.utilizationRate}%
                    </td>
                    <td className="text-center py-2 px-3">
                      {leader.efficiencyRate}%
                    </td>
                    <td className="text-center py-2 px-3">
                      <Badge className={
                        leader.efficiencyScore >= 90 ? "bg-green-100 text-green-800" :
                        leader.efficiencyScore >= 70 ? "bg-blue-100 text-blue-800" :
                        leader.efficiencyScore >= 50 ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {leader.efficiencyScore}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
