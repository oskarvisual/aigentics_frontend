import type { HTMLAttributes } from "react";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";

const toneStyles = {
  info: "border-primary/20 bg-primary/5 text-foreground",
  warning: "border-warning/30 bg-warning/10 text-warning-foreground",
  danger: "border-destructive/20 bg-destructive/10 text-destructive",
} as const;

const toneIcons = {
  info: Info,
  warning: AlertTriangle,
  danger: ShieldAlert,
} as const;

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: keyof typeof toneStyles;
}

export function Alert({ className, tone = "info", children, ...props }: AlertProps) {
  const Icon = toneIcons[tone];

  return (
    <div
      className={cn("flex gap-3 rounded-2xl border px-4 py-3 text-sm", toneStyles[tone], className)}
      {...props}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="space-y-1">{children}</div>
    </div>
  );
}
