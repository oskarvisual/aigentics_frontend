import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Integration } from "@/types/workspace";

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{integration.name}</h3>
            <p className="text-sm capitalize text-muted-foreground">
              {integration.category.replace("_", " ")} integration
            </p>
          </div>
          <StatusBadge status={integration.status} />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {integration.description}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-secondary/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Ownership
            </p>
            <p className="mt-2 font-semibold capitalize">{integration.ownership}</p>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Last sync
            </p>
            <p className="mt-2 font-semibold">{integration.lastSync}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-primary/6 p-3 text-sm text-primary">
          <ShieldCheck className="h-4 w-4" />
          {integration.authType} • {integration.accessLevel}
        </div>
        <div className="mt-auto">
          <Button asChild variant="outline">
            <Link to={`/integrations/${integration.id}`}>
              View integration
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
