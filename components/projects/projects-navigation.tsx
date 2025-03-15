"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Construction, 
  BarChart2, 
  Camera, 
  Home, 
  ChevronRight 
} from "lucide-react"
import Link from "next/link"

interface ProjectsNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function ProjectsNavigation({ 
  activeTab, 
  onTabChange 
}: ProjectsNavigationProps) {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="flex items-center hover:text-foreground transition-colors">
          <Home className="h-4 w-4 mr-1" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground ">Government Projects</span>
      </nav>
      
      {/* Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="directory" className="flex items-center gap-2">
            <Construction className="h-4 w-4" />
            <span className="hidden sm:inline">Directory</span>
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Citizen Reporting</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
