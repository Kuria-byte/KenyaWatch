import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyStat {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

interface KeyStatsProps {
  stats: KeyStat[];
}

export function KeyStats({ stats }: KeyStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.change && (
                <div
                  className={cn(
                    "flex items-center text-xs font-medium",
                    stat.trend === "up" && "text-green-500",
                    stat.trend === "down" && "text-red-500",
                    stat.trend === "neutral" && "text-muted-foreground"
                  )}
                >
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.trend === "neutral" && <Minus className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
