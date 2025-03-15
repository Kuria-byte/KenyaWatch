"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Filter, 
  Users, 
  BarChart3, 
  CheckSquare,
  Calendar,
  PieChart
} from "lucide-react"
import LeadersDirectory from "@/components/leaders/leaders-directory"
import LeaderComparison from "@/components/leaders/leader-comparison"
import AccountabilityDashboard from "@/components/leaders/accountability-dashboard"
import { fetchLeadersData } from "@/utils/leaders-utils"
import { Leader } from "@/types/leaders"
import { Skeleton } from "@/components/ui/skeleton"
import LeadersNavigation from "@/components/leaders/leaders-navigation"

export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("directory")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        setIsLoading(true)
        const data = await fetchLeadersData()
        setLeaders(data)
        setError(null)
      } catch (err) {
        console.error("Error loading leaders data:", err)
        setError("Failed to load leaders data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadLeaders()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Government Leaders</h1>
          <p className="text-muted-foreground">
            Track, compare, and hold accountable Kenya's elected and appointed officials
          </p>
        </div>
      </div>

      <LeadersNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "directory" && (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-card rounded-lg shadow">
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                {error}
              </div>
            ) : (
              <LeadersDirectory leaders={leaders} />
            )}
          </>
        )}

        {activeTab === "comparison" && (
          <>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full max-w-md" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-64 w-full" />
                </div>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                {error}
              </div>
            ) : (
              <LeaderComparison leaders={leaders} />
            )}
          </>
        )}

        {activeTab === "accountability" && (
          <>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full max-w-md" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-64 w-full" />
                </div>
                <Skeleton className="h-64 w-full" />
              </div>
            ) : error ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                {error}
              </div>
            ) : (
              <AccountabilityDashboard leaders={leaders} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
