import { useState } from "react"
import { RecallModal } from "./recall-modal"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VoteIcon, AlertTriangleIcon } from "lucide-react"
import { Leader } from "@/types/leaders"
import { 
  calculateAttendanceRate, 
  calculateProjectCompletionRate,
  getLeaderTenure,
  getTotalDeclaredWealth,
  countActiveProjects 
} from "@/utils/leaders-utils"

interface LeaderCardProps {
  leader: Leader;
  hideMetrics?: boolean;
}

export function LeaderCard({ leader, hideMetrics = false }: LeaderCardProps) {
const [showRecallModal, setShowRecallModal] = useState(false)
  // Safe calculations with error handling
  const attendanceRate = (() => {
    try {
      return calculateAttendanceRate(leader)
    } catch {
      return 0
    }
  })()

  const projectCompletionRate = (() => {
    try {
      return calculateProjectCompletionRate(leader)
    } catch {
      return 0
    }
  })()

  const activeProjects = (() => {
    try {
      return countActiveProjects(leader.projects || [])
    } catch {
      return 0
    }
  })()

  const scandals = leader.scandals?.length || 0
  const tenure = getLeaderTenure(leader.electedDate, leader.endDate)
  const wealthDisplay = getTotalDeclaredWealth(leader.wealth || [])

  return (
<>
    <Link href={`/leader/${leader.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 border">
              <AvatarImage
                src={leader.imageUrl}
                alt={leader.name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg">
                {leader.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg leading-tight truncate">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {leader.position}
                  </p>
                </div>
                <Badge variant={leader.party === "UDA" ? "default" : "outline"} 
                       className="shrink-0">
                  {leader.party}
                </Badge>
              </div>

              <div className="mt-1 flex flex-wrap gap-2">
                {leader.county && (
                  <Badge variant="outline" className="text-xs">
                    {leader.county}
                  </Badge>
                )}
                {tenure && (
                  <Badge variant="outline" className="text-xs">
                    {tenure}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Only render metrics if not hidden */}
          {!hideMetrics && (
            <>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Approval Rating</p>
                  <p className="font-semibold">
                    {leader.approvalRating?.toFixed(1) || 'N/A'}/5
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Declared Wealth</p>
                  <p className="font-semibold">{wealthDisplay}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="font-semibold">{activeProjects}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Controversies</p>
                  <p className="font-semibold">{scandals}</p>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="mt-4 space-y-2">
                <MetricBar 
                  label="Attendance Rate"
                  value={attendanceRate}
                  suffix="%"
                />
                <MetricBar 
                  label="Project Completion"
                  value={projectCompletionRate}
                  suffix="%"
                />
              </div>

              {/* CTA Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button 
variant="destructive" 
size="sm" 
className="w-full"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowRecallModal(true)
                    }}
>
                  <AlertTriangleIcon className="w-4 h-4 mr-2" />
                  Recall
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  <VoteIcon className="w-4 h-4 mr-2" />
                  Vote Again
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </Link>

      <RecallModal 
        leader={leader}
        open={showRecallModal}
        onClose={() => setShowRecallModal(false)}
      />
    </>
  )
}

// Helper component for metric bars
function MetricBar({ 
  label, 
  value, 
  suffix = "" 
}: { 
  label: string; 
  value: number; 
  suffix?: string; 
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}{suffix}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}
