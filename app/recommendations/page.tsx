"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { CheckCircle, Clock, AlertTriangle, Shield } from "lucide-react"

const immediateActions = [
  {
    action: "Isolate compromised host (10.2.10.101)",
    priority: "Critical",
    timeframe: "Immediate",
    status: "Pending",
    impact: "Prevent lateral movement",
    effort: "Low",
  },
  {
    action: "Block malicious IP (193.143.1.205)",
    priority: "Critical",
    timeframe: "Immediate",
    status: "Pending",
    impact: "Stop C2 communication",
    effort: "Low",
  },
  {
    action: "Review PowerShell execution policies",
    priority: "High",
    timeframe: "1 hour",
    status: "Pending",
    impact: "Prevent script abuse",
    effort: "Medium",
  },
  {
    action: "Scan for malicious DLL/EXE files",
    priority: "High",
    timeframe: "2 hours",
    status: "Pending",
    impact: "Identify additional threats",
    effort: "Medium",
  },
]

const longTermActions = [
  {
    action: "Implement network segmentation",
    priority: "High",
    timeframe: "1 week",
    status: "Planning",
    impact: "Limit attack spread",
    effort: "High",
  },
  {
    action: "Deploy advanced endpoint protection",
    priority: "High",
    timeframe: "2 weeks",
    status: "Planning",
    impact: "Better threat detection",
    effort: "Medium",
  },
  {
    action: "Enhance PowerShell logging",
    priority: "Medium",
    timeframe: "1 week",
    status: "Planning",
    impact: "Improved visibility",
    effort: "Low",
  },
  {
    action: "Update Suricata rules",
    priority: "Medium",
    timeframe: "3 days",
    status: "Planning",
    impact: "Enhanced detection",
    effort: "Low",
  },
]

const priorityDistribution = [
  { priority: "Critical", count: 2, color: "#dc2626" },
  { priority: "High", count: 4, color: "#ea580c" },
  { priority: "Medium", count: 2, color: "#ca8a04" },
  { priority: "Low", count: 0, color: "#16a34a" },
]

const effortDistribution = [
  { effort: "Low", count: 4, color: "#16a34a" },
  { effort: "Medium", count: 3, color: "#ca8a04" },
  { effort: "High", count: 1, color: "#dc2626" },
]

const implementationTimeline = [
  { timeframe: "Immediate", actions: 2 },
  { timeframe: "1 hour", actions: 1 },
  { timeframe: "2 hours", actions: 1 },
  { timeframe: "3 days", actions: 1 },
  { timeframe: "1 week", actions: 2 },
  { timeframe: "2 weeks", actions: 1 },
]

export default function Recommendations() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Security Recommendations</h1>
          <p className="text-sm text-muted-foreground">Action items, mitigation strategies, and security improvements</p>
        </div>
      </header>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Recommended actions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-xs text-muted-foreground">Immediate action required</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Shield className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-muted-foreground">Actions completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Est. Timeline</CardTitle>
                <Clock className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 weeks</div>
                <p className="text-xs text-muted-foreground">Full implementation</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
                <CardDescription>Actions by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    critical: { label: "Critical", color: "#dc2626" },
                    high: { label: "High", color: "#ea580c" },
                    medium: { label: "Medium", color: "#ca8a04" },
                    low: { label: "Low", color: "#16a34a" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityDistribution.filter(p => p.count > 0)}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="count"
                        label={({ priority, count }) => `${priority}: ${count}`}
                      >
                        {priorityDistribution.filter(p => p.count > 0).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Effort</CardTitle>
                <CardDescription>Actions by required effort</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Count", color: "#ea580c" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={effortDistribution}>
                      <XAxis dataKey="effort" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#ea580c"\
