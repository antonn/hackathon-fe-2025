"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Users,
  Target,
  FileText,
  TrendingUp,
  AlertCircle,
  Building2,
} from "lucide-react"
import { regulatoryMilestones, getMonthsFromToday } from "../lib/timeline-data"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Label } from "recharts"

export function ImplementationTimeline() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null)
  const months = getMonthsFromToday()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200"
      case "in_progress":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "at_risk":
        return "text-red-600 bg-red-50 border-red-200"
      case "upcoming":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-amber-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <AlertTriangle className="h-4 w-4" />
      case "implementation":
        return <Target className="h-4 w-4" />
      case "review":
        return <FileText className="h-4 w-4" />
      case "reporting":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "at_risk":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  const getMilestonesForMonth = (monthDate: Date) => {
    return regulatoryMilestones.filter((milestone) => {
      const milestoneMonth = milestone.date.getMonth()
      const milestoneYear = milestone.date.getFullYear()
      return milestoneMonth === monthDate.getMonth() && milestoneYear === monthDate.getFullYear()
    })
  }

  const filteredMilestones = regulatoryMilestones.filter((milestone) => {
    if (selectedFilters.length === 0) return true
    return selectedFilters.includes(milestone.type) || selectedFilters.includes(milestone.priority)
  })

  const uniqueTypes = Array.from(new Set(regulatoryMilestones.map((m) => m.type)))
  const uniquePriorities = Array.from(new Set(regulatoryMilestones.map((m) => m.priority)))

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // --- Chart Data Preparation ---
  const prepareChartData = (milestones: typeof regulatoryMilestones) => {
    const uniqueTypes = Array.from(new Set(milestones.map((m) => m.type))).sort()
    const typeToY = Object.fromEntries(uniqueTypes.map((type, index) => [type, index]))
    const yToType = Object.fromEntries(uniqueTypes.map((type, index) => [index, type]))

    const dataByTypes = uniqueTypes.map((type) => ({
      name: type,
      data: milestones
        .filter((m) => m.type === type)
        .map((m) => ({
          x: m.date.getTime(), // Timestamp for X-axis
          y: typeToY[m.type], // Numerical index for Y-axis
          id: m.id,
          title: m.title,
          regulation: m.regulation,
          priority: m.priority,
          status: m.status,
          description: m.description,
          department: m.department,
          estimatedEffort: m.estimatedEffort,
        })),
    }))

    return { dataByTypes, yToType }
  }

  const { dataByTypes, yToType } = prepareChartData(filteredMilestones)

  const dateFormatter = (tick: number) => {
    const date = new Date(tick)
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
  }

  const yAxisFormatter = (tick: number) => {
    return yToType[tick] || ""
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg text-sm">
          <p className="font-bold">{data.title}</p>
          <p className="text-muted-foreground">{data.regulation}</p>
          <p className="mt-2">{data.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {data.type}
            </Badge>
            <Badge
              variant={
                data.priority === "critical" ? "destructive" : data.priority === "high" ? "default" : "secondary"
              }
              className="capitalize"
            >
              {data.priority}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {data.status.replace("_", " ")}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Date: {new Date(data.x).toLocaleDateString()}</p>
          <p className="text-xs text-muted-foreground">Department: {data.department}</p>
          <p className="text-xs text-muted-foreground">Effort: {data.estimatedEffort}</p>
        </div>
      )
    }
    return null
  }

  const todayTimestamp = new Date().getTime()

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Implementation Timeline</h1>
          <p className="text-muted-foreground">
            Track regulatory implementation deadlines and milestones over the next 12 months
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredMilestones.length}</div>
              <p className="text-xs text-muted-foreground">Next 12 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Deadlines</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {filteredMilestones.filter((m) => m.priority === "critical").length}
              </div>
              <p className="text-xs text-muted-foreground">High priority items</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {filteredMilestones.filter((m) => m.status === "at_risk").length}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {filteredMilestones.filter((m) => m.status === "in_progress").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
              {uniqueTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedFilters.includes(type) ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() =>
                    setSelectedFilters((prev) =>
                      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type],
                    )
                  }
                >
                  {type}
                </Badge>
              ))}
              {uniquePriorities.map((priority) => (
                <Badge
                  key={priority}
                  variant={selectedFilters.includes(priority) ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() =>
                    setSelectedFilters((prev) =>
                      prev.includes(priority) ? prev.filter((f) => f !== priority) : [...prev, priority],
                    )
                  }
                >
                  {priority}
                </Badge>
              ))}
            </div>
          </div>
          {selectedFilters.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setSelectedFilters([])}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Timeline Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Regulatory Timeline Views</CardTitle>
          <CardDescription>Switch between list and graphical representations of milestones</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
              <TabsTrigger value="list" className="rounded-none">
                List View
              </TabsTrigger>
              <TabsTrigger value="graph" className="rounded-none">
                Graph View
              </TabsTrigger>
            </TabsList>

            {/* List View Content */}
            <TabsContent value="list" className="space-y-0 mt-0">
              {months.map((month, monthIndex) => {
                const monthMilestones = getMilestonesForMonth(month.date).filter((milestone) => {
                  if (selectedFilters.length === 0) return true
                  return selectedFilters.includes(milestone.type) || selectedFilters.includes(milestone.priority)
                })

                return (
                  <div key={monthIndex} className="border-b last:border-b-0">
                    {/* Month Header */}
                    <div
                      className={`p-4 border-l-4 ${
                        month.isCurrentMonth ? "bg-blue-50 border-l-blue-500" : "bg-gray-50 border-l-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`text-lg font-semibold ${month.isCurrentMonth ? "text-blue-700" : ""}`}>
                            {month.name} {month.year}
                            {month.isCurrentMonth && (
                              <Badge variant="default" className="ml-2 text-xs">
                                Current Month
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {monthMilestones.length} milestone{monthMilestones.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {monthMilestones.some((m) => m.priority === "critical") && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                          {monthMilestones.some((m) => m.status === "at_risk") && (
                            <Badge variant="outline" className="text-xs text-amber-600 border-amber-600">
                              At Risk
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Month Milestones */}
                    {monthMilestones.length > 0 ? (
                      <div className="p-4 space-y-4">
                        {monthMilestones
                          .sort((a, b) => a.date.getTime() - b.date.getTime())
                          .map((milestone) => (
                            <TooltipProvider key={milestone.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                      hoveredMilestone === milestone.id
                                        ? "shadow-md scale-[1.02] border-primary"
                                        : "hover:shadow-sm hover:border-gray-300"
                                    }`}
                                    onMouseEnter={() => setHoveredMilestone(milestone.id)}
                                    onMouseLeave={() => setHoveredMilestone(null)}
                                  >
                                    <div className="flex items-start justify-between space-x-4">
                                      <div className="flex items-start space-x-3 flex-1">
                                        {/* Priority Indicator */}
                                        <div
                                          className={`w-3 h-3 rounded-full mt-1 ${getPriorityColor(milestone.priority)}`}
                                        />

                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center space-x-2 mb-1">
                                            {getTypeIcon(milestone.type)}
                                            <h4 className="font-medium text-sm">{milestone.title}</h4>
                                            {isToday(milestone.date) && (
                                              <Badge variant="default" className="text-xs">
                                                Today
                                              </Badge>
                                            )}
                                          </div>

                                          <p className="text-xs text-muted-foreground mb-2">{milestone.regulation}</p>

                                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {milestone.description}
                                          </p>

                                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                            <div className="flex items-center space-x-1">
                                              <Calendar className="h-3 w-3" />
                                              <span>{milestone.date.toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <Building2 className="h-3 w-3" />
                                              <span>{milestone.department}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <Users className="h-3 w-3" />
                                              <span>{milestone.estimatedEffort}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex flex-col items-end space-y-2">
                                        {getStatusIcon(milestone.status)}
                                        <Badge
                                          variant="outline"
                                          className={`text-xs capitalize ${getStatusColor(milestone.status)}`}
                                        >
                                          {milestone.status.replace("_", " ")}
                                        </Badge>
                                        <Badge
                                          variant={
                                            milestone.priority === "critical"
                                              ? "destructive"
                                              : milestone.priority === "high"
                                                ? "default"
                                                : "secondary"
                                          }
                                          className="text-xs capitalize"
                                        >
                                          {milestone.priority}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-sm">
                                  <div className="space-y-2">
                                    <h4 className="font-medium">{milestone.title}</h4>
                                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                    <div className="flex items-center space-x-4 text-xs">
                                      <div className="flex items-center space-x-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{milestone.date.toLocaleDateString()}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Users className="h-3 w-3" />
                                        <span>{milestone.estimatedEffort}</span>
                                      </div>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No milestones scheduled for this month</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </TabsContent>

            {/* Graph View Content */}
            <TabsContent value="graph" className="mt-0 p-4">
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      domain={["dataMin", "dataMax"]}
                      tickFormatter={dateFormatter}
                      scale="time"
                    >
                      <Label value="Timeline (Months & Years)" offset={-10} position="insideBottom" />
                    </XAxis>
                    <YAxis
                      type="category"
                      dataKey="y"
                      tickFormatter={yAxisFormatter}
                      interval={0}
                      reversed={true} // To display categories from top to bottom as they appear in yToType
                    >
                      <Label
                        value="Milestone Type"
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: "middle" }}
                      />
                    </YAxis>
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                    {dataByTypes.map((series, index) => (
                      <Scatter
                        key={series.name}
                        name={series.name}
                        data={series.data}
                        fill={
                          series.name === "deadline"
                            ? "#ef4444" // red-500
                            : series.name === "implementation"
                              ? "#f97316" // orange-500
                              : series.name === "review"
                                ? "#eab308" // amber-500
                                : series.name === "reporting"
                                  ? "#3b82f6" // blue-500
                                  : "#6b7280" // gray-500
                        }
                        shape="circle"
                        line
                      />
                    ))}
                    <ReferenceLine
                      x={todayTimestamp}
                      stroke="#0ea5e9"
                      strokeDasharray="3 3"
                      label={{ value: "Today", position: "top", fill: "#0ea5e9" }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
