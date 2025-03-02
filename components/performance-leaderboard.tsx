import { Badge } from "@/components/ui/badge"
import { ThumbsDown, ThumbsUp } from "lucide-react"

interface PerformanceLeaderboardProps {
  type: "best" | "worst"
  items: {
    name: string
    metric: string
    rank: number
  }[]
}

export default function PerformanceLeaderboard({ type, items }: PerformanceLeaderboardProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-3 rounded-lg ${
            type === "best" ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <Badge
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                type === "best"
                  ? "bg-green-200 hover:bg-green-200 text-green-800"
                  : "bg-red-200 hover:bg-red-200 text-red-800"
              }`}
            >
              {item.rank}
            </Badge>
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.metric}</p>
            </div>
          </div>
          {type === "best" ? (
            <ThumbsUp className="h-5 w-5 text-green-600" />
          ) : (
            <ThumbsDown className="h-5 w-5 text-red-600" />
          )}
        </div>
      ))}
    </div>
  )
}

