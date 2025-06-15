"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Target, Shield, AlertTriangle, Activity } from "lucide-react"

const mitreMapping = [
  {
    tactic: "Initial Access",
    technique: "T1071.001",
    techniqueName: "Application Layer Protocol: Web Protocols",
    description: "Malicious HTTP traffic",
    evidence: "HTTP requests to 193.143.1.205",
    confidence: "High",
  },
  {
    tactic: "Execution",
    technique: "T1059.001",
    techniqueName: "Command and Scripting Interpreter: PowerShell",
    description: "Suspicious PowerShell usage",
    evidence: "PowerShell User-Agent in HTTP requests",
    confidence: "High",
  },
  {
    tactic: "Persistence",
    technique: "T1021.002",
    techniqueName: "Remote Services: SMB/Windows Admin Shares",
    description: "DLL deployment via WebDAV",
    evidence: "WebDAV PROPFIND requests for .dll files",
    confidence: "Medium",
  },
  {
    tactic: "Defense Evasion",
    technique: "T1140",
    techniqueName: "Deobfuscate/Decode Files or Information",
    description: "Non-standard PE file characteristics",
    evidence: "PE files with unusual ASLR/DEP settings",
    confidence: "Medium",
  },
]

const tacticDistribution = [
  { tactic: "Initial Access", count: 1, color: "#dc2626" },
  { tactic: "Execution", count: 1, color: "#ea580c" },
  { tactic: "Persistence", count: 1, color: "#ca8a04" },
  { tactic: "Defense Evasion", count: 1, color: "#16a34a" },
  { tactic: "Discovery", count: 0, color: "#6366f1" },
  { tactic: "Collection", count: 0, color: "#8b5cf6" },
]

const confidenceData = [
  { level: "High", count: 2, color: "#dc2626" },
  { level: "Medium", count: 2, color: "#ca8a04" },
  { level: "Low", count: 0, color: "#16a34a" },
]

const killChainData = [
  { phase: "Reconnaissance", techniques: 0 },
  { phase: "Weaponization", techniques: 0 },
  { phase: "Delivery", techniques: 1 },
  { phase: "Exploitation", techniques: 1 },
  { phase: "Installation", techniques: 1 },
  { phase: "Command & Control", techniques: 1 },
  { phase: "Actions on Objectives", techniques: 0 },
]

export default function MitreAttack() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">MITRE ATT&CK Analysis</h1>
          <p className="text-sm text-muted-foreground">Tactics, techniques, and procedures mapping</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tactics Identified</CardTitle>
                <Target className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Across attack lifecycle</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Techniques Mapped</CardTitle>
                <Shield className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">High confidence mapping</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Confidence</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Strong evidence found</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attack Maturity</CardTitle>
                <Activity className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">Intermediate level</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Tactic Distribution</CardTitle>
                <CardDescription>MITRE ATT&CK tactics identified</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    initial: { label: "Initial Access", color: "#dc2626" },
                    execution: { label: "Execution", color: "#ea580c" },
                    persistence: { label: "Persistence", color: "#ca8a04" },
                    evasion: { label: "Defense Evasion", color: "#16a34a" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tacticDistribution.filter((t) => t.count > 0)}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="count"
                        label={({ tactic }) => tactic}
                      >
                        {tacticDistribution
                          .filter((t) => t.count > 0)
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
                <CardTitle>Confidence Levels</CardTitle>
                <CardDescription>Evidence confidence assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    high: { label: "High", color: "#dc2626" },
                    medium: { label: "Medium", color: "#ca8a04" },
                    low: { label: "Low", color: "#16a34a" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={confidenceData}>
                      <XAxis dataKey="level" />
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
                <CardTitle>Kill Chain Coverage</CardTitle>
                <CardDescription>Cyber kill chain phase analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    techniques: { label: "Techniques", color: "#6366f1" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={killChainData} layout="horizontal">
                      <XAxis type="number" />
                      <YAxis dataKey="phase" type="category" width={80} fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="techniques" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* MITRE ATT&CK Mapping Table */}
          <Card>
            <CardHeader>
              <CardTitle>MITRE ATT&CK Technique Mapping</CardTitle>
              <CardDescription>Detailed mapping of observed activities to MITRE ATT&CK framework</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tactic</TableHead>
                    <TableHead>Technique ID</TableHead>
                    <TableHead>Technique Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Evidence</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mitreMapping.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant="outline">{item.tactic}</Badge>
                      </TableCell>
                      <TableCell className="font-mono">{item.technique}</TableCell>
                      <TableCell className="max-w-[200px]">{item.techniqueName}</TableCell>
                      <TableCell className="max-w-[200px]">{item.description}</TableCell>
                      <TableCell className="max-w-[250px] text-sm">{item.evidence}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.confidence === "High" ? "destructive" : "default"}
                          className={item.confidence === "Medium" ? "bg-yellow-600" : ""}
                        >
                          {item.confidence}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Attack Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Attack Timeline & Progression</CardTitle>
              <CardDescription>Chronological view of attack techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive">T1071.001</Badge>
                      <span className="font-medium">Initial Access</span>
                      <span className="text-sm text-muted-foreground">08:15:23</span>
                    </div>
                    <p className="text-sm">Malicious HTTP communication established with 193.143.1.205</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-orange-600">T1059.001</Badge>
                      <span className="font-medium">Execution</span>
                      <span className="text-sm text-muted-foreground">10:45:32</span>
                    </div>
                    <p className="text-sm">PowerShell execution detected via User-Agent analysis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-yellow-600">T1021.002</Badge>
                      <span className="font-medium">Persistence</span>
                      <span className="text-sm text-muted-foreground">09:22:15</span>
                    </div>
                    <p className="text-sm">WebDAV used for DLL deployment and potential persistence</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-green-600">T1140</Badge>
                      <span className="font-medium">Defense Evasion</span>
                      <span className="text-sm text-muted-foreground">11:18:47</span>
                    </div>
                    <p className="text-sm">PE files with unusual characteristics to evade detection</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Detection Opportunities</CardTitle>
                <CardDescription>Areas for improved detection coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">PowerShell Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Enhanced logging of PowerShell execution and network activity
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">WebDAV Traffic Analysis</h4>
                    <p className="text-sm text-muted-foreground">Monitor for unusual WebDAV PROPFIND requests</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">PE File Analysis</h4>
                    <p className="text-sm text-muted-foreground">Automated analysis of downloaded executables</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mitigation Strategies</CardTitle>
                <CardDescription>Recommended defensive measures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium">Application Whitelisting</h4>
                    <p className="text-sm text-muted-foreground">Prevent unauthorized executable execution</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium">Network Segmentation</h4>
                    <p className="text-sm text-muted-foreground">Limit lateral movement capabilities</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium">PowerShell Restrictions</h4>
                    <p className="text-sm text-muted-foreground">Implement constrained language mode</p>
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
