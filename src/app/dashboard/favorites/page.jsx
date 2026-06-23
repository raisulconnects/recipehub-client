import Link from "next/link";
import { Heart, Eye, Trash2 } from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";

const favorites = [
  {
    id: "7",
    name: "Thai Basil Noodles",
    cuisine: "Thai",
  },
  {
    id: "5",
    name: "Butter Chicken Bowl",
    cuisine: "Indian",
  },
];

export default function FavoritesPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="My Favorites"
        description="Quick access to the recipes you saved for later."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((recipe) => (
          <div
            key={recipe.id}
            className="rounded-[1.5rem] border border-white/20 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-rose-950/30 dark:text-rose-300">
                  <Heart className="mr-2 h-3.5 w-3.5" />
                  Favorite
                </div>

                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {recipe.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {recipe.cuisine} cuisine
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href={`/recipes/${recipe.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>

              <Button variant="destructive" className="rounded-xl">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}