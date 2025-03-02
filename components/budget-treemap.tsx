"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface BudgetData {
  name: string
  size: number
  color: string
}

interface TreemapData {
  name: string
  children: BudgetData[]
}

// Raw data
const rawData: TreemapData = {
  name: "Budget Allocation",
  children: [
    {
      name: "Debt Repayment",
      size: 1260,
      color: "#FF8042",
    },
    {
      name: "Education",
      size: 840,
      color: "#0088FE",
    },
    {
      name: "Health",
      size: 630,
      color: "#00C49F",
    },
    {
      name: "Infrastructure",
      size: 546,
      color: "#FFBB28",
    },
    {
      name: "Security",
      size: 420,
      color: "#FF00FF",
    },
    {
      name: "Agriculture",
      size: 294,
      color: "#8884d8",
    },
    {
      name: "Other Sectors",
      size: 210,
      color: "#82ca9d",
    },
  ],
}

const ErrorDisplay = ({ message }: { message: string }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)

export default function BudgetTreemap() {
  const total = useMemo(() => rawData.children.reduce((sum, item) => sum + item.size, 0), [])

  // Calculate positions for each rectangle
  const items = useMemo(() => {
    const width = 100
    const height = 100
    let currentY = 0
    let currentX = 0
    let rowHeight = 0

    return rawData.children.map((item) => {
      const rectWidth = (item.size / total) * width
      const rectHeight = (item.size / total) * height

      if (currentX + rectWidth > width) {
        currentX = 0
        currentY += rowHeight
        rowHeight = 0
      }

      const rect = {
        x: currentX,
        y: currentY,
        width: rectWidth,
        height: rectHeight,
        ...item,
      }

      currentX += rectWidth
      rowHeight = Math.max(rowHeight, rectHeight)

      return rect
    })
  }, [total])

  if (!items.length) {
    return <ErrorDisplay message="No budget data available" />
  }

  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.g
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.rect
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                fill={item.color}
                stroke="white"
                strokeWidth="0.5"
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              />
              {item.width > 10 && item.height > 10 && (
                <>
                  <text
                    x={item.x + item.width / 2}
                    y={item.y + item.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={item.width < 20 ? "2px" : "3px"}
                    className="pointer-events-none"
                  >
                    {item.name}
                  </text>
                  <text
                    x={item.x + item.width / 2}
                    y={item.y + item.height / 2 + 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="2px"
                    className="pointer-events-none"
                  >
                    {`${((item.size / total) * 100).toFixed(1)}%`}
                  </text>
                </>
              )}
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Tooltip */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="font-semibold mb-2">Budget Breakdown</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm">{item.name}</span>
              <span className="text-sm text-muted-foreground ml-auto">{((item.size / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

