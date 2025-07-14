"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Globe, Moon, Sun, Shield, Database, Download, Upload, Trash2, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [settings, setSettings] = useState({
    notifications: {
      lowStock: true,
      newReceipts: true,
      weeklyReports: false,
      systemUpdates: true,
    },
    language: "en",
    currency: "USD",
    timezone: "UTC",
    autoBackup: true,
    twoFactor: false,
  })

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    company: "",
    address: "",
    website: "",
  })

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = () => {
    // Save profile changes
    alert("Profile updated successfully!")
  }

  const handleExportData = () => {
    // Export user data
    alert("Data export started. You will receive an email when ready.")
  }

  const handleImportData = () => {
    // Import data
    alert("Please select a file to import")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion process initiated.")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>Update your personal information and business details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profile.name} onChange={(e) => handleProfileChange("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => handleProfileChange("company", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleProfileChange("address", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) => handleProfileChange("website", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <Button onClick={handleSaveProfile}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Language & Region</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="2fa">Two-Factor Auth</Label>
                  <p className="text-sm text-gray-500">Add extra security</p>
                </div>
                <Switch
                  id="2fa"
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) => handleSettingChange("", "twoFactor", checked)}
                />
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lowStock">Low Stock Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when items are running low</p>
                </div>
                <Switch
                  id="lowStock"
                  checked={settings.notifications.lowStock}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "lowStock", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newReceipts">New Receipts</Label>
                  <p className="text-sm text-gray-500">Notifications for processed receipts</p>
                </div>
                <Switch
                  id="newReceipts"
                  checked={settings.notifications.newReceipts}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "newReceipts", checked)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReports">Weekly Reports</Label>
                  <p className="text-sm text-gray-500">Summary of your inventory performance</p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "weeklyReports", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="systemUpdates">System Updates</Label>
                  <p className="text-sm text-gray-500">Important app updates and features</p>
                </div>
                <Switch
                  id="systemUpdates"
                  checked={settings.notifications.systemUpdates}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "systemUpdates", checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Data Management</span>
          </CardTitle>
          <CardDescription>Manage your data and account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Auto Backup</Label>
                <p className="text-xs text-gray-500">Daily backups</p>
              </div>
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange("", "autoBackup", checked)}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              These actions are irreversible. Please proceed with caution.
            </p>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
