"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Sun,
  Moon,
  Menu,
  ChefHat,
  LayoutDashboard,
  User,
  LogOut,
  BookOpen,
  Home,
  Crown,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

const publicLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Browse Recipes", href: "/browse", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = useSession();
  const user = session?.user || null;
  const isLoading = isPending;
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5"
            : "backdrop-blur-md bg-white/40 dark:bg-zinc-900/40 border-b border-white/10 dark:border-white/5"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="
            w-8 h-8 rounded-lg flex items-center justify-center
            bg-gradient-to-br from-emerald-400 to-teal-600
            shadow-lg shadow-emerald-500/30
            group-hover:shadow-emerald-500/50 transition-shadow duration-300
          "
          >
            <ChefHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
            RecipeHub
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {publicLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive(href)
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/50 dark:hover:bg-white/5"
                }
              `}
            >
              {isActive(href) && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg w-9 h-9 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-white/50 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          )}

          {/* Auth Section — Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            ) : user ? (
              <AuthenticatedMenu user={user} />
            ) : (
              <GuestButtons />
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu
              user={user}
              isActive={isActive}
              publicLinks={publicLinks}
            />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

/* ── Guest Buttons ── */
function GuestButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-zinc-600 dark:text-zinc-400"
      >
        <Link href="/login">Login</Link>
      </Button>
      <Button
        size="sm"
        asChild
        className="
        bg-gradient-to-r from-emerald-500 to-teal-500
        hover:from-emerald-600 hover:to-teal-600
        text-white border-0 shadow-md shadow-emerald-500/20
        hover:shadow-emerald-500/40 transition-all duration-200
      "
      >
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
}

/* ── Authenticated Dropdown ── */
function AuthenticatedMenu({ user }) {
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl pl-1 pr-3 py-1 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-200 outline-none group">
          <div className="relative">
            <Avatar className="w-8 h-8 ring-2 ring-emerald-400/50 group-hover:ring-emerald-400 transition-all">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {user.isPremium && (
              <span
                className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white dark:border-zinc-900"
                title="Premium"
              />
            )}
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 max-w-[100px] truncate">
            {user.name?.split(" ")[0]}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-white/10 shadow-xl"
      >
        {/* User Info */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {user.name}
            </p>
            {user.isPremium && (
              <Badge className="text-xs py-0 px-1.5 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                Premium
              </Badge>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator className="bg-white/20 dark:bg-white/10" />

        <DropdownMenuItem
          asChild
          className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/10"
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-emerald-500" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/10"
        >
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <User className="w-4 h-4 text-zinc-400" />
            Profile
          </Link>
        </DropdownMenuItem>

        {!user.isPremium && (
          <>
            <DropdownMenuSeparator className="bg-white/20 dark:bg-white/10" />
            <DropdownMenuItem
              asChild
              className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/10"
            >
              <Link href="/premium" className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                Premium
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {user.role === "admin" && (
          <>
            <DropdownMenuSeparator className="bg-white/20 dark:bg-white/10" />
            <DropdownMenuItem
              asChild
              className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/10"
            >
              <Link href="/admin" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-violet-500" />
                Admin Panel
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="bg-white/20 dark:bg-white/10" />

        <DropdownMenuItem
          className="cursor-pointer text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── Mobile Sheet Menu ── */
function MobileMenu({ user, isActive, publicLinks }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-white/10"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-72 backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border-l border-white/20 dark:border-white/10"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 mt-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg">
            <ChefHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            RecipeHub
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-1 mb-6">
          {publicLinks.map(({ label, href, icon: Icon }) => (
            <SheetClose asChild key={href}>
              <Link
                href={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${
                    isActive(href)
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-white/60 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            </SheetClose>
          ))}
        </div>

        {/* Auth Section */}
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.image} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold">
                  {user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                {user.isPremium && (
                  <Badge className="text-xs py-0 px-1.5 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                    Premium
                  </Badge>
                )}
              </div>
            </div>
            <SheetClose asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-white/60 dark:hover:bg-white/5"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-white/60 dark:hover:bg-white/5"
              >
                <User className="w-4 h-4" /> Profile
              </Link>
            </SheetClose>
            {!user.isPremium && (
              <SheetClose asChild>
                <Link
                  href="/premium"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-white/60 dark:hover:bg-white/5"
                >
                  <Crown className="w-4 h-4 text-amber-500" /> Premium
                </Link>
              </SheetClose>
            )}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Button
                variant="outline"
                asChild
                className="w-full bg-white/50 dark:bg-white/5"
              >
                <Link href="/login">Login</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
              >
                <Link href="/register">Register</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
