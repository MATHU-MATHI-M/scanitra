"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Package, AlertTriangle, TrendingUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useInventory } from "@/contexts/inventory-context"
import { useNotification } from "@/contexts/notification-context"
import { InventoryTable } from "@/components/inventory-table"

export default function InventoryPage() {
  const {
    rawMaterials,
    finishedProducts,
    addRawMaterial,
    addFinishedProduct,
    updateRawMaterial,
    updateFinishedProduct,
    deleteRawMaterial,
    deleteFinishedProduct,
  } = useInventory()
  const { addToast } = useNotification()

  const [activeTab, setActiveTab] = useState("raw-materials")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    price: 0,
    supplier: "",
    minStock: 0,
    location: "",
  })

  const handleAddItem = () => {
    const itemData = {
      ...newItem,
      id: Date.now().toString(),
      lastUpdated: new Date(),
      status: newItem.quantity <= newItem.minStock ? "low" : "in-stock",
    }

    if (activeTab === "raw-materials") {
      addRawMaterial(itemData)
    } else {
      addFinishedProduct(itemData)
    }

    // Show success notification
    addToast({
      type: "success",
      title: "Product Added Successfully!",
      message: `${newItem.name} (${newItem.quantity} ${newItem.unit}) has been added to ${
        activeTab === "raw-materials" ? "Raw Materials" : "Finished Products"
      }`,
      duration: 6000,
    })

    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      price: 0,
      supplier: "",
      minStock: 0,
      location: "",
    })
    setShowAddDialog(false)
  }

  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setNewItem(item)
    setShowAddDialog(true)
  }

  const handleUpdateItem = () => {
    const updatedData = {
      ...newItem,
      lastUpdated: new Date(),
      status: newItem.quantity <= newItem.minStock ? "low" : "in-stock",
    }

    if (activeTab === "raw-materials") {
      updateRawMaterial(editingItem.id, updatedData)
    } else {
      updateFinishedProduct(editingItem.id, updatedData)
    }

    // Show success notification
    addToast({
      type: "success",
      title: "Product Updated Successfully!",
      message: `${newItem.name} has been updated in ${
        activeTab === "raw-materials" ? "Raw Materials" : "Finished Products"
      }`,
      duration: 5000,
    })

    setEditingItem(null)
    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      price: 0,
      supplier: "",
      minStock: 0,
      location: "",
    })
    setShowAddDialog(false)
  }

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      let deletedItemName = ""

      if (activeTab === "raw-materials") {
        const item = rawMaterials.find((item) => item.id === id)
        deletedItemName = item?.name || "Item"
        deleteRawMaterial(id)
      } else {
        const item = finishedProducts.find((item) => item.id === id)
        deletedItemName = item?.name || "Item"
        deleteFinishedProduct(id)
      }

      // Show success notification
      addToast({
        type: "warning",
        title: "Product Deleted",
        message: `${deletedItemName} has been removed from inventory`,
        duration: 4000,
      })
    }
  }

  const currentData = activeTab === "raw-materials" ? rawMaterials : finishedProducts
  const filteredData = currentData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const lowStockItems = currentData.filter((item) => item.status === "low").length
  const totalValue = currentData.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your raw materials and finished products</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeTab === "raw-materials" ? "Raw materials" : "Finished products"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items below minimum stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage your inventory items with sorting and filtering</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
                    <DialogDescription>
                      {editingItem ? "Update the item details below." : "Add a new item to your inventory."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="col-span-3"
                        placeholder="Product name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="dairy">Dairy</SelectItem>
                          <SelectItem value="meat">Meat</SelectItem>
                          <SelectItem value="bakery">Bakery</SelectItem>
                          <SelectItem value="beverages">Beverages</SelectItem>
                          <SelectItem value="condiments">Condiments</SelectItem>
                          <SelectItem value="grains">Grains</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 0 })}
                        className="col-span-3"
                        placeholder="0"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="unit" className="text-right">
                        Unit
                      </Label>
                      <Input
                        id="unit"
                        value={newItem.unit}
                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                        className="col-span-3"
                        placeholder="kg, liters, pieces, etc."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) || 0 })}
                        className="col-span-3"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="supplier" className="text-right">
                        Supplier
                      </Label>
                      <Input
                        id="supplier"
                        value={newItem.supplier}
                        onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                        className="col-span-3"
                        placeholder="Supplier name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="minStock" className="text-right">
                        Min Stock
                      </Label>
                      <Input
                        id="minStock"
                        type="number"
                        value={newItem.minStock}
                        onChange={(e) => setNewItem({ ...newItem, minStock: Number.parseInt(e.target.value) || 0 })}
                        className="col-span-3"
                        placeholder="0"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={newItem.location}
                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                        className="col-span-3"
                        placeholder="Warehouse A, Shelf 1, etc."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddDialog(false)
                        setEditingItem(null)
                        setNewItem({
                          name: "",
                          category: "",
                          quantity: 0,
                          unit: "",
                          price: 0,
                          supplier: "",
                          minStock: 0,
                          location: "",
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={editingItem ? handleUpdateItem : handleAddItem}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!newItem.name || !newItem.category || newItem.quantity <= 0}
                    >
                      {editingItem ? "Update" : "Add"} Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="raw-materials">Raw Materials ({rawMaterials.length})</TabsTrigger>
              <TabsTrigger value="finished-products">Finished Products ({finishedProducts.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="raw-materials" className="mt-6">
              <InventoryTable data={filteredData} onEdit={handleEditItem} onDelete={handleDeleteItem} />
            </TabsContent>
            <TabsContent value="finished-products" className="mt-6">
              <InventoryTable data={filteredData} onEdit={handleEditItem} onDelete={handleDeleteItem} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
