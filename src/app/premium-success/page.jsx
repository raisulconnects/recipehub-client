"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-client";
import {
  Crown,
  CheckCircle2,
  LayoutDashboard,
  ChefHat,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function PremiumSuccessContent() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const verify = useCallback(async () => {
    if (!session_id) {
      setStatus("error");
      setError("No session ID provided.");
      return;
    }

    try {
      const res = await fetch(
        `/api/payments/verify?session_id=${session_id}`,
      );

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(`Non-JSON response (${res.status}): ${text.slice(0, 200)}`);
      }

      if (!res.ok) {
        setStatus("error");
        setError(data.message || `Verification failed (${res.status}).`);
        return;
      }

      await getSession();
      setStatus("success");
    } catch (err) {
      console.error("Premium verify error:", err);
      setStatus("error");
      setError(err.message || "Could not reach the server. Please contact support.");
    }
  }, [session_id]);

  useEffect(() => {
    verify();
  }, [verify]);

  if (status === "loading") {
    return (
      <section className="flex min-h-screen items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Verifying your payment…
          </p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-[2rem] border border-red-200/50 bg-gradient-to-br from-red-50 via-white to-red-50 p-8 text-center shadow-sm dark:border-red-900/50 dark:from-red-950/30 dark:via-zinc-900 dark:to-red-950/20 sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Something went wrong
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{error}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={verify}
              className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Try Again
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 rounded-[2rem] border border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-8 text-center shadow-sm backdrop-blur-xl dark:border-emerald-900/50 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-emerald-950/20 sm:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
          <Crown className="h-8 w-8 text-amber-500" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            You now have full premium access.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200/50 bg-white/60 p-5 text-left backdrop-blur dark:border-emerald-900/30 dark:bg-white/5">
          {[
            "Unlimited recipe uploads",
            "Premium badge on your profile",
            "Support the RecipeHub creator",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/dashboard/add-recipe">
              <ChefHat className="mr-2 h-4 w-4" />
              Add a Recipe
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function PremiumSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Loading…
            </p>
          </div>
        </section>
      }
    >
      <PremiumSuccessContent />
    </Suspense>
  );
}
