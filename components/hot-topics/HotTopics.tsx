import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Mountain, Home, Shield, ChevronDown, ChevronUp, Info } from "lucide-react";
import { ShifTab } from "./ShifTab";
import { MineralExploitationTab } from "./MineralExploitationTab";
import { HousingSchemeTab } from "./HousingSchemeTab";
import { SecurityTab } from "./SecurityTab";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Topic summary data for collapsed view
const topicSummaries = {
  shif: {
    title: "Social Health Insurance Fund (SHIF)",
    icon: <Activity className="h-5 w-5 text-red-500" />,
    keyStat: "12.4M Enrolled",
    description: "New dental coverage added, mobile registration centers launched nationwide.",
    severity: "medium",
  },
  mineral: {
    title: "Mineral Exploitation",
    icon: <Mountain className="h-5 w-5 text-amber-500" />,
    keyStat: "KES 24.7B Revenue",
    description: "New titanium mining deal signed, community protests in Taita Taveta.",
    severity: "high",
  },
  housing: {
    title: "Housing Scheme",
    icon: <Home className="h-5 w-5 text-green-500" />,
    keyStat: "48,750 Units Completed",
    description: "Phase 3 launched in 8 new counties, levy generates KES 18B in Q1.",
    severity: "medium",
  },
  security: {
    title: "Security - Abductions",
    icon: <Shield className="h-5 w-5 text-red-500" />,
    keyStat: "87 Reported Cases",
    description: "Special task force formed, 42 cases resolved with 48.3% resolution rate.",
    severity: "high",
  },
};

export function HotTopics() {
  const [activeTab, setActiveTab] = useState("shif");
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800";
      case "low":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800";
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      {/* Collapsed View */}
      {!isExpanded && (
        <Card className="mb-4 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Hot Topics
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleExpand}
                className="flex items-center gap-1"
              >
                <span className="text-sm">Expand</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="divide-y">
              {Object.entries(topicSummaries).map(([key, topic]) => (
                <div 
                  key={key}
                  className={`p-4 hover:bg-accent/50 cursor-pointer transition-colors`}
                  onClick={() => {
                    setActiveTab(key);
                    setIsExpanded(true);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{topic.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{topic.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getSeverityColor(topic.severity)}`}
                        >
                          {topic.keyStat}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">Hot Topics</h2>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      Updated: {new Date().toLocaleDateString("en-KE", { 
                        day: "numeric", 
                        month: "long", 
                        year: "numeric" 
                      })}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleExpand}
                      className="flex items-center gap-1"
                    >
                      <span className="text-sm">Collapse</span>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="shif" className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-red-500" />
                      <span className="hidden sm:inline">SHIF</span>
                      <span className="sm:hidden">SHIF</span>
                    </TabsTrigger>
                    <TabsTrigger value="mineral" className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-amber-500" />
                      <span className="hidden sm:inline">Mineral Exploitation</span>
                      <span className="sm:hidden">Minerals</span>
                    </TabsTrigger>
                    <TabsTrigger value="housing" className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-green-500" />
                      <span className="hidden sm:inline">Housing Scheme</span>
                      <span className="sm:hidden">Housing</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-500" />
                      <span className="hidden sm:inline">Security</span>
                      <span className="sm:hidden">Security</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="shif" className="pt-4">
                    <ShifTab />
                  </TabsContent>
                  
                  <TabsContent value="mineral" className="pt-4">
                    <MineralExploitationTab />
                  </TabsContent>
                  
                  <TabsContent value="housing" className="pt-4">
                    <HousingSchemeTab />
                  </TabsContent>
                  
                  <TabsContent value="security" className="pt-4">
                    <SecurityTab />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
