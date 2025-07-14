"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, TrendingUp, Package, AlertTriangle, Lightbulb } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isStreaming?: boolean
}

const mockResponses = [
  "Based on your inventory data, I notice that your organic produce has a 23% higher turnover rate compared to conventional items. Consider expanding your organic selection, particularly in the fruits category where demand is strongest.",

  "Your current stock levels show potential optimization opportunities. Items like 'Fresh Milk' and 'Organic Apples' are frequently running low. I recommend increasing minimum stock levels by 15-20% for these high-demand products.",

  "Analyzing your sales patterns, I see peak demand occurs on weekends for bakery items. Consider adjusting your ordering schedule to ensure adequate stock on Fridays. This could reduce stockouts by approximately 30%.",

  "Your inventory turnover ratio is currently 8.2, which is above industry average. However, I've identified 5 slow-moving items that are tying up capital. Would you like specific recommendations for these products?",

  "Price analysis shows your markup on dairy products is 12% below market average. There's opportunity to increase margins while remaining competitive. I can provide detailed pricing recommendations if needed.",
]

const suggestedQuestions = [
  "What are my best-selling products this month?",
  "Which items should I reorder soon?",
  "How can I optimize my inventory costs?",
  "What's my inventory turnover rate?",
  "Show me seasonal demand patterns",
]

export default function AIInsightsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI inventory assistant. I can help you analyze your inventory data, identify trends, optimize stock levels, and provide business insights. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateStreaming = (response: string, messageId: string) => {
    const words = response.split(" ")
    let currentIndex = 0

    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const partialContent = words.slice(0, currentIndex + 1).join(" ")
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, content: partialContent, isStreaming: true } : msg)),
        )
        currentIndex++
      } else {
        setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isStreaming: false } : msg)))
        setIsLoading(false)
        clearInterval(streamInterval)
      }
    }, 50)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responseId = (Date.now() + 1).toString()
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

      const assistantMessage: Message = {
        id: responseId,
        type: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      }

      setMessages((prev) => [...prev, assistantMessage])
      simulateStreaming(randomResponse, responseId)
    }, 1000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Insights Chat</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Get intelligent insights and recommendations for your inventory
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-500" />
              <span>AI Assistant</span>
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="h-3 w-3 mr-1" />
                GPT-4o
              </Badge>
            </CardTitle>
            <CardDescription>Powered by advanced AI to provide actionable inventory insights</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-500 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.type === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.isStreaming && <div className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />}
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>

                    {message.type === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gray-500 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="mt-4 flex space-x-2">
              <Input
                placeholder="Ask about your inventory, trends, or get recommendations..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Sales up 12% this week</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Package className="h-4 w-4 text-blue-500" />
                <span>234 items in stock</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>5 items need reordering</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Lightbulb className="h-4 w-4 text-purple-500" />
                <span>3 optimization tips available</span>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Questions</CardTitle>
              <CardDescription>Click to ask common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto py-2 px-3 bg-transparent"
                    onClick={() => handleSuggestedQuestion(question)}
                    disabled={isLoading}
                  >
                    <span className="text-xs">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <span>Inventory trend analysis</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span>Demand forecasting</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                  <span>Cost optimization</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <span>Reorder recommendations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <span>Risk assessment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
