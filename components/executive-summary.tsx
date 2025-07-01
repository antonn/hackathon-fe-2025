"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  FileText,
  DollarSign,
  Calendar,
  Shield,
} from "lucide-react"
import { mockRegulatoryCases } from "../lib/mock-data"

export function ExecutiveSummaryView() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("")
  const selectedCase = mockRegulatoryCases.find((c) => c.id === selectedCaseId)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "non_compliant":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "partially_compliant":
        return <Clock className="h-5 w-5 text-amber-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "text-green-600 bg-green-50 border-green-200"
      case "non_compliant":
        return "text-red-600 bg-red-50 border-red-200"
      case "partially_compliant":
        return "text-amber-600 bg-amber-50 border-amber-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-amber-600 bg-amber-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Summary</h1>
          <p className="text-muted-foreground">Comprehensive regulatory analysis and compliance overview</p>
        </div>

        {/* Case Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Regulatory Case</CardTitle>
            <CardDescription>Choose a regulatory case to view its executive summary and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedCaseId} onValueChange={setSelectedCaseId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a regulatory case..." />
              </SelectTrigger>
              <SelectContent>
                {mockRegulatoryCases.map((regulatoryCase) => (
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

      {/* Executive Summary Content */}
      {selectedCase && selectedCase.summary && (
        <div className="space-y-6">
          {/* Case Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedCase.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {selectedCase.category} • {selectedCase.documentsCount} documents • Created{" "}
                    {selectedCase.createdAt.toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant={selectedCase.status === "analyzed" ? "default" : "secondary"} className="capitalize">
                  {selectedCase.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{selectedCase.summary.overview}</p>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                {getStatusIcon(selectedCase.summary.complianceStatus.overall)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedCase.summary.complianceStatus.score}%</div>
                <Progress value={selectedCase.summary.complianceStatus.score} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold capitalize ${getRiskColor(selectedCase.summary.riskAssessment.level).split(" ")[0]}`}
                >
                  {selectedCase.summary.riskAssessment.level}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Risk Assessment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Est. Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{selectedCase.summary.estimatedCost.split(" ")[0]}</div>
                <p className="text-xs text-muted-foreground mt-1">Implementation</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{selectedCase.summary.implementationTimeline.split(" ")[0]}</div>
                <p className="text-xs text-muted-foreground mt-1">Implementation</p>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(selectedCase.summary.complianceStatus.overall)}
                <span>Compliance Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border ${getStatusColor(selectedCase.summary.complianceStatus.overall)}`}>
                <p className="font-medium capitalize mb-2">
                  {selectedCase.summary.complianceStatus.overall.replace("_", " ")}(
                  {selectedCase.summary.complianceStatus.score}%)
                </p>
                <p className="text-sm">{selectedCase.summary.complianceStatus.details}</p>
              </div>
            </CardContent>
          </Card>

          {/* Key Findings */}
          <Card>
            <CardHeader>
              <CardTitle>Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedCase.summary.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed">{finding}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 rounded-lg ${getRiskColor(selectedCase.summary.riskAssessment.level)}`}>
                <h4 className="font-medium capitalize mb-2">{selectedCase.summary.riskAssessment.level} Risk Level</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3 text-red-600">Risk Factors</h4>
                  <ul className="space-y-2">
                    {selectedCase.summary.riskAssessment.factors.map((factor, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <TrendingDown className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{factor}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-green-600">Mitigation Strategies</h4>
                  <ul className="space-y-2">
                    {selectedCase.summary.riskAssessment.mitigation.map((strategy, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{strategy}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-blue-600 mb-1">Business Impact</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.summary.impactAnalysis.business}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-purple-600 mb-1">Operational Impact</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.summary.impactAnalysis.operational}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-green-600 mb-1">Financial Impact</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.summary.impactAnalysis.financial}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-orange-600 mb-1">Timeline Impact</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.summary.impactAnalysis.timeline}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-red-600 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Immediate Actions
                  </h4>
                  <ul className="space-y-2">
                    {selectedCase.summary.recommendations.immediate.map((rec, index) => (
                      <li key={index} className="text-sm p-2 bg-red-50 rounded border-l-2 border-red-200">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-amber-600 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Short-term (3-6 months)
                  </h4>
                  <ul className="space-y-2">
                    {selectedCase.summary.recommendations.shortTerm.map((rec, index) => (
                      <li key={index} className="text-sm p-2 bg-amber-50 rounded border-l-2 border-amber-200">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Long-term (6+ months)
                  </h4>
                  <ul className="space-y-2">
                    {selectedCase.summary.recommendations.longTerm.map((rec, index) => (
                      <li key={index} className="text-sm p-2 bg-blue-50 rounded border-l-2 border-blue-200">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedCase.summary.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium">{step}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Export Summary</Button>
                <Button>Schedule Review Meeting</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!selectedCase && (
        <Card className="flex items-center justify-center h-64">
          <CardContent className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Case Selected</h3>
            <p className="text-muted-foreground">
              Please select a regulatory case from the dropdown above to view its executive summary.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
