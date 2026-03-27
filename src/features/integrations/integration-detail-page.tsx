import { ShieldAlert } from "lucide-react";
import { useParams } from "react-router-dom";

import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgentQuery, useAgentsQuery, useIntegrationQuery } from "@/hooks/use-workspace-queries";

export function IntegrationDetailPage() {
  const { integrationId } = useParams();
  const { data: integration, isLoading, isError, refetch } = useIntegrationQuery(integrationId);
  const { data: agents = [] } = useAgentsQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!integration) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Integration not found"
        description="The requested integration could not be loaded."
      />
    );
  }

  const assignedAgents = agents.filter((agent) =>
    integration.assignedAgentIds.includes(agent.id),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Integration detail"
        title={integration.name}
        description={integration.description}
        actions={<StatusBadge status={integration.status} />}
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Connection detail</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Ownership</p>
              <p className="mt-2 font-semibold capitalize">{integration.ownership}</p>
            </div>
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Auth type</p>
              <p className="mt-2 font-semibold">{integration.authType}</p>
            </div>
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Last sync</p>
              <p className="mt-2 font-semibold">{integration.lastSync}</p>
            </div>
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Access level</p>
              <p className="mt-2 font-semibold">{integration.accessLevel}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assigned agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assignedAgents.map((agent) => (
              <div key={agent.id} className="rounded-2xl border border-border/70 bg-white/90 p-4">
                <p className="font-semibold">{agent.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{agent.role}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {integration.actions.map((action) => (
            <div key={action} className="rounded-2xl bg-secondary/70 p-4 text-sm font-medium">
              {action}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
