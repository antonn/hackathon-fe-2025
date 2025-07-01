import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { mockRegulatoryCases } from "./mock-data"

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  caseId?: string
}

export interface ChatSession {
  id: string
  caseId: string
  caseName: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

// Generate system prompt based on regulatory case
export function generateSystemPrompt(caseId: string): string {
  const regulatoryCase = mockRegulatoryCases.find((c) => c.id === caseId)

  if (!regulatoryCase || !regulatoryCase.summary) {
    return `You are a regulatory compliance assistant for UBS. You help analyze regulatory documents and provide insights about compliance requirements, implementation strategies, and risk assessments. Please provide accurate, professional responses based on banking regulations and compliance best practices.`
  }

  const { summary } = regulatoryCase

  return `You are a specialized regulatory compliance assistant for UBS, with deep knowledge about the regulatory case "${regulatoryCase.name}" (${regulatoryCase.category}).

CASE CONTEXT:
- Case Name: ${regulatoryCase.name}
- Category: ${regulatoryCase.category}
- Priority: ${regulatoryCase.priority}
- Status: ${regulatoryCase.status}
- Documents: ${regulatoryCase.documentsCount} regulatory documents analyzed
- Created: ${regulatoryCase.createdAt.toLocaleDateString()}

EXECUTIVE SUMMARY:
${summary.overview}

KEY FINDINGS:
${summary.keyFindings.map((finding, index) => `${index + 1}. ${finding}`).join("\n")}

COMPLIANCE STATUS:
- Overall Status: ${summary.complianceStatus.overall}
- Compliance Score: ${summary.complianceStatus.score}%
- Details: ${summary.complianceStatus.details}

RISK ASSESSMENT:
- Risk Level: ${summary.riskAssessment.level}
- Key Risk Factors: ${summary.riskAssessment.factors.join(", ")}
- Mitigation Strategies: ${summary.riskAssessment.mitigation.join(", ")}

IMPACT ANALYSIS:
- Business Impact: ${summary.impactAnalysis.business}
- Operational Impact: ${summary.impactAnalysis.operational}
- Financial Impact: ${summary.impactAnalysis.financial}
- Timeline Impact: ${summary.impactAnalysis.timeline}

RECOMMENDATIONS:
- Immediate Actions: ${summary.recommendations.immediate.join(", ")}
- Short-term Actions: ${summary.recommendations.shortTerm.join(", ")}
- Long-term Actions: ${summary.recommendations.longTerm.join(", ")}

IMPLEMENTATION:
- Estimated Cost: ${summary.estimatedCost}
- Timeline: ${summary.implementationTimeline}
- Next Steps: ${summary.nextSteps.join(", ")}

You should:
1. Answer questions specifically about this regulatory case and its implications for UBS
2. Provide detailed explanations about compliance requirements, risks, and implementation strategies
3. Reference the specific findings, recommendations, and data from this case
4. Offer practical advice for regulatory compliance and risk management
5. Maintain a professional, banking industry-appropriate tone
6. If asked about topics outside this case, politely redirect to case-specific information or general regulatory guidance

Always base your responses on the case data provided above and general regulatory compliance best practices for Swiss banking institutions.`
}

// Chat with OpenAI using the regulatory case context
export async function chatWithCase(messages: ChatMessage[], caseId: string): Promise<ReadableStream<string>> {
  const systemPrompt = generateSystemPrompt(caseId)

  const conversationMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  ]

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: conversationMessages,
    temperature: 0.7,
    maxTokens: 1000,
  })

  return result.textStream
}

// Generate a single response (non-streaming)
export async function generateCaseResponse(messages: ChatMessage[], caseId: string): Promise<string> {
  const systemPrompt = generateSystemPrompt(caseId)

  const conversationMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  ]

  const result = await generateText({
    model: openai("gpt-4o"),
    messages: conversationMessages,
    temperature: 0.7,
    maxTokens: 1000,
  })

  return result.text
}

// Mock chat sessions storage (in a real app, this would be in a database)
const chatSessions: ChatSession[] = []

export function createChatSession(caseId: string): ChatSession {
  const regulatoryCase = mockRegulatoryCases.find((c) => c.id === caseId)
  const session: ChatSession = {
    id: Math.random().toString(36).substr(2, 9),
    caseId,
    caseName: regulatoryCase?.name || "Unknown Case",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  chatSessions.push(session)
  return session
}

export function getChatSession(sessionId: string): ChatSession | undefined {
  return chatSessions.find((s) => s.id === sessionId)
}

export function getChatSessionsForCase(caseId: string): ChatSession[] {
  return chatSessions.filter((s) => s.caseId === caseId)
}

export function addMessageToSession(sessionId: string, message: Omit<ChatMessage, "id" | "timestamp">): ChatMessage {
  const session = getChatSession(sessionId)
  if (!session) throw new Error("Session not found")

  const newMessage: ChatMessage = {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
  }

  session.messages.push(newMessage)
  session.updatedAt = new Date()

  return newMessage
}
