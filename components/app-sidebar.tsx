"use client"

import type * as React from "react"
import { Upload, FileText, TrendingUp, Calendar, Settings, Shield, Building2, MessageSquare } from "lucide-react"
import type { ActiveView } from "./dashboard-router"

import { NavMain } from "./nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: ActiveView
  onViewChange: (view: ActiveView) => void
}

export function AppSidebar({ activeView, onViewChange, ...props }: AppSidebarProps) {
  // Navigation data for UBS regulatory dashboard
  const data = {
    navMain: [
      {
        title: "Document Upload",
        url: "#",
        icon: Upload,
        isActive: true,
        items: [
          {
            title: "Upload New Documents",
            url: "#",
            view: "upload" as ActiveView,
          },
          {
            title: "Processing Status",
            url: "#",
          },
        ],
      },
      {
        title: "Summary View",
        url: "#",
        icon: FileText,
        items: [
          {
            title: "Executive Summary",
            url: "#",
            view: "summary" as ActiveView,
          },
          {
            title: "Key Insights",
            url: "#",
          },
        ],
      },
      {
        title: "Impact Analysis",
        url: "#",
        icon: TrendingUp,
        items: [
          {
            title: "Regulatory Impact",
            url: "#",
            view: "impact" as ActiveView,
          },
          {
            title: "Business Impact",
            url: "#",
          },
        ],
      },
      {
        title: "Timeline Management",
        url: "#",
        icon: Calendar,
        items: [
          {
            title: "Implementation Timeline",
            url: "#",
            view: "timeline" as ActiveView,
          },
          {
            title: "Milestone View",
            url: "#",
          },
          {
            title: "Calendar View",
            url: "#",
          },
        ],
      },
      {
        title: "AI Assistant",
        url: "#",
        icon: MessageSquare,
        items: [
          {
            title: "Chat with Cases",
            url: "#",
            view: "chat" as ActiveView,
          },
          {
            title: "Ask Questions",
            url: "#",
          },
        ],
      },
    ],
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <button onClick={() => onViewChange("dashboard")} className="flex items-center gap-2 w-full">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DeepRegAI</span>
                  <span className="truncate text-xs text-muted-foreground">Regulatory Analysis</span>
                </div>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} activeView={activeView} onViewChange={onViewChange} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Shield className="size-4" />
              <span>Compliance Center</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="size-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
