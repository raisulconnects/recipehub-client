"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <section className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-[2rem] border border-white/20 bg-white/70 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading dashboard...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <DashboardNav />
            <Separator className="bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent dark:via-emerald-800/40" />
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-6 lg:p-10">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
