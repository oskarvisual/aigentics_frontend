import { useQuery } from "@tanstack/react-query";

import { workspaceApi } from "@/services/api";

export function useDashboardQuery() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: workspaceApi.getDashboard,
  });
}

export function useAgentsQuery() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: workspaceApi.getAgents,
  });
}

export function useAgentQuery(agentId?: string) {
  return useQuery({
    queryKey: ["agents", agentId],
    queryFn: () => workspaceApi.getAgentById(agentId ?? ""),
    enabled: Boolean(agentId),
  });
}

export function useConversationsQuery() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: workspaceApi.getConversations,
  });
}

export function useKnowledgeQuery() {
  return useQuery({
    queryKey: ["knowledge"],
    queryFn: workspaceApi.getKnowledge,
  });
}

export function useKnowledgeSourceQuery(sourceId?: string) {
  return useQuery({
    queryKey: ["knowledge", sourceId],
    queryFn: () => workspaceApi.getKnowledgeSource(sourceId ?? ""),
    enabled: Boolean(sourceId),
  });
}

export function useIntegrationsQuery() {
  return useQuery({
    queryKey: ["integrations"],
    queryFn: workspaceApi.getIntegrations,
  });
}

export function useIntegrationQuery(integrationId?: string) {
  return useQuery({
    queryKey: ["integrations", integrationId],
    queryFn: () => workspaceApi.getIntegrationById(integrationId ?? ""),
    enabled: Boolean(integrationId),
  });
}

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: workspaceApi.getUsers,
  });
}

export function useNotificationsQuery() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: workspaceApi.getNotifications,
  });
}

export function useAnalyticsQuery() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: workspaceApi.getAnalytics,
  });
}

export function useBillingQuery() {
  return useQuery({
    queryKey: ["billing"],
    queryFn: workspaceApi.getBilling,
  });
}

export function useSettingsQuery() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: workspaceApi.getSettings,
  });
}

export function useSupportQuery() {
  return useQuery({
    queryKey: ["support"],
    queryFn: workspaceApi.getSupport,
  });
}

export function useAccountQuery() {
  return useQuery({
    queryKey: ["account"],
    queryFn: workspaceApi.getAccount,
  });
}

export function useHireableRolesQuery() {
  return useQuery({
    queryKey: ["hireable-roles"],
    queryFn: workspaceApi.getHireableRoles,
  });
}
