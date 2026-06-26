"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Eye, Loader2 } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";

export default function PurchasedRecipesPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchPurchases = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;
        const res = await fetch("/api/payments/purchased", {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        const data = await res.json();
        setPurchases(Array.isArray(data) ? data : []);
      } catch {
        setPurchases([]);
      }
      setLoading(false);
    };
    fetchPurchases();
  }, [user]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Purchased Recipes"
        description="Recipes you supported so you can revisit them anytime."
      />

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
        </div>
      ) : purchases.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          No purchases yet.{" "}
          <Link href="/browse" className="text-emerald-500 underline">
            Browse recipes to support creators
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {purchases.map((p) => {
            const recipe = p.recipeId;
            return (
              <div
                key={p._id}
                className="rounded-[1.5rem] border border-white/20 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="mb-3 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                      <BadgeCheck className="mr-2 h-3.5 w-3.5" />
                      Supported
                    </div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {recipe?.recipeName || "Unknown Recipe"}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      Amount: ${p.amount} ·{" "}
                      {p.paidAt
                        ? new Date(p.paidAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  {recipe && (
                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href={`/recipes/${recipe._id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
