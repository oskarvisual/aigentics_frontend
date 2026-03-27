import { CreditCard, Package2 } from "lucide-react";

import { ErrorState } from "@/components/app/error-state";
import { LoadingState } from "@/components/app/loading-state";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBillingQuery } from "@/hooks/use-workspace-queries";

export function BillingPage() {
  const { data, isLoading, isError, refetch } = useBillingQuery();

  if (isLoading) {
    return <LoadingState lines={8} />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Commercial controls"
        title="Billing"
        description="Track plan usage, active agents, seats, knowledge storage, invoices, and payment details with enterprise-grade visibility."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Current plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between gap-3 rounded-2xl bg-secondary/70 p-4">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="mt-2 text-2xl font-semibold">{data.plan}</p>
                <p className="mt-1 text-sm text-muted-foreground">Renews on {data.renewalDate}</p>
              </div>
              <Package2 className="h-6 w-6 text-primary" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {data.usage.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/70 bg-white/90 p-4">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.change}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Upgrade plan</Button>
              <Button variant="outline">Downgrade placeholder</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-white/90 p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">
                    {data.paymentMethod.brand} ending in {data.paymentMethod.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expires {data.paymentMethod.expiry}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline">Update payment method</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice history</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="success">{invoice.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
