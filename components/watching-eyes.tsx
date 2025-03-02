"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function WatchingEyes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Calculate eye movement (limited range)
    const angle = Math.atan2(mousePosition.y - window.innerHeight / 2, mousePosition.x - window.innerWidth / 2)
    const distance = 3 // Max pixel movement
    setEyePosition({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    })
  }, [mousePosition])

  return (
    <div className="relative w-8 h-4">
      <svg viewBox="0 0 40 20" className="w-full h-full">
        {/* Left eye */}
        <motion.g animate={{ x: eyePosition.x, y: eyePosition.y }}>
          <circle cx="10" cy="10" r="8" fill="white" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="10" r="3" fill="currentColor" />
        </motion.g>
        {/* Right eye */}
        <motion.g animate={{ x: eyePosition.x, y: eyePosition.y }}>
          <circle cx="30" cy="10" r="8" fill="white" stroke="currentColor" strokeWidth="1" />
          <circle cx="30" cy="10" r="3" fill="currentColor" />
        </motion.g>
      </svg>
    </div>
  )
}

