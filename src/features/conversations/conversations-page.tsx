import { Filter, MessageSquareText, ShieldCheck, UserRoundCog } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { ChatComposer } from "@/components/chat/chat-composer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useConversationsQuery } from "@/hooks/use-workspace-queries";
import type { ConversationStatus, Priority } from "@/types/workspace";

const statusFilters: Array<ConversationStatus | "all"> = [
  "all",
  "open",
  "awaiting_approval",
  "escalated",
  "resolved",
];

const priorityFilters: Array<Priority | "all"> = [
  "all",
  "critical",
  "high",
  "medium",
  "low",
];

export function ConversationsPage() {
  const { data, isLoading, isError, refetch } = useConversationsQuery();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ConversationStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredConversations = useMemo(
    () =>
      (data ?? []).filter((conversation) => {
        const matchesQuery =
          conversation.subject.toLowerCase().includes(query.toLowerCase()) ||
          conversation.customer.toLowerCase().includes(query.toLowerCase()) ||
          conversation.assignedAgentName.toLowerCase().includes(query.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || conversation.status === statusFilter;
        const matchesPriority =
          priorityFilter === "all" || conversation.priority === priorityFilter;

        return matchesQuery && matchesStatus && matchesPriority;
      }),
    [data, priorityFilter, query, statusFilter],
  );

  useEffect(() => {
    if (!selectedId && filteredConversations[0]) {
      setSelectedId(filteredConversations[0].id);
    }

    if (selectedId && !filteredConversations.some((item) => item.id === selectedId)) {
      setSelectedId(filteredConversations[0]?.id ?? null);
    }
  }, [filteredConversations, selectedId]);

  const selectedConversation = filteredConversations.find(
    (conversation) => conversation.id === selectedId,
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
        eyebrow="Unified inbox"
        title="Conversations"
        description="Supervise live customer and candidate threads, track which agent responded, add internal notes, and intervene when approvals or handoffs are required."
      />

      <div className="grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search conversations"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Filter className="h-4 w-4 text-primary" />
                Status
              </p>
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
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Priority
              </p>
              <div className="flex flex-wrap gap-2">
                {priorityFilters.map((filter) => (
                  <Button
                    key={filter}
                    size="sm"
                    variant={priorityFilter === filter ? "default" : "outline"}
                    onClick={() => setPriorityFilter(filter)}
                  >
                    {filter === "all" ? "All" : filter}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedId(conversation.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    selectedId === conversation.id
                      ? "border-primary bg-primary/5"
                      : "border-border/70 bg-white/90 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold">{conversation.subject}</p>
                    <StatusBadge status={conversation.priority} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {conversation.customer} • {conversation.channel}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {conversation.lastMessage}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{conversation.assignedAgentName}</span>
                    <span>{conversation.lastUpdated}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {!selectedConversation ? (
          <EmptyState
            icon={MessageSquareText}
            title="No conversations match the current filters"
            description="Adjust the filters or search terms to surface active threads."
          />
        ) : (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle>{selectedConversation.subject}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedConversation.customer} • {selectedConversation.channel} • {selectedConversation.assignedAgentName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge status={selectedConversation.status} />
                    {selectedConversation.needsApproval ? (
                      <StatusBadge status="awaiting_approval" />
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  {selectedConversation.thread.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.senderType === "agent"
                          ? "bg-secondary/70"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2 text-xs opacity-70">
                        <span>{message.author}</span>
                        <span>{message.timestamp}</span>
                      </div>
                      {message.body}
                    </div>
                  ))}
                </div>

                <ChatComposer placeholder="Add an internal note or prepare a handoff response..." />
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Internal notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedConversation.notes.map((note) => (
                    <div key={note} className="rounded-2xl bg-secondary/70 p-4 text-sm leading-6">
                      {note}
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Control actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-3">
                  <Button>
                    <UserRoundCog className="h-4 w-4" />
                    Take over
                  </Button>
                  <Button variant="outline">Assign handoff</Button>
                  <Button variant="outline">Request approval</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
