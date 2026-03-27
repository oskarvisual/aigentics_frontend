import { BookOpenText, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { SourceCard } from "@/components/knowledge/source-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKnowledgeQuery } from "@/hooks/use-workspace-queries";
import type { KnowledgeStatus } from "@/types/workspace";

const statusFilters: Array<KnowledgeStatus | "all"> = [
  "all",
  "ready",
  "processing",
  "attention_needed",
];

export function KnowledgePage() {
  const { data, isLoading, isError, refetch } = useKnowledgeQuery();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<KnowledgeStatus | "all">("all");

  const filteredSources = useMemo(
    () =>
      (data ?? []).filter((source) => {
        const matchesQuery =
          source.title.toLowerCase().includes(query.toLowerCase()) ||
          source.summary.toLowerCase().includes(query.toLowerCase()) ||
          source.coverage.toLowerCase().includes(query.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || source.status === statusFilter;

        return matchesQuery && matchesStatus;
      }),
    [data, query, statusFilter],
  );

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Training materials"
        title="Knowledge"
        description="Manage the sources that train and guide your workforce. Track processing, see which agents can access each source, and monitor coverage using human-friendly language."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white/90 p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Total sources</p>
          <p className="mt-2 text-3xl font-semibold">{data.length}</p>
        </div>
        <div className="rounded-2xl border bg-white/90 p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Processing now</p>
          <p className="mt-2 text-3xl font-semibold">
            {data.filter((source) => source.status === "processing").length}
          </p>
        </div>
        <div className="rounded-2xl border bg-white/90 p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Coverage at risk</p>
          <p className="mt-2 text-3xl font-semibold">
            {data.filter((source) => source.status === "attention_needed").length}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-white/90 p-4 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sources, owners, or coverage"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={statusFilter === filter ? "default" : "outline"}
                onClick={() => setStatusFilter(filter)}
              >
                {filter === "all" ? "All" : filter.replace("_", " ")}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredSources.length === 0 ? (
        <EmptyState
          icon={BookOpenText}
          title="No knowledge sources yet"
          description="Upload files, URLs, chats, videos, or docs to start training agents."
          actionLabel="Add source"
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      )}
    </div>
  );
}
