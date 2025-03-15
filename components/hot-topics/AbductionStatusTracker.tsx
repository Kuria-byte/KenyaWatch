import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, AlertCircle, CheckCircle, Clock, HelpCircle, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample data for demonstration
const abductionCases = [
  {
    id: "AB-2025-0123",
    name: "John Kamau",
    age: 32,
    location: "Ngong Road, Nairobi",
    dateReported: "2025-03-01",
    lastSeen: "2025-02-28",
    status: "active",
    updates: [
      { date: "2025-03-01", text: "Case reported to authorities" },
      { date: "2025-03-02", text: "CCTV footage being reviewed" },
      { date: "2025-03-05", text: "Witness statement collected" },
      { date: "2025-03-10", text: "Investigation ongoing" },
    ],
    contact: "DCI Hotline: 0800-722-203",
  },
  {
    id: "AB-2025-0098",
    name: "Mary Wanjiku",
    age: 28,
    location: "Mombasa Road, Nairobi",
    dateReported: "2025-02-20",
    lastSeen: "2025-02-19",
    status: "found",
    updates: [
      { date: "2025-02-20", text: "Case reported to authorities" },
      { date: "2025-02-21", text: "Search operation initiated" },
      { date: "2025-02-25", text: "Found safe in Nakuru" },
      { date: "2025-02-26", text: "Case closed - Victim reunited with family" },
    ],
    contact: "DCI Hotline: 0800-722-203",
  },
  {
    id: "AB-2025-0145",
    name: "David Omondi",
    age: 45,
    location: "Kisumu CBD",
    dateReported: "2025-03-08",
    lastSeen: "2025-03-07",
    status: "urgent",
    updates: [
      { date: "2025-03-08", text: "Case reported to authorities" },
      { date: "2025-03-09", text: "Suspected political motivation" },
      { date: "2025-03-12", text: "Human rights organizations involved" },
    ],
    contact: "KHRC: 0800-720-501",
  },
];

export function AbductionStatusTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof abductionCases>([]);
  const [selectedCase, setSelectedCase] = useState<(typeof abductionCases)[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setHasSearched(true);
    
    // Filter cases based on ID or name
    const results = abductionCases.filter(
      (c) => 
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    
    if (results.length === 1) {
      setSelectedCase(results[0]);
    } else {
      setSelectedCase(null);
    }
  };

  const handleCaseSelect = (caseData: (typeof abductionCases)[0]) => {
    setSelectedCase(caseData);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">Active</Badge>;
      case "found":
        return <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">Found</Badge>;
      case "urgent":
        return <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">Urgent</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "found":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "urgent":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleShare = (caseId: string) => {
    // In a real implementation, this would generate a shareable link
    navigator.clipboard.writeText(`https://kenyawatch.org/abduction-tracker/${caseId}`);
    alert("Link copied to clipboard");
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-4">Abduction Status Tracker</h3>
        
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search by case ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} className="shrink-0">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        {hasSearched && searchResults.length === 0 && (
          <div className="text-center py-6">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <h4 className="font-medium">No results found</h4>
            <p className="text-sm text-muted-foreground">
              Try searching with a different case ID or name
            </p>
          </div>
        )}
        
        {searchResults.length > 1 && !selectedCase && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Search Results ({searchResults.length})</h4>
            <div className="space-y-2">
              {searchResults.map((caseData) => (
                <div 
                  key={caseData.id}
                  className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:bg-accent"
                  onClick={() => handleCaseSelect(caseData)}
                >
                  <div>
                    <div className="font-medium">{caseData.name}</div>
                    <div className="text-xs text-muted-foreground">{caseData.id}</div>
                  </div>
                  {getStatusBadge(caseData.status)}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {selectedCase && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-lg">{selectedCase.name}</h4>
                    {getStatusBadge(selectedCase.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">Case ID: {selectedCase.id}</div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleShare(selectedCase.id)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this case</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Age</div>
                  <div>{selectedCase.age}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div>{selectedCase.location}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Date Reported</div>
                  <div>{new Date(selectedCase.dateReported).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Seen</div>
                  <div>{new Date(selectedCase.lastSeen).toLocaleDateString()}</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-4">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  {getStatusIcon(selectedCase.status)}
                  Status Updates
                </h5>
                <div className="space-y-3">
                  {selectedCase.updates.map((update, index) => (
                    <div key={index} className="relative pl-5 pb-3">
                      {index !== selectedCase.updates.length - 1 && (
                        <div className="absolute top-2 left-[7px] h-full w-[2px] bg-muted" />
                      )}
                      <div className="absolute top-2 left-0 h-3 w-3 rounded-full bg-primary" />
                      <div className="text-xs text-muted-foreground mb-1">
                        {new Date(update.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm">{update.text}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <div className="font-medium mb-1">Contact Information</div>
                <div>{selectedCase.contact}</div>
              </div>
            </div>
          </div>
        )}
        
        {!hasSearched && (
          <div className="text-center py-6 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Search for a case by ID or name to view status</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
