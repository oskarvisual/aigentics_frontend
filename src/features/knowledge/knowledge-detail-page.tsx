import { ShieldAlert } from "lucide-react";
import { useParams } from "react-router-dom";

import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgentsQuery, useKnowledgeSourceQuery } from "@/hooks/use-workspace-queries";

export function KnowledgeDetailPage() {
  const { sourceId } = useParams();
  const { data: source, isLoading, isError, refetch } = useKnowledgeSourceQuery(sourceId);
  const { data: agents = [] } = useAgentsQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!source) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Source not found"
        description="The requested knowledge source could not be loaded."
      />
    );
  }

  const accessibleAgents = agents.filter((agent) =>
    source.accessibleAgentIds.includes(agent.id),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge source"
        title={source.title}
        description={source.summary}
        actions={<StatusBadge status={source.status} />}
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Source detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Owner</p>
              <p className="mt-2 font-semibold">{source.owner}</p>
            </div>
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Coverage</p>
              <p className="mt-2 font-semibold">{source.coverage}</p>
            </div>
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What this source adds</p>
              <p className="mt-2 text-sm leading-7 text-foreground">{source.detail}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Which agents can access this source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {accessibleAgents.map((agent) => (
              <div key={agent.id} className="rounded-2xl border border-border/70 bg-white/90 p-4">
                <p className="font-semibold">{agent.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{agent.role}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
