"use client"
import { DocumentUpload } from "./document-upload"
import { DashboardContent } from "./dashboard-content"
import { ExecutiveSummaryView } from "./executive-summary"
import { RegulatoryImpactAnalysis } from "./regulatory-impact-analysis"
import { ImplementationTimeline } from "./implementation-timeline"
import { RegulatoryChat } from "./regulatory-chat"

export type ActiveView = "dashboard" | "upload" | "summary" | "impact" | "timeline" | "chat"

interface DashboardRouterProps {
  activeView: ActiveView
}

export function DashboardRouter({ activeView }: DashboardRouterProps) {
  switch (activeView) {
    case "upload":
      return <DocumentUpload />
    case "summary":
      return <ExecutiveSummaryView />
    case "impact":
      return <RegulatoryImpactAnalysis />
    case "timeline":
      return <ImplementationTimeline />
    case "chat":
      return <RegulatoryChat />
    default:
      return <DashboardContent />
  }
}
