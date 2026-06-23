"use client";

import Link from "next/link";
import { Pencil, Trash2, Eye } from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";

const myRecipes = [
  {
    id: "1",
    name: "Creamy Garlic Pasta",
    category: "Dinner",
    cuisine: "Italian",
    likes: 124,
  },
  {
    id: "2",
    name: "Berry Pancake Stack",
    category: "Breakfast",
    cuisine: "American",
    likes: 86,
  },
];

export default function MyRecipesPage() {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="My Recipes"
        description="Manage your published recipes, edit details, or remove old ones."
        action={
          <Button asChild className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600">
            <Link href="/dashboard/add-recipe">Add Recipe</Link>
          </Button>
        }
      />

      <div className="space-y-4">
        {myRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="rounded-[1.5rem] border border-white/20 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {recipe.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {recipe.category} · {recipe.cuisine} · {recipe.likes} likes
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href={`/recipes/${recipe.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>

                <Button variant="outline" className="rounded-xl">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <Button variant="destructive" className="rounded-xl">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
