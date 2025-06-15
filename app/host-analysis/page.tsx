"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { Server, AlertTriangle, Activity, Shield } from "lucide-react"

const hostData = [
  {
    ip: "10.2.10.101",
    hostname: "WORKSTATION-01",
    os: "Windows 10",
    riskLevel: "Critical",
    lastSeen: "2025-02-11 14:32:17",
    threats: 4,
    connections: 89,
    status: "Compromised",
  },
]

const hostActivityData = [
  { time: "08:00", connections: 5, threats: 0 },
  { time: "09:00", connections: 12, threats: 1 },
  { time: "10:00", connections: 18, threats: 1 },
  { time: "11:00", connections: 25, threats: 1 },
  { time: "12:00", connections: 15, threats: 1 },
  { time: "13:00", connections: 8, threats: 0 },
  { time: "14:00", connections: 6, threats: 0 },
]

const processActivityData = [
  { process: "powershell.exe", connections: 15, suspicious: true },
  { process: "svchost.exe", connections: 25, suspicious: false },
  { process: "explorer.exe", connections: 8, suspicious: false },
  { process: "chrome.exe", connections: 12, suspicious: false },
]

const vulnerabilityData = [
  { category: "Missing Patches", count: 3, severity: "High" },
  { category: "Weak Configurations", count: 2, severity: "Medium" },
  { category: "Exposed Services", count: 1, severity: "High" },
  { category: "Outdated Software", count: 4, severity: "Medium" },
]

const riskDistribution = [
  { level: "Critical", count: 1, color: "#dc2626" },
  { level: "High", count: 0, color: "#ea580c" },
  { level: "Medium", count: 0, color: "#ca8a04" },
  { level: "Low", count: 0, color: "#16a34a" },
]

export default function HostAnalysis() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Host Analysis</h1>
          <p className="text-sm text-muted-foreground">Affected systems and security posture analysis</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Affected Hosts</CardTitle>
                <Server className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-xs text-muted-foreground">Compromised system</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">100%</div>
                <p className="text-xs text-muted-foreground">All hosts at critical risk</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                <Activity className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Per compromised host</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Isolation Status</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">Pending</div>
                <p className="text-xs text-muted-foreground">Requires immediate action</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Host Risk Distribution</CardTitle>
                <CardDescription>Risk levels across monitored hosts</CardDescription>
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
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="count"
                        label={({ level, count }) => (count > 0 ? `${level}: ${count}` : "")}
                      >
                        {riskDistribution.map((entry, index) => (
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
                <CardTitle>Host Activity Timeline</CardTitle>
                <CardDescription>Network activity and threat events</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    connections: { label: "Connections", color: "#16a34a" },
                    threats: { label: "Threats", color: "#dc2626" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hostActivityData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="connections" stroke="#16a34a" strokeWidth={2} />
                      <Line type="monotone" dataKey="threats" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Process Activity</CardTitle>
                <CardDescription>Network connections by process</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    connections: { label: "Connections", color: "#ea580c" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processActivityData}>
                      <XAxis dataKey="process" angle={-45} textAnchor="end" height={80} fontSize={10} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="connections" fill={(entry) => (entry.suspicious ? "#dc2626" : "#ea580c")} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Host Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>Compromised Host Details</CardTitle>
              <CardDescription>Detailed analysis of affected systems</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Hostname</TableHead>
                    <TableHead>Operating System</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Active Threats</TableHead>
                    <TableHead>Connections</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hostData.map((host) => (
                    <TableRow key={host.ip}>
                      <TableCell className="font-mono">{host.ip}</TableCell>
                      <TableCell>{host.hostname}</TableCell>
                      <TableCell>{host.os}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{host.riskLevel}</Badge>
                      </TableCell>
                      <TableCell>{host.threats}</TableCell>
                      <TableCell>{host.connections}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{host.status}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{host.lastSeen}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Vulnerability Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Host Vulnerability Assessment</CardTitle>
              <CardDescription>Security weaknesses identified on compromised host</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vulnerability Category</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vulnerabilityData.map((vuln, index) => (
                    <TableRow key={index}>
                      <TableCell>{vuln.category}</TableCell>
                      <TableCell>{vuln.count}</TableCell>
                      <TableCell>
                        <Badge
                          variant={vuln.severity === "High" ? "destructive" : "default"}
                          className={vuln.severity === "Medium" ? "bg-yellow-600" : ""}
                        >
                          {vuln.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {vuln.category === "Missing Patches" && "System vulnerable to known exploits"}
                        {vuln.category === "Weak Configurations" && "Insecure system settings"}
                        {vuln.category === "Exposed Services" && "Unnecessary network services running"}
                        {vuln.category === "Outdated Software" && "Legacy applications with vulnerabilities"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Forensic Evidence */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Forensic Artifacts</CardTitle>
                <CardDescription>Evidence of compromise found on host</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive">Critical</Badge>
                      <span className="font-medium">Malicious DLL Files</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Multiple suspicious .dll files downloaded via WebDAV
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive">Critical</Badge>
                      <span className="font-medium">PowerShell Execution</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Suspicious PowerShell activity with external C2</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-orange-600">High</Badge>
                      <span className="font-medium">Network Connections</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Connections to known malicious IP addresses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Immediate steps for host remediation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Immediate Isolation</p>
                      <p className="text-xs text-muted-foreground">Disconnect from network immediately</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Memory Dump</p>
                      <p className="text-xs text-muted-foreground">Capture system memory for analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Disk Imaging</p>
                      <p className="text-xs text-muted-foreground">Create forensic image of system drive</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Malware Analysis</p>
                      <p className="text-xs text-muted-foreground">Analyze downloaded DLL files</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">System Rebuild</p>
                      <p className="text-xs text-muted-foreground">Complete system reimaging required</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Configuration Analysis</CardTitle>
              <CardDescription>Security configuration assessment of compromised host</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Security Features</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Windows Defender</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Bypassed
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Firewall</span>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Partial
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>UAC</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Disabled
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>PowerShell Logging</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Insufficient
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Network Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Network Segmentation</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        None
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Proxy Configuration</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Bypassed
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>DNS Filtering</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Disabled
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Outbound Filtering</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Insufficient
                      </Badge>
                    </div>
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
