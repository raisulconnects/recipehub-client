import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  Clock3,
  Heart,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24">
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-50 via-white to-teal-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/40" />

      {/* Glow */}
      <div className="absolute -top-16 left-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl -z-10" />

      {/* Grid texture */}
      <div className="absolute inset-0 -z-10 opacity-[0.08] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left Content */}
        <div>
          <Badge className="mb-5 rounded-full border-emerald-200/60 bg-emerald-100/70 px-3 py-1 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Recipe sharing made simple
          </Badge>

          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
            Discover recipes, share your dishes, and support creators.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
            RecipeHub gives food lovers one place to publish recipes, explore
            ideas from others, save favorites, and support creators through
            simple purchases and premium membership.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600"
            >
              <Link href="/browse">
                Explore Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/30 bg-white/60 backdrop-blur-md hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <Link href="/register">Join Community</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-emerald-500" />
              Curated recipe ideas
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              Save your favorites
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-teal-500" />
              Support creators directly
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/50 p-5 shadow-[0_20px_80px_rgba(16,185,129,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent" />

            <div className="relative z-10">
              {/* Top badge row */}
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-full border border-emerald-200/70 bg-emerald-100/70 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                  Trending this week
                </div>
                <div className="rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                  1.2k likes
                </div>
              </div>

              {/* Image area */}
              <div className="relative rounded-[1.75rem] bg-gradient-to-br from-emerald-100 via-white to-teal-100 p-4 dark:from-zinc-900 dark:via-zinc-950 dark:to-emerald-950/20">
                <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-emerald-300/20 blur-2xl" />
                <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full bg-teal-300/20 blur-2xl" />

                <div className="relative mx-auto flex h-[320px] w-full items-center justify-center">
                  {/* Floating stat card */}
                  <div className="absolute left-2 top-6 z-20 rounded-2xl border border-white/30 bg-white/75 px-3 py-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          Rating
                        </p>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          4.9 / 5
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main image */}
                  <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border-8 border-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:border-zinc-800 sm:h-[320px] sm:w-[320px]">
                    <Image
                      src="/creamygarlic.png"
                      alt="Creamy garlic pasta"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Floating prep card */}
                  <div className="absolute bottom-6 right-2 z-20 rounded-2xl border border-white/30 bg-white/75 px-3 py-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-teal-500" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          Prep Time
                        </p>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          25 mins
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom recipe info */}
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Italian • Easy
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-white">
                    Creamy Garlic Pasta
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Rich texture, balanced flavor, and loved by the community.
                  </p>
                </div>

                <div className="hidden rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:block">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Category
                  </p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Dinner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating mini chips */}
          <div className="absolute -left-4 top-10 hidden rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs text-zinc-600 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-300 sm:block">
            Featured picks
          </div>
          <div className="absolute -right-3 bottom-10 hidden rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs text-zinc-600 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-300 sm:block">
            Save favorites
          </div>
        </div>
      </div>
    </section>
  );
}
