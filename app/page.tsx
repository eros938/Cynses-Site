"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Shield, Server, Bug, TrendingUp } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts"

const threatLevelData = [
  { name: "Critical", value: 2, color: "#dc2626" },
  { name: "High", value: 4, color: "#ea580c" },
  { name: "Medium", value: 1, color: "#ca8a04" },
  { name: "Low", value: 0, color: "#16a34a" },
]

const alertTrendData = [
  { time: "00:00", alerts: 2 },
  { time: "04:00", alerts: 1 },
  { time: "08:00", alerts: 4 },
  { time: "12:00", alerts: 3 },
  { time: "16:00", alerts: 2 },
  { time: "20:00", alerts: 1 },
]

const topThreatsData = [
  { threat: "Malicious IP Communication", count: 15 },
  { threat: "Suspicious DLL Downloads", count: 8 },
  { threat: "PowerShell Abuse", count: 6 },
  { threat: "PE File Anomalies", count: 4 },
]

export default function ExecutiveDashboard() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Executive Dashboard</h1>
          <p className="text-sm text-muted-foreground">PCAP Analysis Security Report - 2025-02-11</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Critical Alert */}
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Critical Security Incident Detected</AlertTitle>
            <AlertDescription className="text-red-700">
              Multiple high-severity security events detected. Host 10.2.10.101 shows signs of compromise.
              <Badge variant="destructive" className="ml-2">
                IMMEDIATE ACTION REQUIRED
              </Badge>
            </AlertDescription>
          </Alert>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threat Level</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">HIGH</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  Elevated from Medium
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +3 from last analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Affected Hosts</CardTitle>
                <Server className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">10.2.10.101 compromised</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Malicious IPs</CardTitle>
                <Bug className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">193.143.1.205 (Spamhaus)</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Threat Severity Distribution</CardTitle>
                <CardDescription>Breakdown of security alerts by severity level</CardDescription>
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
                      <Pie data={threatLevelData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                        {threatLevelData.map((entry, index) => (
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
                <CardTitle>Alert Timeline</CardTitle>
                <CardDescription>Security alerts over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    alerts: { label: "Alerts", color: "#dc2626" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={alertTrendData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="alerts" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Threats</CardTitle>
                <CardDescription>Most frequent security events</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Count", color: "#ea580c" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topThreatsData} layout="horizontal">
                      <XAxis type="number" />
                      <YAxis dataKey="threat" type="category" width={100} fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="destructive">Critical</Badge>
                  <div>
                    <p className="font-medium">Malicious IP Communication</p>
                    <p className="text-sm text-muted-foreground">
                      Host 10.2.10.101 ↔ 193.143.1.205 (Spamhaus DROP-listed)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="destructive">Critical</Badge>
                  <div>
                    <p className="font-medium">Suspicious DLL Downloads</p>
                    <p className="text-sm text-muted-foreground">Multiple .dll requests via WebDAV and HTTP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-600">High</Badge>
                  <div>
                    <p className="font-medium">PowerShell Abuse</p>
                    <p className="text-sm text-muted-foreground">PowerShell traffic to malicious IP detected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Immediate Actions Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                  <p className="text-sm">Isolate host 10.2.10.101 immediately</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                  <p className="text-sm">Block IP 193.143.1.205 at firewall</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
                  <p className="text-sm">Review PowerShell execution policies</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
                  <p className="text-sm">Scan for malicious DLL/EXE files</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
