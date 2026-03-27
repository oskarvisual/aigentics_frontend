import { Bot, Cable, WandSparkles } from "lucide-react";

import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHireableRolesQuery } from "@/hooks/use-workspace-queries";

export function HireAgentsPage() {
  const { data, isLoading, isError, refetch } = useHireableRolesQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Hiring catalog"
        title="Hire new AI specialists"
        description="Choose specialized digital employees based on business role, operating style, recommended integrations, and the kind of work they are best suited to own."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {data.map((role) => (
          <Card key={role.role} className="h-full">
            <CardHeader className="space-y-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Bot className="h-3.5 w-3.5" />
                {role.role}
              </div>
              <CardTitle>{role.description}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <WandSparkles className="h-4 w-4 text-primary" />
                    Personality style
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{role.personality}</p>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Cable className="h-4 w-4 text-primary" />
                    Recommended integrations
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {role.integrations.join(", ")}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Ideal use cases
                  </p>
                  <div className="mt-3 space-y-2">
                    {role.useCases.map((useCase) => (
                      <div key={useCase} className="rounded-2xl bg-white p-3 text-sm shadow-sm">
                        {useCase}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Example tasks
                  </p>
                  <div className="mt-3 space-y-2">
                    {role.tasks.map((task) => (
                      <div key={task} className="rounded-2xl bg-white p-3 text-sm shadow-sm">
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button>Hire {role.role}</Button>
                <Button variant="outline">Configure role</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
