import { CheckCircle2, CircleDot, Clock3, ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimelineEvent } from "@/types/workspace";

const iconMap = {
  default: Clock3,
  success: CheckCircle2,
  warning: ShieldAlert,
  critical: CircleDot,
} as const;

const colorMap = {
  default: "bg-secondary text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  critical: "bg-destructive/12 text-destructive",
} as const;

export function ActivityTimeline({
  title = "Recent activity",
  items,
}: {
  title?: string;
  items: TimelineEvent[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map((item) => {
          const tone = item.tone ?? "default";
          const Icon = iconMap[tone];

          return (
            <div key={item.id} className="flex gap-4">
              <div className={`mt-1 rounded-2xl p-2 ${colorMap[tone]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                  {item.actor}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
