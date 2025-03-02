"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface AnimatedIconProps {
  Icon: LucideIcon
  color?: string
  size?: number
  className?: string
}

export function AnimatedIcon({ Icon, color, size = 24, className }: AnimatedIconProps) {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className={className}>
      <Icon size={size} color={color} />
    </motion.div>
  )
}

