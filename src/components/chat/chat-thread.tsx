import { AgentAvatar } from "@/components/app/agent-avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent, ChatMessage } from "@/types/workspace";

export function ChatThread({
  title,
  subtitle,
  agent,
  messages,
}: {
  title: string;
  subtitle: string;
  agent?: Agent;
  messages: ChatMessage[];
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col p-0">
        <div className="border-b border-border/80 px-5 py-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex-1 space-y-4 p-5">
          {messages.map((message) => {
            const isAgent = message.senderType === "agent";
            const isSystem = message.senderType === "system";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${message.senderType === "user" ? "justify-end" : "justify-start"}`}
              >
                {isAgent && agent ? <AgentAvatar agent={agent} /> : null}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.senderType === "user"
                      ? "bg-primary text-primary-foreground"
                      : isSystem
                        ? "border border-dashed border-border bg-secondary/70 text-muted-foreground"
                        : "bg-secondary/70 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 pb-1 text-xs opacity-75">
                    <span>{message.author}</span>
                    <span>{message.timestamp}</span>
                  </div>
                  <p>{message.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
