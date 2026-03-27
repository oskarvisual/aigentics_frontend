import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  description,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          {icon ? (
            <div className="rounded-2xl bg-primary/8 p-3 text-primary">{icon}</div>
          ) : null}
        </div>
        <div className="space-y-1">
          {change ? <p className="text-sm font-medium text-foreground">{change}</p> : null}
          {description ? (
            <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
