"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Users,
  AlertTriangle,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"
import { useNotification } from "@/contexts/notification-context"
import { useInventory } from "@/contexts/inventory-context"

const salesData = [
  { day: "Mon", sales: 2400 },
  { day: "Tue", sales: 1398 },
  { day: "Wed", sales: 9800 },
  { day: "Thu", sales: 3908 },
  { day: "Fri", sales: 4800 },
  { day: "Sat", sales: 3800 },
  { day: "Sun", sales: 4300 },
]

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Low Stock Alert",
    message: "Organic Apples running low (5 units remaining)",
    time: "2 minutes ago",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "info",
    title: "New Receipt Scanned",
    message: "Receipt from Supplier ABC processed successfully",
    time: "15 minutes ago",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "warning",
    title: "Expiry Alert",
    message: "Dairy products expiring in 2 days",
    time: "1 hour ago",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 4,
    type: "info",
    title: "Voice Entry Completed",
    message: "Added 50 units of Fresh Bread via voice command",
    time: "2 hours ago",
    icon: <CheckCircle className="h-4 w-4" />,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { addToast } = useNotification()
  const { rawMaterials, finishedProducts } = useInventory()

  const handleAddNewItem = () => {
    router.push("/inventory")
    addToast({
      type: "info",
      title: "Redirecting to Inventory",
      message: "Opening inventory page to add new items",
    })
  }

  const handleCheckLowStock = () => {
    // Get actual low stock items from inventory
    const allItems = [...rawMaterials, ...finishedProducts]
    const lowStockItems = allItems.filter((item) => item.quantity <= item.minStock)

    if (lowStockItems.length > 0) {
      addToast({
        type: "warning",
        title: "Low Stock Alert",
        message: `Found ${lowStockItems.length} items below minimum stock levels: ${lowStockItems
          .slice(0, 3)
          .map((item) => item.name)
          .join(", ")}${lowStockItems.length > 3 ? "..." : ""}`,
        duration: 8000,
      })
    } else {
      addToast({
        type: "success",
        title: "Stock Levels Good",
        message: "All items are above minimum stock levels",
      })
    }
  }

  const handleViewReports = () => {
    const totalItems = rawMaterials.length + finishedProducts.length
    const totalValue = [...rawMaterials, ...finishedProducts].reduce((sum, item) => sum + item.quantity * item.price, 0)

    addToast({
      type: "info",
      title: "Weekly Report Summary",
      message: `Revenue: $45,231.89 | Growth: +20.1% | Total Items: ${totalItems} | Inventory Value: $${totalValue.toFixed(
        2,
      )}`,
      duration: 10000,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening with your inventory.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rawMaterials.length + finishedProducts.length}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +180 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {[...rawMaterials, ...finishedProducts].filter((item) => item.quantity <= item.minStock).length}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              +3 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Your sales performance for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className={`mt-0.5 ${alert.type === "warning" ? "text-yellow-500" : "text-green-500"}`}>
                    {alert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you manage your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2" onClick={handleAddNewItem}>
              <Package className="h-6 w-6" />
              <span>Add New Item</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" onClick={handleCheckLowStock}>
              <AlertTriangle className="h-6 w-6" />
              <span>Check Low Stock</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" onClick={handleViewReports}>
              <TrendingUp className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
