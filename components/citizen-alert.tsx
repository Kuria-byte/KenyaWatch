import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Share2 } from "lucide-react"

interface CitizenAlertProps {
  title: string
  description: string
  severity: "low" | "medium" | "high"
}

export default function CitizenAlert({ title, description, severity }: CitizenAlertProps) {
  const getSeverityColor = () => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <Card className={`${getSeverityColor()} border-none`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm">{description}</p>
            </div>
          </div>
          <Badge variant={severity === "high" ? "destructive" : "outline"}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </Badge>
        </div>
        <div className="mt-3 flex justify-end">
          <Button size="sm" variant="outline" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

