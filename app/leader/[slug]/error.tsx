"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error() {
  const router = useRouter()

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">
        We couldn't load this leader's profile. Please try again later.
      </p>
      <Button onClick={() => router.push("/")}>
        Return to Dashboard
      </Button>
    </div>
  )
}