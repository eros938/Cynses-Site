"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Shield, Globe, AlertTriangle, Target } from "lucide-react"

const maliciousIPs = [
  {
    ip: "193.143.1.205",
    reputation: "Spamhaus DROP",
    country: "Unknown",
    firstSeen: "2025-02-11 08:15:23",
    lastSeen: "2025-02-11 14:32:17",
    threatType: "Malware C&C",
    confidence: "High",
    activities: ["DLL Downloads", "PowerShell C2", "WebDAV Requests"],
  },
]

const iocData = [
  { type: "IP Addresses", count: 1, color: "#dc2626" },
  { type: "File Hashes", count: 3, color: "#ea580c" },
  { type: "Domains", count: 0, color: "#ca8a04" },
  { type: "URLs", count: 4, color: "#16a34a" },
]

const threatActorData = [
  { actor: "Unknown APT", confidence: 65, techniques: 4 },
  { actor: "Commodity Malware", confidence: 85, techniques: 6 },
  { actor: "Script Kiddie", confidence: 25, techniques: 2 },
]

const geolocationData = [
  { country: "Unknown", threats: 1, color: "#dc2626" },
  { country: "Russia", threats: 0, color: "#ea580c" },
  { country: "China", threats: 0, color: "#ca8a04" },
  { country: "North Korea", threats: 0, color: "#16a34a" },
]

export default function ThreatIntelligence() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Threat Intelligence</h1>
          <p className="text-sm text-muted-foreground">IOCs, threat actors, and intelligence analysis</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Malicious IPs</CardTitle>
                <Globe className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Spamhaus DROP-listed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">IOCs Identified</CardTitle>
                <Target className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Across multiple categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threat Confidence</CardTitle>
                <Shield className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">High confidence level</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <AlertTriangle className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Ongoing malware campaign</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>IOC Distribution</CardTitle>
                <CardDescription>Types of indicators of compromise identified</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    ips: { label: "IP Addresses", color: "#dc2626" },
                    hashes: { label: "File Hashes", color: "#ea580c" },
                    domains: { label: "Domains", color: "#ca8a04" },
                    urls: { label: "URLs", color: "#16a34a" },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={iocData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {iocData.map((entry, index) => (
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
                <CardTitle>Threat Actor Assessment</CardTitle>
                <CardDescription>Confidence levels for potential threat actors</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    confidence: { label: "Confidence %", color: "#ea580c" },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={threatActorData}>
                      <XAxis dataKey="actor" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="confidence" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Malicious IPs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Malicious IP Analysis</CardTitle>
              <CardDescription>Detailed analysis of identified malicious IP addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Reputation Source</TableHead>
                    <TableHead>Threat Type</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>First Seen</TableHead>
                    <TableHead>Activities</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maliciousIPs.map((ip) => (
                    <TableRow key={ip.ip}>
                      <TableCell className="font-mono">{ip.ip}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{ip.reputation}</Badge>
                      </TableCell>
                      <TableCell>{ip.threatType}</TableCell>
                      <TableCell>
                        <Badge className="bg-red-600">{ip.confidence}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{ip.firstSeen}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {ip.activities.map((activity) => (
                            <Badge key={activity} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* IOC Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>File Hashes (IOCs)</CardTitle>
                <CardDescription>Suspicious file signatures detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-mono text-sm">SHA256: a1b2c3d4e5f6...</p>
                    <p className="text-xs text-muted-foreground mt-1">Suspicious DLL file</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-mono text-sm">MD5: 1a2b3c4d5e6f...</p>
                    <p className="text-xs text-muted-foreground mt-1">PE executable anomaly</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-mono text-sm">SHA1: 9z8y7x6w5v4u...</p>
                    <p className="text-xs text-muted-foreground mt-1">WebDAV payload</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence Sources</CardTitle>
                <CardDescription>Intelligence feeds and reputation sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium">Spamhaus DROP</p>
                      <p className="text-xs text-muted-foreground">Malicious IP reputation</p>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium">VirusTotal</p>
                      <p className="text-xs text-muted-foreground">File hash analysis</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium">MISP</p>
                      <p className="text-xs text-muted-foreground">Threat sharing platform</p>
                    </div>
                    <Badge variant="outline">Configured</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
