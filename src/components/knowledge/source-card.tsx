import { FileText, Globe2, HelpCircle, MessageSquareText, PlayCircle, SquareStack } from "lucide-react";
import { Link } from "react-router-dom";

import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { KnowledgeSource } from "@/types/workspace";

const iconMap = {
  file: FileText,
  url: Globe2,
  faq: HelpCircle,
  video: PlayCircle,
  chat: MessageSquareText,
  doc: SquareStack,
};

export function SourceCard({ source }: { source: KnowledgeSource }) {
  const Icon = iconMap[source.type];

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-secondary p-3 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{source.title}</h3>
              <p className="text-sm text-muted-foreground">
                {source.coverage} • {source.sizeLabel}
              </p>
            </div>
          </div>
          <StatusBadge status={source.status} />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{source.summary}</p>
        <div className="rounded-2xl bg-secondary/60 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What it adds</p>
          <p className="mt-2 text-sm leading-6 text-foreground">{source.detail}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">Updated {source.updatedAt}</span>
          <Button asChild variant="outline">
            <Link to={`/knowledge/${source.id}`}>Open source</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
