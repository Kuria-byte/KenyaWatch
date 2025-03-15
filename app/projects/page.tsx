"use client"

import { useState, useEffect } from "react"
import { Metadata } from "next"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Project } from "@/types/projects"
import { fetchProjectsData } from "@/utils/projects-utils"
import ProjectsNavigation from "@/components/projects/projects-navigation"
import ProjectsDirectory from "@/components/projects/projects-directory"
import CitizenReporting from "@/components/projects/citizen-reporting"
import ProjectsAnalytics from "@/components/projects/projects-analytics"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("directory")
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const data = await fetchProjectsData()
        setProjects(data)
        setError(null)
      } catch (err) {
        console.error("Failed to load projects:", err)
        setError("Failed to load projects data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    loadProjects()
  }, [])
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  
  return (
    <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">National Projects</h1>
          <p className="text-muted-foreground">
            Track key projects in Kenya
          </p>
        </div>
      </div>
      
      <ProjectsNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">
          {error}
        </div>
      ) : (
        <Tabs value={activeTab} >
          <TabsContent value="directory" className="m-0">
            <ProjectsDirectory projects={projects} />
          </TabsContent>
          
          <TabsContent value="reporting" className="m-0">
            <CitizenReporting projects={projects} />
          </TabsContent>
          
          <TabsContent value="analytics" className="m-0">
            <ProjectsAnalytics projects={projects} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
