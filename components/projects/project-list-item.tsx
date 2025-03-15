"use client"

import { 
  Card, 
  CardContent
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Construction,
  PauseCircle,
  XCircle,
  Camera,
  MessageCircle,
  ChevronRight,
  FileText
} from "lucide-react"

import { Project } from "@/types/projects"
import { 
  getProjectStatusColor, 
  getProjectCategoryColor,
  formatCurrency,
  formatDate,
  calculateDaysRemainingOrOverdue,
  getProjectTimeStatus,
  getAverageCitizenRating
} from "@/utils/projects-utils"

interface ProjectListItemProps {
  project: Project
}

export default function ProjectListItem({ project }: ProjectListItemProps) {
  const statusColor = getProjectStatusColor(project.status)
  const categoryColor = getProjectCategoryColor(project.category)
  const timeStatus = getProjectTimeStatus(project)
  const daysRemaining = calculateDaysRemainingOrOverdue(project.timeline.plannedEnd)
  const citizenRating = getAverageCitizenRating(project)
  
  // Get status icon based on project status
  const getStatusIcon = () => {
    switch (project.status) {
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
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border border-slate-200 shadow-sm rounded-xl">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Project Image */}
          {/* <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden md:rounded-l-xl">
            {project.media.images.length > 0 ? (
              <img 
                src={project.media.images[0].url} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                <Construction className="h-12 w-12 text-slate-400" />
              </div>
            )}
            {project.citizenReports.length > 0 && (
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  <span>{project.citizenReports.length}</span>
                </Badge>
              </div>
            )}
          </div> */}
          
          {/* Project Details */}
          <div className="flex-1 p-5 md:p-6 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between gap-3 mb-3">
              <h3 className="font-semibold text-xl">{project.name}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={categoryColor}>
                  {project.category}
                </Badge>
                <Badge className={statusColor}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon()}
                    {project.status}
                  </span>
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <div className="flex items-center gap-2 text-sm bg-slate-50 p-2.5 rounded-md">
                <MapPin className="h-4 w-4 text-slate-600" />
                <span>{project.location.county}, {project.location.constituency}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm bg-slate-50 p-2.5 rounded-md">
                <Calendar className="h-4 w-4 text-slate-600" />
                <span>{formatDate(project.timeline.plannedEnd)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm bg-slate-50 p-2.5 rounded-md">
                <Briefcase className="h-4 w-4 text-slate-600" />
                <span>{formatCurrency(project.budget.allocated)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm bg-slate-50 p-2.5 rounded-md">
                <Users className="h-4 w-4 text-slate-600" />
                <span>{project.impact.beneficiaries.toLocaleString()} beneficiaries</span>
              </div>
            </div>
            
            <div className="space-y-1.5 border-t border-b border-slate-100 py-4 mb-5">
              <div className="flex justify-between text-sm font-medium">
                <span>Completion</span>
                <span>{project.timeline.completionPercentage}%</span>
              </div>
              <Progress 
                value={project.timeline.completionPercentage} 
                className="h-2.5 rounded-full"
                // Color the progress bar based on completion percentage
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  '--progress-color': project.timeline.completionPercentage < 30 
                    ? 'var(--red-500)' 
                    : project.timeline.completionPercentage < 70 
                      ? 'var(--amber-500)' 
                      : 'var(--green-500)'
                } as React.CSSProperties}
              />
            </div>
            
            <div className="mt-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex items-center gap-4">
                {citizenRating > 0 && (
                  <div className="flex items-center gap-1.5 text-sm bg-slate-50 p-2 rounded-md">
                    <MessageCircle className="h-4 w-4 text-slate-600" />
                    <span className="font-medium">Rating: {citizenRating.toFixed(1)}/5</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1.5 text-sm bg-slate-50 p-2 rounded-md">
                  <Clock className="h-4 w-4 text-slate-600" />
                  <span>{timeStatus}</span>
                </div>
              </div>
              
              <Button asChild size="sm" className="rounded-lg">
                <Link href={`/project/${project.id}`} className="flex items-center gap-1">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
