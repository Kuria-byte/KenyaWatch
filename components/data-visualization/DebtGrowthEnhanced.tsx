"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector
} from "recharts"
import { fetchDebtData, DebtData, DebtYearData, Creditor } from "@/utils/data-utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DebtGrowthEnhancedProps {
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">Year: {label}</p>
        <p className="text-sm" style={{ color: "#8884d8" }}>
          <span className="font-medium">Total Debt:</span> KES {payload[0].value.toLocaleString()} trillion
        </p>
        <p className="text-sm" style={{ color: "#82ca9d" }}>
          <span className="font-medium">Domestic:</span> KES {payload[1].value.toLocaleString()} trillion
        </p>
        <p className="text-sm" style={{ color: "#ffc658" }}>
          <span className="font-medium">External:</span> KES {payload[2].value.toLocaleString()} trillion
        </p>
        <p className="text-sm mt-1 text-gray-600">
          <span className="font-medium">Debt-to-GDP:</span> {payload[3]?.value.toFixed(1)}%
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Per Capita:</span> KES {payload[4]?.value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-xs font-medium">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
        {`KES ${value.toFixed(1)}T`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  )
}

export default function DebtGrowthEnhanced() {
  const [debtData, setDebtData] = useState<DebtData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [chartType, setChartType] = useState<"line" | "area">("area")

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchDebtData()
        setDebtData(data)
      } catch (err) {
        console.error("Error loading debt data:", err)
        setError("Failed to load debt growth data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="space-y-4 w-full">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!debtData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No debt growth data available.</AlertDescription>
      </Alert>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="h-full w-full">
      <div className="mb-4 text-sm flex justify-between items-center">
        <div>
          <span className="font-medium">Kenya National Debt (2013-2024)</span>
          <span className="ml-2 text-xs text-muted-foreground">
            Source: {debtData.source}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartType("area")}
            className={`text-xs px-2 py-1 rounded ${
              chartType === "area" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`text-xs px-2 py-1 rounded ${
              chartType === "line" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            Line
          </button>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Data sourced from National Treasury and Central Bank of Kenya. Debt figures are in KES trillion.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="growth">Debt Growth</TabsTrigger>
          <TabsTrigger value="creditors">Major Creditors</TabsTrigger>
          <TabsTrigger value="indicators">Debt Indicators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="growth" className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={debtData.data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Debt"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="domestic"
                  name="Domestic Debt"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="external"
                  name="External Debt"
                  stackId="3"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            ) : (
              <LineChart
                data={debtData.data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total Debt"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="domestic"
                  name="Domestic Debt"
                  stroke="#82ca9d"
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="external"
                  name="External Debt"
                  stroke="#ffc658"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="creditors" className="h-[350px]">
          <div className="grid grid-cols-2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={debtData.majorCreditors}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  onMouseEnter={onPieEnter}
                >
                  {debtData.majorCreditors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="p-4">
              <h4 className="font-medium text-sm mb-2">Major External Creditors</h4>
              <ul className="space-y-2">
                {debtData.majorCreditors.map((creditor, index) => (
                  <li key={index} className="text-xs flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div>
                      <span className="font-medium">{creditor.name}</span>
                      <div className="text-muted-foreground">
                        KES {creditor.amount.toFixed(1)} trillion ({creditor.percentage}%)
                      </div>
                      <div className="text-muted-foreground text-[10px]">
                        {creditor.projects.join(", ")}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="indicators" className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={debtData.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 200000]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="debtToGDP"
                name="Debt-to-GDP Ratio (%)"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="perCapita"
                name="Debt Per Capita (KES)"
                stroke="#82ca9d"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>

      <div className="mt-4 border-t pt-4">
        <h4 className="text-sm font-medium mb-2">Key Insights:</h4>
        <ul className="text-sm space-y-1 list-disc pl-5">
          {debtData.insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
