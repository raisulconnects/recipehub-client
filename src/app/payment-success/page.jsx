"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  LayoutDashboard,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function PaymentSuccessContent() {
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
        throw new Error(
          `Non-JSON response (${res.status}): ${text.slice(0, 200)}`,
        );
      }

      if (!res.ok) {
        setStatus("error");
        setError(data.message || `Verification failed (${res.status}).`);
        return;
      }

      setStatus("success");
    } catch (err) {
      console.error("Payment verify error:", err);
      setStatus("error");
      setError(
        err.message ||
          "Could not reach the server. Please contact support.",
      );
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
              <Link href="/browse">Browse Recipes</Link>
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
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Thank you for supporting the creator.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <Link href="/dashboard/purchased">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              View Purchased Recipes
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/browse">Continue Browsing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function PaymentSuccessPage() {
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
      <PaymentSuccessContent />
    </Suspense>
  );
}
