import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import recipes from "@/data/recipes.json";

export default function PopularRecipesSection() {
  const popularRecipes = [...recipes]
    .filter((recipe) => recipe.status === "active")
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 3);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Badge className="mb-4 rounded-full border-rose-200/60 bg-rose-100/70 px-3 py-1 text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
              <Flame className="mr-1 h-3.5 w-3.5" />
              Most loved by the community
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Popular Recipes
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
              The recipes people are loving the most right now. Based on likes
              from the community and trending engagement.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="w-fit rounded-xl border-white/30 bg-white/60 backdrop-blur-md hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <Link href="/browse">
              Browse More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {popularRecipes.map((recipe, index) => (
            <article
              key={recipe._id}
              className="group overflow-hidden rounded-3xl border border-white/20 bg-white/60 shadow-[0_10px_50px_rgba(244,63,94,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(244,63,94,0.12)] dark:border-white/10 dark:bg-white/5"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-white/75 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-200">
                    #{index + 1} Trending
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-200/90">
                      {recipe.cuisineType}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      {recipe.recipeName}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Recipe by
                    </p>
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {recipe.authorName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-rose-200/60 bg-rose-50 px-3 py-1.5 text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold">
                      {recipe.likesCount}
                    </span>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {recipe.instructions}
                </p>

                <div className="mt-5">
                  <Button
                    asChild
                    className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600"
                  >
                    <Link href={`/recipes/${recipe._id}`}>
                      View Recipe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
