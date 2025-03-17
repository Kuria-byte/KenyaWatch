// components/leader-profile/wealth-declaration.tsx
import { Card } from "@/components/ui/card"
import { WealthRecord } from "@/types/leaders"

interface WealthDeclarationProps {
  wealth: WealthRecord[]
}

export function WealthDeclaration({ wealth }: WealthDeclarationProps) {
  return (
    <div className="space-y-6">
      {wealth.map((record) => (
        <Card key={record.year} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Year {record.year}</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  KES {record.amount.toLocaleString()}
                </span>
                {record.growthPercent > 0 && (
                  <span className="text-sm text-green-500">
                    +{record.growthPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Assets</h4>
                <ul className="space-y-1">
                  {record.assets.map((asset, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {asset}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Liabilities</h4>
                <ul className="space-y-1">
                  {record.liabilities.map((liability, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      {liability}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}