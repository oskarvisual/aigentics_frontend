import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "@/layouts/app-shell";
import { AccountPage } from "@/features/account/account-page";
import { AnalyticsPage } from "@/features/analytics/analytics-page";
import { LoginPage } from "@/features/auth/login-page";
import { BillingPage } from "@/features/billing/billing-page";
import { ConversationsPage } from "@/features/conversations/conversations-page";
import { DashboardPage } from "@/features/dashboard/dashboard-page";
import { HireAgentsPage } from "@/features/hiring/hire-agents-page";
import { IntegrationDetailPage } from "@/features/integrations/integration-detail-page";
import { IntegrationsPage } from "@/features/integrations/integrations-page";
import { KnowledgeDetailPage } from "@/features/knowledge/knowledge-detail-page";
import { KnowledgePage } from "@/features/knowledge/knowledge-page";
import { NotificationsPage } from "@/features/notifications/notifications-page";
import { SettingsPage } from "@/features/settings/settings-page";
import { NotFoundPage } from "@/features/support/not-found-page";
import { SupportPage } from "@/features/support/support-page";
import { AgentDetailPage } from "@/features/team/agent-detail-page";
import { TeamPage } from "@/features/team/team-page";
import { UsersPage } from "@/features/users/users-page";
import { ProtectedRoute, PublicOnlyRoute } from "@/routes/route-guards";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:agentId" element={<AgentDetailPage />} />
            <Route path="/hire-agents" element={<HireAgentsPage />} />
            <Route path="/conversations" element={<ConversationsPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/knowledge/:sourceId" element={<KnowledgeDetailPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/integrations/:integrationId" element={<IntegrationDetailPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
