import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { KenyaFlag } from "@/components/kenya-flag"
import { TrendingUp, AlertCircle, FileText, ShoppingBasket, Briefcase, Smartphone } from "lucide-react"
import { PromiseTracker } from "./promise-tracker"

export function WelcomeSection() {
  const currentTime = new Date()
  const hour = currentTime.getHours()
  
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-none shadow-lg">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Greeting Section */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                
                <h1 className="text-2xl font-bold tracking-tight">{greeting}, Fellow Kenyan</h1>
              </div>
              <p className="text-muted-foreground mb-6">
                Stay informed about Kenya's governance, public resources, and development progress.
                Your active participation makes our democracy stronger.
              </p>
              {/* <div className="grid grid-cols-3 gap-4">
                <Card className="bg-green-50 dark:bg-green-950/20 border-none">
                  <CardContent className="p-4">
                    <TrendingUp className="h-5 w-5 text-green-600 mb-2" />
                    <div className="text-sm font-medium">Today's Updates</div>
                    <div className="text-2xl font-bold">47</div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-none">
                  <CardContent className="p-4">
                    <FileText className="h-5 w-5 text-blue-600 mb-2" />
                    <div className="text-sm font-medium">New Reports</div>
                    <div className="text-2xl font-bold">12</div>
                  </CardContent>
                </Card>
                <Card className="bg-amber-50 dark:bg-amber-950/20 border-none">
                  <CardContent className="p-4">
                    <AlertCircle className="h-5 w-5 text-amber-600 mb-2" />
                    <div className="text-sm font-medium">Alerts</div>
                    <div className="text-2xl font-bold">5</div>
                  </CardContent>
                </Card>
              </div> */}
            </div>

            {/* Economic & Livelihood Indicators */}
            <Card className="bg-gradient-to-br from-primary/5 to-background border-none">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  At a Glance Today
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <ShoppingBasket className="h-3.5 w-3.5" />
                    <span>Cost of Living</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">KES 34,750</div>
                    <div className="text-xs text-red-600 bg-red-100 dark:bg-red-950/50 px-2 py-1 rounded-full">
                      +5.8% MoM
                    </div>
                  </div>
                  <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "68%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground">Monthly food basket for family of 4</div>
                </div>

                {/* <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Employment Growth</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">142,500</div>
                    <div className="text-xs text-amber-600 bg-amber-100 dark:bg-amber-950/50 px-2 py-1 rounded-full">
                      +1.2% Q1
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">New jobs created this quarter</div>
                </div> */}

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>Income Inequality</span>
                    <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">8,300 wealthiest Kenyans control more assets than 53 million others combined</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Top 0.1% Own More Than Bottom 99.9%</div>
                </div>
              </CardContent>
            </Card>

{/* // Replace the Quick Stats Card with: */}
{/* <PromiseTracker /> */}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}