"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Check, X, Volume2, AlertCircle, Square } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useInventory } from "@/contexts/inventory-context"
import { useNotification } from "@/contexts/notification-context"
import { useNotifications } from "@/contexts/notification-center-context"

interface VoiceEntry {
  id: string
  text: string
  timestamp: Date
  confidence: number
  items: ParsedVoiceItem[]
}

interface ParsedVoiceItem {
  name: string
  quantity: number
  unit: string
  category: string
}

export default function VoiceEntryPage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [currentEntry, setCurrentEntry] = useState<VoiceEntry | null>(null)
  const [recentEntries, setRecentEntries] = useState<VoiceEntry[]>([])
  const { addRawMaterial } = useInventory()
  const { addToast } = useNotification()
  const { addNotification } = useNotifications()
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if Web Speech API is supported
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsSupported(true)
    }
  }, [])

  const startListening = () => {
    if (!isSupported) return

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
      addToast({
        type: "info",
        title: "Voice Recording Started",
        message: "Speak clearly to add inventory items",
        duration: 3000,
      })

      addNotification({
        type: "info",
        title: "Voice Recording Active",
        message: "Voice entry session started. Speak clearly to add inventory items.",
      })
    }

    recognition.onresult = (event) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      setTranscript(finalTranscript + interimTranscript)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
      addToast({
        type: "error",
        title: "Speech Recognition Error",
        message: "There was an error with speech recognition. Please try again.",
      })

      addNotification({
        type: "error",
        title: "Voice Recognition Failed",
        message: `Speech recognition error: ${event.error}. Please check your microphone and try again.`,
      })
    }

    recognition.onend = () => {
      setIsListening(false)
      if (transcript.trim()) {
        processVoiceInput(transcript)
      }
    }

    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)

    addToast({
      type: "info",
      title: "Voice Recording Stopped",
      message: "Processing your voice input...",
      duration: 3000,
    })

    // Process the current transcript if available
    if (transcript.trim()) {
      setTimeout(() => {
        processVoiceInput(transcript)
      }, 500)
    }
  }

  const processVoiceInput = (text: string) => {
    // Mock AI processing of voice input - extract items from speech
    const mockItems: ParsedVoiceItem[] = []

    // Simple keyword extraction (in real app, this would be AI-powered)
    const lowerText = text.toLowerCase()

    if (lowerText.includes("apple") || lowerText.includes("apples")) {
      mockItems.push({
        name: "Fresh Apples",
        quantity: extractNumber(lowerText, "apple") || 10,
        unit: "kg",
        category: "fruits",
      })
    }

    if (lowerText.includes("milk")) {
      mockItems.push({
        name: "Fresh Milk",
        quantity: extractNumber(lowerText, "milk") || 2,
        unit: "liters",
        category: "dairy",
      })
    }

    if (lowerText.includes("bread")) {
      mockItems.push({
        name: "Whole Wheat Bread",
        quantity: extractNumber(lowerText, "bread") || 5,
        unit: "loaves",
        category: "bakery",
      })
    }

    if (lowerText.includes("tomato") || lowerText.includes("tomatoes")) {
      mockItems.push({
        name: "Fresh Tomatoes",
        quantity: extractNumber(lowerText, "tomato") || 3,
        unit: "kg",
        category: "vegetables",
      })
    }

    if (lowerText.includes("rice")) {
      mockItems.push({
        name: "Basmati Rice",
        quantity: extractNumber(lowerText, "rice") || 5,
        unit: "kg",
        category: "grains",
      })
    }

    if (lowerText.includes("oil")) {
      mockItems.push({
        name: "Cooking Oil",
        quantity: extractNumber(lowerText, "oil") || 2,
        unit: "liters",
        category: "condiments",
      })
    }

    if (lowerText.includes("chicken")) {
      mockItems.push({
        name: "Fresh Chicken",
        quantity: extractNumber(lowerText, "chicken") || 2,
        unit: "kg",
        category: "meat",
      })
    }

    if (lowerText.includes("potato") || lowerText.includes("potatoes")) {
      mockItems.push({
        name: "Fresh Potatoes",
        quantity: extractNumber(lowerText, "potato") || 5,
        unit: "kg",
        category: "vegetables",
      })
    }

    if (lowerText.includes("onion") || lowerText.includes("onions")) {
      mockItems.push({
        name: "Fresh Onions",
        quantity: extractNumber(lowerText, "onion") || 3,
        unit: "kg",
        category: "vegetables",
      })
    }

    if (lowerText.includes("cheese")) {
      mockItems.push({
        name: "Cheddar Cheese",
        quantity: extractNumber(lowerText, "cheese") || 1,
        unit: "kg",
        category: "dairy",
      })
    }

    // If no specific items detected, create a generic entry
    if (mockItems.length === 0) {
      mockItems.push({
        name: "Voice Entry Item",
        quantity: 1,
        unit: "units",
        category: "other",
      })
    }

    const entry: VoiceEntry = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      confidence: 0.95,
      items: mockItems,
    }

    setCurrentEntry(entry)
    setShowConfirmModal(true)

    addToast({
      type: "success",
      title: "Voice Input Processed",
      message: `Found ${mockItems.length} item(s) in your voice input`,
      duration: 4000,
    })

    addNotification({
      type: "success",
      title: "Voice Input Processed",
      message: `Successfully processed voice input and found ${mockItems.length} item(s): ${mockItems.map((item) => item.name).join(", ")}`,
    })
  }

  // Helper function to extract numbers from text
  const extractNumber = (text: string, keyword: string): number | null => {
    const regex = new RegExp(`(\\d+)\\s*${keyword}`, "i")
    const match = text.match(regex)
    return match ? Number.parseInt(match[1]) : null
  }

  const confirmEntry = () => {
    if (currentEntry) {
      // Add items to inventory context
      let addedCount = 0
      const addedItems: string[] = []

      currentEntry.items.forEach((item) => {
        const inventoryItem = {
          id: Date.now().toString() + Math.random(),
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          price: getDefaultPrice(item.category),
          supplier: "Voice Entry",
          minStock: Math.floor(item.quantity * 0.3),
          location: "Voice Added",
          status: "in-stock" as const,
          lastUpdated: new Date(),
        }

        // Add to raw materials by default
        addRawMaterial(inventoryItem)
        addedCount++
        addedItems.push(`${item.quantity} ${item.unit} of ${item.name}`)
      })

      setRecentEntries((prev) => [currentEntry, ...prev.slice(0, 4)])
      setShowConfirmModal(false)
      setCurrentEntry(null)
      setTranscript("")

      // Show detailed success notification
      addToast({
        type: "success",
        title: "Items Added Successfully!",
        message: `Added ${addedCount} item(s): ${addedItems.join(", ")}`,
        duration: 8000,
      })

      // Add to notification center
      addNotification({
        type: "success",
        title: "Voice Entry Complete",
        message: `Successfully added ${addedCount} item(s) to inventory: ${addedItems.join(", ")}. Items are now available in Raw Materials.`,
      })
    }
  }

  const getDefaultPrice = (category: string): number => {
    const prices: { [key: string]: number } = {
      fruits: 3.5,
      vegetables: 2.8,
      dairy: 4.2,
      bakery: 2.9,
      grains: 1.8,
      condiments: 5.5,
      meat: 8.5,
      other: 2.5,
    }
    return prices[category] || 2.5
  }

  const cancelEntry = () => {
    setShowConfirmModal(false)
    setCurrentEntry(null)
    setTranscript("")
  }

  if (!isSupported) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Voice Entry</h1>
          <p className="text-gray-600 dark:text-gray-300">Add inventory items using voice commands</p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Speech Recognition Not Supported</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Your browser doesn't support the Web Speech API. Please use a modern browser like Chrome or Edge.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Voice Entry</h1>
        <p className="text-gray-600 dark:text-gray-300">Add inventory items using voice commands</p>
      </div>

      {/* Voice Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>Voice Input</CardTitle>
          <CardDescription>Click the microphone to start recording, then speak naturally to add items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Button
                size="lg"
                className={`h-24 w-24 rounded-full ${
                  isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
              {isListening && (
                <div className="absolute -inset-2 border-2 border-red-500 rounded-full animate-ping"></div>
              )}
            </div>

            {/* Stop Button - Only show when listening */}
            {isListening && (
              <Button
                variant="outline"
                size="lg"
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
                onClick={stopListening}
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Recording
              </Button>
            )}

            <div className="text-center">
              <Badge variant={isListening ? "destructive" : "secondary"}>
                {isListening ? "🎤 Recording..." : "Ready to record"}
              </Badge>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {isListening
                  ? "Speak clearly and mention item names, quantities, and units"
                  : "Click the microphone to start voice input"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Try: "Add 5 kg of apples, 2 liters of milk, and 3 kg of tomatoes"
              </p>
            </div>

            {transcript && (
              <Card className="w-full">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <Volume2 className="h-4 w-4 mt-1 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Live Transcript:</p>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-2 rounded mt-1">
                        {transcript}
                        {isListening && <span className="animate-pulse">|</span>}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voice Commands Help */}
      <Card>
        <CardHeader>
          <CardTitle>Voice Commands Help</CardTitle>
          <CardDescription>Examples of what you can say</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Basic Commands:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• "Add 5 kg of apples"</li>
                <li>• "2 liters of milk"</li>
                <li>• "10 loaves of bread"</li>
                <li>• "3 kg of tomatoes"</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Multiple Items:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• "Add 5 kg apples and 2 liters milk"</li>
                <li>• "3 kg rice, 1 kg cheese, 2 kg chicken"</li>
                <li>• "5 kg potatoes and 3 kg onions"</li>
                <li>• "2 liters oil and 10 kg rice"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Voice Entries</CardTitle>
            <CardDescription>Your latest voice-added inventory items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{entry.confidence * 100}% confidence</Badge>
                    <span className="text-sm text-gray-500">{entry.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 italic">"{entry.text}"</p>
                  <div className="space-y-2">
                    {entry.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded p-2 border border-green-200 dark:border-green-800"
                      >
                        <span className="font-medium text-green-800 dark:text-green-300">{item.name}</span>
                        <span className="text-sm text-green-600 dark:text-green-400">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirm Voice Entry</DialogTitle>
            <DialogDescription>Please review the items extracted from your voice input</DialogDescription>
          </DialogHeader>

          {currentEntry && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium mb-1 text-blue-800 dark:text-blue-300">You said:</p>
                <p className="text-blue-700 dark:text-blue-200 italic">"{currentEntry.text}"</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Extracted items ({currentEntry.items.length}):</p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentEntry.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border rounded p-3 bg-gray-50 dark:bg-gray-800"
                    >
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500 ml-2 capitalize">({item.category})</span>
                      </div>
                      <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={cancelEntry}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={confirmEntry} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Add {currentEntry?.items.length || 0} Item(s) to Inventory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
