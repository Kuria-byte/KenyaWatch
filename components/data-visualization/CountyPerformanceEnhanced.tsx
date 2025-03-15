"use client"

import { useEffect, useState } from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts"
import { fetchCountyData, CountyData, County } from "@/utils/data-utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CountyPerformanceEnhancedProps {
  selectedCounty?: string;
  year?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">{`${label} County`}</p>
        <p className="text-sm" style={{ color: "#8884d8" }}>
          <span className="font-medium">Project Completion:</span> {payload[0].value}%
        </p>
        <p className="text-sm" style={{ color: "#82ca9d" }}>
          <span className="font-medium">Funds Allocated:</span> KES {payload[1].value.toLocaleString()} million
        </p>
        <p className="text-sm" style={{ color: "#ffc658" }}>
          <span className="font-medium">Funds Utilized:</span> KES {payload[2].value.toLocaleString()} million
        </p>
        <p className="text-sm mt-1 text-gray-600">
          <span className="font-medium">Utilization Rate:</span> {(payload[2].value / payload[1].value * 100).toFixed(1)}%
        </p>
      </div>
    )
  }
  return null
}

export default function CountyPerformanceEnhanced({ selectedCounty = "All Counties", year = 2024 }: CountyPerformanceEnhancedProps) {
  const [countyData, setCountyData] = useState<CountyData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [selectedBar, setSelectedBar] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchCountyData()
        setCountyData(data)
      } catch (err) {
        console.error("Error loading county data:", err)
        setError("Failed to load county performance data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [year])

  useEffect(() => {
    if (countyData) {
      let dataToUse = countyData.counties
      
      // Filter by selected county if not "All Counties"
      if (selectedCounty !== "All Counties") {
        dataToUse = dataToUse.filter(county => county.name === selectedCounty)
      }
      
      // Transform data for chart
      const chartData = dataToUse.map(county => ({
        name: county.name,
        completion: county.metrics.projectCompletion,
        allocated: county.metrics.fundsAllocated,
        utilized: county.metrics.fundsUtilized,
        region: county.region,
        keyProjects: county.keyProjects
      }))
      
      // Sort by completion rate (descending)
      chartData.sort((a, b) => b.completion - a.completion)
      
      // Limit to top 8 counties if showing all
      const finalData = selectedCounty === "All Counties" 
        ? chartData.slice(0, 8) 
        : chartData
        
      setFilteredData(finalData)
    }
  }, [countyData, selectedCounty])

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

  if (!countyData || filteredData.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No county performance data available for the selected criteria.</AlertDescription>
      </Alert>
    )
  }

  // Show county details if only one county is selected
  const showCountyDetails = selectedCounty !== "All Counties" && filteredData.length === 1
  const countyDetails = showCountyDetails ? filteredData[0] : null

  return (
    <div className="h-full w-full">
      <div className="mb-4 text-sm flex justify-between items-center">
        <div>
          <span className="font-medium">
            {selectedCounty === "All Counties" ? "Top Performing Counties" : `${selectedCounty} County Performance`}
          </span>
          <span className="ml-2 text-xs text-muted-foreground">
            Fiscal Year: {countyData.fiscalYear}
          </span>
        </div>
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center cursor-help">
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Data sourced from Controller of Budget, Kenya. Project completion is measured as percentage of planned projects completed on time.</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      </div>

      {showCountyDetails && countyDetails && (
        <div className="mb-4 p-3 bg-muted/50 rounded-md">
          <h4 className="font-medium text-sm">{countyDetails.name} County Key Projects:</h4>
          <ul className="mt-1 text-xs space-y-1">
            {countyDetails.keyProjects.map((project: string, idx: number) => (
              <li key={idx}>• {project}</li>
            ))}
          </ul>
        </div>
      )}

      <ResponsiveContainer width="100%" height={350}>
        <BarChart 
          data={filteredData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          onMouseMove={(data) => {
            if (data.activeTooltipIndex !== undefined) {
              setSelectedBar(filteredData[data.activeTooltipIndex]?.name || null)
            }
          }}
          onMouseLeave={() => setSelectedBar(null)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            yAxisId="left"
            orientation="left"
            label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Funds (Million KES)", angle: 90, position: "insideRight" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="completion" 
            fill="#8884d8" 
            name="Project Completion (%)"
          >
            {filteredData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.name === selectedBar ? "#6a5acd" : "#8884d8"} 
                fillOpacity={entry.name === selectedBar ? 1 : 0.8}
              />
            ))}
          </Bar>
          <Bar 
            yAxisId="right" 
            dataKey="allocated" 
            fill="#82ca9d" 
            name="Funds Allocated (Million KES)" 
          />
          <Bar 
            yAxisId="right" 
            dataKey="utilized" 
            fill="#ffc658" 
            name="Funds Utilized (Million KES)" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
