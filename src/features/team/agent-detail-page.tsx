import { ArrowLeftRight, ShieldAlert } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { ActivityTimeline } from "@/components/app/activity-timeline";
import { AgentAvatar } from "@/components/app/agent-avatar";
import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatThread } from "@/components/chat/chat-thread";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgentQuery } from "@/hooks/use-workspace-queries";

export function AgentDetailPage() {
  const { agentId } = useParams();
  const { data: agent, isLoading, isError, refetch } = useAgentQuery(agentId);

  if (isLoading) {
    return <LoadingState lines={10} />;
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!agent) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Agent profile not found"
        description="The requested agent could not be loaded. It may have been removed or the route is incorrect."
        actionLabel="Return to team"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Agent profile"
        title={agent.name}
        description={agent.summary}
        actions={
          <>
            <StatusBadge status={agent.status} />
            <Button variant="outline" asChild>
              <Link to="/team">Back to team</Link>
            </Button>
          </>
        }
      />

      <Card>
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <AgentAvatar agent={agent} />
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">{agent.role}</p>
                  <h2 className="text-2xl font-semibold">{agent.name}</h2>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  {agent.personality}
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-secondary/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Mission
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">{agent.identity.mission}</p>
              </div>
              <div className="rounded-2xl bg-secondary/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Working style
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">{agent.identity.style}</p>
              </div>
              <div className="rounded-2xl bg-secondary/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Supervision
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {agent.identity.supervision}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-border/70 bg-white/90 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Performance snapshot
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Resolution rate</p>
                  <p className="text-xl font-semibold">{agent.performance.resolutionRate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response time</p>
                  <p className="text-xl font-semibold">{agent.performance.responseTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality</p>
                  <p className="text-xl font-semibold">{agent.performance.qualityScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approvals</p>
                  <p className="text-xl font-semibold">{agent.performance.approvalsNeeded}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/90 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Human controls
              </p>
              <div className="mt-4 grid gap-2">
                <Button variant="outline">
                  <ArrowLeftRight className="h-4 w-4" />
                  Start handoff
                </Button>
                <Button variant="outline">Pause autonomous actions</Button>
                <Button>Review approvals</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <ChatThread
            title={`Chat with ${agent.name}`}
            subtitle="Dedicated operational thread for this agent"
            agent={agent}
            messages={agent.messages}
          />
          <ChatComposer placeholder={`Message ${agent.name} about training, workload, or next actions...`} />
        </div>
        <ActivityTimeline items={agent.activity} title="Recent actions" />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge & access</TabsTrigger>
          <TabsTrigger value="training">Training history</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Pending tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agent.pendingTasks.map((task) => (
                  <div key={task.id} className="rounded-2xl bg-secondary/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{task.title}</p>
                      <StatusBadge status={task.status === "awaiting_approval" ? "awaiting_approval" : "active"} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{task.dueLabel}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What it plans to do next</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{agent.nextAction}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Channels assigned</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agent.channels.map((channel) => (
                  <div key={channel} className="rounded-2xl bg-secondary/70 px-4 py-3 text-sm">
                    {channel}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="knowledge">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>What this agent knows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agent.knows.map((item) => (
                  <div key={item} className="rounded-2xl bg-secondary/70 px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agent.tools.map((tool) => (
                  <div key={tool} className="rounded-2xl bg-secondary/70 px-4 py-3 text-sm">
                    {tool}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agent.permissions.map((permission) => (
                  <div key={permission} className="rounded-2xl bg-secondary/70 px-4 py-3 text-sm">
                    {permission}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="training">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Notes and training history</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agent.trainingHistory.map((entry) => (
                  <div key={entry.id} className="rounded-2xl border border-border/70 bg-white/90 p-4">
                    <p className="font-medium">{entry.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.detail}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {entry.timestamp}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Approvals needed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">
                  {agent.approvalsNeeded > 0
                    ? `${agent.approvalsNeeded} actions require human review before the agent can continue.`
                    : "This agent has no blocked approvals right now."}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
