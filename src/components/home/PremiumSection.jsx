import Link from "next/link";
import { CheckCircle2, Crown, Sparkles, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const premiumFeatures = [
  "Unlimited recipe uploads",
  "Premium badge on your profile",
  "A better creator experience",
  "One-time lifetime upgrade",
];

export default function PremiumSection() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/60 shadow-[0_20px_80px_rgba(16,185,129,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="grid grid-cols-1 gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <Badge className="mb-4 w-fit rounded-full border-amber-200/60 bg-amber-100/70 px-3 py-1 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Upgrade once, unlock more
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                Premium helps creators grow without limits
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
                Free users can add up to 2 recipes. Premium removes that limit
                and gives creators a stronger presence on the platform with a
                premium badge.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                >
                  <Link href="/dashboard">
                    Get Premium
                    <Crown className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/30 bg-white/60 backdrop-blur-md hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <Link href="/browse">Explore Recipes</Link>
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-amber-100 via-white to-orange-100 p-5 dark:from-zinc-900 dark:via-zinc-950 dark:to-amber-950/20 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/70 dark:bg-amber-950/40">
                    <UploadCloud className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Premium creator access
                    </p>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      Lifetime membership
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {premiumFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-4 py-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Perfect if you plan to share more than just a couple of your
                    best dishes and want a stronger creator profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
