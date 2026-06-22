"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaUser,
  FaRegEnvelope,
  FaImage,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaGoogle,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const passwordChecks = useMemo(() => {
    return {
      hasMinLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
    };
  }, [password]);

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Better Auth register here
  };

  const handleGoogleLogin = () => {
    // TODO: Better Auth Google login here
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-50 via-white to-teal-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/30" />
      <div className="absolute top-16 left-0 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl -z-10" />
      <div className="absolute inset-0 -z-10 opacity-[0.07] dark:opacity-[0.04] [background-image:linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center px-4 sm:px-6">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full border border-emerald-200/60 bg-emerald-100/70 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              Join the RecipeHub community
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Create an account and start sharing your recipes.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
              Build your profile, publish recipes, save favorites, and support
              creators in one simple platform.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/20 bg-white/60 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Why join?
                </p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <li>• Share your own recipes with the community</li>
                  <li>• Save your favorite dishes for later</li>
                  <li>• Purchase recipes to support creators</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-white/20 bg-white/60 p-6 shadow-[0_20px_80px_rgba(16,185,129,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Register
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  Fill in your details to create a new account.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <FaUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="h-11 rounded-xl border-white/20 bg-white/70 pl-10 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <FaRegEnvelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 rounded-xl border-white/20 bg-white/70 pl-10 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <div className="relative">
                    <FaImage className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      id="image"
                      type="text"
                      placeholder="https://example.com/profile.png"
                      className="h-11 rounded-xl border-white/20 bg-white/70 pl-10 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <FaLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="h-11 rounded-xl border-white/20 bg-white/70 pl-10 pr-11 dark:border-white/10 dark:bg-white/5"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="rounded-2xl border border-white/20 bg-white/60 p-3 text-sm dark:border-white/10 dark:bg-white/5">
                    <p className="mb-2 font-medium text-zinc-800 dark:text-zinc-200">
                      Password must have:
                    </p>

                    <div className="space-y-1.5">
                      <PasswordRule
                        label="At least 6 characters"
                        valid={passwordChecks.hasMinLength}
                      />
                      <PasswordRule
                        label="One uppercase letter"
                        valid={passwordChecks.hasUppercase}
                      />
                      <PasswordRule
                        label="One lowercase letter"
                        valid={passwordChecks.hasLowercase}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                >
                  Register
                </Button>

                <div className="relative">
                  <Separator className="bg-white/20 dark:bg-white/10" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
                    or continue with
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="h-11 w-full rounded-xl border-white/20 bg-white/70 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <FaGoogle className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PasswordRule({ label, valid }) {
  return (
    <div className="flex items-center gap-2">
      <FaCheckCircle
        className={`h-4 w-4 ${valid ? "text-emerald-500" : "text-zinc-300 dark:text-zinc-600"}`}
      />
      <span
        className={`text-sm ${
          valid
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-zinc-500 dark:text-zinc-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
