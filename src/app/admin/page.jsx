"use client";

import {
  Users,
  ChefHat,
  Crown,
  FileWarning,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import StatCard from "@/components/dashboard/StatCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Badge } from "@/components/ui/badge";

export default function AdminOverviewPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  const adminName = session?.user?.name?.split(" ")[0] || "Admin";

  const stats = [
    {
      label: "Total Users",
      value: 248,
      hint: "Registered platform users",
      icon: Users,
    },
    {
      label: "Total Recipes",
      value: 96,
      hint: "Recipes published platform-wide",
      icon: ChefHat,
    },
    {
      label: "Premium Members",
      value: 37,
      hint: "Users with premium access",
      icon: Crown,
    },
    {
      label: "Total Reports",
      value: 12,
      hint: "Pending moderation items",
      icon: FileWarning,
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title={`Welcome back, ${adminName}`}
        description="Manage users, recipes, reports, and platform activity from one place."
        action={
          <Badge className="rounded-full bg-emerald-500 px-4 py-1 text-white hover:bg-emerald-600">
            Admin Access
          </Badge>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            hint={item.hint}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Admin Activity
          </h2>

          <div className="flex flex-col gap-4">
            {[
              "3 new recipes are waiting for moderation review.",
              "2 user accounts were flagged for suspicious behavior.",
              "5 reports are still pending action.",
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

        <div className="flex flex-col gap-5 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-950/30">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Moderation Focus
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Keep the platform safe and useful.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
            <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              Prioritize reviewing reports, featuring strong recipes, and blocking
              abusive users when needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}