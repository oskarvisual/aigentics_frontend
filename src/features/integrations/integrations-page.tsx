import { Box, Cable, CloudCog, FileCog } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { ErrorState } from "@/components/app/error-state";
import { IntegrationCard } from "@/components/app/integration-card";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegrationsQuery } from "@/hooks/use-workspace-queries";

export function IntegrationsPage() {
  const { data, isLoading, isError, refetch } = useIntegrationsQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Connection hub"
        title="Integrations"
        description="Connect shared and private systems, manage agent access, and keep every external dependency visible and auditable."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Connected</p>
            <p className="mt-2 text-3xl font-semibold">
              {data.filter((item) => item.status === "connected").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Shared vs private</p>
            <p className="mt-2 text-3xl font-semibold">
              {data.filter((item) => item.ownership === "shared").length} /{" "}
              {data.filter((item) => item.ownership === "private").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Attention needed</p>
            <p className="mt-2 text-3xl font-semibold">
              {data.filter((item) => item.status === "attention").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {data.length === 0 ? (
          <EmptyState
            icon={Cable}
            title="No integrations connected yet"
            description="Connect Gmail, Slack, CRM, ATS, MCP, or private APIs to start activating the workforce."
            actionLabel="Connect integration"
          />
        ) : (
          data.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Connect a new integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl bg-secondary/70 p-4 text-sm leading-6">
              Native connections like Gmail, Slack, Calendar, and WhatsApp with scoped permissions.
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Box className="h-4 w-4" />
              Shared third-party integrations
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Import OpenAPI or docs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl bg-secondary/70 p-4 text-sm leading-6">
              Bring in private APIs using OpenAPI specs or custom documentation to extend what agents can do.
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <FileCog className="h-4 w-4" />
              Custom API integrations
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connect MCP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl bg-secondary/70 p-4 text-sm leading-6">
              Add MCP servers for shared or tenant-private capabilities with explicit ownership and access boundaries.
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <CloudCog className="h-4 w-4" />
              MCP and internal tool access
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
