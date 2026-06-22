import Image from "next/image";
import Link from "next/link";
import { FaClock, FaHeart, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function RecipeCard({ recipe }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/20 bg-white/60 shadow-[0_10px_40px_rgba(16,185,129,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)] dark:border-white/10 dark:bg-white/5">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/20 bg-white/75 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-200">
            {recipe.category}
          </span>
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/20 bg-white/75 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-200">
          <FaHeart className="text-rose-500" />
          {recipe.likesCount}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            {recipe.cuisineType}
          </p>

          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <FaClock className="text-emerald-500" />
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
            <Link href={`/recipes/${recipe._id}`}>
              View Details
              <FaArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
