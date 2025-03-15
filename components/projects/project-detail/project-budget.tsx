"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Cell
} from "recharts"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2,
  PieChart as PieChartIcon,
  BarChart2
} from "lucide-react"

import { Project } from "@/types/projects"
import { formatCurrency } from "@/utils/projects-utils"

interface ProjectBudgetProps {
  project: Project
}

// Custom colors for charts
const CHART_COLORS = [
  "#0ea5e9", // sky-500
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
]

export default function ProjectBudget({ project }: ProjectBudgetProps) {
  // Calculate budget metrics
  const budgetUtilization = project.budget.spent / project.budget.allocated * 100
  const budgetRemaining = project.budget.allocated - project.budget.spent
  const isOverBudget = project.budget.spent > project.budget.allocated
  
  // Prepare data for budget allocation pie chart
  const getBudgetAllocationData = () => {
    if (!project.budget.breakdown || project.budget.breakdown.length === 0) {
      // If no breakdown is provided, create a simple allocated vs remaining chart
      return [
        { name: "Spent", value: project.budget.spent },
        { name: "Remaining", value: budgetRemaining > 0 ? budgetRemaining : 0 }
      ]
    }
    
    return project.budget.breakdown.map(item => ({
      name: item.category,
      value: item.amount
    }))
  }
  
  // Prepare data for quarterly expenditure bar chart
  const getQuarterlyExpenditureData = () => {
    if (!project.budget.quarterlyExpenditures || project.budget.quarterlyExpenditures.length === 0) {
      return []
    }
    
    return project.budget.quarterlyExpenditures.map(item => ({
      name: item.quarter,
      planned: item.planned,
      actual: item.actual
    }))
  }
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color || entry.fill }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }
  
  // Custom tooltip for bar chart
  const BarChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Financial summary of the project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Total Budget</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(project.budget.allocated)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Allocated for the entire project
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Spent to Date</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(project.budget.spent)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {Math.round(budgetUtilization)}% of total budget
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Remaining Budget</div>
                <div className={`text-2xl font-bold ${isOverBudget ? "text-red-500" : ""}`}>
                  {isOverBudget ? "-" : ""}{formatCurrency(Math.abs(budgetRemaining))}
                </div>
                <div className="flex items-center text-sm mt-1">
                  {isOverBudget ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-500">Over budget</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">Under budget</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Budget Utilization</span>
                <span>{Math.round(budgetUtilization)}%</span>
              </div>
              <Progress 
                value={Math.min(budgetUtilization, 100)} 
                className={`h-2 ${isOverBudget ? "bg-red-100" : ""}`}
                indicatorClassName={isOverBudget ? "bg-red-500" : undefined}
              />
              {isOverBudget && (
                <div className="flex items-center text-sm text-red-500 mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>Budget exceeded by {formatCurrency(Math.abs(budgetRemaining))}</span>
                </div>
              )}
            </div>
            
            {project.budget.fundingSources && project.budget.fundingSources.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Funding Sources</h4>
                <div className="space-y-2">
                  {project.budget.fundingSources.map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {source.type}
                        </Badge>
                        <span>{source.name}</span>
                      </div>
                      <span>{formatCurrency(source.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Budget Allocation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>
                Breakdown of budget by category
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
                  data={getBudgetAllocationData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {getBudgetAllocationData().map((entry, index) => (
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
          
          {project.budget.breakdown && project.budget.breakdown.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Detailed Breakdown</h4>
              <div className="space-y-2">
                {project.budget.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.category}</span>
                    <div className="flex items-center">
                      <span>{formatCurrency(item.amount)}</span>
                      <div 
                        className="w-3 h-3 rounded-full ml-2"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Quarterly Expenditure */}
      {getQuarterlyExpenditureData().length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quarterly Expenditure</CardTitle>
                <CardDescription>
                  Planned vs actual expenditure by quarter
                </CardDescription>
              </div>
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getQuarterlyExpenditureData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<BarChartTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="planned" 
                    name="Planned" 
                    fill="#0ea5e9" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="actual" 
                    name="Actual" 
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Budget Notes */}
      {project.budget.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Budget Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.budget.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
