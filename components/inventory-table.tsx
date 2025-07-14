"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ArrowUpDown } from "lucide-react"

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

interface InventoryTableProps {
  data: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (id: string) => void
}

type SortField = keyof InventoryItem
type SortDirection = "asc" | "desc"

export function InventoryTable({ data, onEdit, onDelete }: InventoryTableProps) {
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            In Stock
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Low Stock
          </Badge>
        )
      case "out-of-stock":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Out of Stock
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-semibold">
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("category")} className="h-auto p-0 font-semibold">
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("quantity")} className="h-auto p-0 font-semibold">
                Quantity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("price")} className="h-auto p-0 font-semibold">
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                {item.quantity} {item.unit}
                {item.quantity <= item.minStock && <span className="text-red-500 text-xs ml-1">(Low)</span>}
              </TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sortedData.length === 0 && <div className="text-center py-8 text-gray-500">No items found</div>}
    </div>
  )
}
