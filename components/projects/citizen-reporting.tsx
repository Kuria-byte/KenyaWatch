"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  MapPin, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Construction,
  Star,
  Info
} from "lucide-react"
import { Project, CitizenReport } from "@/types/projects"
import { filterProjectsByCounty, getUniqueCounties } from "@/utils/projects-utils"

interface CitizenReportingProps {
  projects: Project[]
}

export default function CitizenReporting({ projects }: CitizenReportingProps) {
  const [selectedCounty, setSelectedCounty] = useState<string>("All")
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [searchQuery, setSearchQuery] = useState("")
  
  // States for the report form
  const [reportStatus, setReportStatus] = useState<CitizenReport["status"]>("WorkInProgress")
  const [description, setDescription] = useState("")
  const [progressRating, setProgressRating] = useState<number>(3)
  const [qualityRating, setQualityRating] = useState<number>(3)
  const [impactRating, setImpactRating] = useState<number>(3)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const counties = ["All", ...getUniqueCounties(projects)]
  
  // Handle county selection
  const handleCountyChange = (county: string) => {
    setSelectedCounty(county)
    if (county === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(filterProjectsByCounty(projects, county))
    }
    setSelectedProject("")
  }
  
  // Handle project search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = selectedCounty === "All" 
      ? projects 
      : filterProjectsByCounty(projects, selectedCounty)
    
    if (query) {
      setFilteredProjects(
        filtered.filter(project => 
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase())
        )
      )
    } else {
      setFilteredProjects(filtered)
    }
  }
  
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
  
  // Get selected project details
  const getSelectedProjectDetails = () => {
    return projects.find(project => project.id === selectedProject)
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
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Selection */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select a Project</CardTitle>
              <CardDescription>
                Choose a project to report on
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">County</label>
                <Select value={selectedCounty} onValueChange={handleCountyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map((county) => (
                      <SelectItem key={county} value={county}>
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Projects</label>
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Available Projects</label>
                <div className="border rounded-md max-h-[300px] overflow-y-auto">
                  {filteredProjects.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No projects found
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredProjects.map((project) => (
                        <button
                          key={project.id}
                          className={`w-full text-left p-3 hover:bg-muted transition-colors ${
                            selectedProject === project.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedProject(project.id)}
                        >
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {project.location.county}, {project.location.constituency}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Why Report?</CardTitle>
              <CardDescription>
                Your reports help ensure accountability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full">
                    <Info className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Real-time Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide current status of projects in your area
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-amber-100 p-1 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Flag Issues</h4>
                    <p className="text-sm text-muted-foreground">
                      Report problems or delays in project implementation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 p-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Verify Completion</h4>
                    <p className="text-sm text-muted-foreground">
                      Confirm when projects are actually completed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Reporting Interface */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Citizen Reporting Dashboard</CardTitle>
              <CardDescription>
                Submit your observations about government projects
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!selectedProject ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center p-4">
                  <Construction className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Project</h3>
                  <p className="text-muted-foreground max-w-md">
                    Please select a project from the list on the left to submit your report.
                    Your input helps ensure government projects are delivered as promised.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">
                      {getSelectedProjectDetails()?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {getSelectedProjectDetails()?.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {getSelectedProjectDetails()?.location.county}, 
                        {getSelectedProjectDetails()?.location.constituency}
                      </span>
                    </div>
                  </div>
                  
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
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Recent Citizen Reports</h3>
                    <div className="border rounded-lg overflow-hidden">
                      {getSelectedProjectDetails()?.citizenReports.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          No reports submitted yet. Be the first to report!
                        </div>
                      ) : (
                        <div className="divide-y">
                          {getSelectedProjectDetails()?.citizenReports.map((report) => (
                            <div key={report.id} className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium">{report.username}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {new Date(report.timestamp).toLocaleDateString('en-KE', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </div>
                                </div>
                                <Badge 
                                  variant={report.status === "Issue" ? "destructive" : "outline"}
                                  className="ml-2"
                                >
                                  {report.status === "WorkInProgress" && "Work in Progress"}
                                  {report.status === "NoActivity" && "No Activity"}
                                  {report.status === "Completed" && "Completed"}
                                  {report.status === "Issue" && "Issue Detected"}
                                </Badge>
                              </div>
                              
                              <p className="text-sm mb-3">{report.description}</p>
                              
                              {report.mediaUrls.length > 0 && (
                                <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                                  {report.mediaUrls.map((url, index) => (
                                    <img
                                      key={index}
                                      src={url}
                                      alt={`Report photo ${index + 1}`}
                                      className="h-20 w-20 object-cover rounded-md"
                                    />
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex gap-4 text-sm">
                                <div className="flex items-center">
                                  <span className="text-muted-foreground mr-1">Progress:</span>
                                  <span>{report.rating.progress}/5</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-muted-foreground mr-1">Quality:</span>
                                  <span>{report.rating.quality}/5</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-muted-foreground mr-1">Impact:</span>
                                  <span>{report.rating.impact}/5</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
