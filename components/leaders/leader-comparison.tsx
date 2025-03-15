"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  PieChart, 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  Cell,
  Pie
} from "recharts"
import { 
  Users, 
  BarChart2, 
  CheckCircle2, 
  Calendar, 
  X,
  AlertCircle
} from "lucide-react"
import { Leader } from "@/types/leaders"
import { 
  calculateProjectCompletionRate, 
  calculatePromiseFulfillment,
  calculateAttendanceRate
} from "@/utils/leaders-utils"

interface LeaderComparisonProps {
  leaders: Leader[]
}

export default function LeaderComparison({ leaders }: LeaderComparisonProps) {
  const [selectedLeaders, setSelectedLeaders] = useState<Leader[]>([])
  const [selectedMetric, setSelectedMetric] = useState<string>("projects")
  
  const metrics = [
    { value: "projects", label: "Project Completion" },
    { value: "promises", label: "Promise Fulfillment" },
    { value: "attendance", label: "Attendance Rate" },
    { value: "scandals", label: "Scandal Count" },
    { value: "wealth", label: "Wealth Growth" },
    { value: "publicPerception", label: "Public Perception" },
    { value: "budgetEfficiency", label: "Budget Efficiency" },
    { value: "developmentImpact", label: "Development Impact" },
    { value: "constituencyEngagement", label: "Constituency Engagement" }
  ]
  
  const handleLeaderSelect = (leaderId: string) => {
    const leader = leaders.find(l => l.id === leaderId)
    if (!leader) return
    
    // Don't add if already selected
    if (selectedLeaders.some(l => l.id === leaderId)) return
    
    // Limit to 3 leaders
    if (selectedLeaders.length >= 3) return
    
    setSelectedLeaders([...selectedLeaders, leader])
  }
  
  const handleRemoveLeader = (leaderId: string) => {
    setSelectedLeaders(selectedLeaders.filter(l => l.id !== leaderId))
  }
  
  const getComparisonData = () => {
    switch (selectedMetric) {
      case "projects":
        return selectedLeaders.map(leader => ({
          name: leader.name,
          value: calculateProjectCompletionRate(leader)
        }))
      case "promises":
        return selectedLeaders.map(leader => ({
          name: leader.name,
          value: calculatePromiseFulfillment(leader).fulfillmentRate
        }))
      case "attendance":
        return selectedLeaders.map(leader => ({
          name: leader.name,
          value: calculateAttendanceRate(leader)
        }))
      case "scandals":
        return selectedLeaders.map(leader => ({
          name: leader.name,
          value: leader.scandals.length
        }))
      case "wealth":
        return selectedLeaders.map(leader => {
          const wealthRecords = leader.wealth
          if (wealthRecords.length < 2) return { name: leader.name, value: 0 }
          
          const oldestRecord = wealthRecords.reduce((prev, curr) => 
            prev.year < curr.year ? prev : curr
          )
          
          const newestRecord = wealthRecords.reduce((prev, curr) => 
            prev.year > curr.year ? prev : curr
          )
          
          const growthPercent = ((newestRecord.amount - oldestRecord.amount) / oldestRecord.amount) * 100
          return {
            name: leader.name,
            value: Math.round(growthPercent)
          }
        })
      case "publicPerception":
        return selectedLeaders.map(leader => {
          if (!leader.publicPerception) return { name: leader.name, value: 0 }
          return {
            name: leader.name,
            value: leader.publicPerception.favorability || 0
          }
        })
      case "budgetEfficiency":
        return selectedLeaders.map(leader => {
          if (!leader.budgetUtilization) return { name: leader.name, value: 0 }
          return {
            name: leader.name,
            value: leader.budgetUtilization.efficiency || 0
          }
        })
      case "developmentImpact":
        return selectedLeaders.map(leader => {
          if (!leader.developmentIndex) return { name: leader.name, value: 0 }
          // Average of infrastructure score and economic growth
          const score = (leader.developmentIndex.infrastructureScore + 
                        leader.developmentIndex.economicGrowth) / 2
          return {
            name: leader.name,
            value: Math.round(score)
          }
        })
      case "constituencyEngagement":
        return selectedLeaders.map(leader => {
          if (!leader.constituencyEngagement) return { name: leader.name, value: 0 }
          return {
            name: leader.name,
            value: leader.constituencyEngagement.communityFeedback || 0
          }
        })
      default:
        return []
    }
  }
  
  const getMetricLabel = () => {
    const metricObj = metrics.find(m => m.value === selectedMetric)
    return metricObj ? metricObj.label : ""
  }
  
  const getMetricUnit = () => {
    switch (selectedMetric) {
      case "projects":
      case "promises":
      case "attendance":
        return "%"
      case "scandals":
        return ""
      case "wealth":
        return "%"
      default:
        return ""
    }
  }
  
  const getBarColors = () => {
    return [
      "#8884d8",
      "#82ca9d",
      "#ffc658"
    ]
  }
  
  const renderDetailedComparison = () => {
    if (selectedLeaders.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 border rounded-lg">
          <div className="text-center p-6">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Select Leaders to Compare</h3>
            <p className="text-sm text-muted-foreground">
              Choose up to 3 leaders to compare their performance metrics
            </p>
          </div>
        </div>
      )
    }
    
    const comparisonData = getComparisonData()
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{getMetricLabel()} Comparison</h3>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem key={metric.value} value={metric.value}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {getMetricLabel()} by Leader
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis unit={getMetricUnit()} />
                    <Tooltip 
                      formatter={(value) => [`${value}${getMetricUnit()}`, getMetricLabel()]}
                    />
                    <Bar dataKey="value" name={getMetricLabel()}>
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColors()[index % 3]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Pie Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Relative {getMetricLabel()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={comparisonData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColors()[index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}${getMetricUnit()}`, getMetricLabel()]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Detailed Metrics Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Detailed Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Leader</th>
                    <th className="text-center py-2 px-3">Project Completion</th>
                    <th className="text-center py-2 px-3">Promise Fulfillment</th>
                    <th className="text-center py-2 px-3">Attendance Rate</th>
                    <th className="text-center py-2 px-3">Scandals</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedLeaders.map((leader) => (
                    <tr key={leader.id} className="border-b">
                      <td className="py-2 px-3 font-medium">{leader.name}</td>
                      <td className="text-center py-2 px-3">
                        {calculateProjectCompletionRate(leader)}%
                      </td>
                      <td className="text-center py-2 px-3">
                        {calculatePromiseFulfillment(leader).fulfillmentRate}%
                      </td>
                      <td className="text-center py-2 px-3">
                        {calculateAttendanceRate(leader)}%
                      </td>
                      <td className="text-center py-2 px-3">
                        {leader.scandals.length}
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <Card className="w-full md:w-64">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Select Leaders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={handleLeaderSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Add leader to compare" />
              </SelectTrigger>
              <SelectContent>
                {leaders
                  .filter(leader => !selectedLeaders.some(l => l.id === leader.id))
                  .map((leader) => (
                    <SelectItem key={leader.id} value={leader.id}>
                      {leader.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            <div className="space-y-2">
              {selectedLeaders.map((leader) => (
                <div 
                  key={leader.id} 
                  className="flex items-center justify-between bg-muted p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <img 
                        src={leader.imageUrl} 
                        alt={leader.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{leader.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleRemoveLeader(leader.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {selectedLeaders.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-2">
                  No leaders selected
                </div>
              )}
            </div>
            
            {selectedLeaders.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {selectedLeaders.length}/3 leaders selected
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex-1">
          {renderDetailedComparison()}
        </div>
      </div>
    </div>
  )
}
