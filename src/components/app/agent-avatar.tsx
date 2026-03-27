import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Agent } from "@/types/workspace";

export function AgentAvatar({ agent }: { agent: Agent }) {
  return (
    <Avatar className="h-12 w-12 border border-white/60 shadow-sm">
      <AvatarFallback>{agent.avatar}</AvatarFallback>
    </Avatar>
  );
}
