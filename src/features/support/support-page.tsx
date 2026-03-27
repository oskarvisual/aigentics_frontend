import { BookOpen, CircleHelp, LifeBuoy, Rocket } from "lucide-react";

import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupportQuery } from "@/hooks/use-workspace-queries";

export function SupportPage() {
  const { data, isLoading, isError, refetch } = useSupportQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer support"
        title="Support"
        description="Provide help center access, support contact paths, issue reporting, onboarding guidance, and links to documentation or platform status."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {data.resources.map((resource, index) => {
          const Icon = index === 0 ? BookOpen : index === 1 ? LifeBuoy : CircleHelp;

          return (
            <Card key={resource.title}>
              <CardContent className="space-y-4 p-5">
                <div className="rounded-2xl bg-secondary p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{resource.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {resource.detail}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Onboarding checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.onboardingChecklist.map((item) => (
              <div key={item} className="rounded-2xl bg-secondary/70 p-4 text-sm leading-6">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Report an issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-white/90 p-4 text-sm leading-6 text-muted-foreground">
              Capture product feedback, workspace issues, and integration failures from here. Wire this panel to your support intake channel or ticketing system.
            </div>
            <Button>
              <Rocket className="h-4 w-4" />
              Contact support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
