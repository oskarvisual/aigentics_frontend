import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AgentManagerDock } from "@/components/layout/agent-manager-dock";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useRealtime } from "@/hooks/use-realtime";
import { useNotificationsQuery } from "@/hooks/use-workspace-queries";
import { useAuth } from "@/store/auth-store";

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token } = useAuth();
  const { data: notifications = [] } = useNotificationsQuery();
  const realtime = useRealtime(token ?? undefined);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="hidden w-[292px] border-r border-sidebar-border bg-sidebar px-5 py-6 lg:block">
          <SidebarNav />
        </aside>

        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="border-r border-sidebar-border bg-sidebar p-5 text-sidebar-foreground">
            <SidebarNav onNavigate={() => setIsSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            notificationCount={notifications.filter((item) => item.unread).length}
            realtimeLabel={realtime.label}
          />
          <ScrollArea className="flex-1">
            <main className="container py-6 sm:py-8">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>

      <AgentManagerDock />
    </div>
  );
}
