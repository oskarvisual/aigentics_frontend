import {
  BarChart3,
  Bell,
  BookOpenText,
  Bot,
  BriefcaseBusiness,
  CircleDollarSign,
  CreditCard,
  Headset,
  LayoutDashboard,
  LifeBuoy,
  MessageSquareText,
  Puzzle,
  Settings,
  UserCircle2,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Team", to: "/team", icon: Bot },
  { label: "Hire Agents", to: "/hire-agents", icon: BriefcaseBusiness },
  { label: "Conversations", to: "/conversations", icon: MessageSquareText, badge: "7" },
  { label: "Knowledge", to: "/knowledge", icon: BookOpenText },
  { label: "Integrations", to: "/integrations", icon: Puzzle },
  { label: "Users", to: "/users", icon: Users },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Notifications", to: "/notifications", icon: Bell, badge: "3" },
  { label: "Billing", to: "/billing", icon: CreditCard },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Support", to: "/support", icon: Headset },
  { label: "My Account", to: "/account", icon: UserCircle2 },
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="rounded-3xl border border-white/10 bg-sidebar-accent/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/55">
              Workspace
            </p>
            <p className="mt-1 text-sm font-semibold text-sidebar-foreground">
              Aigentics HQ
            </p>
          </div>
          <div className="rounded-full bg-sidebar-active/20 px-2 py-1 text-xs font-semibold text-sidebar-foreground">
            Growth
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/5 p-3 text-sidebar-foreground/80">
          <CircleDollarSign className="h-4 w-4" />
          <span className="text-sm">Operational command center</span>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-white/7 hover:text-sidebar-foreground",
                isActive && "bg-sidebar-active text-white",
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.badge ? (
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className={isActive ? "border-white/10 bg-white/20 text-white" : "border-white/10 bg-white/10 text-sidebar-foreground"}
                  >
                    {item.badge}
                  </Badge>
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sidebar-foreground/80">
        <div className="flex items-center gap-3">
          <LifeBuoy className="h-5 w-5" />
          <div>
            <p className="font-medium text-sidebar-foreground">Trust & auditability</p>
            <p className="mt-1 text-xs leading-5 text-sidebar-foreground/60">
              Approval logs and agent actions are continuously tracked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
