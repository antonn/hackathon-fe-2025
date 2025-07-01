export interface RegulatoryMilestone {
  id: string
  title: string
  regulation: string
  type: "deadline" | "implementation" | "review" | "reporting"
  priority: "critical" | "high" | "medium" | "low"
  date: Date
  description: string
  status: "upcoming" | "in_progress" | "completed" | "at_risk"
  department: string
  estimatedEffort: string
  dependencies?: string[]
}

// Generate regulatory milestones for the next year
export const regulatoryMilestones: RegulatoryMilestone[] = [
  // January 2025
  {
    id: "milestone-001",
    title: "DORA Compliance Deadline",
    regulation: "Digital Operational Resilience Act",
    type: "deadline",
    priority: "critical",
    date: new Date("2025-01-17"),
    description: "Final deadline for DORA compliance across all EU operations",
    status: "at_risk",
    department: "IT & Risk Management",
    estimatedEffort: "120 FTE",
  },
  {
    id: "milestone-002",
    title: "Q4 2024 Stress Test Results",
    regulation: "FINMA Stress Testing",
    type: "reporting",
    priority: "high",
    date: new Date("2025-01-31"),
    description: "Submit Q4 2024 stress test results to FINMA",
    status: "in_progress",
    department: "Risk Management",
    estimatedEffort: "15 FTE",
  },
  // February 2025
  {
    id: "milestone-003",
    title: "Basel III Capital Buffer Implementation",
    regulation: "Basel III Enhanced Requirements",
    type: "implementation",
    priority: "critical",
    date: new Date("2025-02-28"),
    description: "Implement enhanced capital buffer calculations",
    status: "in_progress",
    department: "Risk Management",
    estimatedEffort: "25 FTE",
  },
  // March 2025
  {
    id: "milestone-004",
    title: "MiFID II Transaction Reporting Update",
    regulation: "MiFID II",
    type: "implementation",
    priority: "medium",
    date: new Date("2025-03-15"),
    description: "Deploy updated transaction reporting system",
    status: "upcoming",
    department: "Operations",
    estimatedEffort: "12 FTE",
  },
  {
    id: "milestone-005",
    title: "FINMA Capital Adequacy Review",
    regulation: "FINMA Capital Requirements",
    type: "review",
    priority: "high",
    date: new Date("2025-03-31"),
    description: "Quarterly capital adequacy assessment and reporting",
    status: "upcoming",
    department: "Finance",
    estimatedEffort: "8 FTE",
  },
  // April 2025
  {
    id: "milestone-006",
    title: "ESG Disclosure Implementation",
    regulation: "EU Taxonomy Regulation",
    type: "implementation",
    priority: "medium",
    date: new Date("2025-04-30"),
    description: "Implement enhanced ESG disclosure requirements",
    status: "upcoming",
    department: "Sustainability",
    estimatedEffort: "18 FTE",
  },
  // May 2025
  {
    id: "milestone-007",
    title: "CRDV Liquidity Requirements",
    regulation: "Capital Requirements Directive V",
    type: "deadline",
    priority: "high",
    date: new Date("2025-05-15"),
    description: "Comply with new liquidity coverage ratio requirements",
    status: "upcoming",
    department: "Treasury",
    estimatedEffort: "10 FTE",
  },
  // June 2025
  {
    id: "milestone-008",
    title: "FINMA Capital Buffer Compliance",
    regulation: "FINMA Enhanced Capital Requirements",
    type: "deadline",
    priority: "critical",
    date: new Date("2025-06-30"),
    description: "Final compliance with enhanced capital buffer requirements",
    status: "upcoming",
    department: "Risk Management",
    estimatedEffort: "35 FTE",
  },
  // July 2025
  {
    id: "milestone-009",
    title: "EMIR Refit Implementation",
    regulation: "European Market Infrastructure Regulation",
    type: "implementation",
    priority: "medium",
    date: new Date("2025-07-31"),
    description: "Implement EMIR refit requirements for derivatives reporting",
    status: "upcoming",
    department: "Trading",
    estimatedEffort: "20 FTE",
  },
  // August 2025
  {
    id: "milestone-010",
    title: "BCBS 239 Data Governance Review",
    regulation: "BCBS 239",
    type: "review",
    priority: "medium",
    date: new Date("2025-08-31"),
    description: "Annual review of risk data aggregation capabilities",
    status: "upcoming",
    department: "IT & Risk",
    estimatedEffort: "15 FTE",
  },
  // September 2025
  {
    id: "milestone-011",
    title: "CSRD Sustainability Reporting",
    regulation: "Corporate Sustainability Reporting Directive",
    type: "reporting",
    priority: "high",
    date: new Date("2025-09-30"),
    description: "First comprehensive sustainability report under CSRD",
    status: "upcoming",
    department: "Sustainability",
    estimatedEffort: "25 FTE",
  },
  // October 2025
  {
    id: "milestone-012",
    title: "Basel IV Preparation Phase",
    regulation: "Basel IV",
    type: "implementation",
    priority: "high",
    date: new Date("2025-10-31"),
    description: "Complete preparation phase for Basel IV implementation",
    status: "upcoming",
    department: "Risk Management",
    estimatedEffort: "40 FTE",
  },
  // November 2025
  {
    id: "milestone-013",
    title: "DORA Annual Assessment",
    regulation: "Digital Operational Resilience Act",
    type: "review",
    priority: "medium",
    date: new Date("2025-11-30"),
    description: "Annual digital operational resilience assessment",
    status: "upcoming",
    department: "IT Security",
    estimatedEffort: "12 FTE",
  },
  // December 2025
  {
    id: "milestone-014",
    title: "Year-End Compliance Review",
    regulation: "Multiple Regulations",
    type: "review",
    priority: "high",
    date: new Date("2025-12-31"),
    description: "Comprehensive year-end regulatory compliance assessment",
    status: "upcoming",
    department: "Legal & Compliance",
    estimatedEffort: "30 FTE",
  },
]

export const getMonthsFromToday = () => {
  const months = []
  const today = new Date()

  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1)
    months.push({
      name: date.toLocaleDateString("en-US", { month: "long" }),
      year: date.getFullYear(),
      date: date,
      isCurrentMonth: i === 0,
    })
  }

  return months
}
