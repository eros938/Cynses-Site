"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Network, Activity, Globe, Server } from "lucide-react"

const protocolData = [
  { protocol: "HTTP", packets: 45, bytes: 125000, color: "#dc2626" },
  { protocol: "HTTPS", packets: 12, bytes: 35000, color: "#ea580c" },
  { protocol: "WebDAV", packets: 8, bytes: 28000, color: "#ca8a04" },
  { protocol: "TCP", packets: 156, bytes: 450000, color: "#16a34a" },
]

const trafficFlowData = [
  { time: "08:00", inbound: 25, outbound: 45 },
  { time: "09:00", inbound: 30, outbound: 52 },
  { time: "10:00", inbound: 28, outbound: 48 },
  { time: "11:00", inbound: 35, outbound: 65 },
  { time: "12:00", inbound: 20, outbound: 30 },
  { time: "13:00", inbound: 15, outbound: 25 },
  { time: "14:00", inbound: 18, outbound: 32 },
]

const topConnectionsData = [
  { connection: "10.2.10.101 → 193.143.1.205", packets: 89, bytes: 245000, protocol: "HTTP/WebDAV" },
  { connection: "10.2.10.101 → 8.8.8.8", packets: 12, bytes: 3500, protocol: "DNS" },
  { connection: "10.2.10.101 → 10.2.10.1", packets: 45, bytes: 12000, protocol: "DHCP" },
]

const portAnalysisData = [
  { port: "80 (HTTP)", connections: 35, status: "Suspicious" },
  { port: "443 (HTTPS)", connections: 12, status: "Normal" },
  { port: "53 (DNS)", connections: 8, status: "Normal" },
  { port: "445 (SMB)", connections: 0, status: "Blocked" },
]

const geolocationData = [
  { country: "Internal", connections: 45, color: "#16a34a" },
  { country: "Unknown", connections: 89, color: "#dc2626" },
  { country: "United States", connections: 12, color: "#ea580c" },
]

export default function NetworkAnalysis() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Network Analysis</h1>
          <p className="text-sm text-muted-foreground">Protocol analysis, traffic patterns, and network behavior</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Packets</CardTitle>
                <Network className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">221</div>
                <p className="text-xs text-muted-foreground">Analyzed packets</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Volume</CardTitle>
                <Activity className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">638KB</div>
                <p className="text-xs text-muted-foreground">Total traffic analyzed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique IPs</CardTitle>
                <Globe className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">1 malicious detected</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protocols</CardTitle>
                <Server className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">HTTP, HTTPS, WebDAV, TCP</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Protocol Distribution</CardTitle>
                <CardDescription>Network traffic by protocol</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    http: { label: "HTTP", color: "#dc2626" },
                    https: { label: "HTTPS", color: "#ea580c" },
                    webdav: { label: "WebDAV", color: "#ca8a04" },
                    tcp: { label: "TCP", color: "#16a34a" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={protocolData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="packets"
                        label={({ protocol, packets }) => `${protocol}: ${packets}`}
                      >
                        {protocolData.map((entry, index) => (
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
                <CardTitle>Traffic Flow Timeline</CardTitle>
                <CardDescription>Inbound vs outbound traffic</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    inbound: { label: "Inbound", color: "#16a34a" },
                    outbound: { label: "Outbound", color: "#dc2626" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficFlowData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="inbound" stroke="#16a34a" strokeWidth={2} />
                      <Line type="monotone" dataKey="outbound" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Connections by location</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    connections: { label: "Connections", color: "#ea580c" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geolocationData}>
                      <XAxis dataKey="country" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="connections" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Network Connections Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Network Connections</CardTitle>
              <CardDescription>Most active network connections identified in the PCAP</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Connection</TableHead>
                    <TableHead>Packets</TableHead>
                    <TableHead>Bytes</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topConnectionsData.map((conn, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{conn.connection}</TableCell>
                      <TableCell>{conn.packets}</TableCell>
                      <TableCell>{conn.bytes.toLocaleString()}</TableCell>
                      <TableCell>{conn.protocol}</TableCell>
                      <TableCell>
                        <Badge variant={conn.connection.includes("193.143.1.205") ? "destructive" : "outline"}>
                          {conn.connection.includes("193.143.1.205") ? "High Risk" : "Normal"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Port Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Port Analysis</CardTitle>
                <CardDescription>Network ports and their usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Port</TableHead>
                      <TableHead>Connections</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portAnalysisData.map((port, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">{port.port}</TableCell>
                        <TableCell>{port.connections}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              port.status === "Suspicious"
                                ? "destructive"
                                : port.status === "Blocked"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {port.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Anomalies</CardTitle>
                <CardDescription>Unusual network behavior detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Critical</Badge>
                      <span className="font-medium">WebDAV PROPFIND Requests</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Unusual WebDAV requests for .dll files detected
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-600">High</Badge>
                      <span className="font-medium">PowerShell User-Agent</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">PowerShell HTTP requests to external IP</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-600">High</Badge>
                      <span className="font-medium">Unusual PE Downloads</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Executable files with anomalous characteristics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Protocol Details */}
          <Card>
            <CardHeader>
              <CardTitle>Protocol Analysis Details</CardTitle>
              <CardDescription>Detailed breakdown of network protocols and their characteristics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">HTTP Traffic Analysis</h4>
                  <div className="text-sm space-y-1">
                    <p>• Multiple .dll file requests detected</p>
                    <p>• Requests to malicious IP 193.143.1.205</p>
                    <p>• Unusual User-Agent strings (PowerShell)</p>
                    <p>• Non-standard HTTP methods (PROPFIND)</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">WebDAV Activity</h4>
                  <div className="text-sm space-y-1">
                    <p>• PROPFIND requests for .dll files</p>
                    <p>• Potential malware delivery mechanism</p>
                    <p>• Originated from compromised host</p>
                    <p>• Targeting external malicious server</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
