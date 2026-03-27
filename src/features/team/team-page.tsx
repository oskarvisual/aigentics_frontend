import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AgentCard } from "@/components/app/agent-card";
import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAgentsQuery } from "@/hooks/use-workspace-queries";
import type { AgentStatus } from "@/types/workspace";

const statusFilters: Array<{ label: string; value: AgentStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Training", value: "training" },
  { label: "Awaiting approval", value: "awaiting_approval" },
  { label: "Handoff", value: "handoff" },
];

export function TeamPage() {
  const { data, isLoading, isError, refetch } = useAgentsQuery();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AgentStatus | "all">("all");

  const groupedAgents = useMemo(() => {
    const filtered = (data ?? []).filter((agent) => {
      const matchesQuery =
        agent.name.toLowerCase().includes(query.toLowerCase()) ||
        agent.role.toLowerCase().includes(query.toLowerCase()) ||
        agent.summary.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === "all" || agent.status === status;

      return matchesQuery && matchesStatus;
    });

    return filtered.reduce<Record<string, typeof filtered>>((groups, agent) => {
      groups[agent.role] = [...(groups[agent.role] ?? []), agent];
      return groups;
    }, {});
  }, [data, query, status]);

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Team directory"
        title="Manage your AI team"
        description="Review every hired agent as a member of the workforce: identity, supervision status, current workload, channel access, and recent performance."
      />

      <div className="rounded-2xl border bg-white/90 p-4 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search agents by name, role, or personality"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={status === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {Object.keys(groupedAgents).length === 0 ? (
        <EmptyState
          icon={Search}
          title="No agents match the current filters"
          description="Try a broader search or clear the active status filter."
        />
      ) : (
        Object.entries(groupedAgents).map(([role, agents]) => (
          <section key={role} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{role}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {agents.length} hired {agents.length === 1 ? "agent" : "agents"} in this role group
              </p>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
