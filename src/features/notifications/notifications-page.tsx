import { Bell, BellOff, ShieldAlert } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNotificationsQuery } from "@/hooks/use-workspace-queries";

export function NotificationsPage() {
  const { data, isLoading, isError, refetch } = useNotificationsQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operational alerts"
        title="Notifications"
        description="Stay on top of approval requests, agent alerts, failed actions, integration problems, and recommendations from the Agent Manager."
      />

      {data.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="No notifications"
          description="There are currently no approval requests, failures, or escalations requiring attention."
        />
      ) : (
        <div className="space-y-4">
          {data.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-secondary p-3 text-primary">
                    {notification.category === "alert" || notification.category === "escalation" ? (
                      <ShieldAlert className="h-5 w-5" />
                    ) : (
                      <Bell className="h-5 w-5" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold">{notification.title}</p>
                      {notification.unread ? <Badge variant="warning">Unread</Badge> : null}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {notification.createdAt}
                    </p>
                  </div>
                </div>
                {notification.actionLabel ? (
                  <Badge variant="outline">{notification.actionLabel}</Badge>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
