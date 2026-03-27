import { Bell, ChevronsUpDown, LogOut, Menu, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/auth-store";

export function Topbar({
  onOpenSidebar,
  notificationCount,
  realtimeLabel,
}: {
  onOpenSidebar: () => void;
  notificationCount: number;
  realtimeLabel: string;
}) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Button variant="outline" size="icon" className="lg:hidden" onClick={onOpenSidebar}>
          <Menu className="h-4 w-4" />
        </Button>

        <div className="hidden min-w-[240px] items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm sm:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents, approvals, or sources"
            className="h-auto border-0 px-0 py-0 shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-secondary/80 px-3 py-2 text-xs font-medium text-muted-foreground md:flex">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
            {realtimeLabel}
          </div>
          <Button asChild variant="outline" size="icon">
            <Link to="/notifications">
              <Bell className="h-4 w-4" />
            </Link>
          </Button>
          {notificationCount > 0 ? <Badge variant="warning">{notificationCount}</Badge> : null}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 rounded-2xl px-4">
                <div className="text-left">
                  <p className="text-sm font-semibold">{user?.name ?? "Workspace User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.role ?? "admin"}</p>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <p>{user?.name}</p>
                <p className="mt-1 text-xs font-normal text-muted-foreground">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account">My account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Security settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  void logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
