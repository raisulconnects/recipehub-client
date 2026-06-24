"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ChefHat, FileWarning, ReceiptText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Manage Users", href: "/admin/users", icon: Users },
  { title: "Manage Recipes", href: "/admin/recipes", icon: ChefHat },
  { title: "Reports", href: "/admin/reports", icon: FileWarning },
  { title: "Transactions", href: "/admin/transactions", icon: ReceiptText },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-white/20 bg-white/70 p-1 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:gap-0 sm:p-1.5">
      <div className="flex items-center gap-2 px-4 py-2 sm:py-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
          Admin
        </span>
      </div>

      <div className="h-6 w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-600 sm:block" />

      <nav className="flex flex-1 flex-wrap items-center gap-0.5 px-1 pb-1 sm:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                active
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              <Icon className={cn(
                "h-4 w-4 shrink-0 transition-all",
                active ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
              )} />
              <span>{item.title}</span>
              {active && (
                <span className="absolute inset-0 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/50" />
              )}
              <span className={cn(
                "absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-all",
                active ? "bg-emerald-500" : "bg-transparent"
              )} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
