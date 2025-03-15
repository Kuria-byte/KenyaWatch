"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Home, 
  ChevronRight, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Construction,
  PauseCircle,
  XCircle,
  FileText,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  BarChart,
  ImageIcon,
  MessageSquare
} from "lucide-react"

import { Project } from "@/types/projects"
import { 
  fetchProjectsData, 
  getProjectStatusColor,
  getProjectCategoryColor,
  formatCurrency,
  formatDate
} from "@/utils/projects-utils"
import ProjectOverview from "@/components/projects/project-detail/project-overview"
import ProjectTimeline from "@/components/projects/project-detail/project-timeline"
import ProjectBudget from "@/components/projects/project-detail/project-budget"
import ProjectGallery from "@/components/projects/project-detail/project-gallery"
import ProjectReports from "@/components/projects/project-detail/project-reports"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        const data = await fetchProjectsData()
        const foundProject = data.find(p => p.id === params.id)
        
        if (!foundProject) {
          notFound()
        }
        
        setProject(foundProject)
        setError(null)
      } catch (err) {
        console.error("Failed to load project:", err)
        setError("Failed to load project data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    loadProject()
  }, [params.id])
  
  // Get status icon based on project status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Planning":
        return <FileText className="h-4 w-4" />
      case "Procurement":
        return <Briefcase className="h-4 w-4" />
      case "InProgress":
        return <Construction className="h-4 w-4" />
      case "OnHold":
        return <PauseCircle className="h-4 w-4" />
      case "Delayed":
        return <AlertTriangle className="h-4 w-4" />
      case "Completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "Cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }
  
  if (loading) {
    return (
      <div className="container py-6 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
        
        <Skeleton className="h-[400px]" />
      </div>
    )
  }
  
  if (error || !project) {
    return (
      <div className="container py-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p>{error || "Failed to load project data. Please try again later."}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {project.name}
        </span>
      </nav>
      
      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge 
                variant="outline"
                className={`${getProjectStatusColor(project.status)} flex items-center gap-1`}
              >
                {getStatusIcon(project.status)}
                {project.status}
              </Badge>
              
              <Badge 
                variant="outline"
                className={`${getProjectCategoryColor(project.category)} flex items-center gap-1`}
              >
                {project.category}
              </Badge>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {project.location.county}, {project.location.subcounty}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formatDate(project.timeline.start)} - {formatDate(project.timeline.plannedEnd)}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5 mr-1" />
                {project.responsibleParties.lead}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Share
            </Button>
            <Button variant="outline" size="sm">
              Print
            </Button>
            <Button size="sm">
              Report Issue
            </Button>
          </div>
        </div>
        
        {/* Project Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Budget</div>
            <div className="text-xl font-bold">{formatCurrency(project.budget.allocated)}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {Math.round(project.budget.spent / project.budget.allocated * 100)}% spent
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Timeline</div>
            <div className="text-xl font-bold">{project.timeline.completionPercentage}%</div>
            <div className="text-sm text-muted-foreground mt-1">
              {project.status === "Completed" 
                ? "Completed" 
                : `${project.milestones.filter(m => m.completed).length}/${project.milestones.length} milestones`}
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Citizen Reports</div>
            <div className="text-xl font-bold">{project.citizenReports.length}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {project.citizenReports.filter(r => r.status === "Issue").length} issues reported
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Impact</div>
            <div className="text-xl font-bold">{project.impact.beneficiaries.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Estimated beneficiaries
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Content Tabs */}
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Budget</span>
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Gallery</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="m-0">
          <ProjectOverview project={project} />
        </TabsContent>
        
        <TabsContent value="timeline" className="m-0">
          <ProjectTimeline project={project} />
        </TabsContent>
        
        <TabsContent value="budget" className="m-0">
          <ProjectBudget project={project} />
        </TabsContent>
        
        <TabsContent value="gallery" className="m-0">
          <ProjectGallery project={project} />
        </TabsContent>
        
        <TabsContent value="reports" className="m-0">
          <ProjectReports project={project} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
