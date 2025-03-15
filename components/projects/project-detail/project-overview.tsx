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
  Users, 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Target, 
  CheckSquare,
  Clock,
  CalendarDays,
  Banknote
} from "lucide-react"

import { Project } from "@/types/projects"
import { 
  formatDate, 
  calculateDaysRemainingOrOverdue,
  getProjectTimeStatus,
  formatCurrency
} from "@/utils/projects-utils"
import { Calendar } from "@/components/ui/calendar"

interface ProjectOverviewProps {
  project: Project
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const timeStatus = getProjectTimeStatus(project)
  const daysRemaining = calculateDaysRemainingOrOverdue(project.timeline.plannedEnd)
  
  return (
    <div className="space-y-6">
      {/* Project Description */}
      <Card>
        <CardHeader>
          <CardTitle>Project Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{project.description}</p>
            
            {project.description && project.description.length > 100 && (
              <div className="space-y-4">
                {project.description.split('\n\n').filter((p, i) => i > 0).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Current completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Overall Completion</span>
                <span>{project.timeline.completionPercentage}%</span>
              </div>
              <Progress value={project.timeline.completionPercentage} className="h-2" />
            </div>
            
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
              
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Time Status</div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{timeStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Project Location */}
      <Card>
        <CardHeader>
          <CardTitle>Project Location</CardTitle>
          <CardDescription>Where this project is being implemented</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-muted-foreground">
                    {project.location.ward || "Not specified"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Administrative Area</div>
                  <div className="text-muted-foreground">
                    {project.location.county}, {project.location.constituency}
                    {project.location.ward && `, ${project.location.ward}`}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map placeholder - would be replaced with actual map component */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-muted-foreground">
                Map view would be displayed here
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Project Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Project Impact</CardTitle>
          <CardDescription>Expected benefits and outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Beneficiaries</div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span>{project.impact.beneficiaries.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">SDG Goals</span>
                </div>
                <div className="text-lg font-medium">
                  {project.impact.sdgGoals && project.impact.sdgGoals.length > 0 
                    ? project.impact.sdgGoals[0] 
                    : "Not specified"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Sustainable Development Goal
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  <span className="font-medium">Key Outcomes</span>
                </div>
                <div className="text-sm">
                  {project.impact.description ? (
                    <div className="text-muted-foreground">
                      {project.impact.description}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No outcomes specified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Responsible Parties */}
      <Card>
        <CardHeader>
          <CardTitle>Responsible Parties</CardTitle>
          <CardDescription>Organizations involved in this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {project.responsibleParties.lead && (
              <div className="flex flex-col md:flex-row gap-4 pb-4 border-b">
                <div className="md:w-1/3">
                  <div className="font-medium">Lead Agency</div>
                  <Badge variant="outline" className="mt-1">
                    Primary
                  </Badge>
                </div>
                
                <div className="md:w-2/3">
                  <div className="font-medium">{project.responsibleParties.lead}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Overall project coordination and management
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-4 pb-4 border-b">
              <div className="md:w-1/3">
                <div className="font-medium">Implementing Agency</div>
                <Badge variant="outline" className="mt-1">
                  Executor
                </Badge>
              </div>
              
              <div className="md:w-2/3">
                <div className="font-medium">{project.responsibleParties.implementingAgency}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Direct implementation and execution of project activities
                </div>
              </div>
            </div>
            
            {project.responsibleParties.contractors && project.responsibleParties.contractors.length > 0 && (
              <div className="flex flex-col md:flex-row gap-4 pb-4 border-b">
                <div className="md:w-1/3">
                  <div className="font-medium">Contractors</div>
                  <Badge variant="outline" className="mt-1">
                    Service Providers
                  </Badge>
                </div>
                
                <div className="md:w-2/3">
                  <ul className="space-y-2">
                    {project.responsibleParties.contractors.map((contractor, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs text-primary">{index + 1}</span>
                        </div>
                        <span>{contractor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {project.responsibleParties.officials && project.responsibleParties.officials.length > 0 && (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <div className="font-medium">Key Officials</div>
                  <Badge variant="outline" className="mt-1">
                    Oversight
                  </Badge>
                </div>
                
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    {project.responsibleParties.officials.map((official, index) => (
                      <li key={index} className="flex flex-col">
                        <div className="font-medium">{official.name}</div>
                        <div className="text-sm text-muted-foreground">{official.position}</div>
                        {(official.contactEmail || official.phoneNumber) && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {official.contactEmail && (
                              <span className="mr-3">{official.contactEmail}</span>
                            )}
                            {official.phoneNumber && (
                              <span>{official.phoneNumber}</span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Key information about this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Timeline</div>
                  <div className="text-muted-foreground">
                    {formatDate(project.timeline.start)} - {formatDate(project.timeline.plannedEnd)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.timeline.completionPercentage}% Complete
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Banknote className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Budget</div>
                  <div className="text-muted-foreground">
                    {formatCurrency(project.budget.allocated)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(project.budget.spent)} spent ({Math.round((project.budget.spent / project.budget.allocated) * 100)}%)
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-muted-foreground">
                    {project.location.ward || "Not specified"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Administrative Area</div>
                  <div className="text-muted-foreground">
                    {project.location.county}, {project.location.constituency}
                    {project.location.ward && `, ${project.location.ward}`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Impact</CardTitle>
            <CardDescription>Expected outcomes and beneficiaries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Beneficiaries</div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>{project.impact.beneficiaries.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="font-medium">SDG Goals</span>
                  </div>
                  <div className="text-lg font-medium">
                    {project.impact.sdgGoals && project.impact.sdgGoals.length > 0 
                      ? project.impact.sdgGoals[0] 
                      : "Not specified"}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Sustainable Development Goal
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <span className="font-medium">Key Outcomes</span>
                  </div>
                  <div className="text-sm">
                    {project.impact.description ? (
                      <div className="text-muted-foreground">
                        {project.impact.description}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No outcomes specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
