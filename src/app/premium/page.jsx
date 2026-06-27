"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  Crown,
  CheckCircle2,
  Sparkles,
  ChefHat,
  BadgeCheck,
  Loader2,
  HeartHandshake,
  PartyPopper,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const benefits = [
  {
    title: "Unlimited Recipe Uploads",
    description:
      "Free users can publish up to 2 recipes. Premium members can keep sharing without limits.",
    icon: ChefHat,
  },
  {
    title: "Premium Profile Badge",
    description:
      "Show a premium badge on your profile and stand out as an active creator supporter.",
    icon: BadgeCheck,
  },
  {
    title: "Support the Creator",
    description:
      "Premium is also a simple way to support the creators and the RecipeHub community.",
    icon: Sparkles,
  },
];

const compareItems = [
  { label: "Recipe upload limit", free: "Up to 2 recipes", premium: "Unlimited" },
  { label: "Premium badge", free: "Not included", premium: "Included" },
  { label: "Creator support", free: "No", premium: "Yes" },
];

export default function PremiumPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isPremium = user?.isPremium || false;
  const userName = user?.name?.split(" ")[0] || "there";
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout_sessions", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setCheckoutLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6">
        {isPremium ? (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] border border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-8 text-center shadow-sm backdrop-blur-xl dark:border-emerald-900/50 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-emerald-950/20 sm:p-10">
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <PartyPopper className="h-4 w-4" />
                Premium Active
              </div>

              <Crown className="h-12 w-12 text-amber-500" />
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                You&apos;re already Premium
              </h1>
              <p className="max-w-lg text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
                Nice, {userName}. Your account has full premium access — keep
                sharing recipes and enjoy the perks.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600">
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

              <div className="grid w-full gap-4 sm:grid-cols-3">
                {[
                  { icon: Crown, text: "Unlimited uploads" },
                  { icon: BadgeCheck, text: "Premium badge on profile" },
                  { icon: HeartHandshake, text: "Supporting the creator" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-2xl border border-emerald-200/50 bg-white/60 p-4 backdrop-blur dark:border-emerald-900/30 dark:bg-white/5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/40">
                      <item.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-[1.75rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/30">
                      <Icon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {item.title}
                      </h2>
                      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
                    <Crown className="h-3.5 w-3.5" />
                    Premium Membership
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    Unlock more room to share your recipes
                  </h1>

                  <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
                    Premium gives you unlimited recipe uploads, a profile badge,
                    and an easy way to support creators on RecipeHub.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/40"
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Crown className="mr-2 h-4 w-4" />
                      )}
                      {checkoutLoading ? "Redirecting..." : "Upgrade to Premium"}
                    </Button>

                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href="/dashboard/add-recipe">
                        Back to Add Recipe
                      </Link>
                    </Button>
                  </div>

                  {user ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Hey {userName}, upgrade when you want unlimited uploads.
                    </p>
                  ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Log in first, then continue to premium checkout.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-6 rounded-[2rem] border border-white/20 bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-xl shadow-emerald-500/20 dark:border-white/10 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                      <Crown className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-emerald-50/80">RecipeHub Plan</p>
                      <h2 className="text-2xl font-semibold">Premium</h2>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {[
                      "Unlimited recipe publishing",
                      "Premium badge on your profile",
                      "Simple creator support experience",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        <p className="text-sm leading-6 text-white/90">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                      Why it matters
                    </p>
                    <p className="text-sm leading-6 text-white/90">
                      Think of it like moving from a small kitchen shelf to a full
                      pantry — same cooking, just way more room to create.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-[1.75rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/30">
                      <Icon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {item.title}
                      </h2>
                      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-6 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Free vs Premium
                  </p>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    Quick comparison
                  </h2>
                </div>

                <Button
                  className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {checkoutLoading ? "Redirecting..." : "Continue to Checkout"}
                </Button>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-white/20 dark:border-white/10">
                <div className="grid grid-cols-3 bg-emerald-50/70 text-sm font-semibold text-zinc-800 dark:bg-emerald-950/20 dark:text-zinc-100">
                  <div className="px-4 py-3">Feature</div>
                  <div className="border-l border-white/20 px-4 py-3 dark:border-white/10">
                    Free
                  </div>
                  <div className="border-l border-white/20 px-4 py-3 dark:border-white/10">
                    Premium
                  </div>
                </div>

                {compareItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-3 border-t border-white/20 bg-white/40 text-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="px-4 py-4 font-medium text-zinc-900 dark:text-white">
                      {item.label}
                    </div>
                    <div className="border-l border-white/20 px-4 py-4 text-zinc-600 dark:border-white/10 dark:text-zinc-300">
                      {item.free}
                    </div>
                    <div className="border-l border-white/20 px-4 py-4 text-emerald-600 dark:border-white/10 dark:text-emerald-400">
                      {item.premium}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
