import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface LeaderCardProps {
  name: string
  position: string
  metrics: {
    projectsExecuted: number
    projectsPromised: number
    fundsAllocated: string
    fundsUtilized: string
    attendance: string
  }
  approvalRating: {
    performance: number
    integrity: number
    wouldVoteAgain: number
  }
  imageUrl: string
}

export default function LeaderCard({ name, position, metrics, approvalRating, imageUrl }: LeaderCardProps) {
  const projectCompletion = (metrics.projectsExecuted / metrics.projectsPromised) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{position}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Projects Executed</span>
            <span>
              {metrics.projectsExecuted}/{metrics.projectsPromised}
            </span>
          </div>
          <Progress value={projectCompletion} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Funds Allocated:</span>
            <p>{metrics.fundsAllocated}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Funds Utilized:</span>
            <p>{metrics.fundsUtilized}</p>
          </div>
        </div>

        <div>
          <span className="text-muted-foreground">Attendance:</span>
          <p>{metrics.attendance}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Public Approval Rating</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{approvalRating.performance}</span>
              </div>
              <span className="text-xs text-muted-foreground">Performance</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{approvalRating.integrity}</span>
              </div>
              <span className="text-xs text-muted-foreground">Integrity</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{approvalRating.wouldVoteAgain}</span>
              </div>
              <span className="text-xs text-muted-foreground">Vote Again</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Vote Again
          </Button>
          <Button variant="outline" size="sm" className="w-full bg-red-50 hover:bg-red-100 border-red-200 text-red-700">
            <ThumbsDown className="w-4 h-4 mr-2" />
            Impeach
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

