import { ShieldCheck } from "lucide-react";

import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettingsQuery } from "@/hooks/use-workspace-queries";
import { hasMinimumRole } from "@/lib/permissions";
import { useAuth } from "@/store/auth-store";

export function SettingsPage() {
  const { data, isLoading, isError, refetch } = useSettingsQuery();
  const { user } = useAuth();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!user || !hasMinimumRole(user.role, "manager")) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-4 p-8">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Permissions restricted</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Workspace settings are only visible to managers, admins, and owners.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace controls"
        title="Settings"
        description="Manage branding, security posture, permissions defaults, retention placeholders, and workspace-level operating defaults."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-sm text-muted-foreground">Workspace name</p>
              <p className="mt-2 text-xl font-semibold">{data.workspaceName}</p>
            </div>
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-sm text-muted-foreground">Branding</p>
              <p className="mt-2 text-sm leading-6 text-foreground">{data.branding}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security & compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-sm leading-6 text-foreground">{data.securitySummary}</p>
            </div>
            {data.compliance.map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-white/90 p-4 text-sm">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Defaults</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {data.defaults.map((item) => (
            <div key={item} className="rounded-2xl bg-secondary/70 p-4 text-sm leading-6">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
