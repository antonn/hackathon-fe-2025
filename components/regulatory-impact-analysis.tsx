"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Building2,
  Shield,
  CheckCircle,
  XCircle,
  Minus,
} from "lucide-react"
import { regulatoryImpactMockData, type DepartmentalImpact } from "../lib/regulatory-impact-data"
import { mockRegulatoryCases } from "../lib/mock-data"

export function RegulatoryImpactAnalysis() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("")
  const selectedCase = mockRegulatoryCases.find((c) => c.id === selectedCaseId)
  const impactData = regulatoryImpactMockData.find((d) => d.caseId === selectedCaseId)

  const getImpactColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getImpactIcon = (level: string) => {
    switch (level) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "medium":
        return <Minus className="h-5 w-5 text-amber-600" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Shield className="h-5 w-5 text-gray-600" />
    }
  }

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return "text-green-600"
    if (readiness >= 60) return "text-amber-600"
    if (readiness >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const DepartmentCard = ({ impact }: { impact: DepartmentalImpact }) => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{impact.department}</CardTitle>
            <CardDescription>{impact.function}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getImpactIcon(impact.impactLevel)}
            <Badge className={`capitalize ${getImpactColor(impact.impactLevel)}`}>{impact.impactLevel}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{impact.description}</p>

        {/* Readiness Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Readiness</span>
            <span className={`text-sm font-bold ${getReadinessColor(impact.currentReadiness)}`}>
              {impact.currentReadiness}%
            </span>
          </div>
          <Progress value={impact.currentReadiness} className="h-2" />
        </div>

        {/* Resource Requirements */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <Users className="h-4 w-4 mx-auto text-blue-600" />
            <p className="text-xs text-muted-foreground">FTE</p>
            <p className="text-sm font-bold">{impact.resourceRequirements.fte}</p>
          </div>
          <div className="space-y-1">
            <DollarSign className="h-4 w-4 mx-auto text-green-600" />
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-sm font-bold">{impact.resourceRequirements.budget}</p>
          </div>
          <div className="space-y-1">
            <Calendar className="h-4 w-4 mx-auto text-purple-600" />
            <p className="text-xs text-muted-foreground">Timeline</p>
            <p className="text-sm font-bold">{impact.resourceRequirements.timeline}</p>
          </div>
        </div>

        {/* Compliance Gap */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Compliance Gap</h4>
          <p className="text-xs text-muted-foreground">{impact.complianceGap}</p>
        </div>
      </CardContent>
    </Card>
  )

  const DetailedView = ({ impact }: { impact: DepartmentalImpact }) => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{impact.department}</CardTitle>
              <CardDescription className="text-base">{impact.function}</CardDescription>
            </div>
            <Badge className={`capitalize text-sm ${getImpactColor(impact.impactLevel)}`}>
              {impact.impactLevel} Impact
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{impact.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Required Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Required Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {impact.requiredActions.map((action, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm">{action}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Key Risks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600">Key Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {impact.keyRisks.map((risk, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-sm">{risk}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Resource Requirements & Dependencies */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resource Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Full-Time Employees</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{impact.resourceRequirements.fte}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-medium">Budget Requirement</span>
              </div>
              <span className="text-lg font-bold text-green-600">{impact.resourceRequirements.budget}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Implementation Timeline</span>
              </div>
              <span className="text-lg font-bold text-purple-600">{impact.resourceRequirements.timeline}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dependencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {impact.dependencies.map((dependency, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <Building2 className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">{dependency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Readiness Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Readiness Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Readiness Level</span>
            <span className={`text-2xl font-bold ${getReadinessColor(impact.currentReadiness)}`}>
              {impact.currentReadiness}%
            </span>
          </div>
          <Progress value={impact.currentReadiness} className="h-3" />
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">Compliance Gap Analysis</h4>
            <p className="text-sm text-amber-700">{impact.complianceGap}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Regulatory Impact Analysis</h1>
          <p className="text-muted-foreground">
            Analyze how regulatory changes impact UBS departments and business functions
          </p>
        </div>

        {/* Case Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Regulatory Case</CardTitle>
            <CardDescription>Choose a regulatory case to analyze its impact across UBS functions</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedCaseId} onValueChange={setSelectedCaseId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a regulatory case..." />
              </SelectTrigger>
              <SelectContent>
                {mockRegulatoryCases
                  .filter((c) => regulatoryImpactMockData.some((d) => d.caseId === c.id))
                  .map((regulatoryCase) => (
                    <SelectItem key={regulatoryCase.id} value={regulatoryCase.id}>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{regulatoryCase.name}</span>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant="outline" className="text-xs">
                            {regulatoryCase.category}
                          </Badge>
                          <Badge
                            variant={
                              regulatoryCase.priority === "high"
                                ? "destructive"
                                : regulatoryCase.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {regulatoryCase.priority}
                          </Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Impact Analysis Content */}
      {selectedCase && impactData && (
        <div className="space-y-6">
          {/* Overall Impact Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{impactData.caseName}</CardTitle>
              <CardDescription>Overall organizational impact summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Building2 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{impactData.overallImpact.affectedDepartments}</p>
                  <p className="text-sm text-muted-foreground">Affected Departments</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-green-600">{impactData.overallImpact.totalFTE}</p>
                  <p className="text-sm text-muted-foreground">Total FTE Required</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <DollarSign className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-lg font-bold text-purple-600">{impactData.overallImpact.totalBudget}</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <p className="text-2xl font-bold text-red-600">{impactData.overallImpact.criticalImpacts}</p>
                  <p className="text-sm text-muted-foreground">Critical Impacts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Departmental Impact Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Departmental Impact Analysis</CardTitle>
              <CardDescription>Detailed impact assessment by department and function</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed View</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {impactData.departmentalImpacts.map((impact, index) => (
                      <DepartmentCard key={index} impact={impact} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="space-y-6">
                  {impactData.departmentalImpacts.map((impact, index) => (
                    <div key={index}>
                      <DetailedView impact={impact} />
                      {index < impactData.departmentalImpacts.length - 1 && <Separator className="my-8" />}
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!selectedCase && (
        <Card className="flex items-center justify-center h-64">
          <CardContent className="text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Case Selected</h3>
            <p className="text-muted-foreground">
              Please select a regulatory case from the dropdown above to view its impact analysis.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
