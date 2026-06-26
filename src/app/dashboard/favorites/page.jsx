"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Eye, Trash2, Loader2 } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) return;
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch("/api/favorites", {
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      const data = await res.json();
      setFavorites(Array.isArray(data) ? data : []);
    } catch {
      setFavorites([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  const handleRemove = async (recipeId) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      await fetch(`/api/favorites/${recipeId}`, {
        method: "DELETE",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      fetchFavorites();
    } catch {}
  };

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="My Favorites"
        description="Quick access to the recipes you saved for later."
      />

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
        </div>
      ) : favorites.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          No favorites yet.{" "}
          <Link href="/browse" className="text-emerald-500 underline">
            Browse recipes
          </Link>
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((fav) => {
            const recipe = fav.recipeId;
            if (!recipe) return null;
            return (
              <div
                key={fav._id}
                className="rounded-[1.5rem] border border-white/20 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-rose-950/30 dark:text-rose-300">
                      <Heart className="mr-2 h-3.5 w-3.5" />
                      Favorite
                    </div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {recipe.recipeName}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {recipe.cuisineType} cuisine
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href={`/recipes/${recipe._id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="rounded-xl"
                    onClick={() => handleRemove(recipe._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
