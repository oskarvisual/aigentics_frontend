import { Activity, ArrowUpRight, BriefcaseBusiness, Cable, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import { AgentAvatar } from "@/components/app/agent-avatar";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent } from "@/types/workspace";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <AgentAvatar agent={agent} />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {agent.personality}
              </p>
            </div>
          </div>
          <StatusBadge status={agent.status} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-secondary/60 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Cable className="h-3.5 w-3.5" />
              Connected tools
            </div>
            <p className="mt-2 text-lg font-semibold">
              {agent.connectedTools} tools, {agent.connectedChannels} channels
            </p>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Pending work
            </div>
            <p className="mt-2 text-lg font-semibold">{agent.pendingWork} active items</p>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Activity className="h-3.5 w-3.5" />
              Performance
            </div>
            <p className="mt-2 text-lg font-semibold">{agent.performance.qualityScore}</p>
            <p className="text-sm text-muted-foreground">
              Resolution {agent.performance.resolutionRate}
            </p>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              Recent activity
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{agent.recentActivity}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Plans next
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground">{agent.nextAction}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            {agent.approvalsNeeded > 0
              ? `${agent.approvalsNeeded} approvals waiting`
              : "No approvals waiting"}
          </div>
          <Button asChild variant="outline">
            <Link to={`/team/${agent.id}`}>
              Open profile
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
