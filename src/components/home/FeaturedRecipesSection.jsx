import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getFeaturedRecipes() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/recipes/featured`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function FeaturedRecipesSection() {
  const featuredRecipes = await getFeaturedRecipes();

  if (!featuredRecipes.length) return null;

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Badge className="mb-4 rounded-full border-emerald-200/60 bg-emerald-100/70 px-3 py-1 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Featured collection
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Featured Recipes
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
              Handpicked recipes highlighted by the platform. These are the
              dishes currently featured from our growing food community.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-fit rounded-xl border-white/30 bg-white/60 backdrop-blur-md hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <Link href="/browse">
              View All Recipes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredRecipes.map((recipe) => (
            <article
              key={recipe._id}
              className="group overflow-hidden rounded-3xl border border-white/20 bg-white/60 shadow-[0_10px_50px_rgba(16,185,129,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)] dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/20 bg-white/75 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-200">
                    {recipe.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    {recipe.cuisineType}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    <Clock3 className="h-4 w-4 text-emerald-500" />
                    <span>{recipe.preparationTime} min</span>
                  </div>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-zinc-900 dark:text-white">
                  {recipe.recipeName}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {recipe.instructions}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      By {recipe.authorName}
                    </p>
                  </div>
                  <Button
                    asChild
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                  >
                    <Link href={`/recipes/${recipe._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
