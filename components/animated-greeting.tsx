"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { AlertTriangle, Eye, Vote, ChevronDown, Wallet } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BalanceItem {
  label: string
  amount: number
  type: 'debit' | 'credit'
}

const citizenBalances: BalanceItem[] = [
  { label: 'Govt Debt', amount: 200000, type: 'debit' },
  { label: 'Fuliza', amount: 12000, type: 'debit' },
  { label: 'Hustler Fund', amount: 3000, type: 'debit' },
  {label: 'SHIF', amount: 4000, type: 'debit' }
]

const politicianBalances: BalanceItem[] = [
  { label: 'Sitting Allowance', amount: 300000, type: 'credit' },
  { label: 'Fuel Allowance', amount: 120000, type: 'credit' },
  { label: 'House Allowance', amount: 500000, type: 'credit' },
  { label: 'Miscellaneous & Corruption', amount: 320000000, type: 'credit' },
]

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
  const [isOpen, setIsOpen] = useState(false)
  const [balanceType, setBalanceType] = useState<'citizen' | 'politician'>('citizen')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const getCurrentBalance = () => {
    const balances = balanceType === 'citizen' ? citizenBalances : politicianBalances
    return balances.reduce((acc, item) => {
      return item.type === 'debit' ? acc - item.amount : acc + item.amount
    }, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  const CurrentIcon = greetings[currentIndex].icon

  return (
    <div className="flex flex-col items-start space-y-2 mb-8">
      <div className="w-full flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Jambo Mkenya! </h1>
        
        {isMobile ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            Check Balance
          </Button>
        ) : (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center gap-2 px-3 py-1",
                  balanceType === 'citizen' ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"
                )}
              >
                <span>Balance: {formatCurrency(getCurrentBalance())}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute right-0 mt-2 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border w-72">
              <div className="space-y-4">
                <div className="flex justify-between gap-2 mb-2">
                  <Button
                    variant={balanceType === 'citizen' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBalanceType('citizen')}
                  >
                    Citizen
                  </Button>
                  <Button
                    variant={balanceType === 'politician' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBalanceType('politician')}
                  >
                    Politician
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {(balanceType === 'citizen' ? citizenBalances : politicianBalances).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className={item.type === 'debit' ? 'text-red-500' : 'text-green-500'}>
                        {item.type === 'debit' ? '-' : '+'}{formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                    <span>Total</span>
                    <span className={getCurrentBalance() < 0 ? 'text-red-500' : 'text-green-500'}>
                      {getCurrentBalance() < 0 ? '-' : '+'}{formatCurrency(getCurrentBalance())}
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
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
      <BalanceDialog 
        open={isOpen} 
        onOpenChange={setIsOpen}
        citizenBalances={citizenBalances}
        politicianBalances={politicianBalances}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}

export function BalanceDialog({ 
  open, 
  onOpenChange,
  citizenBalances,
  politicianBalances,
  formatCurrency 
}: any) {
  const [balanceType, setBalanceType] = useState<'citizen' | 'politician'>('citizen')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Balance Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between gap-2">
            <Button
              variant={balanceType === 'citizen' ? "default" : "outline"}
              onClick={() => setBalanceType('citizen')}
              className="w-full"
            >
              Citizen
            </Button>
            <Button
              variant={balanceType === 'politician' ? "default" : "outline"}
              onClick={() => setBalanceType('politician')}
              className="w-full"
            >
              Politician
            </Button>
          </div>
          
          <div className="space-y-2">
            {(balanceType === 'citizen' ? citizenBalances : politicianBalances).map((item: any, index: number) => (
              <div key={index} className="flex justify-between">
                <span>{item.label}</span>
                <span className={item.type === 'debit' ? 'text-red-500' : 'text-green-500'}>
                  {item.type === 'debit' ? '-' : '+'}{formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

