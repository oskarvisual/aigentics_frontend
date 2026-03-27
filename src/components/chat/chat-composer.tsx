import { SendHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatComposer({
  placeholder,
}: {
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="rounded-2xl border border-border/80 bg-white/90 p-4 shadow-sm">
      <Textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={placeholder}
        className="min-h-[96px] resize-none border-0 px-0 pb-3 pt-0 focus-visible:ring-0"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
        <p className="text-xs text-muted-foreground">
          Messages are locally mocked until the backend chat endpoint is wired.
        </p>
        <Button disabled={!draft.trim()}>
          Send
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
