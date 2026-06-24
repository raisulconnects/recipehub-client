"use client";

import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import AdminNav from "@/components/dashboard/AdminNav";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({ children }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <section className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-[2rem] border border-white/20 bg-white/70 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading admin panel...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <AdminNav />
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
