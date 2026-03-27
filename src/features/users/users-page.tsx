import { ShieldCheck, UserPlus } from "lucide-react";

import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { titleCase } from "@/lib/format";
import { useUsersQuery } from "@/hooks/use-workspace-queries";

export function UsersPage() {
  const { data, isLoading, isError, refetch } = useUsersQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace administration"
        title="Users"
        description="Manage the human side of the workspace: owners, admins, managers, human operators, and viewers with clear role visibility."
        actions={
          <Button>
            <UserPlus className="h-4 w-4" />
            Invite user
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{titleCase(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "success" : "secondary"}>
                      {titleCase(user.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="max-w-sm text-muted-foreground">
                    {user.permissionsSummary}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="rounded-2xl border bg-white/90 p-5 shadow-card">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">Permission visibility</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Role-based access is represented in the UI now. Replace or extend this with backend policy enforcement before production rollout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
