"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import {
  FaArrowLeft,
  FaClock,
  FaHeart,
  FaRegHeart,
  FaFlag,
  FaShoppingBag,
  FaUtensils,
  FaUser,
  FaStar,
  FaFire,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const reportReasons = ["Spam", "Offensive Content", "Copyright Issue"];

export default function RecipeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("Spam");
  const [reportNote, setReportNote] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/recipes/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setRecipe(data);
        setLikesCount(data.likesCount || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setRecipe(null);
      });
  }, [params.id]);

  useEffect(() => {
    if (!user || !recipe) return;
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const fav = data.find(
          (f) => String(f.recipeId?._id || f.recipeId) === recipe._id,
        );
        if (fav) {
          setFavorited(true);
          setFavoriteId(fav._id);
        }
      })
      .catch(() => {});
  }, [user, recipe]);

  if (loading) {
    return (
      <section className="relative min-h-screen pt-24 pb-16">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
        </div>
      </section>
    );
  }

  if (!recipe) {
    return (
      <section className="min-h-screen pt-28 pb-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Recipe not found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            The recipe you are looking for does not exist.
          </p>
          <Button
            asChild
            className="mx-auto w-fit rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          >
            <Link href="/browse">Back to Browse</Link>
          </Button>
        </div>
      </section>
    );
  }

  const handleLike = async () => {
    if (!user) return router.push("/login");
    setActionLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const data = await fetch(`/api/recipes/${recipe._id}/like`, {
        method: "PATCH",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      }).then((r) => r.json());
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch {}
    setActionLoading(false);
  };

  const handleFavorite = async () => {
    if (!user) return router.push("/login");
    setActionLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      if (favorited && favoriteId) {
        await fetch(`/api/favorites/${recipe._id}`, {
          method: "DELETE",
          headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        });
        setFavorited(false);
        setFavoriteId(null);
      } else {
        const data = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ recipeId: recipe._id }),
        }).then((r) => r.json());
        setFavorited(true);
        setFavoriteId(data._id);
      }
    } catch {}
    setActionLoading(false);
  };

  const handlePurchase = async () => {
    if (!user) return router.push("/login");
    setActionLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch("/api/payments/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ type: "recipe", recipeId: recipe._id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error("Purchase error:", e);
    }
  };

  const handleReportSubmit = async () => {
    if (!user) return router.push("/login");
    setActionLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ recipeId: recipe._id, reason: selectedReason, note: reportNote }),
      }).then((r) => r.json());
      setReportOpen(false);
      setReportNote("");
      setSelectedReason("Spam");
    } catch {}
    setActionLoading(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-50 via-white to-teal-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/30" />
      <div className="absolute top-10 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6">
        <Button
          asChild
          variant="outline"
          className="w-fit rounded-xl border-white/20 bg-white/70 dark:border-white/10 dark:bg-white/5"
        >
          <Link href="/browse">
            <FaArrowLeft className="mr-2" />
            Back to Browse
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="relative h-[280px] sm:h-[380px]">
                <Image
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-emerald-500" />
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  Ingredients
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                Instructions
              </h2>
              <div className="rounded-3xl border border-white/20 bg-white/70 p-5 leading-7 text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                {recipe.instructions}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="flex flex-col gap-6 rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                Full Recipe Details
              </p>

              <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl dark:text-white">
                {recipe.recipeName}
              </h1>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                  {recipe.category}
                </span>
                <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                  {recipe.cuisineType}
                </span>
                <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                  {recipe.difficultyLevel}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/20 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Preparation
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                    <FaClock className="text-emerald-500" />
                    {recipe.preparationTime} min
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Likes
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                    <FaStar className="text-amber-500" />
                    {likesCount} likes
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5 sm:col-span-2">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Author
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                    <FaUser className="text-teal-500" />
                    {recipe.authorName}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200/40 bg-emerald-50/70 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <div className="flex items-start gap-3">
                  <FaFire className="mt-1 text-emerald-500" />
                  <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    Purchasing this recipe supports the creator directly. It's
                    more like backing the creator than unlocking hidden content.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleLike}
                  disabled={actionLoading}
                  className={`h-11 rounded-xl ${
                    liked
                      ? "bg-rose-500 text-white hover:bg-rose-600"
                      : "bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600"
                  }`}
                >
                  {liked ? (
                    <FaHeart className="mr-2" />
                  ) : (
                    <FaRegHeart className="mr-2" />
                  )}
                  {liked ? "Liked" : "Like Recipe"} ({likesCount})
                </Button>

                <Button
                  onClick={handleFavorite}
                  disabled={actionLoading}
                  variant="outline"
                  className="h-11 rounded-xl border-white/20 bg-white/70 dark:border-white/10 dark:bg-white/5"
                >
                  {favorited ? (
                    <FaHeart className="mr-2 text-rose-500" />
                  ) : (
                    <FaRegHeart className="mr-2" />
                  )}
                  {favorited ? "Added to Favorites" : "Add to Favorites"}
                </Button>

                <Button
                  onClick={handlePurchase}
                  disabled={actionLoading}
                  className="h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                >
                  {actionLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FaShoppingBag className="mr-2" />
                  )}
                  {actionLoading ? "Redirecting…" : "Support Creator — $2.99"}
                </Button>

                <Dialog open={reportOpen} onOpenChange={setReportOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-11 rounded-xl border-white/20 bg-white/70 dark:border-white/10 dark:bg-white/5"
                    >
                      <FaFlag className="mr-2 text-amber-500" />
                      Report Recipe
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="border-white/20 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/90">
                    <DialogHeader>
                      <DialogTitle>Report this recipe</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          Select a reason
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {reportReasons.map((reason) => (
                            <button
                              key={reason}
                              type="button"
                              onClick={() => setSelectedReason(reason)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                selectedReason === reason
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : "border-white/20 bg-white/70 text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                              }`}
                            >
                              {reason}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          Additional note
                        </p>
                        <Textarea
                          value={reportNote}
                          onChange={(e) => setReportNote(e.target.value)}
                          placeholder="Add extra context if needed..."
                          className="min-h-[120px] rounded-2xl border-white/20 bg-white/70 dark:border-white/10 dark:bg-white/5"
                        />
                      </div>

                      <Button
                        onClick={handleReportSubmit}
                        disabled={actionLoading}
                        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                      >
                        Submit Report
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
