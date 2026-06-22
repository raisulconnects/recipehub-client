import Link from "next/link";
import { ChefHat, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

const recipeLinks = [
  { label: "Browse Recipes", href: "/browse" },
  { label: "Featured Recipes", href: "/browse?filter=featured" },
  { label: "Popular Recipes", href: "/browse?filter=popular" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Favorites", href: "/dashboard/favorites" },
];

const socialLinks = [
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaXTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 dark:border-white/5">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 -z-10" />

      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <div
                className="
                w-9 h-9 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-emerald-400 to-teal-600
                shadow-lg shadow-emerald-500/30
                group-hover:shadow-emerald-500/50 transition-shadow duration-300
              "
              >
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                RecipeHub
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              A community-driven platform where food enthusiasts create, share,
              and discover recipes from around the world.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-8 h-8 rounded-lg flex items-center justify-center
                    text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400
                    bg-white/50 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40
                    border border-white/20 dark:border-white/10
                    transition-all duration-200
                  "
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Recipes Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide">
              Recipes
            </h4>
            <ul className="flex flex-col gap-2.5">
              {recipeLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide">
              Account
            </h4>
            <ul className="flex flex-col gap-2.5">
              {accountLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@recipehub.com"
                  className="flex items-center gap-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 group"
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  hello@recipehub.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+11234567890"
                  className="flex items-center gap-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 group"
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  +1 (123) 456-7890
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Toronto, Ontario, Canada
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/20 dark:bg-white/10 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} RecipeHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
