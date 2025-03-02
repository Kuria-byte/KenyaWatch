"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { AlertTriangle, Eye, Vote } from "lucide-react"

const greetings = [
  {
    text: "Tunaibiwa! Mafuta imepanda tena...",
    color: "text-red-500",
    icon: AlertTriangle,
  },
  {
    text: "Kaa Rada! County funds zimepotea...",
    color: "text-amber-500",
    icon: Eye,
  },
  {
    text: "Vote Wisely! Kura yako ni sauti yako.",
    color: "text-green-500",
    icon: Vote,
  },
]

export function AnimatedGreeting() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const CurrentIcon = greetings[currentIndex].icon

  return (
    <div className="flex flex-col items-start space-y-2 mb-8">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Jambo Mkenya! 🇰🇪</h1>
        <div className="text-sm px-3 py-1 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded-full border border-red-200 dark:border-red-800">
          Balance: -
          {new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(200000)}
        </div>
      </div>
      <div className="h-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className={`flex items-center gap-2 text-lg font-medium ${greetings[currentIndex].color}`}
          >
            <CurrentIcon className="h-5 w-5" />
            {greetings[currentIndex].text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

