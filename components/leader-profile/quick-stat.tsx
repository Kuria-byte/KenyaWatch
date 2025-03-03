import { LucideIcon } from "lucide-react"

interface QuickStatProps {
  icon: LucideIcon
  label: string
  value: string
  subtext: string
}

export function QuickStat({ icon: Icon, label, value, subtext }: QuickStatProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </div>
  )
}