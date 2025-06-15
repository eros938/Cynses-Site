"use client"

import { Shield, AlertTriangle, Network, Target, Server, Bug, CheckCircle, Home, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Executive Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Threat Intelligence",
    url: "/threat-intelligence",
    icon: Shield,
  },
  {
    title: "Security Alerts",
    url: "/security-alerts",
    icon: AlertTriangle,
  },
  {
    title: "Network Analysis",
    url: "/network-analysis",
    icon: Network,
  },
  {
    title: "MITRE ATT&CK",
    url: "/mitre-attack",
    icon: Target,
  },
  {
    title: "Host Analysis",
    url: "/host-analysis",
    icon: Server,
  },
  {
    title: "Malware Analysis",
    url: "/malware-analysis",
    icon: Bug,
  },
  {
    title: "Recommendations",
    url: "/recommendations",
    icon: CheckCircle,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <Shield className="h-6 w-6 text-red-600" />
          <div>
            <h2 className="text-lg font-semibold">Cynses AI</h2>
            <p className="text-xs text-muted-foreground">Choking eyes.</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
