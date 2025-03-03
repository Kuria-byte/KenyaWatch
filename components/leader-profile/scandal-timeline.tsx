// components/leader-profile/scandal-timeline.tsx
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ScandalTimelineProps {
  scandals: {
    title: string
    year: number
    description: string
    source: string
    status: string
    evidence: string[]
  }[]
}

export const ScandalTimeline: React.FC<ScandalTimelineProps> = ({ scandals }) => {
  return (
    <div className="space-y-6">
      {scandals.map((scandal, index) => (
        <Card key={index}>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold text-lg">{scandal.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground">Year: {scandal.year}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                scandal.status === "Resolved" 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              }`}>
                {scandal.status}
              </span>
            </div>
            
            <p className="text-sm">{scandal.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Evidence & Sources:</h4>
              <div className="flex flex-wrap gap-2">
                {scandal.evidence.map((doc, i) => (
                  <Button key={i} variant="outline" size="sm" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    {doc}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs hover:text-primary" 
                  asChild
                >
                  <a 
                    href={scandal.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Source
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}