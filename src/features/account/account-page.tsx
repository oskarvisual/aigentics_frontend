import { BellRing, KeyRound, Link2, UserCircle2 } from "lucide-react";

import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccountQuery } from "@/hooks/use-workspace-queries";

export function AccountPage() {
  const { data, isLoading, isError, refetch } = useAccountQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Personal settings"
        title="My Account"
        description="Manage your profile, security posture, sessions, notification preferences, and connected personal accounts."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-secondary p-3 text-primary">
                <UserCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-semibold">{data.name}</p>
                <p className="text-sm text-muted-foreground">{data.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{data.email}</p>
                <p className="text-sm text-muted-foreground">{data.timezone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Password & security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl bg-secondary/70 p-4">
              <div className="flex items-center gap-2 font-medium">
                <KeyRound className="h-4 w-4 text-primary" />
                Security controls
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Password reset, MFA management, and recovery settings can be mounted here when connected to the production auth provider.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.sessions.map((session) => (
              <div key={session} className="rounded-2xl bg-secondary/70 p-4 text-sm">
                {session}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notification preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.notifications.map((item) => (
              <div key={item} className="rounded-2xl bg-secondary/70 p-4 text-sm">
                <div className="flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-primary" />
                  {item}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connected personal accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.connectedAccounts.map((account) => (
              <div key={account} className="rounded-2xl bg-secondary/70 p-4 text-sm">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  {account}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
