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

      <form className="space-y-6 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Recipe Name</Label>
            <Input placeholder="Creamy Garlic Pasta" />
          </div>

          <div className="space-y-2">
            <Label>Recipe Image</Label>
            <Input type="file" />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input placeholder="Dinner" />
          </div>

          <div className="space-y-2">
            <Label>Cuisine Type</Label>
            <Input placeholder="Italian" />
          </div>

          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <Input placeholder="Easy / Medium / Hard" />
          </div>

          <div className="space-y-2">
            <Label>Preparation Time</Label>
            <Input type="number" placeholder="25" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ingredients</Label>
          <Textarea placeholder="Write ingredients separated by commas..." />
        </div>

        <div className="space-y-2">
          <Label>Instructions</Label>
          <Textarea
            placeholder="Write the full cooking instructions..."
            className="min-h-[160px]"
          />
        </div>

        <Button
          disabled={limitReached}
          className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Publish Recipe
        </Button>
      </form>
    </div>
  );
}
