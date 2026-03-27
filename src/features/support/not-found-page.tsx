import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="max-w-xl">
        <CardContent className="flex flex-col items-start gap-4 p-8">
          <div className="rounded-2xl bg-secondary p-3 text-primary">
            <Compass className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">This workspace page does not exist.</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              The route may not be available yet, or the link is outdated. Return to the workforce dashboard to continue.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard">Go to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
