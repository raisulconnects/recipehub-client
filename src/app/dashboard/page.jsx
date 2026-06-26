"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Crown, Heart, ChefHat, ThumbsUp, Loader2 } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import StatCard from "@/components/dashboard/StatCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverviewPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isPremium = user?.isPremium || false;

  const [stats, setStats] = useState({ recipes: 0, favorites: 0, likes: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      fetch("/api/users/stats", {
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      })
        .then((r) => r.json())
        .then((data) => {
          setStats({
            recipes: data.totalRecipes || 0,
            favorites: data.totalFavorites || 0,
            likes: data.totalLikesReceived || 0,
          });
          setStatsLoading(false);
        })
        .catch(() => setStatsLoading(false));
    })();
  }, [user?.email]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  const statItems = [
    {
      label: "Total Recipes",
      value: stats.recipes,
      hint: "Recipes created by you",
      icon: ChefHat,
    },
    {
      label: "Total Favorites",
      value: stats.favorites,
      hint: "Recipes saved for later",
      icon: Heart,
    },
    {
      label: "Likes Received",
      value: stats.likes,
      hint: "Across all published recipes",
      icon: ThumbsUp,
    },
  ];

  const userName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title={`Welcome back, ${userName}`}
        description="Track your recipes, favorites, creator support, and profile status from one place."
        action={
          isPremium ? (
            <Badge className="rounded-full bg-emerald-500 px-4 py-1 text-white hover:bg-emerald-600">
              Premium Member
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="rounded-full border-amber-300 bg-amber-50 px-4 py-1 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300"
            >
              Free Plan
            </Badge>
          )
        }
      />

      {statsLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statItems.map((item) => (
            <StatCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              hint={item.hint}
            />
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="flex flex-col gap-4">
            {[
              `Welcome to RecipeHub, ${userName}!`,
              "Start by browsing recipes or adding your own.",
              "Stats will update once you publish and save recipes.",
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/20 bg-white/60 px-4 py-4 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {!isPremium ? (
          <div className="flex flex-col gap-5 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-100 p-3 dark:bg-amber-950/30">
                <Crown className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Premium Access
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Unlock unlimited recipe uploads.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Free users can add up to 2 recipes. Upgrade when you hit the
                limit to keep publishing without restrictions.
              </p>
              <Link
                href="/premium"
                className="inline-flex rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-emerald-600 hover:to-teal-600"
              >
                Become Premium
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-3 shadow-md shadow-amber-400/30">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  You're Premium
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  All features unlocked.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-800 dark:bg-emerald-950/20">
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                You have unlimited recipe uploads, priority support, and all
                premium features.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
