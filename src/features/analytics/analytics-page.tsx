import { Award, BarChart3, BriefcaseBusiness, TrendingUp } from "lucide-react";

import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { WorkspaceTrendChart } from "@/components/charts/workspace-trend-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalyticsQuery } from "@/hooks/use-workspace-queries";

export function AnalyticsPage() {
  const { data, isLoading, isError, refetch } = useAnalyticsQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operational analytics"
        title="Analytics"
        description="Track conversation load, response quality, lead generation, recruiting pipeline, and knowledge gaps without overwhelming the workspace."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label={data.summary[0].label} value={data.summary[0].value} change={data.summary[0].change} icon={<BarChart3 className="h-5 w-5" />} />
        <StatCard label={data.summary[1].label} value={data.summary[1].value} change={data.summary[1].change} icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard label={data.summary[2].label} value={data.summary[2].value} change={data.summary[2].change} icon={<Award className="h-5 w-5" />} />
        <StatCard label={data.summary[3].label} value={data.summary[3].value} change={data.summary[3].change} icon={<BriefcaseBusiness className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace trends</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkspaceTrendChart data={data.trends} />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Top-performing agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.topAgents.map((agent) => (
              <div key={agent.agentId} className="rounded-2xl border border-border/70 bg-white/90 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.role}</p>
                  </div>
                  <p className="text-lg font-semibold">{agent.score}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{agent.output}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Knowledge gaps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.knowledgeGaps.map((gap) => (
              <div key={gap} className="rounded-2xl bg-secondary/70 p-4 text-sm leading-6">
                {gap}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recruiter pipeline summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          {data.recruiterPipeline.map((stage) => (
            <div key={stage.stage} className="rounded-2xl bg-secondary/70 p-4">
              <p className="text-sm text-muted-foreground">{stage.stage}</p>
              <p className="mt-2 text-3xl font-semibold">{stage.count}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
