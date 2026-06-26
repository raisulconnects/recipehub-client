"use client";

import { useEffect, useRef, useState } from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, X } from "lucide-react";

export default function BrowsePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState(["All"]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);

  // Fetch categories once on mount
  useEffect(() => {
    fetch("/api/recipes?limit=100")
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          const cats = [...new Set(data.data.map((r) => r.category))];
          setCategories(["All", ...cats]);
        }
      })
      .catch(() => {});
  }, []);

  // Debounce search
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory]);

  // Fetch recipes — fully server-side
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", currentPage);
    params.set("limit", 6);
    if (selectedCategory !== "All") params.set("categories", selectedCategory);
    if (debouncedSearch) params.set("search", debouncedSearch);

    fetch(`/api/recipes?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.data || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage, selectedCategory, debouncedSearch]);

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-50 via-white to-teal-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/30" />
      <div className="absolute top-10 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

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

        {/* Search bar */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <Search className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes…"
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
          />
          {search && (
            <button
              onClick={handleClearSearch}
              className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              <X className="h-4 w-4 text-zinc-400" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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

        {/* Result count */}
        <div className="mb-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Showing{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {recipes.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {total}
            </span>{" "}
            recipes
            {debouncedSearch && (
              <span>
                {" "}
                for "<span className="font-medium">{debouncedSearch}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Recipe grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/20 bg-white/60 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              No recipes found
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Try changing the category or search term.
            </p>
          </div>
        )}

        {/* Pagination */}
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
