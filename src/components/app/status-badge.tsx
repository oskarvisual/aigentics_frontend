import { Badge } from "@/components/ui/badge";

type StatusKind =
  | "active"
  | "training"
  | "awaiting_approval"
  | "handoff"
  | "offline"
  | "open"
  | "resolved"
  | "escalated"
  | "connected"
  | "syncing"
  | "attention"
  | "processing"
  | "ready"
  | "attention_needed"
  | "critical"
  | "high"
  | "medium"
  | "low";

const toneMap: Record<StatusKind, { label: string; variant: Parameters<typeof Badge>[0]["variant"] }> = {
  active: { label: "Active", variant: "success" },
  training: { label: "Training", variant: "secondary" },
  awaiting_approval: { label: "Awaiting approval", variant: "warning" },
  handoff: { label: "Handoff", variant: "outline" },
  offline: { label: "Offline", variant: "destructive" },
  open: { label: "Open", variant: "default" },
  resolved: { label: "Resolved", variant: "success" },
  escalated: { label: "Escalated", variant: "warning" },
  connected: { label: "Connected", variant: "success" },
  syncing: { label: "Syncing", variant: "secondary" },
  attention: { label: "Needs attention", variant: "warning" },
  processing: { label: "Processing", variant: "secondary" },
  ready: { label: "Ready", variant: "success" },
  attention_needed: { label: "Needs attention", variant: "warning" },
  critical: { label: "Critical", variant: "destructive" },
  high: { label: "High", variant: "warning" },
  medium: { label: "Medium", variant: "default" },
  low: { label: "Low", variant: "secondary" },
};

export function StatusBadge({ status }: { status: StatusKind }) {
  const config = toneMap[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
