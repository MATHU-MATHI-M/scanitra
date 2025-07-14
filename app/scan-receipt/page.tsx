"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, FileImage, Check, X, Edit, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ParsedItem {
  id: string
  name: string
  quantity: number
  unit: string
  price: number
  category: string
}

const mockParsedItems: ParsedItem[] = [
  {
    id: "1",
    name: "Organic Apples",
    quantity: 5,
    unit: "kg",
    price: 12.5,
    category: "Fruits",
  },
  {
    id: "2",
    name: "Fresh Milk",
    quantity: 2,
    unit: "liters",
    price: 4.8,
    category: "Dairy",
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    quantity: 3,
    unit: "loaves",
    price: 8.7,
    category: "Bakery",
  },
  {
    id: "4",
    name: "Free Range Eggs",
    quantity: 1,
    unit: "dozen",
    price: 6.5,
    category: "Dairy",
  },
]

export default function ScanReceiptPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([])
  const [showResults, setShowResults] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        processReceipt()
      }
      reader.readAsDataURL(file)
    }
  }

  const processReceipt = () => {
    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setParsedItems(mockParsedItems)
      setIsProcessing(false)
      setShowResults(true)
    }, 2000)
  }

  const handleConfirmItems = () => {
    // Add items to inventory
    alert("Items added to inventory successfully!")
    setUploadedImage(null)
    setShowResults(false)
    setParsedItems([])
  }

  const handleEditItem = (id: string) => {
    // Open edit modal (simplified for demo)
    alert(`Edit item ${id}`)
  }

  const handleDeleteItem = (id: string) => {
    setParsedItems((items) => items.filter((item) => item.id !== id))
  }

  const totalValue = parsedItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Scan Receipt</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload a receipt image to automatically extract inventory items
        </p>
      </div>

      {!uploadedImage ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload Receipt</CardTitle>
            <CardDescription>Take a photo or upload an image of your receipt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-32 flex-col space-y-2 border-dashed bg-transparent"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8" />
                <span>Upload from Device</span>
              </Button>
              <Button
                variant="outline"
                className="h-32 flex-col space-y-2 border-dashed bg-transparent"
                onClick={() => {
                  // In a real app, this would open camera
                  alert("Camera functionality would be implemented here")
                }}
              >
                <Camera className="h-8 w-8" />
                <span>Take Photo</span>
              </Button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileImage className="h-5 w-5" />
                <span>Receipt Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Image
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded receipt"
                  width={400}
                  height={600}
                  className="w-full h-auto rounded-lg border"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Processing receipt...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadedImage(null)
                    setShowResults(false)
                    setParsedItems([])
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={processReceipt} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Reprocess"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Parsed Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Extracted Items</span>
                {showResults && <Badge variant="secondary">{parsedItems.length} items found</Badge>}
              </CardTitle>
              <CardDescription>Review and confirm the extracted items</CardDescription>
            </CardHeader>
            <CardContent>
              {showResults ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parsedItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.category}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" onClick={() => handleEditItem(item.id)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total Value:</span>
                      <span className="text-lg font-bold">${totalValue.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                      <Button onClick={handleConfirmItems} className="flex-1">
                        <Check className="h-4 w-4 mr-2" />
                        Confirm & Add
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {isProcessing ? (
                    <div>
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p>Analyzing receipt...</p>
                    </div>
                  ) : (
                    <p>Upload a receipt to see extracted items</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
