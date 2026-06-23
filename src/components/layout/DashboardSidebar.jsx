"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ChefHat,
  PlusCircle,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Recipes",
    href: "/dashboard/my-recipes",
    icon: ChefHat,
  },
  {
    title: "Add Recipe",
    href: "/dashboard/add-recipe",
    icon: PlusCircle,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Purchased",
    href: "/dashboard/purchased",
    icon: ShoppingBag,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full rounded-[2rem] border border-white/20 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="mb-6 px-3 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          RecipeHub
        </p>
        <h2 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">
          User Dashboard
        </h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-zinc-700 hover:bg-white/80 dark:text-zinc-200 dark:hover:bg-white/10",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
