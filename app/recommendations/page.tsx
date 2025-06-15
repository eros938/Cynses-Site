"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
          <p className="text-sm text-muted-foreground">
            Action items, mitigation strategies, and security improvements
          </p>
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
                        data={priorityDistribution.filter((p) => p.count > 0)}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="count"
                        label={({ priority, count }) => `${priority}: ${count}`}
                      >
                        {priorityDistribution
                          .filter((p) => p.count > 0)
                          .map((entry, index) => (
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
                      <Bar dataKey="count" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Timeline</CardTitle>
                <CardDescription>Actions by timeframe</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    actions: { label: "Actions", color: "#6366f1" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={implementationTimeline}>
                      <XAxis dataKey="timeframe" angle={-45} textAnchor="end" height={80} fontSize={10} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="actions" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Immediate Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Immediate Actions Required</CardTitle>
              <CardDescription>Critical and high-priority actions that need immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Timeframe</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Effort</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {immediateActions.map((action, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[300px]">{action.action}</TableCell>
                      <TableCell>
                        <Badge
                          variant={action.priority === "Critical" ? "destructive" : "default"}
                          className={action.priority === "High" ? "bg-orange-600" : ""}
                        >
                          {action.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{action.timeframe}</TableCell>
                      <TableCell className="max-w-[200px]">{action.impact}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            action.effort === "Low"
                              ? "text-green-600 border-green-600"
                              : action.effort === "Medium"
                                ? "text-yellow-600 border-yellow-600"
                                : "text-red-600 border-red-600"
                          }
                        >
                          {action.effort}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-red-600 border-red-600">
                          {action.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Long-term Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Long-term Security Improvements</CardTitle>
              <CardDescription>Strategic actions to improve overall security posture</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Timeframe</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Effort</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {longTermActions.map((action, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-[300px]">{action.action}</TableCell>
                      <TableCell>
                        <Badge
                          variant={action.priority === "High" ? "default" : "outline"}
                          className={
                            action.priority === "High"
                              ? "bg-orange-600"
                              : action.priority === "Medium"
                                ? "bg-yellow-600"
                                : ""
                          }
                        >
                          {action.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{action.timeframe}</TableCell>
                      <TableCell className="max-w-[200px]">{action.impact}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            action.effort === "Low"
                              ? "text-green-600 border-green-600"
                              : action.effort === "Medium"
                                ? "text-yellow-600 border-yellow-600"
                                : "text-red-600 border-red-600"
                          }
                        >
                          {action.effort}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          {action.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Security Policies */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Security Policies</CardTitle>
                <CardDescription>Policy updates to prevent similar incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">PowerShell Execution Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement constrained language mode and require script signing
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">WebDAV Access Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Disable WebDAV if not required, or implement strict access controls
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">Application Whitelisting</h4>
                    <p className="text-sm text-muted-foreground">
                      Only allow approved applications to execute on endpoints
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">Network Segmentation</h4>
                    <p className="text-sm text-muted-foreground">Isolate critical systems and limit lateral movement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detection & Monitoring Enhancements</CardTitle>
                <CardDescription>Improvements to security monitoring capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium">Enhanced Logging</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed PowerShell and process execution logging
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium">Behavioral Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Deploy tools to detect unusual process and network behavior
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium">Threat Intelligence Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Integrate multiple threat intelligence feeds for better detection
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium">Automated Response</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement SOAR capabilities for faster incident response
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Roadmap</CardTitle>
              <CardDescription>Phased approach to implementing security improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Phase 1: Immediate Response (0-24 hours)</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Isolate compromised host</li>
                      <li>• Block malicious IP addresses</li>
                      <li>• Conduct initial forensic analysis</li>
                      <li>• Review and restrict PowerShell policies</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Phase 2: Short-term Improvements (1-4 weeks)</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Update Suricata detection rules</li>
                      <li>• Enhance PowerShell logging</li>
                      <li>• Deploy additional endpoint protection</li>
                      <li>• Implement network monitoring improvements</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Phase 3: Long-term Strategy (1-6 months)</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Implement comprehensive network segmentation</li>
                      <li>• Deploy advanced threat detection platforms</li>
                      <li>• Establish security awareness training program</li>
                      <li>• Regular security assessments and penetration testing</li>
                    </ul>
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
