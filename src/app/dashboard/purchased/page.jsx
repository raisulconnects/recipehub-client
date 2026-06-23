import Link from "next/link";
import { BadgeCheck, Eye } from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";

const purchasedRecipes = [
  {
    id: "1",
    name: "Creamy Garlic Pasta",
    amount: "$4.99",
    date: "2026-06-21",
  },
];

export default function PurchasedRecipesPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Purchased Recipes"
        description="Recipes you supported so you can revisit them anytime."
      />

      <div className="space-y-4">
        {purchasedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="rounded-[1.5rem] border border-white/20 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <BadgeCheck className="mr-2 h-3.5 w-3.5" />
                  Supported
                </div>

                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {recipe.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Amount: {recipe.amount} · Date: {recipe.date}
                </p>
              </div>

              <Button asChild variant="outline" className="rounded-xl">
                <Link href={`/recipes/${recipe.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}