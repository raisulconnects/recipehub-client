"use client";

import Link from "next/link";
import { ShieldX, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/auth-client";

export default function BlockedPage() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-red-200/60 bg-red-50/80 backdrop-blur-xl dark:border-red-900/30 dark:bg-red-950/20">
          <ShieldX className="h-9 w-9 text-red-500 dark:text-red-400" />
        </div>

        {/* Badge */}
        <Badge className="rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-medium text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
          Account Suspended
        </Badge>

        {/* Main Card */}
        <div className="w-full rounded-[2rem] border border-white/20 bg-white/70 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Your account has been blocked
          </h1>

          <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            Access to your RecipeHub account has been temporarily suspended by
            an administrator. You won&apos;t be able to access the dashboard,
            recipes, or any other private content until the suspension is
            lifted.
          </p>

          {/* Support box */}
          <div className="mt-6 rounded-[1.5rem] border border-white/20 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Think this was a mistake?
            </p>
            <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Reach out to our support team and we&apos;ll look into it as soon
              as possible.
            </p>
            <a
              href="mailto:support@recipehub.com"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-zinc-900/5 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-900/10 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/15"
            >
              <Mail className="h-4 w-4" />
              support@recipehub.com
            </a>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Button
              onClick={handleSignOut}
              className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          RecipeHub — Account suspension is reviewed within 24–48 hours.
        </p>
      </div>
    </section>
  );
}
