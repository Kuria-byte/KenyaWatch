"use client"

import { useEffect, useState } from "react"
import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { fetchBudgetData, BudgetData, BudgetCategory } from "@/utils/data-utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  BookOpen, 
  Building2, 
  Stethoscope, 
  Shield, 
  Wheat, 
  HeartHandshake, 
  Wallet, 
  Briefcase,
  BanknoteIcon
} from "lucide-react"

interface CustomizedContentProps {
  x?: number
  y?: number
  width?: number
  height?: number
  name?: string
  percentage?: number
  color?: string
}

// Function to get the appropriate icon based on category name
const getCategoryIcon = (name: string, size: number) => {
  switch (name.toLowerCase()) {
    case "education":
      return <BookOpen size={size} />;
    case "infrastructure":
      return <Building2 size={size} />;
    case "health":
      return <Stethoscope size={size} />;
    case "security":
      return <Shield size={size} />;
    case "agriculture":
      return <Wheat size={size} />;
    case "social protection":
      return <HeartHandshake size={size} />;
    case "debt repayment":
      return <BanknoteIcon size={size} />;
    case "other sectors":
      return <Briefcase size={size} />;
    default:
      return <Wallet size={size} />;
  }
};

// Subtle color palette mapping
const getSubtleColor = (originalColor: string) => {
  const colorMap: Record<string, string> = {
    "#FF8042": "#e0b6a1", // Softer orange for Debt Repayment
    "#0088FE": "#a8c7e6", // Softer blue for Education
    "#FFBB28": "#e6d7b3", // Softer yellow for Infrastructure
    "#00C49F": "#b3e0d2", // Softer teal for Health
    "#FF00FF": "#e0b3e0", // Softer magenta for Security
    "#8884d8": "#c7c6e6", // Softer purple for Agriculture
    "#82ca9d": "#c6e6d4", // Softer green for Social Protection
    "#ffc658": "#e6dcc6"  // Softer gold for Other Sectors
  };
  
  return colorMap[originalColor] || originalColor;
};

const CustomizedContent = (props: CustomizedContentProps) => {
  const { x = 0, y = 0, width = 0, height = 0, name = "", percentage = 0, color = "#000" } = props
  
  // Use subtle color instead of original
  const subtleColor = getSubtleColor(color);
  
  // Calculate padding to prevent text from touching borders
  const padding = Math.min(width, height) * 0.1;
  const innerWidth = width - (padding * 2);
  const innerHeight = height - (padding * 2);
  
  // Adjust icon size based on section dimensions
  const getIconSize = () => {
    const area = width * height;
    if (area > 10000) return 32;
    if (area > 5000) return 28;
    if (area > 2500) return 24;
    return 20;
  };
  
  // Determine if we should show icon and percentage based on available space
  const showIcon = innerWidth > 30 && innerHeight > 30;
  const showPercentage = innerWidth > 50 && innerHeight > 40;
  
  // Only show content if percentage is greater than 0.1%
  const shouldShowContent = percentage > 0.1;
  
  // Determine position
  const centerX = x + width / 2;
  const iconY = showPercentage 
    ? y + height / 2 - 15 
    : y + height / 2;
  const percentageY = y + height / 2 + 15;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: subtleColor,
          stroke: "#fff",
          strokeWidth: 3,
          strokeOpacity: 0.8,
          fillOpacity: 0.9,
        }}
      />
      {/* Add subtle inner border for depth */}
      <rect
        x={x + 2}
        y={y + 2}
        width={width - 4}
        height={height - 4}
        style={{
          fill: "none",
          stroke: "rgba(255, 255, 255, 0.5)",
          strokeWidth: 1,
          strokeOpacity: 0.7,
        }}
      />
      {shouldShowContent && showIcon && (
        <foreignObject 
          x={centerX - getIconSize()/2} 
          y={iconY - getIconSize()/2} 
          width={getIconSize()} 
          height={getIconSize()}
        >
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            {getCategoryIcon(name, getIconSize())}
          </div>
        </foreignObject>
      )}
      {shouldShowContent && showPercentage && (
        <text
          x={centerX}
          y={percentageY}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: Math.min(getIconSize() * 0.5, 16) + "px",
            fill: "#fff",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          {`${percentage.toFixed(1)}%`}
        </text>
      )}
    </g>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm">
          <span className="font-medium">Allocation:</span> KES {data.amount.toLocaleString()} billion
        </p>
        <p className="text-sm">
          <span className="font-medium">Percentage:</span> {data.percentage.toFixed(1)}%
        </p>
        <p className="text-sm">
          <span className="font-medium">Trend:</span> {data.trend}
        </p>
      </div>
    )
  }
  return null
}

export default function BudgetTreemapEnhanced({ year = 2024 }: { year?: number }) {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchBudgetData(`/data/budget-allocation/${year}.json`)
        setBudgetData(data)
      } catch (err) {
        console.error("Error loading budget data:", err)
        setError("Failed to load budget data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [year])

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

  if (!budgetData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No budget allocation data available for the selected year.</AlertDescription>
      </Alert>
    )
  }

  // Transform data for treemap
  const treemapData = budgetData.categories.map((category: BudgetCategory) => ({
    name: category.name,
    size: category.amount,
    percentage: category.percentage,
    amount: category.amount,
    color: category.color, // Original color will be transformed by CustomizedContent
    trend: category.trend,
  }))

  return (
    <div className="w-full">
      <div className="mb-4 text-sm">
        <span className="font-medium">Total Budget:</span> {budgetData.currency} {budgetData.totalBudget.toLocaleString()} {budgetData.unit}
        <span className="ml-4 text-xs text-muted-foreground">Source: {budgetData.source}</span>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<CustomizedContent />}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}
