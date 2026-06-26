import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-amber-200/60 bg-amber-50/80 backdrop-blur-xl dark:border-amber-900/30 dark:bg-amber-950/20">
          <FileQuestion className="h-9 w-9 text-amber-500 dark:text-amber-400" />
        </div>

        <Badge className="rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-medium text-amber-600 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-400">
          404 — Page Not Found
        </Badge>

        <div className="w-full rounded-[2rem] border border-white/20 bg-white/70 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            This page doesn&apos;t exist
          </h1>

          <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            The page you&apos;re looking for might have been removed, renamed,
            or is temporarily unavailable.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/browse">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Recipes
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          RecipeHub — If you think this is a mistake, contact support.
        </p>
      </div>
    </section>
  );
}
