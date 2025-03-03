"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Fuel,
  Utensils,
  LightbulbIcon,
  Bus,
  ShoppingBasket,
  Home,
  TrendingUp,
  AlertCircle,
  ChevronDown,
} from "lucide-react"
import { CostLivingAnalysis } from "./cost-living-analysis"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog"

interface PriceItem {
  id: string
  name: string
  icon: any
  oldPrice: number
  currentPrice: number
  yearStart: number
  yearEnd: number
  impact: {
    personal: string[]
    business: string[]
    economy: string[]
  }
  trends: {
    forecast: string
    factors: string[]
  }
}

const priceData: PriceItem[] = [
  {
    id: "petrol",
    name: "Petrol (Per Litre)",
    icon: Fuel,
    oldPrice: 120.50,
    currentPrice: 217.40,
    yearStart: 2021,
    yearEnd: 2025,
    impact: {
      personal: [
        "50% increase in daily commute costs",
        "Higher food delivery charges",
        "Increased taxi/ride-sharing fares"
      ],
      business: [
        "Rising transportation overheads",
        "Increased logistics costs",
        "Higher operational expenses"
      ],
      economy: [
        "Inflation pressure on basic goods",
        "Reduced consumer spending",
        "Transport sector strain"
      ]
    },
    trends: {
      forecast: "Expected to reach KES 250 by end of 2025",
      factors: [
        "Global oil prices",
        "Kenya Shilling depreciation",
        "Fuel levy increases"
      ]
    }
  },
  {
    id: "unga",
    name: "Unga (2kg)",
    icon: Utensils,
    oldPrice: 108,
    currentPrice: 189,
    yearStart: 2021,
    yearEnd: 2025,
    impact: {
      personal: [
        "Reduced household food security",
        "Diet adjustments required",
        "Increased monthly food budget"
      ],
      business: [
        "Hotels facing higher costs",
        "Bakeries increasing prices",
        "Restaurant menu adjustments"
      ],
      economy: [
        "Food security concerns",
        "Increased poverty risk",
        "Social stability pressure"
      ]
    },
    trends: {
      forecast: "Prices may stabilize at KES 170-190 range",
      factors: [
        "Rainfall patterns",
        "Import costs",
        "Subsidy policies"
      ]
    }
  },
  {
    id: "electricity",
    name: "Electricity (per kWh)",
    icon: LightbulbIcon,
    oldPrice: 15.80,
    currentPrice: 25.40,
    yearStart: 2021,
    yearEnd: 2025,
    impact: {
      personal: [
        "Higher monthly utility bills",
        "Energy conservation needed",
        "Appliance usage timing"
      ],
      business: [
        "Manufacturing costs up",
        "Operating hours adjustment",
        "Need for energy alternatives"
      ],
      economy: [
        "Industrial production costs",
        "Business competitiveness",
        "Investment in renewables"
      ]
    },
    trends: {
      forecast: "Further increases likely with IPP charges",
      factors: [
        "IPP agreements",
        "Fuel cost charges",
        "Infrastructure investment"
      ]
    }
  }
]

export function PriceImpactTracker() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [showAnalysis, setShowAnalysis] = useState(false)

  const toggleItem = (id: string) => {
    setOpenItems(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    )
  }

  const calculateIncrease = (oldPrice: number, newPrice: number) => {
    return ((newPrice - oldPrice) / oldPrice * 100).toFixed(1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-red-500" />
          Price Impact Tracker
        </CardTitle>
        <CardDescription>
          Track rising costs and their impact on daily life
        </CardDescription>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAnalysis(true)}
          className="mt-2"
        >
          View Historical Analysis
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {priceData.map((item) => (
          <Collapsible
            key={item.id}
            open={openItems.includes(item.id)}
            onOpenChange={() => toggleItem(item.id)}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      KES {item.oldPrice} → KES {item.currentPrice}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-red-500 font-bold">
                      +{calculateIncrease(item.oldPrice, item.currentPrice)}%
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {item.yearStart}-{item.yearEnd}
                    </p>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    openItems.includes(item.id) ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pt-2 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Personal Impact</h4>
                    <ul className="text-sm space-y-1">
                      {item.impact.personal.map((impact, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-red-500" />
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Business Impact</h4>
                    <ul className="text-sm space-y-1">
                      {item.impact.business.map((impact, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-amber-500" />
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Economic Impact</h4>
                    <ul className="text-sm space-y-1">
                      {item.impact.economy.map((impact, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-blue-500" />
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-sm mb-2">Future Trends</h4>
                  <p className="text-sm text-muted-foreground mb-2">{item.trends.forecast}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.trends.factors.map((factor, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
      <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto p-6">
          <div className="sticky top-0 bg-background pb-4 mb-4 border-b">
            <DialogTitle>Historical Cost of Living Analysis</DialogTitle>
            <DialogDescription>
              Track and compare cost changes across different leadership periods
            </DialogDescription>
          </div>
          <CostLivingAnalysis />
        </DialogContent>
      </Dialog>
    </Card>
  )
}