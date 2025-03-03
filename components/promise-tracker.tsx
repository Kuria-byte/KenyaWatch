import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSwipeable } from "react-swipeable"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Promise {
  id: string
  leader: {
    name: string
    handle: string
    avatar: string
  }
  promise: string
  date: string
  status: "kept" | "broken" | "in-progress"
  department: string
  evidence?: string
  updates?: string[]
}

const promises: Promise[] = [
  {
    id: "1",
    leader: {
      name: "William Ruto",
      handle: "@WilliamsRuto",
      avatar: "/avatars/ruto.jpg"
    },
    promise: "We will lower the cost of living within 100 days by implementing subsidies on essential commodities.",
    date: "2022-09-13",
    status: "in-progress",
    department: "Executive Office",
    updates: [
      "Fertilizer subsidy program launched",
      "Fuel prices remain high despite promises",
      "Food prices continue to rise"
    ]
  },
  {
    id: "2",
    leader: {
      name: "Sakaja Johnson",
      handle: "@SakajaKE",
      avatar: "/avatars/sakaja.jpg"
    },
    promise: "Free Wi-Fi in all public spaces across Nairobi within the first year.",
    date: "2022-08-25",
    status: "broken",
    department: "Nairobi County",
    evidence: "Only 3 out of planned 25 zones covered"
  },
  {
    id: "3",
    leader: {
      name: "William Ruto",
      handle: "@WilliamsRuto",
      avatar: "/avatars/ruto.jpg"
    },
    promise: "Creation of hustler fund to support small businesses",
    date: "2022-12-01",
    status: "kept",
    department: "Treasury",
    updates: [
      "Fund launched December 2022",
      "Over 2M Kenyans accessing credit",
      "KES 50B disbursed to date"
    ],
    evidence: "Active lending platform with 18M registered users"
  },
  {
    id: "4",
    leader: {
      name: "Rigathi Gachagua",
      handle: "@RigathiG",
      avatar: "/avatars/gachagua.jpg"
    },
    promise: "Reform of coffee sector and better prices for farmers",
    date: "2023-03-15",
    status: "in-progress",
    department: "Agriculture",
    updates: [
      "New regulations published",
      "Direct market access negotiations ongoing"
    ]
  },
  {
    id: "5",
    leader: {
      name: "William Ruto",
      handle: "@WilliamsRuto",
      avatar: "/avatars/ruto.jpg"
    },
    promise: "Construction of 250,000 affordable houses annually",
    date: "2023-01-10",
    status: "in-progress",
    department: "Housing",
    updates: [
      "15,000 units under construction",
      "Land acquisition in progress",
      "Private sector partnerships formed"
    ]
  }
]

const statusConfig = {
  kept: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-950/50",
    text: "Promise Kept"
  },
  broken: {
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-950/50",
    text: "Promise Broken"
  },
  "in-progress": {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-950/50",
    text: "In Progress"
  }
}

export function PromiseTracker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    onSwipeStart: () => setIsDragging(true),
    onTouchEndOrOnMouseUp: () => setIsDragging(false),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 10, // Minimum swipe distance
    swipeDuration: 250, // Maximum time for swipe
    trackTouch: true // Enable touch tracking
  })

  const handleSwipe = (direction: "left" | "right") => {
    if (isDragging) return // Prevent swipe if dragging

    if (direction === "left" && currentIndex < promises.length - 1) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    } else if (direction === "right" && currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    }
  }

  const currentPromise = promises[currentIndex]
  const StatusIcon = statusConfig[currentPromise.status].icon

  return (
    <div className="relative" {...handlers}>
      <Card className="bg-gradient-to-br from-primary/5 to-background border-none">
        <CardContent className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromise.id}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Compact Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                    <AvatarImage 
                      src={currentPromise.leader.avatar} 
                      alt={currentPromise.leader.name} 
                    />
                    <AvatarFallback>{currentPromise.leader.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{currentPromise.leader.name}</div>
                    <div className="text-xs text-muted-foreground">{currentPromise.leader.handle}</div>
                  </div>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shrink-0",
                  statusConfig[currentPromise.status].bg,
                  statusConfig[currentPromise.status].color
                )}>
                  <StatusIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">{statusConfig[currentPromise.status].text}</span>
                </div>
              </div>

              {/* Promise Summary */}
              <div className="space-y-2">
                <p className="text-base sm:text-lg font-medium leading-tight line-clamp-3 sm:line-clamp-none">
                  {currentPromise.promise}
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <span>{new Date(currentPromise.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{currentPromise.department}</span>
                </div>
              </div>

              {/* Collapsible Details Section */}
              <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-2">
                    <span className="text-xs">{showDetails ? 'Show Less' : 'Show More'}</span>
                    {showDetails ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4">
                  {/* Updates Section */}
                  {currentPromise.updates && (
                    <div className="space-y-2 pt-2">
                      <div className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Latest Updates
                      </div>
                      <ul className="space-y-2">
                        {currentPromise.updates.map((update, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                            <span className="flex-1">{update}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Evidence Section */}
                  {currentPromise.evidence && (
                    <div className="space-y-2 pt-2">
                      <div className="text-sm font-medium flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Evidence
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {currentPromise.evidence}
                      </p>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {promises.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full transition-all",
                  i === currentIndex ? "bg-primary w-2 sm:w-3" : "bg-primary/20"
                )}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 sm:h-10 sm:w-10 pointer-events-auto",
                currentIndex === 0 && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleSwipe("right")}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 sm:h-10 sm:w-10 pointer-events-auto",
                currentIndex === promises.length - 1 && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleSwipe("left")}
              disabled={currentIndex === promises.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}