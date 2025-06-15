"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { AlertTriangle, Clock, Shield, TrendingUp } from "lucide-react"

const alerts = [
  {
    id: "ALERT-001",
    timestamp: "2025-02-11 08:15:23",
    severity: "High",
    type: "ET DROP Spamhaus DROP Listed Traffic",
    source: "10.2.10.101",
    destination: "193.143.1.205",
    description: "Traffic from a known malicious IP",
    status: "Active",
  },
  {
    id: "ALERT-002",
    timestamp: "2025-02-11 09:22:15",
    severity: "Critical",
    type: "ET HUNTING WebDAV Retrieving .dll",
    source: "10.2.10.101",
    destination: "193.143.1.205",
    description: "Suspicious .dll download via WebDAV",
    status: "Active",
  },
  {
    id: "ALERT-003",
    timestamp: "2025-02-11 10:45:32",
    severity: "High",
    type: "ET INFO Windows PowerShell User-Agent Usage",
    source: "10.2.10.101",
    destination: "193.143.1.205",
    description: "PowerShell communicating with malicious IP",
    status: "Active",
  },
  {
    id: "ALERT-004",
    timestamp: "2025-02-11 11:18:47",
    severity: "High",
    type: "ET INFO PE EXE or DLL Windows File Download",
    source: "10.2.10.101",
    destination: "193.143.1.205",
    description: "Unusual PE file download",
    status: "Active",
  },
]

const severityData = [
  { severity: "Critical", count: 1, color: "#dc2626" },
  { severity: "High", count: 3, color: "#ea580c" },
  { severity: "Medium", count: 0, color: "#ca8a04" },
  { severity: "Low", count: 0, color: "#16a34a" },
]

const alertTrendData = [
  { hour: "08:00", alerts: 1 },
  { hour: "09:00", alerts: 1 },
  { hour: "10:00", alerts: 1 },
  { hour: "11:00", alerts: 1 },
  { hour: "12:00", alerts: 0 },
  { hour: "13:00", alerts: 0 },
  { hour: "14:00", alerts: 0 },
]

const alertTypeData = [
  { type: "Malicious Traffic", count: 2 },
  { type: "File Downloads", count: 2 },
  { type: "PowerShell Activity", count: 1 },
  { type: "Network Anomaly", count: 0 },
]

export default function SecurityAlerts() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Security Alerts</h1>
          <p className="text-sm text-muted-foreground">Suricata alerts and security events analysis</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  All active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-xs text-muted-foreground">WebDAV DLL download</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5m</div>
                <p className="text-xs text-muted-foreground">Detection to analysis</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Alert Severity Distribution</CardTitle>
                <CardDescription>Breakdown by severity level</CardDescription>
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
                        data={severityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="count"
                        label={({ severity, count }) => `${severity}: ${count}`}
                      >
                        {severityData.map((entry, index) => (
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
                <CardDescription>Alerts over time</CardDescription>
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
                      <XAxis dataKey="hour" />
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
                <CardTitle>Alert Categories</CardTitle>
                <CardDescription>Types of security events</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Count", color: "#ea580c" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={alertTypeData}>
                      <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} fontSize={10} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Security Alerts</CardTitle>
              <CardDescription>Detailed view of all security alerts from Suricata analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-mono">{alert.id}</TableCell>
                      <TableCell className="font-mono text-sm">{alert.timestamp}</TableCell>
                      <TableCell>
                        <Badge
                          variant={alert.severity === "Critical" ? "destructive" : "default"}
                          className={alert.severity === "High" ? "bg-orange-600" : ""}
                        >
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={alert.type}>
                        {alert.type}
                      </TableCell>
                      <TableCell className="font-mono">{alert.source}</TableCell>
                      <TableCell className="font-mono">{alert.destination}</TableCell>
                      <TableCell className="max-w-[250px] truncate" title={alert.description}>
                        {alert.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-red-600 border-red-600">
                          {alert.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Alert Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Suricata Detection Rules</CardTitle>
              <CardDescription>Custom rules for enhanced detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium mb-2">Block Spamhaus DROP-listed IPs</h4>
                  <code className="text-sm bg-gray-100 p-2 rounded block overflow-x-auto">
                    alert ip [193.143.1.205] any -&gt; $HOME_NET any (msg:"ET DROP Known Malicious IP (Spamhaus)";
                    flow:to_server; reference:url,spamhaus.org/drop; sid:1000001; rev:1;)
                  </code>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium mb-2">Detect WebDAV DLL Retrieval</h4>
                  <code className="text-sm bg-gray-100 p-2 rounded block overflow-x-auto">
                    alert http $HOME_NET any -&gt; $EXTERNAL_NET any (msg:"ET HUNTING WebDAV DLL Download"; http.method;
                    content:"PROPFIND"; http.uri; content:".dll"; nocase; sid:1000002; rev:1;)
                  </code>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium mb-2">Detect Suspicious PowerShell Traffic</h4>
                  <code className="text-sm bg-gray-100 p-2 rounded block overflow-x-auto">
                    alert tcp $HOME_NET any -&gt; $EXTERNAL_NET any (msg:"ET INFO PowerShell C2 Communication";
                    flow:established; content:"User-Agent: PowerShell"; sid:1000003; rev:1;)
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
