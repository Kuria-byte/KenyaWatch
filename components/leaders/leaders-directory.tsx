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
  Star, 
  BarChart2, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight
} from "lucide-react"
import { Leader } from "@/types/leaders"
import { 
  filterLeadersByPosition, 
  filterLeadersByCounty, 
  filterLeadersByParty, 
  searchLeadersByName,
  getUniqueCounties,
  getUniqueParties,
  calculateProjectCompletionRate,
  calculatePromiseFulfillment
} from "@/utils/leaders-utils"
import Link from "next/link"
import LeaderAvatar from "./leader-avatar"

interface LeadersDirectoryProps {
  leaders: Leader[]
}

export default function LeadersDirectory({ leaders }: LeadersDirectoryProps) {
  const [filteredLeaders, setFilteredLeaders] = useState<Leader[]>(leaders)
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("All")
  const [countyFilter, setCountyFilter] = useState<string>("All")
  const [partyFilter, setPartyFilter] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [leadersPerPage, setLeadersPerPage] = useState(9)
  
  const counties = ["All", ...getUniqueCounties(leaders)]
  const parties = ["All", ...getUniqueParties(leaders)]
  const positions = [
    "All",
    "President",
    "Deputy President",
    "Cabinet Secretary",
    "Governor",
    "Senator",
    "MP"
  ]

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...leaders]
    
    // Apply position filter
    if (positionFilter !== "All") {
      result = filterLeadersByPosition(
        result, 
        positionFilter as Leader["position"]
      )
    }
    
    // Apply county filter
    if (countyFilter !== "All") {
      result = filterLeadersByCounty(result, countyFilter)
    }
    
    // Apply party filter
    if (partyFilter !== "All") {
      result = filterLeadersByParty(result, partyFilter)
    }
    
    // Apply search query
    if (searchQuery) {
      result = searchLeadersByName(result, searchQuery)
    }
    
    setFilteredLeaders(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [leaders, searchQuery, positionFilter, countyFilter, partyFilter])

  // Get current leaders for the current page
  const indexOfLastLeader = currentPage * leadersPerPage
  const indexOfFirstLeader = indexOfLastLeader - leadersPerPage
  const currentLeaders = filteredLeaders.slice(indexOfFirstLeader, indexOfLastLeader)
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredLeaders.length / leadersPerPage)

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

  const getPositionColor = (position: string) => {
    const colors: Record<string, string> = {
      "President": "bg-red-100 text-red-800",
      "Deputy President": "bg-orange-100 text-orange-800",
      "Cabinet Secretary": "bg-blue-100 text-blue-800",
      "Governor": "bg-green-100 text-green-800",
      "Senator": "bg-purple-100 text-purple-800",
      "MP": "bg-indigo-100 text-indigo-800"
    }
    return colors[position] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leaders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={countyFilter} onValueChange={setCountyFilter}>
            <SelectTrigger className="w-[160px]">
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
          
          <Select value={partyFilter} onValueChange={setPartyFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Party" />
            </SelectTrigger>
            <SelectContent>
              {parties.map((party) => (
                <SelectItem key={party} value={party}>
                  {party}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={leadersPerPage.toString()} 
            onValueChange={(value) => {
              setLeadersPerPage(parseInt(value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Leaders per page" />
            </SelectTrigger>
            <SelectContent>
              {[6, 9, 12, 15, 18].map((number) => (
                <SelectItem key={number} value={number.toString()}>
                  {number} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="h-9 rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="h-9 rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {indexOfFirstLeader + 1}-{Math.min(indexOfLastLeader, filteredLeaders.length)} of {filteredLeaders.length} leaders
      </div>
      
      {/* Leaders Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentLeaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {currentLeaders.map((leader) => (
            <LeaderListItem key={leader.id} leader={leader} />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {getPageNumbers().map((pageNumber, index) => (
              <PaginationItem key={index}>
                {pageNumber === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => paginate(pageNumber as number)}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

function LeaderCard({ leader }: { leader: Leader }) {
  const completionRate = calculateProjectCompletionRate(leader)
  const promiseFulfillment = calculatePromiseFulfillment(leader)
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getPositionColor(leader.position)}>
            {leader.position}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{leader.approvalRating}/5</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex gap-3">
          <LeaderAvatar 
            imageUrl={leader.imageUrl} 
            name={leader.name}
            size="lg"
          />
          <div>
            <h3 className="font-semibold text-lg">{leader.name}</h3>
            <p className="text-sm text-muted-foreground">
              {leader.party}
              {leader.county && ` • ${leader.county}`}
            </p>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <BarChart2 className="h-3.5 w-3.5" />
                Project Completion
              </span>
              <span>{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Promises Fulfilled
              </span>
              <span>{promiseFulfillment.fulfillmentRate}%</span>
            </div>
            <Progress value={promiseFulfillment.fulfillmentRate} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={`/leader/${leader.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Profile
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function LeaderListItem({ leader }: { leader: Leader }) {
  const completionRate = calculateProjectCompletionRate(leader)
  const promiseFulfillment = calculatePromiseFulfillment(leader)
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row p-4 gap-4">
        <div className="flex gap-3">
          <LeaderAvatar 
            imageUrl={leader.imageUrl} 
            name={leader.name}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{leader.name}</h3>
              <Badge className={getPositionColor(leader.position)}>
                {leader.position}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {leader.party}
              {leader.county && ` • ${leader.county}`}
            </p>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <BarChart2 className="h-3.5 w-3.5" />
                Project Completion
              </span>
              <span>{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Promises Fulfilled
              </span>
              <span>{promiseFulfillment.fulfillmentRate}%</span>
            </div>
            <Progress value={promiseFulfillment.fulfillmentRate} className="h-2" />
          </div>
        </div>
        
        <div className="flex items-center">
          <Link href={`/leader/${leader.id}`}>
            <Button variant="outline" size="sm">
              View Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

function getPositionColor(position: string) {
  const colors: Record<string, string> = {
    "President": "bg-red-100 text-red-800",
    "Deputy President": "bg-orange-100 text-orange-800",
    "Cabinet Secretary": "bg-blue-100 text-blue-800",
    "Governor": "bg-green-100 text-green-800",
    "Senator": "bg-purple-100 text-purple-800",
    "MP": "bg-indigo-100 text-indigo-800"
  }
  return colors[position] || "bg-gray-100 text-gray-800"
}
