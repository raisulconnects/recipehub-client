"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Crown, Loader2, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddRecipePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [recipeCount, setRecipeCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    recipeName: "",
    recipeImage: "",
    category: "",
    cuisineType: "",
    difficultyLevel: "",
    preparationTime: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    if (!user?.email) return;
    fetch(`/api/recipes?authorEmail=${user.email}&limit=1`)
      .then((r) => r.json())
      .then((data) => setRecipeCount(data.total || 0))
      .catch(() => {});
  }, [user?.email]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  const isPremium = user?.isPremium || false;
  const limitReached = !isPremium && recipeCount >= 2;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSubmitting(true);

    const payload = {
      recipeName: form.recipeName,
      recipeImage: form.recipeImage || "/recipes/goodfood.jpg",
      category: form.category,
      cuisineType: form.cuisineType,
      difficultyLevel: form.difficultyLevel,
      preparationTime: Number(form.preparationTime),
      ingredients: form.ingredients.split("\n").filter(Boolean),
      instructions: form.instructions,
      authorId: user.id,
      authorName: user.name,
      authorEmail: user.email,
    };

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create recipe");
      setSuccess(true);
      setForm({
        recipeName: "",
        recipeImage: "",
        category: "",
        cuisineType: "",
        difficultyLevel: "",
        preparationTime: "",
        ingredients: "",
        instructions: "",
      });
      setTimeout(() => router.push("/dashboard/my-recipes"), 1500);
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Add Recipe"
        description="Publish a new recipe with all the details food lovers need."
      />

      {isPremium ? (
        <div className="flex items-center gap-3 rounded-[1.5rem] border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-400/30">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              You're a Premium member
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              Enjoy unlimited recipe uploads with no restrictions.
            </p>
          </div>
        </div>
      ) : limitReached ? (
        <div className="rounded-[1.5rem] border border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/20">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            You have reached the 2 recipe limit for free users. Upgrade to
            premium to add unlimited recipes.
          </p>
          <Button
            asChild
            className="mt-4 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <Link href="/premium">Become Premium</Link>
          </Button>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
      >
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Recipe created! Redirecting...
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            <Label>Recipe Name</Label>
            <Input
              name="recipeName"
              value={form.recipeName}
              onChange={handleChange}
              placeholder="Creamy Garlic Pasta"
              required
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Recipe Image URL</Label>
            <Input
              name="recipeImage"
              value={form.recipeImage}
              onChange={handleChange}
              placeholder="/recipes/goodfood.jpg"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Category</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Dinner"
              required
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Cuisine Type</Label>
            <Input
              name="cuisineType"
              value={form.cuisineType}
              onChange={handleChange}
              placeholder="Italian"
              required
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Difficulty Level</Label>
            <select
              name="difficultyLevel"
              value={form.difficultyLevel}
              onChange={handleChange}
              className="flex h-11 w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2.5 text-sm text-zinc-900 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
              required
            >
              <option value="" hidden>Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Preparation Time (minutes)</Label>
            <Input
              name="preparationTime"
              type="number"
              value={form.preparationTime}
              onChange={handleChange}
              placeholder="25"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Label>
            Ingredients{" "}
            <span className="text-xs text-zinc-400">(one per line)</span>
          </Label>
          <Textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="200g pasta&#10;2 tbsp olive oil&#10;3 cloves garlic&#10;Salt to taste"
            className="min-h-[140px]"
            required
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Label>Instructions</Label>
          <Textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Write the full cooking instructions..."
            className="min-h-[180px]"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={limitReached || submitting}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10 sm:py-3"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing…
            </>
          ) : (
            "Publish Recipe"
          )}
        </Button>
      </form>
    </div>
  );
}
