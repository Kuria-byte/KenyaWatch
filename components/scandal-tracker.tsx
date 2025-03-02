"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { School, RouteIcon as Road, Hospital, Users, Briefcase } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const scandals = [
  {
    id: 1,
    title: "Eurobond Missing Funds",
    amount: 50000000000, // 50B
    year: 2024,
    county: "National",
    leader: "Treasury",
    description: "Investigation into missing Eurobond funds",
    impacts: [
      { icon: School, label: "Primary Education", value: "500K children for 2 years" },
      { icon: Hospital, label: "Level 4 Hospitals", value: "25 fully equipped facilities" },
      { icon: Road, label: "Rural Roads", value: "800km of paved roads" },
    ],
  },
  {
    id: 2,
    title: "COVID-19 PPE Scandal",
    amount: 7800000000, // 7.8B
    year: 2023,
    county: "National",
    leader: "KEMSA",
    description: "Inflated prices and irregular procurement of PPE",
    impacts: [
      { icon: Hospital, label: "ICU Beds", value: "1,000 fully equipped units" },
      { icon: Users, label: "Healthcare Workers", value: "5,000 nurses for 1 year" },
      { icon: Briefcase, label: "PPE Kits", value: "2 million standard kits" },
    ],
  },
]

export function ScandalTracker() {
  const [selectedAmount, setSelectedAmount] = useState(scandals[0].amount)
  const [filter, setFilter] = useState({ year: "all", county: "all", leader: "all" })

  const calculateImpact = (amount: number, type: string) => {
    const impacts = {
      education: amount / 50000, // Cost per child per year
      hospitals: amount / 2000000000, // Cost per Level 4 hospital
      roads: amount / 62500000, // Cost per km of rural road
    }
    return impacts[type as keyof typeof impacts] || 0
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🚨
          </motion.div>
          Scandal Tracker
        </CardTitle>
        <CardDescription>Track major corruption scandals and their potential impact on development</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => setFilter({ ...filter, year: value })} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setFilter({ ...filter, county: value })} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by County" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counties</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="nairobi">Nairobi</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setFilter({ ...filter, leader: value })} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by Institution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                <SelectItem value="treasury">Treasury</SelectItem>
                <SelectItem value="kemsa">KEMSA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scandals List */}
          <div className="space-y-6">
            {scandals.map((scandal) => (
              <Card key={scandal.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{scandal.title}</h3>
                    <p className="text-sm text-muted-foreground">{scandal.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium">Amount Lost:</span>
                      <span className="text-sm text-destructive">KES {(scandal.amount / 1000000000).toFixed(1)}B</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scandal.impacts.map((impact, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <motion.div whileHover={{ scale: 1.1 }} className="p-2 bg-muted rounded-full">
                          <impact.icon className="h-5 w-5" />
                        </motion.div>
                        <div className="text-sm">
                          <p className="font-medium">{impact.label}</p>
                          <p className="text-muted-foreground">{impact.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Impact Calculator */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Impact Calculator</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Enter Amount (KES)</label>
                <Input
                  type="number"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Primary Education</span>
                    <span>
                      {Math.round(calculateImpact(selectedAmount, "education")).toLocaleString()} children for 1 year
                    </span>
                  </div>
                  <Progress value={(calculateImpact(selectedAmount, "education") / 1000) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level 4 Hospitals</span>
                    <span>{Math.round(calculateImpact(selectedAmount, "hospitals")).toLocaleString()} facilities</span>
                  </div>
                  <Progress value={(calculateImpact(selectedAmount, "hospitals") / 10) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rural Roads</span>
                    <span>{Math.round(calculateImpact(selectedAmount, "roads")).toLocaleString()} km</span>
                  </div>
                  <Progress value={(calculateImpact(selectedAmount, "roads") / 10) * 100} className="h-2" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

