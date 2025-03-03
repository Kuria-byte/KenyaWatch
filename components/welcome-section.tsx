import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { KenyaFlag } from "@/components/kenya-flag"
import { TrendingUp, AlertCircle, FileText } from "lucide-react"
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

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-primary/5 to-background border-none">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  At a Glance Today
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Budget Utilization</div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">KES 1.2T</div>
                    <div className="text-xs text-green-600 bg-green-100 dark:bg-green-950/50 px-2 py-1 rounded-full">
                      +2.4%
                    </div>
                  </div>
                  <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">2,547</div>
                    <div className="text-xs text-amber-600 bg-amber-100 dark:bg-amber-950/50 px-2 py-1 rounded-full">
                      On Track
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Citizen Reports</div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">1,238</div>
                    <div className="text-xs text-blue-600 bg-blue-100 dark:bg-blue-950/50 px-2 py-1 rounded-full">
                      +12% this week
                    </div>
                  </div>
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