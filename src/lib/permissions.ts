import type { WorkspaceRole } from "@/types/workspace";

const roleOrder: Record<WorkspaceRole, number> = {
  owner: 5,
  admin: 4,
  manager: 3,
  human_agent: 2,
  viewer: 1,
};

export function hasMinimumRole(
  currentRole: WorkspaceRole,
  requiredRole: WorkspaceRole,
) {
  return roleOrder[currentRole] >= roleOrder[requiredRole];
}
