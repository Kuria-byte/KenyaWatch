"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Share2 } from "lucide-react"
import CountUp from "react-countup"

interface StatDetails {
  internal?: { amount: string; breakdown: { category: string; amount: string }[] }
  external?: { amount: string; breakdown: { country: string; amount: string; terms: string }[] }
  history: {
    period: string
    leader: string
    amountAdded: string
    keyProjects: string[]
  }[]
  paymentStatus: {
    paid: string
    remaining: string
    nextPayment: string
  }
  impact: string[]
  sources: { title: string; url: string }[]
}

interface ExpandableStatProps {
  title: string
  value: string
  subtitle: string
  details: StatDetails
  colorClass: string
}

export function ExpandableStat({ title, value, subtitle, details, colorClass }: ExpandableStatProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareData = async () => {
    try {
      await navigator.share({
        title: `Kenya Watch - ${title}`,
        text: `${title}: ${value}\n${subtitle}`,
        url: window.location.href,
      })
    } catch (err) {
      console.error("Share failed:", err)
    }
  }

  return (
    <>
      <Card className={`${colorClass} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={() => setIsOpen(true)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp
              end={parseFloat(value.replace(/[^0-9.]/g, ""))}
              duration={2.5}
              separator=","
              decimals={value.includes(".") ? 1 : 0}
              prefix={value.includes("KES") ? "KES " : ""}
              suffix={value.includes("T") ? "T" : value.includes("%") ? "%" : ""}
            />
          </div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {details.internal && (
              <section>
                <h3 className="font-semibold mb-2">Internal Debt: {details.internal.amount}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {details.internal.breakdown.map((item, i) => (
                    <div key={i} className="p-2 bg-muted rounded-lg">
                      <div className="font-medium">{item.category}</div>
                      <div className="text-sm text-muted-foreground">{item.amount}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {details.external && (
              <section>
                <h3 className="font-semibold mb-2">External Debt: {details.external.amount}</h3>
                <div className="space-y-2">
                  {details.external.breakdown.map((item, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{item.country}</span>
                        <span>{item.amount}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.terms}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="font-semibold mb-2">Historical Context</h3>
              <div className="space-y-3">
                {details.history.map((period, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4">
                    <div className="font-medium">{period.period} - {period.leader}</div>
                    <div className="text-sm text-muted-foreground">Added: {period.amountAdded}</div>
                    <ul className="text-sm mt-1">
                      {period.keyProjects.map((project, j) => (
                        <li key={j}>• {project}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Payment Status</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Paid</div>
                  <div className="font-medium">{details.paymentStatus.paid}</div>
                </div>
                <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Remaining</div>
                  <div className="font-medium">{details.paymentStatus.remaining}</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Next Payment</div>
                  <div className="font-medium">{details.paymentStatus.nextPayment}</div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Impact on Citizens</h3>
              <ul className="space-y-2">
                {details.impact.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Data Sources</h3>
              <div className="flex flex-wrap gap-2">
                {details.sources.map((source, i) => (
                  <Button key={i} variant="outline" size="sm" asChild>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {source.title}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <Button onClick={shareData} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

<motion.section
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  {/* Existing Government Debt stat */}

  <ExpandableStat
    title="Healthcare Budget"
    value="KES 146.8B"
    subtitle="Only 47% of target budget allocated"
    colorClass="bg-blue-50 dark:bg-blue-950/20"
    details={{
      internal: {
        amount: "KES 146.8B",
        breakdown: [
          { category: "County Healthcare", amount: "KES 70B" },
          { category: "National Hospitals", amount: "KES 42B" },
          { category: "Medical Equipment", amount: "KES 34.8B" }
        ]
      },
      history: [
        {
          period: "2022-2025",
          leader: "William Ruto",
          amountAdded: "KES 26B",
          keyProjects: ["Universal Healthcare", "Linda Mama Program"]
        }
      ],
      paymentStatus: {
        paid: "KES 98B",
        remaining: "KES 48.8B",
        nextPayment: "KES 12B (July 2025)"
      },
      impact: [
        "Only 27% of Kenyans have health insurance",
        "1 doctor per 6,355 patients",
        "Limited access to specialized care"
      ],
      sources: [
        { title: "Ministry of Health", url: "https://health.go.ke" },
        { title: "WHO Report 2024", url: "#" }
      ]
    }}
  />

  <ExpandableStat
    title="Education Spending"
    value="KES 244.1B"
    subtitle="Largest sector allocation"
    colorClass="bg-green-50 dark:bg-green-950/20"
    details={{
      internal: {
        amount: "KES 244.1B",
        breakdown: [
          { category: "Primary Education", amount: "KES 103B" },
          { category: "Secondary Education", amount: "KES 89B" },
          { category: "University Funding", amount: "KES 52.1B" }
        ]
      },
      history: [
        {
          period: "2022-2025",
          leader: "William Ruto",
          amountAdded: "KES 44B",
          keyProjects: ["CBC Implementation", "Teacher Recruitment"]
        }
      ],
      paymentStatus: {
        paid: "KES 178B",
        remaining: "KES 66.1B",
        nextPayment: "KES 22B (August 2025)"
      },
      impact: [
        "100% primary school enrollment",
        "Teacher to student ratio 1:45",
        "Increased TVET enrollment"
      ],
      sources: [
        { title: "Ministry of Education", url: "https://education.go.ke" },
        { title: "World Bank Education Report", url: "#" }
      ]
    }}
  />

  <ExpandableStat
    title="Infrastructure Development"
    value="KES 189.7B"
    subtitle="Roads, Rail & Energy Projects"
    colorClass="bg-purple-50 dark:bg-purple-950/20"
    details={{
      internal: {
        amount: "KES 189.7B",
        breakdown: [
          { category: "Roads & Bridges", amount: "KES 98B" },
          { category: "Railway Projects", amount: "KES 56B" },
          { category: "Energy Infrastructure", amount: "KES 35.7B" }
        ]
      },
      history: [
        {
          period: "2022-2025",
          leader: "William Ruto",
          amountAdded: "KES 67B",
          keyProjects: ["Eastern Bypass", "Rural Electrification"]
        }
      ],
      paymentStatus: {
        paid: "KES 134B",
        remaining: "KES 55.7B",
        nextPayment: "KES 18B (September 2025)"
      },
      impact: [
        "13,000km of new roads built",
        "72% rural electrification rate",
        "Reduced urban congestion"
      ],
      sources: [
        { title: "KeNHA Reports", url: "https://kenha.co.ke" },
        { title: "Infrastructure Review", url: "#" }
      ]
    }}
  />

  <ExpandableStat
    title="Agriculture & Food Security"
    value="KES 72.4B"
    subtitle="Food Security Programs"
    colorClass="bg-yellow-50 dark:bg-yellow-950/20"
    details={{
      internal: {
        amount: "KES 72.4B",
        breakdown: [
          { category: "Fertilizer Subsidy", amount: "KES 32B" },
          { category: "Irrigation Projects", amount: "KES 24B" },
          { category: "Extension Services", amount: "KES 16.4B" }
        ]
      },
      history: [
        {
          period: "2022-2025",
          leader: "William Ruto",
          amountAdded: "KES 28B",
          keyProjects: ["Fertilizer Subsidy", "Irrigation Schemes"]
        }
      ],
      paymentStatus: {
        paid: "KES 52B",
        remaining: "KES 20.4B",
        nextPayment: "KES 8B (October 2025)"
      },
      impact: [
        "3.2M farmers supported",
        "15% increase in crop yield",
        "Reduced food prices"
      ],
      sources: [
        { title: "Ministry of Agriculture", url: "https://kilimo.go.ke" },
        { title: "Food Security Report", url: "#" }
      ]
    }}
  />

  <ExpandableStat
    title="County Allocations"
    value="KES 385.4B"
    subtitle="Devolution Fund Distribution"
    colorClass="bg-orange-50 dark:bg-orange-950/20"
    details={{
      internal: {
        amount: "KES 385.4B",
        breakdown: [
          { category: "Equitable Share", amount: "KES 302B" },
          { category: "Conditional Grants", amount: "KES 56B" },
          { category: "Equalization Fund", amount: "KES 27.4B" }
        ]
      },
      history: [
        {
          period: "2022-2025",
          leader: "William Ruto",
          amountAdded: "KES 82B",
          keyProjects: ["County Healthcare", "Urban Development"]
        }
      ],
      paymentStatus: {
        paid: "KES 289B",
        remaining: "KES 96.4B",
        nextPayment: "KES 32B (November 2025)"
      },
      impact: [
        "47 counties funded",
        "Improved local services",
        "Enhanced accountability"
      ],
      sources: [
        { title: "Controller of Budget", url: "https://cob.go.ke" },
        { title: "County Allocation Report", url: "#" }
      ]
    }}
  />
</motion.section>