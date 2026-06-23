"use client";

import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddRecipePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  const isPremium = user?.isPremium || false;
  const currentRecipeCount = 2;
  const limitReached = !isPremium && currentRecipeCount >= 2;

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Add Recipe"
        description="Publish a new recipe with all the details food lovers need."
      />

      {limitReached && (
        <div className="rounded-[1.5rem] border border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/20">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            You have reached the 2 recipe limit for free users. Upgrade to
            premium to add unlimited recipes.
          </p>

          <Button className="mt-4 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600">
            Become Premium
          </Button>
        </div>
      )}

      <form className="flex flex-col gap-10 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            <Label>Recipe Name</Label>
            <Input placeholder="Creamy Garlic Pasta" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Recipe Image</Label>
            <Input type="file" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Category</Label>
            <Input placeholder="Dinner" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Cuisine Type</Label>
            <Input placeholder="Italian" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Difficulty Level</Label>
            <select className="flex h-11 w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2.5 text-sm text-zinc-900 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100">
              <option value="" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100" hidden>Select difficulty</option>
              <option value="Easy" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">Easy</option>
              <option value="Medium" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">Medium</option>
              <option value="Hard" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">Hard</option>
            </select>
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Preparation Time</Label>
            <Input type="number" placeholder="25" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Label>Ingredients <span className="text-xs text-zinc-400">(one per line)</span></Label>
          <Textarea
            placeholder="200g pasta&#10;2 tbsp olive oil&#10;3 cloves garlic&#10;Salt to taste"
            className="min-h-[140px]"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Label>Instructions</Label>
          <Textarea
            placeholder="Write the full cooking instructions..."
            className="min-h-[180px]"
          />
        </div>

        <Button
          disabled={limitReached}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10 sm:py-3"
        >
          Publish Recipe
        </Button>
      </form>
    </div>
  );
}
