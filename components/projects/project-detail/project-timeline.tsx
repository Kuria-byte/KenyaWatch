"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  ChevronDown
} from "lucide-react"
import { useState } from "react"

import { Project, Milestone } from "@/types/projects"
import { 
  formatDate, 
  calculateDaysRemainingOrOverdue
} from "@/utils/projects-utils"

interface ProjectTimelineProps {
  project: Project
}

export default function ProjectTimeline({ project }: ProjectTimelineProps) {
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({})
  
  // Toggle milestone expansion
  const toggleMilestone = (id: string) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  
  // Get milestone status badge
  const getMilestoneStatusBadge = (milestone: Milestone) => {
    const today = new Date()
    const plannedDate = new Date(milestone.plannedDate)
    
    if (milestone.completed) {
      const actualDate = milestone.actualDate ? new Date(milestone.actualDate) : null
      
      if (actualDate && actualDate > plannedDate) {
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed Late
          </Badge>
        )
      }
      
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      )
    }
    
    if (today > plannedDate) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      )
    }
    
    return (
      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
        <Clock className="h-3 w-3 mr-1" />
        Upcoming
      </Badge>
    )
  }
  
  // Calculate days overdue or remaining for a milestone
  const getMilestoneDaysStatus = (milestone: Milestone) => {
    if (milestone.completed) {
      if (!milestone.actualDate) return "Completed"
      
      const plannedDate = new Date(milestone.plannedDate)
      const actualDate = new Date(milestone.actualDate)
      
      const diffTime = Math.abs(actualDate.getTime() - plannedDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (actualDate > plannedDate) {
        return `Completed ${diffDays} day${diffDays !== 1 ? 's' : ''} late`
      }
      
      if (actualDate < plannedDate) {
        return `Completed ${diffDays} day${diffDays !== 1 ? 's' : ''} early`
      }
      
      return "Completed on time"
    }
    
    const daysStatus = calculateDaysRemainingOrOverdue(milestone.plannedDate)
    
    if (daysStatus < 0) {
      return `${Math.abs(daysStatus)} day${Math.abs(daysStatus) !== 1 ? 's' : ''} overdue`
    }
    
    return `${daysStatus} day${daysStatus !== 1 ? 's' : ''} remaining`
  }
  
  // Sort milestones by date
  const sortedMilestones = [...project.milestones].sort((a, b) => {
    const dateA = new Date(a.plannedDate).getTime()
    const dateB = new Date(b.plannedDate).getTime()
    return dateA - dateB
  })
  
  // Calculate overall project timeline status
  const completedMilestones = project.milestones.filter(m => m.completed).length
  const totalMilestones = project.milestones.length
  const milestoneCompletionPercentage = totalMilestones > 0 
    ? Math.round((completedMilestones / totalMilestones) * 100) 
    : 0
  
  return (
    <div className="space-y-6">
      {/* Project Timeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Overview</CardTitle>
          <CardDescription>Project duration and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Start Date</div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                  <span>{formatDate(project.timeline.start)}</span>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Planned End Date</div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                  <span>{formatDate(project.timeline.plannedEnd)}</span>
                </div>
              </div>
              
              {project.timeline.actualEnd ? (
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Actual End Date</div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                    <span>{formatDate(project.timeline.actualEnd)}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Time Status</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {calculateDaysRemainingOrOverdue(project.timeline.plannedEnd) < 0
                        ? `${Math.abs(calculateDaysRemainingOrOverdue(project.timeline.plannedEnd))} days overdue`
                        : `${calculateDaysRemainingOrOverdue(project.timeline.plannedEnd)} days remaining`}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Overall Completion</span>
                <span>{project.timeline.completionPercentage}%</span>
              </div>
              <Progress value={project.timeline.completionPercentage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Milestones Completed</span>
                <span>{completedMilestones} of {totalMilestones} ({milestoneCompletionPercentage}%)</span>
              </div>
              <Progress value={milestoneCompletionPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
          <CardDescription>Key project phases and deliverables</CardDescription>
        </CardHeader>
        <CardContent>
          {sortedMilestones.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No milestones have been defined for this project.
            </div>
          ) : (
            <div className="space-y-4">
              {sortedMilestones.map((milestone) => (
                <div 
                  key={milestone.id} 
                  className="border rounded-lg overflow-hidden"
                >
                  <div 
                    className={`flex justify-between items-center p-4 cursor-pointer ${
                      milestone.completed ? "bg-green-50" : "bg-muted"
                    }`}
                    onClick={() => toggleMilestone(milestone.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          milestone.completed ? "bg-green-500" : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{milestone.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(milestone.plannedDate)} · {getMilestoneDaysStatus(milestone)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getMilestoneStatusBadge(milestone)}
                      {expandedMilestones[milestone.id] ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  
                  {expandedMilestones[milestone.id] && (
                    <div className="p-4 border-t bg-background">
                      <div className="space-y-4">
                        <p className="text-sm">{milestone.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-1">Planned Date</div>
                            <div className="flex items-center text-muted-foreground">
                              <CalendarDays className="h-4 w-4 mr-2" />
                              <span>{formatDate(milestone.plannedDate)}</span>
                            </div>
                          </div>
                          
                          {milestone.completed && milestone.actualDate && (
                            <div>
                              <div className="font-medium mb-1">Actual Date</div>
                              <div className="flex items-center text-muted-foreground">
                                <CalendarDays className="h-4 w-4 mr-2" />
                                <span>{formatDate(milestone.actualDate)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {milestone.deliverables && milestone.deliverables.length > 0 && (
                          <div>
                            <div className="font-medium mb-2">Deliverables</div>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {milestone.deliverables.map((deliverable, index) => (
                                <li key={index}>{deliverable}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {milestone.notes && (
                          <div>
                            <div className="font-medium mb-2">Notes</div>
                            <p className="text-sm text-muted-foreground">{milestone.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Timeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Visualization</CardTitle>
          <CardDescription>Visual representation of project timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-4 left-4 h-full w-0.5 bg-muted" />
              
              {/* Project start */}
              <div className="relative flex items-center mb-8 pl-12">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <CalendarDays className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium">Project Start</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(project.timeline.start)}
                  </div>
                </div>
              </div>
              
              {/* Milestones */}
              {sortedMilestones.map((milestone, index) => (
                <div key={milestone.id} className="relative flex items-center mb-8 pl-12">
                  <div 
                    className={`absolute left-0 w-8 h-8 rounded-full ${
                      milestone.completed 
                        ? "bg-green-500" 
                        : new Date() > new Date(milestone.plannedDate)
                          ? "bg-red-500"
                          : "bg-blue-500"
                    } flex items-center justify-center`}
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    ) : new Date() > new Date(milestone.plannedDate) ? (
                      <AlertTriangle className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Clock className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Planned: {formatDate(milestone.plannedDate)}
                      {milestone.completed && milestone.actualDate && (
                        <> · Actual: {formatDate(milestone.actualDate)}</>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Project end */}
              <div className="relative flex items-center pl-12">
                <div 
                  className={`absolute left-0 w-8 h-8 rounded-full ${
                    project.status === "Completed" 
                      ? "bg-green-500" 
                      : new Date() > new Date(project.timeline.plannedEnd)
                        ? "bg-red-500"
                        : "bg-primary"
                  } flex items-center justify-center`}
                >
                  <CalendarDays className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium">
                    {project.status === "Completed" ? "Project Completed" : "Planned Completion"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.status === "Completed" && project.timeline.actualEnd
                      ? formatDate(project.timeline.actualEnd)
                      : formatDate(project.timeline.plannedEnd)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
