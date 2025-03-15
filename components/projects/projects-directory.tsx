"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { 
  Search, 
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
  FileText,
  Camera,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { Project, ProjectCategory, ProjectStatus } from "@/types/projects"
import { 
  filterProjectsByCategory, 
  filterProjectsByStatus, 
  filterProjectsByCounty,
  searchProjects,
  getUniqueCounties,
  getProjectStatusColor,
  getProjectCategoryColor,
  formatCurrency,
  formatDate,
  calculateDaysRemainingOrOverdue,
  getProjectTimeStatus
} from "@/utils/projects-utils"
import ProjectCard from "@/components/projects/project-card"
import ProjectListItem from "@/components/projects/project-list-item"

interface ProjectsDirectoryProps {
  projects: Project[]
}

export default function ProjectsDirectory({ projects }: ProjectsDirectoryProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<"All" | ProjectCategory>("All")
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>("All")
  const [countyFilter, setCountyFilter] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 10
  
  const counties = ["All", ...getUniqueCounties(projects)]
  
  const categories = [
    "All",
    "Infrastructure",
    "Education",
    "Healthcare",
    "Water",
    "Agriculture",
    "Energy",
    "Technology",
    "Security",
    "Tourism",
    "Environment"
  ] as const
  
  const statuses = [
    "All",
    "Planning",
    "Procurement",
    "InProgress",
    "OnHold",
    "Delayed",
    "Completed",
    "Cancelled"
  ] as const

  // Apply filters when any filter changes
  useEffect(() => {
    let result = projects
    
    // Apply search filter
    if (searchQuery) {
      result = searchProjects(result, searchQuery)
    }
    
    // Apply category filter
    if (categoryFilter !== "All") {
      result = filterProjectsByCategory(
        result, 
        categoryFilter
      )
    }
    
    // Apply status filter
    if (statusFilter !== "All") {
      result = filterProjectsByStatus(
        result, 
        statusFilter
      )
    }
    
    // Apply county filter
    if (countyFilter !== "All") {
      result = filterProjectsByCounty(result, countyFilter)
    }
    
    setFilteredProjects(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [projects, searchQuery, categoryFilter, statusFilter, countyFilter])

  // Get current projects for the current page
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  
  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = []
    
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)
      
      // Add ellipsis if current page is > 3
      if (currentPage > 3) {
        pageNumbers.push('ellipsis')
      }
      
      // Add page numbers around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
      
      // Add ellipsis if current page is < totalPages - 2
      if (currentPage < totalPages - 2) {
        pageNumbers.push('ellipsis')
      }
      
      // Always include last page
      pageNumbers.push(totalPages)
    }
    
    return pageNumbers
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
    

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <h3 className="text-base font-medium mb-2.5">Search Projects</h3>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-primary" />
            <Input
              placeholder="Search projects by name, location, or description..."
              className="pl-10 h-12 text-base border-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 md:border-l md:pl-6">
          <div>
            <p className="text-sm font-medium mb-2 text-slate-700">Category</p>
            <Select 
              value={categoryFilter} 
              onValueChange={(value: "All" | ProjectCategory) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-[160px] h-12 border-slate-300">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-slate-700">Status</p>
            <Select 
              value={statusFilter} 
              onValueChange={(value: "All" | ProjectStatus) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[160px] h-12 border-slate-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-slate-700">County</p>
            <Select value={countyFilter} onValueChange={setCountyFilter}>
              <SelectTrigger className="w-[160px] h-12 border-slate-300">
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
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-slate-700">Per Page</p>
            <Select 
              value={projectsPerPage.toString()} 
              onValueChange={(value) => {
                setProjectsPerPage(parseInt(value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
            >
              <SelectTrigger className="w-[160px] h-12 border-slate-300">
                <SelectValue placeholder="Projects per page" />
              </SelectTrigger>
              <SelectContent>
                {[3, 6, 9, 12, 15].map((number) => (
                  <SelectItem key={number} value={number.toString()}>
                    {number} per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="self-end">
            <p className="text-sm font-medium mb-2 text-slate-700">View Mode</p>
            <div className="flex items-center border rounded-md h-12 bg-white border-slate-300">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-full rounded-r-none px-4"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="h-full rounded-l-none px-4"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Filters */}
      {(categoryFilter !== "All" || statusFilter !== "All" || countyFilter !== "All" || searchQuery) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-slate-700">Active filters:</span>
          
          {categoryFilter !== "All" && (
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md">
              <span>Category: {categoryFilter}</span>
              <X 
                className="h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setCategoryFilter("All" as "All" | ProjectCategory)} 
              />
            </Badge>
          )}
          
          {statusFilter !== "All" && (
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md">
              <span>Status: {statusFilter}</span>
              <X 
                className="h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setStatusFilter("All" as "All" | ProjectStatus)} 
              />
            </Badge>
          )}
          
          {countyFilter !== "All" && (
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md">
              <span>County: {countyFilter}</span>
              <X 
                className="h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setCountyFilter("All")} 
              />
            </Badge>
          )}
          
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md">
              <span>Search: {searchQuery}</span>
              <X 
                className="h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setSearchQuery("")} 
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setCategoryFilter("All" as "All" | ProjectCategory);
              setStatusFilter("All" as "All" | ProjectStatus);
              setCountyFilter("All");
              setSearchQuery("");
            }}
            className="ml-auto text-sm"
          >
            Clear all filters
          </Button>
        </div>
      )}
      
      {/* Projects Count and Pagination Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * projectsPerPage + 1}-{Math.min(currentPage * projectsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
        </p>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className="h-8 w-8 p-0"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        )}
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg border shadow-sm">
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {currentProjects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
