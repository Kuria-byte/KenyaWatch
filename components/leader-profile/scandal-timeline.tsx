// components/leader-profile/scandal-timeline.tsx
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { Scandal } from "@/types/leaders"

interface ScandalTimelineProps {
  scandals: Scandal[]
}

export function ScandalTimeline({ scandals }: ScandalTimelineProps) {
  if (!scandals.length) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No recorded controversies</p>
      </Card>
    )
  }

  const getStatusColor = (status: Scandal['status']) => {
    switch (status) {
      case 'under-investigation':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'cleared':
        return 'bg-green-500/10 text-green-500'
      case 'convicted':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {scandals.map((scandal, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                {scandal.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(scandal.date), 'MMMM d, yyyy')}
              </p>
            </div>
            <Badge 
              className={getStatusColor(scandal.status)}
            >
              {scandal.status.replace('-', ' ')}
            </Badge>
          </div>

          <p className="mt-4">{scandal.description}</p>
          
          {scandal.impact > 0 && (
            <div className="mt-4 p-4 bg-destructive/5 rounded-lg">
              <h4 className="font-medium mb-2">Financial Impact:</h4>
              <p className="text-xl font-bold text-destructive">
                KES {scandal.impact.toLocaleString()}
              </p>
            </div>
          )}

          {scandal.sources && scandal.sources.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Sources:</h4>
              <div className="flex flex-wrap gap-2">
                {scandal.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Source {idx + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}

      <div className="mt-6">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">
            <p>Total Scandals: {scandals.length}</p>
            <p>Total Financial Impact: KES {scandals.reduce((sum, scandal) => sum + scandal.impact, 0).toLocaleString()}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}