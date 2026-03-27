import { hireableRoles, workspaceSnapshot } from "@/services/mock-data";
import type {
  AccountData,
  Agent,
  AnalyticsData,
  BillingData,
  Conversation,
  DashboardData,
  Integration,
  KnowledgeSource,
  NotificationItem,
  SettingsData,
  SupportData,
  WorkspaceSnapshot,
  WorkspaceUser,
} from "@/types/workspace";

export const apiBaseUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const delay = async <T,>(payload: T, ms = 280) =>
  new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(payload), ms);
  });

export const authStorageKey = "aigentics.auth-token";

export const workspaceApi = {
  login: async (email: string) =>
    delay({
      token: `demo-token:${email}`,
      user: workspaceSnapshot.currentUser,
    }),
  logout: async () => delay({ ok: true }, 120),
  getSnapshot: async (): Promise<WorkspaceSnapshot> => delay(workspaceSnapshot),
  getDashboard: async (): Promise<DashboardData> => delay(workspaceSnapshot.dashboard),
  getAgents: async (): Promise<Agent[]> => delay(workspaceSnapshot.agents),
  getAgentById: async (agentId: string): Promise<Agent | undefined> =>
    delay(workspaceSnapshot.agents.find((agent) => agent.id === agentId)),
  getConversations: async (): Promise<Conversation[]> =>
    delay(workspaceSnapshot.conversations),
  getKnowledge: async (): Promise<KnowledgeSource[]> =>
    delay(workspaceSnapshot.knowledge),
  getKnowledgeSource: async (sourceId: string): Promise<KnowledgeSource | undefined> =>
    delay(workspaceSnapshot.knowledge.find((source) => source.id === sourceId)),
  getIntegrations: async (): Promise<Integration[]> =>
    delay(workspaceSnapshot.integrations),
  getIntegrationById: async (
    integrationId: string,
  ): Promise<Integration | undefined> =>
    delay(workspaceSnapshot.integrations.find((item) => item.id === integrationId)),
  getUsers: async (): Promise<WorkspaceUser[]> => delay(workspaceSnapshot.users),
  getNotifications: async (): Promise<NotificationItem[]> =>
    delay(workspaceSnapshot.notifications),
  getAnalytics: async (): Promise<AnalyticsData> =>
    delay(workspaceSnapshot.analytics),
  getBilling: async (): Promise<BillingData> => delay(workspaceSnapshot.billing),
  getSettings: async (): Promise<SettingsData> => delay(workspaceSnapshot.settings),
  getSupport: async (): Promise<SupportData> => delay(workspaceSnapshot.support),
  getAccount: async (): Promise<AccountData> => delay(workspaceSnapshot.account),
  getHireableRoles: async () => delay([...hireableRoles]),
};
