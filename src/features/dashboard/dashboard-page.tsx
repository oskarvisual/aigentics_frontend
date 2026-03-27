import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Clock3,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ActivityTimeline } from "@/components/app/activity-timeline";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardQuery } from "@/hooks/use-workspace-queries";

export function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workforce overview"
        title="Your AI workforce today"
        description="Monitor the team as a living operation: what each agent is handling, where approvals are blocking progress, and which knowledge or integrations need attention."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/team">View team</Link>
            </Button>
            <Button asChild>
              <Link to="/conversations">Open conversations</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card className="overflow-hidden">
          <CardContent className="space-y-4 p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Bot className="h-3.5 w-3.5" />
              Agent Manager narrative
            </div>
            <p className="max-w-4xl text-lg leading-8 text-foreground">{data.managerNarrative}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {data.overview.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/70 bg-white/80 p-4">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-foreground">{item.change}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.healthIndicators.map((indicator) => (
              <div key={indicator.label} className="rounded-2xl bg-secondary/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{indicator.label}</p>
                  <StatusBadge
                    status={
                      indicator.tone === "success"
                        ? "active"
                        : indicator.tone === "warning"
                          ? "awaiting_approval"
                          : "offline"
                    }
                  />
                </div>
                <p className="mt-2 text-lg font-semibold">{indicator.value}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{indicator.hint}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label={data.metrics[0].label} value={data.metrics[0].value} change={data.metrics[0].change} icon={<Clock3 className="h-5 w-5" />} />
        <StatCard label={data.metrics[1].label} value={data.metrics[1].value} change={data.metrics[1].change} icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard label={data.metrics[2].label} value={data.metrics[2].value} change={data.metrics[2].change} icon={<ShieldCheck className="h-5 w-5" />} />
        <StatCard label={data.metrics[3].label} value={data.metrics[3].value} change={data.metrics[3].change} icon={<Link2 className="h-5 w-5" />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Pending approvals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.approvals.map((approval) => (
              <div key={approval.id} className="rounded-2xl border border-border/70 bg-white/90 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{approval.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{approval.detail}</p>
                  </div>
                  <StatusBadge status={approval.priority} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>Owner: {approval.owner}</span>
                  <span>{approval.dueLabel}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.alerts.map((alert) => (
              <div key={alert.title} className="rounded-2xl border border-warning/30 bg-warning/10 p-4">
                <div className="flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  {alert.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{alert.detail}</p>
              </div>
            ))}
            {data.recommendations.map((recommendation) => (
              <div key={recommendation.title} className="rounded-2xl border border-success/20 bg-success/5 p-4">
                <p className="font-medium">{recommendation.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{recommendation.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Unresolved conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.unresolvedConversations.map((conversation) => (
              <div key={conversation.id} className="rounded-2xl bg-secondary/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{conversation.subject}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {conversation.customer} • {conversation.assignedAgentName}
                    </p>
                  </div>
                  <StatusBadge status={conversation.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{conversation.lastMessage}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Knowledge ingestion status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.ingestionStatuses.map((source) => (
              <div key={source.id} className="rounded-2xl bg-secondary/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{source.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{source.coverage}</p>
                  </div>
                  <StatusBadge status={source.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{source.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <ActivityTimeline items={data.activity} title="Recent important activity" />
        <Card>
          <CardHeader>
            <CardTitle>Integration status summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.integrationSummary.map((item) => (
              <div key={item.label} className="rounded-2xl bg-secondary/70 p-4">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-foreground">{item.change}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
