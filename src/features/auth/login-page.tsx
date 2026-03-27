import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/auth-store";

const loginSchema = z.object({
  email: z.string().email("Enter a valid work email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "oscar@example.com",
      password: "password123",
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    await login(values.email, values.password);
    const redirectTo = (location.state as { from?: string } | null)?.from ?? "/dashboard";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-hero-glow">
      <div className="container flex min-h-screen items-center justify-center py-10">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/60 bg-sidebar p-8 text-sidebar-foreground shadow-panel sm:p-10">
            <div className="max-w-xl space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sidebar-foreground/55">
                  Aigentics Workforce Cloud
                </p>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Manage AI employees with the same clarity you expect from a real team.
                </h1>
                <p className="text-base leading-7 text-sidebar-foreground/72">
                  Hire specialized agents, supervise live work, review approvals, and keep every digital teammate accountable in one calm operational workspace.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Global Agent Manager chat with workspace-wide context",
                  "Dedicated profiles and chats for every specialist agent",
                  "Approval visibility, audit trails, and operational health",
                  "Knowledge and integration coverage mapped to each agent",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6">
                    <ShieldCheck className="mb-3 h-5 w-5 text-sidebar-foreground" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="border-white/80 bg-white/96">
            <CardHeader className="space-y-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <LockKeyhole className="h-3.5 w-3.5" />
                Secure workspace login
              </div>
              <CardTitle>Sign in to the operations workspace</CardTitle>
              <CardDescription>
                Authentication is currently wired as a token placeholder. Replace the mock login with your production auth provider when backend APIs are ready.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Work email
                  </label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email ? (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <Input id="password" type="password" {...register("password")} />
                  {errors.password ? (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  ) : null}
                </div>
                <Button className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Enter workspace"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 rounded-2xl bg-secondary/80 p-4 text-sm leading-6 text-muted-foreground">
                Invitation acceptance, SSO, and password recovery can be added behind this login entry point without changing the route structure.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
