"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
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
} from "recharts"

const budgetData = [
  { name: "Debt Repayment", value: 30.0 },
  { name: "Education", value: 20.0 },
  { name: "Health", value: 15.0 },
  { name: "Infrastructure", value: 13.0 },
  { name: "Security", value: 10.0 },
  { name: "Agriculture", value: 7.0 },
  { name: "Others", value: 5.0 },
]

const debtData = [
  { year: 2019, amount: 5.7 },
  { year: 2020, amount: 6.3 },
  { year: 2021, amount: 7.2 },
  { year: 2022, amount: 8.4 },
  { year: 2023, amount: 9.1 },
  { year: 2024, amount: 10.2 },
]

const countyData = [
  { name: "Makueni", completion: 97, allocated: 45, utilized: 43 },
  { name: "Nakuru", completion: 92, allocated: 60, utilized: 55 },
  { name: "Kiambu", completion: 88, allocated: 75, utilized: 66 },
  { name: "Machakos", completion: 76, allocated: 50, utilized: 38 },
  { name: "Nairobi", completion: 12, allocated: 120, utilized: 14 },
]

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF00FF", "#8884d8", "#82ca9d"]

export function DataVisualization() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-semibold">Data Visualization</CardTitle>
            <CardDescription className="text-base">
              Explore government spending, debt growth, and county performance
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <select aria-label="Select year" className="h-9 px-3 py-1 rounded-md border text-sm bg-background">
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Tabs defaultValue="budget" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 h-auto gap-1">
            <TabsTrigger value="budget">Budget Allocation</TabsTrigger>
            <TabsTrigger value="debt">Debt Growth</TabsTrigger>
            <TabsTrigger value="county">County Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} (${value}%)`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Percentage (%)" fill="#8884d8">
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="debt" className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={debtData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: "Trillion KES", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" name="Debt Amount" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="county" className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" name="Project Completion %" fill="#0088FE" />
                  <Bar dataKey="allocated" name="Allocated (Billion KES)" fill="#00C49F" />
                  <Bar dataKey="utilized" name="Utilized (Billion KES)" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

