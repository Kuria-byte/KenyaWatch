"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Hospital, RouteIcon as Road, School, Users, Flag } from "lucide-react"
import { motion } from "framer-motion"

export function ScandalSpotlight() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
          </motion.div>
          Scandal Spotlight
        </CardTitle>
        <CardDescription>See the real impact of corruption on public services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Hospital className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">KES 1B NHIF Scandal (2023)</h3>
                <p className="text-muted-foreground">
                  Could Have Built 10 Level 4 Hospitals or Paid 5,000 Doctors for 6 Months
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Funds Lost</span>
                <span>KES 1B</span>
              </div>
              <Progress value={100} className="h-2 bg-red-200" />
              <div className="flex justify-between text-sm">
                <span>Potential Impact</span>
                <span>10 Hospitals</span>
              </div>
              <Progress value={0} className="h-2 bg-green-200" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Road className="h-5 w-5 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">KES 500M Road Scandal</h3>
                <p className="text-muted-foreground">Equivalent to 200km of Paved Roads in Rural Areas</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Funds Lost</span>
                <span>KES 500M</span>
              </div>
              <Progress value={100} className="h-2 bg-red-200" />
              <div className="flex justify-between text-sm">
                <span>Potential Impact</span>
                <span>200km Roads</span>
              </div>
              <Progress value={0} className="h-2 bg-green-200" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="gap-2">
            <Flag className="h-4 w-4" />
            Report Fraud
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-muted rounded-lg text-center">
            <School className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="text-sm font-medium">Education Impact</p>
            <p className="text-xs text-muted-foreground">500K Students</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-muted rounded-lg text-center">
            <Hospital className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-sm font-medium">Healthcare Impact</p>
            <p className="text-xs text-muted-foreground">10 Hospitals</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-muted rounded-lg text-center">
            <Road className="h-8 w-8 mx-auto mb-2 text-amber-500" />
            <p className="text-sm font-medium">Infrastructure Impact</p>
            <p className="text-xs text-muted-foreground">200km Roads</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-muted rounded-lg text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-sm font-medium">Social Impact</p>
            <p className="text-xs text-muted-foreground">1M Citizens</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

