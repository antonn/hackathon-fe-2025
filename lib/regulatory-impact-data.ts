export interface DepartmentalImpact {
  department: string
  function: string
  impactLevel: "critical" | "high" | "medium" | "low"
  description: string
  requiredActions: string[]
  resourceRequirements: {
    fte: number
    budget: string
    timeline: string
  }
  keyRisks: string[]
  dependencies: string[]
  currentReadiness: number // percentage
  complianceGap: string
}

export interface RegulatoryImpactData {
  caseId: string
  caseName: string
  overallImpact: {
    affectedDepartments: number
    totalFTE: number
    totalBudget: string
    criticalImpacts: number
  }
  departmentalImpacts: DepartmentalImpact[]
}

export const regulatoryImpactMockData: RegulatoryImpactData[] = [
  {
    caseId: "case-001",
    caseName: "FINMA-COMPLIANCE-20241230-847",
    overallImpact: {
      affectedDepartments: 12,
      totalFTE: 85,
      totalBudget: "CHF 45-60M",
      criticalImpacts: 4,
    },
    departmentalImpacts: [
      {
        department: "Risk Management",
        function: "Capital Risk Assessment",
        impactLevel: "critical",
        description:
          "Major overhaul required for capital adequacy calculations, stress testing frameworks, and risk-weighted asset methodologies to comply with new FINMA requirements.",
        requiredActions: [
          "Upgrade capital calculation engines to support new CET1 requirements",
          "Implement enhanced stress testing scenarios for quarterly reporting",
          "Redesign risk-weighted asset allocation models",
          "Establish new governance framework for capital buffer management",
        ],
        resourceRequirements: {
          fte: 15,
          budget: "CHF 12-15M",
          timeline: "18 months",
        },
        keyRisks: [
          "Potential capital shortfall during transition period",
          "Model validation delays affecting compliance timeline",
          "Integration challenges with existing risk systems",
        ],
        dependencies: ["IT Systems", "Finance", "Legal & Compliance"],
        currentReadiness: 35,
        complianceGap:
          "Significant gaps in stress testing capabilities and capital buffer calculations. New models required for G-SIB surcharge implementation.",
      },
      {
        department: "Information Technology",
        function: "Risk & Regulatory Systems",
        impactLevel: "critical",
        description:
          "Comprehensive system upgrades required across risk management platforms, regulatory reporting systems, and data infrastructure to support new calculation methodologies.",
        requiredActions: [
          "Upgrade core risk management platform (Algorithmics/Moody's)",
          "Implement new regulatory reporting modules",
          "Enhance data warehouse capabilities for stress testing",
          "Deploy automated capital calculation workflows",
        ],
        resourceRequirements: {
          fte: 25,
          budget: "CHF 18-22M",
          timeline: "15 months",
        },
        keyRisks: [
          "System integration complexity with legacy platforms",
          "Data quality issues affecting calculation accuracy",
          "Vendor dependency for critical system components",
        ],
        dependencies: ["Risk Management", "Operations", "Vendor Management"],
        currentReadiness: 25,
        complianceGap:
          "Current systems cannot support new calculation requirements. Major platform upgrades and new modules required.",
      },
      {
        department: "Legal & Compliance",
        function: "Regulatory Affairs",
        impactLevel: "high",
        description:
          "Extensive regulatory interpretation, policy development, and compliance monitoring framework updates required for FINMA capital requirements.",
        requiredActions: [
          "Develop comprehensive policy framework for new capital requirements",
          "Establish ongoing dialogue with FINMA on implementation details",
          "Create compliance monitoring and testing procedures",
          "Update board and committee reporting frameworks",
        ],
        resourceRequirements: {
          fte: 8,
          budget: "CHF 2-3M",
          timeline: "12 months",
        },
        keyRisks: [
          "Regulatory interpretation uncertainties",
          "Policy implementation delays",
          "Compliance monitoring gaps during transition",
        ],
        dependencies: ["Risk Management", "Finance", "Executive Management"],
        currentReadiness: 60,
        complianceGap:
          "Existing policies need substantial updates. New monitoring frameworks required for enhanced capital buffers.",
      },
      {
        department: "Finance",
        function: "Financial Planning & Analysis",
        impactLevel: "high",
        description:
          "Capital planning processes, financial forecasting models, and management reporting systems require significant updates to incorporate new regulatory requirements.",
        requiredActions: [
          "Redesign capital planning and forecasting models",
          "Update management reporting dashboards",
          "Implement new KPIs for capital buffer monitoring",
          "Enhance scenario planning capabilities",
        ],
        resourceRequirements: {
          fte: 12,
          budget: "CHF 4-5M",
          timeline: "14 months",
        },
        keyRisks: [
          "Forecasting accuracy during transition period",
          "Management reporting gaps",
          "Capital allocation decision delays",
        ],
        dependencies: ["Risk Management", "IT Systems", "Treasury"],
        currentReadiness: 45,
        complianceGap:
          "Current planning models insufficient for new requirements. Enhanced scenario analysis and stress testing integration needed.",
      },
      {
        department: "Treasury",
        function: "Capital Management",
        impactLevel: "high",
        description:
          "Capital issuance strategies, funding plans, and liquidity management frameworks need adjustment to meet enhanced capital buffer requirements.",
        requiredActions: [
          "Develop new capital issuance strategy for buffer requirements",
          "Update funding and liquidity management frameworks",
          "Implement enhanced capital optimization processes",
          "Establish contingency funding plans for stress scenarios",
        ],
        resourceRequirements: {
          fte: 6,
          budget: "CHF 1-2M",
          timeline: "10 months",
        },
        keyRisks: [
          "Market conditions affecting capital raising",
          "Funding cost increases",
          "Liquidity management complexity",
        ],
        dependencies: ["Risk Management", "Finance", "Investment Banking"],
        currentReadiness: 55,
        complianceGap:
          "Current capital management processes need enhancement for new buffer requirements and stress scenario planning.",
      },
      {
        department: "Investment Banking",
        function: "Trading & Markets",
        impactLevel: "medium",
        description:
          "Trading activities and market-making operations may be constrained by new capital requirements, requiring portfolio optimization and risk limit adjustments.",
        requiredActions: [
          "Review and adjust trading risk limits based on new capital requirements",
          "Optimize trading portfolio allocation for capital efficiency",
          "Update client pricing models to reflect capital costs",
          "Implement enhanced position monitoring systems",
        ],
        resourceRequirements: {
          fte: 8,
          budget: "CHF 3-4M",
          timeline: "8 months",
        },
        keyRisks: [
          "Revenue impact from reduced trading capacity",
          "Client relationship effects from pricing changes",
          "Competitive disadvantage during transition",
        ],
        dependencies: ["Risk Management", "Finance", "IT Systems"],
        currentReadiness: 70,
        complianceGap:
          "Risk management frameworks adequate but require calibration for new capital requirements. Pricing models need updates.",
      },
      {
        department: "Wealth Management",
        function: "Client Advisory",
        impactLevel: "medium",
        description:
          "Client advisory services and product offerings may be affected by capital allocation constraints and new risk management requirements.",
        requiredActions: [
          "Review product offerings for capital efficiency",
          "Update client advisory frameworks for new risk parameters",
          "Adjust fee structures to reflect capital costs",
          "Enhance client communication on regulatory changes",
        ],
        resourceRequirements: {
          fte: 5,
          budget: "CHF 1-2M",
          timeline: "6 months",
        },
        keyRisks: [
          "Client satisfaction impact from service changes",
          "Revenue effects from product adjustments",
          "Advisor training and adaptation challenges",
        ],
        dependencies: ["Risk Management", "Legal & Compliance", "Training"],
        currentReadiness: 75,
        complianceGap:
          "Current advisory processes generally compliant but require updates for new capital allocation considerations.",
      },
      {
        department: "Operations",
        function: "Regulatory Reporting",
        impactLevel: "high",
        description:
          "Regulatory reporting processes, data management, and quality assurance frameworks require substantial enhancement for new FINMA reporting requirements.",
        requiredActions: [
          "Implement new regulatory reporting templates and processes",
          "Enhance data quality management and validation procedures",
          "Establish automated reporting workflows",
          "Develop comprehensive audit trails for regulatory submissions",
        ],
        resourceRequirements: {
          fte: 10,
          budget: "CHF 2-3M",
          timeline: "12 months",
        },
        keyRisks: [
          "Data quality issues affecting report accuracy",
          "Reporting deadline compliance challenges",
          "Manual process dependencies during transition",
        ],
        dependencies: ["IT Systems", "Risk Management", "Finance"],
        currentReadiness: 40,
        complianceGap:
          "Current reporting infrastructure insufficient for new requirements. Automated processes and enhanced data validation needed.",
      },
    ],
  },
  {
    caseId: "case-002",
    caseName: "DORA-ASSESSMENT-20241229-156",
    overallImpact: {
      affectedDepartments: 15,
      totalFTE: 120,
      totalBudget: "CHF 85-120M",
      criticalImpacts: 8,
    },
    departmentalImpacts: [
      {
        department: "Information Technology",
        function: "Cybersecurity & Infrastructure",
        impactLevel: "critical",
        description:
          "Complete overhaul of cybersecurity frameworks, incident response capabilities, and digital resilience testing required to meet DORA requirements.",
        requiredActions: [
          "Implement comprehensive ICT risk management framework",
          "Deploy advanced threat detection and response systems",
          "Establish digital operational resilience testing program",
          "Upgrade incident reporting and recovery capabilities",
        ],
        resourceRequirements: {
          fte: 35,
          budget: "CHF 40-50M",
          timeline: "24 months",
        },
        keyRisks: [
          "Cybersecurity vulnerabilities during system upgrades",
          "Operational disruption from infrastructure changes",
          "Vendor dependency for critical security components",
        ],
        dependencies: ["Operations", "Risk Management", "Third-party Vendors"],
        currentReadiness: 30,
        complianceGap:
          "Major gaps in digital resilience capabilities. New frameworks, systems, and processes required across all IT domains.",
      },
      {
        department: "Risk Management",
        function: "Operational Risk",
        impactLevel: "critical",
        description:
          "Operational risk management frameworks must be enhanced to incorporate ICT risks, digital operational resilience, and third-party risk management.",
        requiredActions: [
          "Develop comprehensive ICT risk assessment methodologies",
          "Implement digital operational resilience metrics and monitoring",
          "Establish third-party ICT service provider risk management",
          "Create incident impact assessment and recovery procedures",
        ],
        resourceRequirements: {
          fte: 20,
          budget: "CHF 8-12M",
          timeline: "18 months",
        },
        keyRisks: [
          "Incomplete risk identification during transition",
          "Third-party risk assessment challenges",
          "Integration complexity with existing risk frameworks",
        ],
        dependencies: ["IT Systems", "Legal & Compliance", "Procurement"],
        currentReadiness: 25,
        complianceGap:
          "Current operational risk frameworks inadequate for DORA requirements. New ICT risk methodologies and third-party oversight needed.",
      },
      {
        department: "Legal & Compliance",
        function: "Regulatory Compliance",
        impactLevel: "critical",
        description:
          "Comprehensive compliance framework development required for DORA regulations, including policy creation, monitoring, and reporting procedures.",
        requiredActions: [
          "Develop DORA compliance policies and procedures",
          "Establish regulatory reporting framework for digital resilience",
          "Create third-party contract compliance requirements",
          "Implement ongoing compliance monitoring and testing",
        ],
        resourceRequirements: {
          fte: 15,
          budget: "CHF 5-7M",
          timeline: "15 months",
        },
        keyRisks: [
          "Regulatory interpretation uncertainties",
          "Compliance monitoring gaps",
          "Third-party contract renegotiation challenges",
        ],
        dependencies: ["IT Systems", "Risk Management", "Procurement"],
        currentReadiness: 20,
        complianceGap:
          "No existing DORA-specific compliance framework. Complete policy development and monitoring systems required.",
      },
      {
        department: "Procurement",
        function: "Third-party Risk Management",
        impactLevel: "critical",
        description:
          "Third-party vendor management processes require complete overhaul to meet DORA requirements for ICT service provider oversight and contract management.",
        requiredActions: [
          "Implement enhanced third-party ICT risk assessment procedures",
          "Renegotiate critical ICT service provider contracts",
          "Establish ongoing vendor monitoring and performance management",
          "Develop vendor incident response and recovery procedures",
        ],
        resourceRequirements: {
          fte: 12,
          budget: "CHF 3-5M",
          timeline: "20 months",
        },
        keyRisks: [
          "Vendor contract renegotiation delays",
          "Service disruption during vendor transitions",
          "Increased vendor costs for enhanced requirements",
        ],
        dependencies: ["Legal & Compliance", "IT Systems", "Finance"],
        currentReadiness: 35,
        complianceGap:
          "Current vendor management insufficient for DORA requirements. Enhanced due diligence, monitoring, and contract terms needed.",
      },
    ],
  },
]
