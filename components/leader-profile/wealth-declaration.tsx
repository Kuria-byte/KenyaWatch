// components/leader-profile/wealth-declaration.tsx
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, AlertCircle } from "lucide-react"

interface WealthDeclarationProps {
  wealth: {
    timeline: {
      year: number
      amount: string
      assets: string[]
    }[]
    conflicts: string[]
  }
}

export const WealthDeclaration: React.FC<WealthDeclarationProps> = ({ wealth }) => {
  return (
    <div className="space-y-6">
      {wealth.timeline.map((entry, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">Year {entry.year}</h3>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {entry.amount}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Declared Assets:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {entry.assets.map((asset, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {asset}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {wealth.conflicts.length > 0 && (
        <Card className="border-destructive">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold">Potential Conflicts of Interest</h3>
            </div>
            <ul className="space-y-2">
              {wealth.conflicts.map((conflict, i) => (
                <li key={i} className="text-sm text-destructive flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  {conflict}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}