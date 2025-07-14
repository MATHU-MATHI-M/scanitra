"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scan,
  Mic,
  BarChart3,
  MessageSquare,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Cloud,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: <Scan className="h-8 w-8" />,
      title: "Smart Receipt Scanning",
      description: "Instantly digitize receipts with AI-powered OCR technology",
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Entry",
      description: "Add inventory items naturally using voice commands",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-time Analytics",
      description: "Track sales, inventory levels, and business insights",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI Assistant",
      description: "Get intelligent recommendations and business insights",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Enterprise-grade security for your business data",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized for mobile with offline capabilities",
    },
  ]

  const benefits = [
    "Reduce manual data entry by 90%",
    "Real-time inventory tracking",
    "AI-powered business insights",
    "Mobile-first design",
    "Offline functionality",
    "Multi-language support",
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Scan className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scanitra
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 Now Available as PWA
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Smart Inventory
          <br />
          Management
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Transform your business with AI-powered inventory tracking, voice commands, and intelligent insights. Built
          for the modern mobile-first world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage your inventory efficiently and grow your business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="text-blue-600 dark:text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Scanitra?</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Mobile First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Optimized for touch</p>
            </Card>
            <Card className="p-6 text-center">
              <Cloud className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Cloud Sync</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Always up to date</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Team Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Multi-user support</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Enterprise grade</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already using Scanitra to streamline their operations
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>&copy; 2024 Scanitra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
