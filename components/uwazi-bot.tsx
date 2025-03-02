"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot } from "lucide-react"

export function UwaziBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: "user" | "bot"; content: string }>>([
    {
      type: "bot",
      content:
        "Jambo! I am UwaziBot, your guide to understanding Kenya's governance and public finance. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: input }])

    // Simulate bot response (replace with actual AI implementation)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I'm currently being implemented. Soon I'll be able to provide detailed information about Kenya's governance and public finance, backed by official sources like KNBS and the National Treasury.",
        },
      ])
    }, 1000)

    setInput("")
  }

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-[350px] md:w-[400px]"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  UwaziBot
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about Kenya's governance..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      />
                      <Button onClick={handleSend}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

