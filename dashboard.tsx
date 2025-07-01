"use client"

import { useState } from "react"
import { AppSidebar } from "./components/app-sidebar"
import { DashboardRouter, type ActiveView } from "./components/dashboard-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const viewTitles: Record<ActiveView, string> = {
  dashboard: "Dashboard",
  upload: "Upload New Documents",
  summary: "Summary View",
  impact: "Impact Analysis",
  timeline: "Timeline Management",
  chat: "AI Assistant",
}

export default function UBSRegulatoryDashboard() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")

  return (
    <SidebarProvider>
      <AppSidebar activeView={activeView} onViewChange={setActiveView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">UBS Regulatory Analysis</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{viewTitles[activeView]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <DashboardRouter activeView={activeView} />
      </SidebarInset>
    </SidebarProvider>
  )
}
