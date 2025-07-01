export interface RegulatoryCase {
  id: string
  name: string
  createdAt: Date
  documentsCount: number
  status: "processing" | "analyzed" | "pending_review"
  category: string
  priority: "high" | "medium" | "low"
  summary?: ExecutiveSummary
}

export interface ExecutiveSummary {
  overview: string
  keyFindings: string[]
  complianceStatus: {
    overall: "compliant" | "non_compliant" | "partially_compliant"
    score: number
    details: string
  }
  riskAssessment: {
    level: "high" | "medium" | "low"
    factors: string[]
    mitigation: string[]
  }
  impactAnalysis: {
    business: string
    operational: string
    financial: string
    timeline: string
  }
  recommendations: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }
  nextSteps: string[]
  estimatedCost: string
  implementationTimeline: string
}

export const mockRegulatoryCases: RegulatoryCase[] = [
  {
    id: "case-001",
    name: "FINMA-COMPLIANCE-20241230-847",
    createdAt: new Date("2024-12-30T10:30:00"),
    documentsCount: 5,
    status: "analyzed",
    category: "Capital Requirements",
    priority: "high",
    summary: {
      overview:
        "Comprehensive analysis of FINMA's updated capital adequacy requirements for Swiss banks. The regulatory changes introduce stricter capital buffers and enhanced risk-weighted asset calculations, requiring significant adjustments to UBS's capital management framework.",
      keyFindings: [
        "New minimum CET1 ratio requirement increased from 4.5% to 5.2%",
        "Introduction of additional systemic risk buffer of 1.5% for G-SIBs",
        "Enhanced stress testing requirements with quarterly reporting",
        "Revised treatment of operational risk capital calculations",
        "New liquidity coverage ratio thresholds for foreign currency exposures",
      ],
      complianceStatus: {
        overall: "partially_compliant",
        score: 78,
        details:
          "Current capital ratios meet basic requirements but fall short of new enhanced buffers. Immediate action required for full compliance by Q2 2025.",
      },
      riskAssessment: {
        level: "medium",
        factors: [
          "Potential capital shortfall of CHF 2.3 billion under stress scenarios",
          "Increased regulatory scrutiny on trading book activities",
          "Enhanced reporting requirements may strain operational resources",
        ],
        mitigation: [
          "Accelerate capital retention through dividend policy adjustment",
          "Optimize risk-weighted asset allocation across business lines",
          "Implement automated regulatory reporting systems",
        ],
      },
      impactAnalysis: {
        business:
          "Moderate impact on lending capacity and trading activities. May require portfolio rebalancing and reduced risk appetite in certain segments.",
        operational:
          "Significant changes to risk management processes, reporting systems, and governance frameworks. Additional FTE requirements estimated at 15-20 specialists.",
        financial:
          "Estimated implementation cost of CHF 45-60 million, with ongoing compliance costs of CHF 12 million annually.",
        timeline:
          "Full compliance required by June 30, 2025. Critical milestones include system upgrades by March 2025 and staff training by May 2025.",
      },
      recommendations: {
        immediate: [
          "Establish dedicated FINMA compliance task force",
          "Conduct gap analysis of current capital management systems",
          "Engage with FINMA for clarification on implementation timeline",
        ],
        shortTerm: [
          "Upgrade risk management systems to support new calculations",
          "Implement enhanced stress testing capabilities",
          "Develop comprehensive staff training programs",
        ],
        longTerm: [
          "Integrate new requirements into strategic capital planning",
          "Establish ongoing monitoring and reporting frameworks",
          "Consider strategic business line optimization",
        ],
      },
      nextSteps: [
        "Schedule executive committee review by January 15, 2025",
        "Initiate vendor selection for system upgrades",
        "Prepare detailed implementation roadmap",
        "Coordinate with legal and compliance teams for regulatory dialogue",
      ],
      estimatedCost: "CHF 45-60 million (implementation) + CHF 12 million (annual)",
      implementationTimeline: "18 months (full compliance by June 2025)",
    },
  },
  {
    id: "case-002",
    name: "DORA-ASSESSMENT-20241229-156",
    createdAt: new Date("2024-12-29T14:15:00"),
    documentsCount: 8,
    status: "analyzed",
    category: "Digital Operational Resilience",
    priority: "high",
    summary: {
      overview:
        "Analysis of EU's Digital Operational Resilience Act (DORA) requirements and their impact on UBS's technology infrastructure, third-party risk management, and incident reporting capabilities.",
      keyFindings: [
        "DORA applies to all EU operations with mandatory compliance by January 17, 2025",
        "Enhanced ICT risk management framework required across all business lines",
        "Mandatory digital operational resilience testing including threat-led penetration testing",
        "Stricter third-party ICT service provider oversight and contractual requirements",
        "Comprehensive incident reporting to supervisory authorities within strict timelines",
      ],
      complianceStatus: {
        overall: "non_compliant",
        score: 45,
        details:
          "Significant gaps identified in ICT risk management, third-party oversight, and incident reporting capabilities. Urgent remediation required.",
      },
      riskAssessment: {
        level: "high",
        factors: [
          "Potential regulatory sanctions for non-compliance",
          "Operational disruption during system upgrades",
          "Third-party vendor contract renegotiations required",
          "Increased cybersecurity threat exposure during transition",
        ],
        mitigation: [
          "Accelerated implementation timeline with dedicated resources",
          "Phased rollout to minimize operational disruption",
          "Enhanced cybersecurity monitoring during transition",
          "Proactive engagement with critical third-party providers",
        ],
      },
      impactAnalysis: {
        business:
          "High impact on all technology-dependent operations. Potential service disruptions during implementation phase.",
        operational:
          "Major overhaul of ICT governance, risk management processes, and incident response procedures. Estimated 40-50 additional FTEs required.",
        financial:
          "Implementation costs estimated at CHF 85-120 million, with annual compliance costs of CHF 25 million.",
        timeline: "Critical compliance deadline of January 17, 2025. Limited time for full implementation.",
      },
      recommendations: {
        immediate: [
          "Declare DORA compliance as top organizational priority",
          "Establish crisis management approach for accelerated implementation",
          "Engage emergency consulting resources for gap remediation",
        ],
        shortTerm: [
          "Implement minimum viable compliance framework by deadline",
          "Renegotiate critical third-party contracts",
          "Deploy enhanced incident detection and reporting systems",
        ],
        longTerm: [
          "Build comprehensive digital resilience capabilities",
          "Establish center of excellence for ongoing compliance",
          "Integrate DORA requirements into strategic technology planning",
        ],
      },
      nextSteps: [
        "Emergency board meeting to approve accelerated implementation plan",
        "Immediate engagement with EU supervisory authorities",
        "Launch vendor negotiations for critical system upgrades",
        "Establish daily progress monitoring and escalation procedures",
      ],
      estimatedCost: "CHF 85-120 million (implementation) + CHF 25 million (annual)",
      implementationTimeline: "3 weeks (minimum compliance) + 12 months (full optimization)",
    },
  },
  {
    id: "case-003",
    name: "Basel-III-Review-Q4-2024",
    createdAt: new Date("2024-12-28T09:45:00"),
    documentsCount: 12,
    status: "analyzed",
    category: "Capital Adequacy",
    priority: "medium",
    summary: {
      overview:
        "Quarterly review of Basel III implementation progress and assessment of upcoming regulatory changes affecting capital requirements, leverage ratios, and liquidity management.",
      keyFindings: [
        "Current CET1 ratio of 14.2% exceeds regulatory minimums but below internal targets",
        "Leverage ratio compliance maintained at 4.8% vs. 3% requirement",
        "LCR and NSFR ratios remain well above regulatory thresholds",
        "Operational risk capital requirements stable with minor model adjustments",
        "Credit risk-weighted assets increased 3.2% quarter-over-quarter",
      ],
      complianceStatus: {
        overall: "compliant",
        score: 92,
        details: "Strong compliance across all Basel III metrics with adequate buffers above regulatory minimums.",
      },
      riskAssessment: {
        level: "low",
        factors: [
          "Potential impact from upcoming Basel IV implementation",
          "Market volatility affecting capital ratios",
          "Credit loss provisions in uncertain economic environment",
        ],
        mitigation: [
          "Maintain conservative capital buffers",
          "Regular stress testing and scenario analysis",
          "Proactive credit risk management",
        ],
      },
      impactAnalysis: {
        business: "Minimal current impact. Strong capital position supports business growth and strategic initiatives.",
        operational:
          "Routine monitoring and reporting processes functioning effectively. No major operational changes required.",
        financial: "Stable compliance costs. Capital efficiency opportunities identified in certain portfolios.",
        timeline: "Ongoing monitoring with quarterly assessments. Basel IV preparation timeline extends through 2026.",
      },
      recommendations: {
        immediate: [
          "Maintain current capital management approach",
          "Continue quarterly monitoring and stress testing",
          "Monitor Basel IV developments for early preparation",
        ],
        shortTerm: [
          "Optimize capital allocation across business lines",
          "Enhance predictive analytics for capital planning",
          "Prepare for Basel IV impact assessment",
        ],
        longTerm: [
          "Develop strategic capital optimization initiatives",
          "Build advanced capital management capabilities",
          "Integrate ESG factors into capital planning",
        ],
      },
      nextSteps: [
        "Present quarterly results to risk committee",
        "Update capital planning models with Q4 data",
        "Initiate Basel IV readiness assessment",
        "Review capital allocation efficiency opportunities",
      ],
      estimatedCost: "CHF 2-3 million (ongoing monitoring)",
      implementationTimeline: "Ongoing quarterly process",
    },
  },
]
