"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  price: number
  supplier: string
  minStock: number
  location: string
  status: "in-stock" | "low" | "out-of-stock"
  lastUpdated: Date
}

interface InventoryContextType {
  rawMaterials: InventoryItem[]
  finishedProducts: InventoryItem[]
  addRawMaterial: (item: InventoryItem) => void
  addFinishedProduct: (item: InventoryItem) => void
  updateRawMaterial: (id: string, item: Partial<InventoryItem>) => void
  updateFinishedProduct: (id: string, item: Partial<InventoryItem>) => void
  deleteRawMaterial: (id: string) => void
  deleteFinishedProduct: (id: string) => void
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

const mockRawMaterials: InventoryItem[] = [
  {
    id: "1",
    name: "Organic Apples",
    category: "fruits",
    quantity: 50,
    unit: "kg",
    price: 2.5,
    supplier: "Fresh Farm Co.",
    minStock: 20,
    location: "Cold Storage A",
    status: "in-stock",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Fresh Milk",
    category: "dairy",
    quantity: 15,
    unit: "liters",
    price: 1.2,
    supplier: "Dairy Best",
    minStock: 25,
    location: "Refrigerator B",
    status: "low",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Whole Wheat Flour",
    category: "bakery",
    quantity: 100,
    unit: "kg",
    price: 0.8,
    supplier: "Grain Mills Ltd",
    minStock: 30,
    location: "Dry Storage",
    status: "in-stock",
    lastUpdated: new Date(),
  },
]

const mockFinishedProducts: InventoryItem[] = [
  {
    id: "4",
    name: "Apple Juice",
    category: "beverages",
    quantity: 200,
    unit: "bottles",
    price: 3.5,
    supplier: "Internal Production",
    minStock: 50,
    location: "Finished Goods A",
    status: "in-stock",
    lastUpdated: new Date(),
  },
  {
    id: "5",
    name: "Whole Wheat Bread",
    category: "bakery",
    quantity: 30,
    unit: "loaves",
    price: 2.9,
    supplier: "Internal Production",
    minStock: 40,
    location: "Finished Goods B",
    status: "low",
    lastUpdated: new Date(),
  },
]

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [rawMaterials, setRawMaterials] = useState<InventoryItem[]>(mockRawMaterials)
  const [finishedProducts, setFinishedProducts] = useState<InventoryItem[]>(mockFinishedProducts)

  const addRawMaterial = (item: InventoryItem) => {
    setRawMaterials((prev) => [...prev, item])
  }

  const addFinishedProduct = (item: InventoryItem) => {
    setFinishedProducts((prev) => [...prev, item])
  }

  const updateRawMaterial = (id: string, updates: Partial<InventoryItem>) => {
    setRawMaterials((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const updateFinishedProduct = (id: string, updates: Partial<InventoryItem>) => {
    setFinishedProducts((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const deleteRawMaterial = (id: string) => {
    setRawMaterials((prev) => prev.filter((item) => item.id !== id))
  }

  const deleteFinishedProduct = (id: string) => {
    setFinishedProducts((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <InventoryContext.Provider
      value={{
        rawMaterials,
        finishedProducts,
        addRawMaterial,
        addFinishedProduct,
        updateRawMaterial,
        updateFinishedProduct,
        deleteRawMaterial,
        deleteFinishedProduct,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}
