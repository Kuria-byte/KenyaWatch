"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface LeaderAvatarProps {
  imageUrl?: string
  name: string
  size?: "sm" | "md" | "lg" | "xl"
}

export default function LeaderAvatar({ imageUrl, name, size = "md" }: LeaderAvatarProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
  
  // Determine size class
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24"
  }[size]
  
  return (
    <Avatar className={sizeClass}>
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={name} />
      ) : null}
      <AvatarFallback className="bg-primary/10">
        {imageUrl ? null : <User className="h-4 w-4" />}
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
