"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, ChevronDown, ChevronUp, Info } from "lucide-react"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactNode } from "react"
import BudgetTreemapEnhanced from "./BudgetTreemapEnhanced"
import DebtGrowthEnhanced from "./DebtGrowthEnhanced"
import CountyPerformanceEnhanced from "./CountyPerformanceEnhanced"

// Simple ErrorBoundary component since we don't have react-error-boundary
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function ErrorBoundary({ children, fallback = <div>Something went wrong</div> }: ErrorBoundaryProps) {
  return <>{children}</>; // Simplified version without actual error catching
}

/**
 * DataVisualizationPanel Component
 * 
 * A comprehensive panel for visualizing government data including:
 * - Budget allocation
 * - Debt growth
 * - County performance
 * 
 * Features:
 * - Year selection
 * - County filtering
 * - Progressive disclosure of information
 */
export default function DataVisualizationPanel() {
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [selectedCounty, setSelectedCounty] = useState<string>("All Counties")
  const [activeTab, setActiveTab] = useState<string>("budget")

  const years = [2024, 2023, 2022, 2021, 2020, 2019]
  const counties = [
    "All Counties",
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Kiambu",
    "Uasin Gishu",
    "Machakos",
    "Kajiado",
    "Nyeri",
    "Kakamega"
  ]

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Data Visualization Panel</CardTitle>
            <CardDescription>
              Explore budget allocation, debt growth, and county performance data
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 pb-2 pt-0 flex flex-wrap gap-2 items-center justify-between border-b">
          <Tabs 
            defaultValue="budget" 
            className="w-auto"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="debt">Debt</TabsTrigger>
              <TabsTrigger value="counties">Counties</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Filter data by year and county</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {activeTab === "counties" && (
              <Select
                value={selectedCounty}
                onValueChange={setSelectedCounty}
              >
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="County" />
                </SelectTrigger>
                <SelectContent>
                  {counties.map((county) => (
                    <SelectItem key={county} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <ErrorBoundary>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "budget" && (
                <BudgetTreemapEnhanced year={selectedYear} />
              )}
              
              {activeTab === "debt" && (
                <DebtGrowthEnhanced />
              )}
              
              {activeTab === "counties" && (
                <CountyPerformanceEnhanced 
                  selectedCounty={selectedCounty}
                  year={selectedYear}
                />
              )}
            </motion.div>
          </ErrorBoundary>
        </div>
        
        <div className="px-6 py-3 bg-muted/30 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Data sourced from verified government records. Last updated: March 2025</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
