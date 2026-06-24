"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";

export default function MyRecipesPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = () => {
    if (!user?.email) return;
    fetch(`/api/recipes?authorEmail=${user.email}&showAll=true`)
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecipes();
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    try {
      await fetch(`/api/recipes/${id}`, { method: "DELETE" });
      fetchRecipes();
    } catch {}
  };

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
        title="My Recipes"
        description="Manage your published recipes, edit details, or remove old ones."
        action={
          <Button
            asChild
            className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <Link href="/dashboard/add-recipe">Add Recipe</Link>
          </Button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
        </div>
      ) : recipes.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          No recipes yet.{" "}
          <Link
            href="/dashboard/add-recipe"
            className="text-emerald-500 underline"
          >
            Add your first recipe
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="rounded-[1.5rem] border border-white/20 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {recipe.recipeName}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {recipe.category} · {recipe.cuisineType} · {recipe.likesCount} likes
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href={`/recipes/${recipe._id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button variant="destructive" className="rounded-xl" onClick={() => handleDelete(recipe._id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
