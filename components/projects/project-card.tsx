"use client"

import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
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
  FileText as FileTextIcon,
  Star,
  StarHalf
} from "lucide-react"

import { Project } from "@/types/projects"
import { 
  getProjectStatusColor, 
  getProjectCategoryColor,
  formatCurrency,
  formatCurrencyCompact,
  formatDate,
  formatDateCompact,
  formatDateRelative,
  calculateDaysRemainingOrOverdue,
  getProjectTimeStatus,
  getAverageCitizenRating
} from "@/utils/projects-utils"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = getProjectStatusColor(project.status)
  const categoryColor = getProjectCategoryColor(project.category)
  const timeStatus = getProjectTimeStatus(project)
  const daysRemaining = calculateDaysRemainingOrOverdue(project.timeline.plannedEnd)
  const citizenRating = getAverageCitizenRating(project)
  
  // Get status icon based on project status
  const getStatusIcon = () => {
    switch (project.status) {
      case "Planning":
        return <FileTextIcon className="h-4 w-4" />
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-[500px] rounded-xl border border-slate-200 shadow-sm">
      <div className="relative h-70 overflow-hidden rounded-t-xl">
            {/* <div className="w-full h-full bg-muted flex items-center justify-center">
            <Construction className="h-12 w-12 text-muted-foreground" />
          </div> */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Badge className={`${categoryColor} shadow-sm`}>
            {project.category}
          </Badge>
          <Badge className={`${statusColor} shadow-sm`}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {project.status}
            </span>
          </Badge>
        </div>
        {project.citizenReports.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="flex items-center gap-1 shadow-sm">
              <Camera className="h-3 w-3" />
              <span>{project.citizenReports.length}</span>
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2 flex-shrink-0 pt-5 px-5">
        <CardTitle className="line-clamp-1 text-xl font-semibold" title={project.name}>{project.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 flex-grow px-5">
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3rem]" title={project.description}>
          {project.description}
        </p>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm bg-slate-50 p-2.5 rounded-md">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-600" />
              {project.location.county}
            </span>
            <span className="flex items-center gap-1.5" title={formatDate(project.timeline.plannedEnd)}>
              <Calendar className="h-4 w-4 text-slate-600" />
              {formatDateRelative(project.timeline.plannedEnd)}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm bg-slate-50 p-2.5 rounded-md">
            <span className="flex items-center gap-1.5" title={formatCurrency(project.budget.allocated)}>
              <Briefcase className="h-4 w-4 text-slate-600" />
              {formatCurrencyCompact(project.budget.allocated)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-slate-600" />
              {project.impact.beneficiaries.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="space-y-1.5 border-t border-b border-slate-100 py-4">
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
        
        {citizenRating > 0 && (
          <div className="flex items-center gap-2 text-sm bg-slate-50 p-2.5 rounded-md">
            <div className="flex items-center">
              {/* Generate full and half stars based on rating */}
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                // For ratings like 4.5, we show 4 full stars and 1 half star
                if (value <= Math.floor(citizenRating)) {
                  return <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />;
                } else if (value - 0.5 <= citizenRating) {
                  return <StarHalf key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />;
                } else {
                  return <Star key={i} className="h-4 w-4 text-muted-foreground" />;
                }
              })}
            </div>
            <span className="font-medium">{citizenRating.toFixed(1)}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 pb-5 px-5">
        <Button asChild className="w-full rounded-lg">
          <Link href={`/project/${project.id}`}>
            View Project Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
