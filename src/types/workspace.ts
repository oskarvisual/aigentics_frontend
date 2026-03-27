export type AgentRole =
  | "Secretary Agent"
  | "Support Agent"
  | "Sales Agent"
  | "Customer Success Agent"
  | "Recruiter Agent"
  | "Agent Manager";

export type AgentStatus =
  | "active"
  | "training"
  | "awaiting_approval"
  | "handoff"
  | "offline";

export type WorkspaceRole =
  | "owner"
  | "admin"
  | "manager"
  | "human_agent"
  | "viewer";

export type Priority = "low" | "medium" | "high" | "critical";

export type ConversationStatus =
  | "open"
  | "resolved"
  | "awaiting_approval"
  | "escalated";

export type KnowledgeSourceType =
  | "file"
  | "url"
  | "faq"
  | "video"
  | "chat"
  | "doc";

export type KnowledgeStatus = "ready" | "processing" | "attention_needed";

export type IntegrationCategory = "native" | "mcp" | "custom_api";

export type IntegrationStatus =
  | "connected"
  | "syncing"
  | "attention"
  | "offline";

export type NotificationCategory =
  | "approval"
  | "alert"
  | "integration"
  | "knowledge"
  | "escalation"
  | "recommendation";

export interface HealthIndicator {
  label: string;
  value: string;
  tone: "success" | "warning" | "critical" | "neutral";
  hint: string;
}

export interface StatMetric {
  label: string;
  value: string;
  change: string;
  tone?: "success" | "warning" | "neutral";
  description?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  actor: string;
  tone?: "default" | "success" | "warning" | "critical";
}

export interface ApprovalItem {
  id: string;
  title: string;
  detail: string;
  owner: string;
  priority: Priority;
  dueLabel: string;
}

export interface ChatMessage {
  id: string;
  author: string;
  senderType: "agent" | "user" | "system";
  body: string;
  timestamp: string;
  status?: "sent" | "delivered" | "pending";
}

export interface PerformanceSnapshot {
  resolutionRate: string;
  responseTime: string;
  qualityScore: string;
  approvalsNeeded: string;
}

export interface PendingTask {
  id: string;
  title: string;
  status: "queued" | "in_progress" | "awaiting_approval";
  dueLabel: string;
}

export interface TrainingNote {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  personality: string;
  summary: string;
  avatar: string;
  status: AgentStatus;
  connectedChannels: number;
  connectedTools: number;
  pendingWork: number;
  recentActivity: string;
  nextAction: string;
  approvalsNeeded: number;
  performance: PerformanceSnapshot;
  channels: string[];
  tools: string[];
  permissions: string[];
  knows: string[];
  identity: {
    mission: string;
    style: string;
    supervision: string;
  };
  activity: TimelineEvent[];
  pendingTasks: PendingTask[];
  trainingHistory: TrainingNote[];
  messages: ChatMessage[];
}

export interface Conversation {
  id: string;
  subject: string;
  channel: string;
  customer: string;
  assignedAgentId: string;
  assignedAgentName: string;
  status: ConversationStatus;
  priority: Priority;
  lastMessage: string;
  lastUpdated: string;
  notes: string[];
  needsApproval: boolean;
  thread: ChatMessage[];
}

export interface KnowledgeSource {
  id: string;
  title: string;
  type: KnowledgeSourceType;
  status: KnowledgeStatus;
  updatedAt: string;
  owner: string;
  summary: string;
  coverage: string;
  accessibleAgentIds: string[];
  sizeLabel: string;
  detail: string;
}

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  ownership: "shared" | "private";
  authType: string;
  lastSync: string;
  accessLevel: string;
  assignedAgentIds: string[];
  description: string;
  actions: string[];
}

export interface WorkspaceUser {
  id: string;
  name: string;
  email: string;
  role: WorkspaceRole;
  status: "active" | "inactive";
  lastActive: string;
  permissionsSummary: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  createdAt: string;
  unread: boolean;
  actionLabel?: string;
}

export interface DashboardInsight {
  title: string;
  detail: string;
  tone?: "default" | "success" | "warning";
}

export interface DashboardData {
  managerNarrative: string;
  overview: StatMetric[];
  healthIndicators: HealthIndicator[];
  approvals: ApprovalItem[];
  unresolvedConversations: Conversation[];
  ingestionStatuses: KnowledgeSource[];
  activity: TimelineEvent[];
  integrationSummary: StatMetric[];
  metrics: StatMetric[];
  alerts: DashboardInsight[];
  recommendations: DashboardInsight[];
}

export interface AnalyticsTrendPoint {
  label: string;
  conversations: number;
  responseMinutes: number;
  resolutions: number;
  leads: number;
}

export interface AnalyticsData {
  summary: StatMetric[];
  trends: AnalyticsTrendPoint[];
  topAgents: Array<{
    agentId: string;
    name: string;
    role: AgentRole;
    score: string;
    output: string;
  }>;
  knowledgeGaps: string[];
  recruiterPipeline: Array<{
    stage: string;
    count: number;
  }>;
}

export interface BillingData {
  plan: string;
  renewalDate: string;
  usage: StatMetric[];
  invoices: Array<{
    id: string;
    date: string;
    amount: string;
    status: string;
  }>;
  paymentMethod: {
    brand: string;
    last4: string;
    expiry: string;
  };
}

export interface SettingsData {
  workspaceName: string;
  branding: string;
  securitySummary: string;
  compliance: string[];
  defaults: string[];
}

export interface SupportData {
  resources: Array<{
    title: string;
    detail: string;
  }>;
  onboardingChecklist: string[];
}

export interface AccountData {
  name: string;
  email: string;
  title: string;
  timezone: string;
  sessions: string[];
  notifications: string[];
  connectedAccounts: string[];
}

export interface WorkspaceSnapshot {
  dashboard: DashboardData;
  agents: Agent[];
  conversations: Conversation[];
  knowledge: KnowledgeSource[];
  integrations: Integration[];
  users: WorkspaceUser[];
  notifications: NotificationItem[];
  analytics: AnalyticsData;
  billing: BillingData;
  settings: SettingsData;
  support: SupportData;
  account: AccountData;
  currentUser: WorkspaceUser;
}
