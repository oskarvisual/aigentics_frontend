import { Bot, Compass, MessageSquareMore, ShieldCheck } from "lucide-react";

import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatThread } from "@/components/chat/chat-thread";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { workspaceSnapshot } from "@/services/mock-data";

const manager = workspaceSnapshot.agents.find((agent) => agent.id === "agent-manager");

const suggestions = [
  "What needs approval right now?",
  "Where is the team underperforming today?",
  "Summarize integration health in one paragraph.",
  "What should I review before the next leadership meeting?",
];

export function AgentManagerDock() {
  if (!manager) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-5 right-5 z-30 h-14 rounded-full px-5 shadow-panel">
          <Bot className="h-5 w-5" />
          Agent Manager
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-2xl overflow-y-auto border-l border-white/70 bg-background">
        <SheetHeader>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Manager channel
          </div>
          <SheetTitle>Ask the Agent Manager</SheetTitle>
          <SheetDescription>
            Use this global operational chat to request summaries, health checks, recommendations, or workforce changes from anywhere in the workspace.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            {suggestions.map((prompt) => (
              <div key={prompt} className="rounded-2xl border border-border/70 bg-white/90 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Compass className="h-4 w-4" />
                  Suggested prompt
                </div>
                <p className="mt-2 text-sm leading-6 text-foreground">{prompt}</p>
              </div>
            ))}
          </div>

          <ChatThread
            title={manager.name}
            subtitle="Global operational chat with live workforce context"
            agent={manager}
            messages={manager.messages}
          />

          <div className="rounded-2xl border border-border/70 bg-white/90 p-5">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquareMore className="h-4 w-4 text-primary" />
              <p className="font-medium">Send a manager instruction</p>
            </div>
            <ChatComposer placeholder="Ask for a summary, recommendation, approval review, or staffing adjustment..." />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
