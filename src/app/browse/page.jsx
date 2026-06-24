"use client";

import { useEffect, useMemo, useState } from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const RECIPES_PER_PAGE = 6;

export default function BrowsePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch("/api/recipes?limit=100")
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(recipes.map((r) => r.category))];
    return ["All", ...unique];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    const active = recipes.filter((r) => r.status === "active");
    if (selectedCategory === "All") return active;
    return active.filter((r) => r.category === selectedCategory);
  }, [recipes, selectedCategory]);

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);

  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * RECIPES_PER_PAGE;
    return filteredRecipes.slice(start, start + RECIPES_PER_PAGE);
  }, [filteredRecipes, currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-50 via-white to-teal-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/30" />
      <div className="absolute top-10 left-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <Badge className="mb-4 rounded-full border-emerald-200/60 bg-emerald-100/70 px-3 py-1 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            Browse recipe collection
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Explore all recipes
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
            Discover dishes from different cuisines and categories, then open
            any recipe to see full details, likes, favorites, and purchase
            options later.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "border-white/20 bg-white/70 text-zinc-700 backdrop-blur-md hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Showing{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {paginatedRecipes.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {filteredRecipes.length}
            </span>{" "}
            recipes
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : paginatedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/20 bg-white/60 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              No recipes found
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Try changing the category filter to explore more recipes.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="rounded-xl border-white/20 bg-white/70 dark:border-white/10 dark:bg-white/5"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all ${
                    page === currentPage
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                      : "border border-white/20 bg-white/70 text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="rounded-xl border-white/20 bg-white/70 dark:border-white/10 dark:bg-white/5"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
