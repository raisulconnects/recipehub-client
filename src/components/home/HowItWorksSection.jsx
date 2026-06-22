"use client";

import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    id: "01",
    title: "Discover recipes",
    description:
      "Browse a growing collection of recipes shared by food lovers from different cuisines and categories.",
    icon: Search,
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-950/30",
  },
  {
    id: "02",
    title: "Save your favorites",
    description:
      "Keep the recipes you love in one place so you can quickly revisit them later from your favorites page.",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-100 dark:bg-rose-950/30",
  },
  {
    id: "03",
    title: "Support creators",
    description:
      "Purchase recipes to support the creators you enjoy while building your own purchased recipe list.",
    icon: ShoppingBag,
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-950/30",
  },
  {
    id: "04",
    title: "Go premium",
    description:
      "Upgrade once to unlock unlimited recipe uploads and get a premium badge on your profile.",
    icon: Crown,
    color: "text-violet-500",
    bg: "bg-violet-100 dark:bg-violet-950/30",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl sm:mb-12"
        >
          <Badge className="mb-4 rounded-full border-emerald-200/60 bg-emerald-100/70 px-3 py-1 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            Simple platform flow
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            How RecipeHub Works
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
            A smooth recipe-sharing experience for both food lovers and
            creators, from discovery to support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-3xl border border-white/20 bg-white/60 p-6 shadow-[0_10px_40px_rgba(16,185,129,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                {/* Subtle animated shine */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: index % 2 === 0 ? 8 : -8 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </motion.div>

                  <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
                    {step.id}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-zinc-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {step.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="mt-5 h-[2px] rounded-full bg-gradient-to-r from-emerald-400/70 to-teal-400/40"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
