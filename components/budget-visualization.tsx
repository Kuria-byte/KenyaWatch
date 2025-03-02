"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, PieChartIcon } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

// Real Kenya budget allocation data (2023/2024)
const data = [
  { name: "Education", value: 544.4, percentage: 22.1 },
  { name: "Infrastructure", value: 372.6, percentage: 15.1 },
  { name: "Health", value: 296.7, percentage: 12.0 },
  { name: "Security", value: 271.3, percentage: 11.0 },
  { name: "Agriculture", value: 197.2, percentage: 8.0 },
  { name: "Energy", value: 168.5, percentage: 6.8 },
  { name: "Others", value: 617.3, percentage: 25.0 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">KES {payload[0].value.toFixed(1)}B</p>
        <p className="text-sm text-muted-foreground">{payload[0].payload.percentage}% of Budget</p>
      </Card>
    )
  }
  return null
}

export function BudgetVisualization() {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie")

  return (
    <div className="w-full h-full">
      <div className="flex justify-end gap-2 mb-4">
        <Button variant={chartType === "pie" ? "default" : "outline"} size="sm" onClick={() => setChartType("pie")}>
          <PieChartIcon className="h-4 w-4 mr-2" />
          Pie
        </Button>
        <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Bar
        </Button>
      </div>

      <div className="h-[300px] md:h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={chartType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "pie" ? (
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              ) : (
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
                  <YAxis label={{ value: "Budget (Billion KES)", angle: -90, position: "insideLeft" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

