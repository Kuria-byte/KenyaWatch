"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Camera, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Star,
  MessageCircle,
  ThumbsUp,
  User
} from "lucide-react"

import { Project, CitizenReport } from "@/types/projects"
import { formatDate, getAverageCitizenRating } from "@/utils/projects-utils"

interface ProjectReportsProps {
  project: Project
}

export default function ProjectReports({ project }: ProjectReportsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [reportStatus, setReportStatus] = useState<CitizenReport["status"]>("WorkInProgress")
  const [description, setDescription] = useState("")
  const [progressRating, setProgressRating] = useState<number>(3)
  const [qualityRating, setQualityRating] = useState<number>(3)
  const [impactRating, setImpactRating] = useState<number>(3)
  
  const citizenRating = getAverageCitizenRating(project)
  
  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDialogOpen(false)
      
      // Reset form
      setDescription("")
      setProgressRating(3)
      setQualityRating(3)
      setImpactRating(3)
      setReportStatus("WorkInProgress")
      
      // Show success message
      alert("Thank you for your report! It will be reviewed by our team.")
    }, 1500)
  }
  
  // Render star rating selector
  const StarRating = ({ 
    value, 
    onChange 
  }: { 
    value: number; 
    onChange: (value: number) => void 
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }
  
  // Get status badge for a report
  const getStatusBadge = (status: CitizenReport["status"]) => {
    switch (status) {
      case "WorkInProgress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Work in Progress
          </Badge>
        )
      case "NoActivity":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            No Activity
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "Issue":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Issue Detected
          </Badge>
        )
      default:
        return null
    }
  }
  
  // Sort reports by date (newest first)
  const sortedReports = [...project.citizenReports].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
  
  return (
    <div className="space-y-6">
      {/* Reports Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Citizen Reports Summary</CardTitle>
          <CardDescription>
            Feedback and observations from citizens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Reports</div>
              <div className="text-2xl font-bold">
                {project.citizenReports.length}
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Average Rating</div>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">
                  {citizenRating > 0 ? citizenRating.toFixed(1) : "N/A"}
                </div>
                {citizenRating > 0 && (
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= citizenRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Issues Reported</div>
              <div className="text-2xl font-bold">
                {project.citizenReports.filter(report => report.status === "Issue").length}
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Latest Report</div>
              <div className="text-lg font-medium">
                {project.citizenReports.length > 0 
                  ? formatDate(sortedReports[0].timestamp)
                  : "No reports yet"
                }
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Submit a Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit Project Report</DialogTitle>
                <DialogDescription>
                  Share your observations about this project
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Status</label>
                  <Select 
                    value={reportStatus} 
                    onValueChange={(value) => setReportStatus(value as CitizenReport["status"])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WorkInProgress">Work in Progress</SelectItem>
                      <SelectItem value="NoActivity">No Activity</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Issue">Issue Detected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe what you observed at the project site..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium">Upload Photos</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop photos here or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Rate Progress</label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Slow</span>
                      <StarRating value={progressRating} onChange={setProgressRating} />
                      <span className="text-sm text-muted-foreground">Fast</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Rate Quality</label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Poor</span>
                      <StarRating value={qualityRating} onChange={setQualityRating} />
                      <span className="text-sm text-muted-foreground">Excellent</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Rate Impact</label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Low</span>
                      <StarRating value={impactRating} onChange={setImpactRating} />
                      <span className="text-sm text-muted-foreground">High</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || !description}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      
      {/* Citizen Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Citizen Reports</CardTitle>
          <CardDescription>
            Observations and feedback from citizens
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedReports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No reports have been submitted yet. Be the first to report!
            </div>
          ) : (
            <div className="space-y-6">
              {sortedReports.map((report) => (
                <div key={report.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{report.username}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(report.timestamp)}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {getStatusBadge(report.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="mb-4">{report.description}</p>
                    
                    {report.mediaUrls.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                        {report.mediaUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Report photo ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Progress:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= report.rating.progress
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Quality:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= report.rating.quality
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Impact:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= report.rating.impact
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>Helpful</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>Comment</span>
                      </Button>
                    </div>
                    
                    {report.governmentResponse && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Official Response
                      </Badge>
                    )}
                  </div>
                  
                  {report.governmentResponse && (
                    <div className="p-4 border-t bg-primary/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="font-medium text-sm">Official Response</div>
                      </div>
                      <p className="text-sm">{report.governmentResponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
