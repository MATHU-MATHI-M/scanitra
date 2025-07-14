"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotification } from "@/contexts/notification-context"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const quickQuestions = [
  "How do I add new inventory items?",
  "How to scan receipts?",
  "How does voice entry work?",
  "Where can I view reports?",
  "How to set up low stock alerts?",
  "How to export my data?",
]

const botResponses: { [key: string]: string } = {
  add: "To add new inventory items, go to the Inventory page and click the 'Add Item' button. You can also use Voice Entry or scan receipts to add items automatically.",
  scan: "To scan receipts, go to the 'Scan Receipt' page, upload an image or take a photo of your receipt. Our AI will extract the items automatically.",
  voice:
    "Voice Entry allows you to speak naturally to add items. Just click the microphone button and say something like 'Add 5 kg of apples and 2 liters of milk'.",
  reports:
    "You can view reports on the Dashboard page which shows KPIs, sales charts, and alerts. More detailed reports are available in the Analytics section.",
  alerts:
    "Low stock alerts are automatically generated when items fall below minimum stock levels. You can configure these in Settings > Notifications.",
  export:
    "To export your data, go to Settings > Data Management and click 'Export Data'. You'll receive an email when your export is ready.",
  default:
    "I'm here to help you with Scanitra! You can ask me about adding items, scanning receipts, voice entry, reports, or any other features. What would you like to know?",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! I'm your Scanitra assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { addToast } = useNotification()

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("add") || lowerMessage.includes("item")) {
      return botResponses.add
    } else if (lowerMessage.includes("scan") || lowerMessage.includes("receipt")) {
      return botResponses.scan
    } else if (lowerMessage.includes("voice") || lowerMessage.includes("speak")) {
      return botResponses.voice
    } else if (lowerMessage.includes("report") || lowerMessage.includes("analytics")) {
      return botResponses.reports
    } else if (lowerMessage.includes("alert") || lowerMessage.includes("stock")) {
      return botResponses.alerts
    } else if (lowerMessage.includes("export") || lowerMessage.includes("data")) {
      return botResponses.export
    } else {
      return botResponses.default
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(currentInput),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(question),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        onClick={() => {
          setIsOpen(true)
          addToast({
            type: "info",
            title: "Chatbot Opened",
            message: "Ask me anything about Scanitra!",
            duration: 3000,
          })
        }}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-4 right-4 z-50 shadow-xl transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-80 h-96"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3">
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Bot className="h-4 w-4 text-blue-500" />
          <span>Scanitra Assistant</span>
          <Badge variant="secondary" className="text-xs">
            Online
          </Badge>
        </CardTitle>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-80 p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-3 py-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "bot" && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.type === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.type === "user" && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gray-500 text-white text-xs">
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="px-4 py-2 border-t">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2 bg-transparent"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question.length > 20 ? question.substring(0, 20) + "..." : question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="text-sm"
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
