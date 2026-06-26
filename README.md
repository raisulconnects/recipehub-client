# RecipeHub

A modern recipe sharing platform that connects food lovers, home cooks, and creators. Users can browse, publish, and discover recipes, engage with the community through likes and favorites, support creators via recipe purchases, and unlock unlimited uploads with a premium membership.

Built as a full-stack application with Next.js on the frontend and an Express REST API backend, RecipeHub demonstrates production-ready patterns including JWT authentication, server-side pagination, Stripe payment integration, role-based access control, and responsive dark/light themed UI.

## Purpose

RecipeHub serves two audiences:

- **Recipe Creators** — Share their dishes with the community, grow an audience through likes and favorites, and receive support via recipe purchases.
- **Recipe Enthusiasts** — Discover new dishes across cuisines and categories, save favorites, support creators they enjoy, and optionally unlock premium features.

The platform also includes admin tooling for content moderation — administrators can manage users, feature recipes, and handle reports to keep the community healthy.

## Tech Stack

| Layer | Choice | Role |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server-rendered React pages, API routes, route protection |
| Language | JavaScript (no TypeScript) | |
| Auth | Better Auth | Credential login, Google OAuth, JWT + session cookies |
| Styling | Tailwind CSS v4 | Utility-first CSS with dark mode |
| UI Kit | shadcn/ui (14 components) | Accessible, unstyled primitives |
| Payments | Stripe Checkout | One-time payment sessions for recipe purchases and premium |
| Image Hosting | ImgBB | Free client-side image upload, no backend storage needed |
| Animation | Framer Motion | Scroll-reveal animations on home page sections |
| State | Better Auth client store | Global session state shared across all components |

## Features

### Home Page
- **Hero Section** — Tagline, description, and CTA linking to the browse page
- **Featured Recipes** — Curated selection of highlighted recipes
- **Popular Recipes** — Top 3 most-liked recipes, ranked by community engagement
- **How It Works** — Animated step-by-step guide (Framer Motion scroll-reveal)
- **Premium Section** — Upsell card encouraging premium upgrade

### Browse Recipes
- Server-side pagination driven by backend `totalPages`
- Category filter using MongoDB `$in` operator
- Search bar with 300ms debounce that searches recipe name, cuisine type, and category
- Reactive fetch — changing category, search, or page triggers a fresh API call
- Results counter showing "Showing X of Y recipes"

### Recipe Details
- Full recipe display — name, image, category, cuisine, difficulty, prep time, ingredients, instructions, author
- **Like button** — Toggle on/off, count updates live
- **Favorite button** — Add/remove from personal favorites collection
- **Report button** — Opens a modal with reason dropdown (Spam, Offensive Content, Copyright Issue) plus optional note (up to 200 chars)
- **Purchase button** — "Support Creator — $2.99" triggers Stripe Checkout session; shows "Purchased ✓" if already bought
- All recipe content is fully visible to everyone regardless of purchase status

### User Dashboard
Protected behind authentication. Accessible from the navbar dropdown.

- **Overview** — Stat cards showing total recipes, total favorites, total likes received, and premium membership badge
- **My Recipes** — Table of user's recipes with View, Edit, and Delete actions
- **Add Recipe** — Full form with fields for name, category, cuisine type, difficulty level, preparation time, ingredients (one per line), instructions, and image upload. Image upload uses ImgBB (file picker → upload → auto URL, no backend storage). Free users are limited to 2 recipes; premium users have unlimited uploads.
- **Edit Recipe** — Pre-filled form with the same fields, ownership check, PATCH submit
- **Favorites** — Grid of saved recipes with Remove and View Details actions
- **Purchased Recipes** — List of recipes the user has purchased via Stripe
- **Profile** — Update name and avatar using Better Auth's `updateUser()`

### Admin Panel
Role-gated to users with `role: "admin"`. Horizontal nav bar with five sections.

- **Overview** — Stats: total users, total recipes, premium members, total reports
- **Users** — Table with name, email, role, plan (Premium/Free), status (Active/Blocked), Block/Unblock toggle
- **Recipes** — Table with recipe name, author, category, featured badge, Feature toggle, Edit, Delete
- **Reports** — Table with recipe, reporter, reason, status (Pending/Dismissed), note display in detail dialog, Dismiss and Remove Recipe actions
- **Transactions** — Table with user email, type (Recipe/Premium), amount, date, status

### Premium Membership
- Purchased via Stripe Checkout ($9.99 one-time)
- Verification page calls backend verify endpoint, then refreshes Better Auth session
- Auto-reloads after 3 seconds on success to ensure all components reflect premium status
- Premium benefits: unlimited recipe uploads, premium badge on profile and navbar, creator support
- Dedicated `/premium` page shows different content for premium vs free users

### Authentication
- Better Auth handles credentials login and Google OAuth
- JWT issued alongside session cookie for backend API verification
- `proxy.js` (Next.js 16 server-side route guard) protects `/dashboard` and `/admin` routes
- Blocked users are redirected to a `/blocked` page and cannot access any protected content
- Sign-out redirects to home page

### Dark / Light Theme
- Toggle in the navbar (sun/moon icon)
- Theme persisted via `next-themes`
- All components use Tailwind `dark:` variants with CSS custom properties

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas connection string (shared with backend)
- ImgBB API key (free — sign up at imgbb.com)
- Stripe account (test mode)

### Environment Variables

Create `.env.local` in the project root:

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/recipehub
GOOGLE_CLIENT_ID=xxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxx
REDIRECT_URI=http://localhost:3000/api/auth/callback/google
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
STRIPE_SECRET_KEY=sk_test_xxxxxxxxx
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The backend API must also be running on port 5000. See the backend README for setup.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.js                       # Home page
│   ├── layout.js                     # Root layout — ThemeProvider, Navbar, Footer
│   ├── globals.css                   # Tailwind v4 + CSS variables (light/dark)
│   ├── not-found.jsx                 # Custom 404 page
│   ├── proxy.js                      # Server-side route guard (Next.js 16)
│   │
│   ├── login/                        # Login page (Better Auth credentials + Google)
│   ├── register/                     # Register page
│   ├── browse/                       # Browse recipes with search + pagination
│   ├── recipes/[id]/                 # Recipe details page
│   │
│   ├── dashboard/                    # Protected user dashboard
│   │   ├── page.jsx                  # Overview stats
│   │   ├── my-recipes/               # User's recipes table
│   │   ├── add-recipe/               # Recipe creation form
│   │   ├── edit-recipe/[id]/         # Recipe edit form
│   │   ├── favorites/                # Saved recipes
│   │   ├── purchased/                # Purchased recipes
│   │   └── profile/                  # Profile settings
│   │
│   ├── admin/                        # Admin panel (role-gated)
│   │   ├── page.jsx                  # Overview stats
│   │   ├── users/                    # User management
│   │   ├── recipes/                  # Recipe moderation
│   │   ├── reports/                  # Report management
│   │   └── transactions/             # Payment history
│   │
│   ├── premium/                      # Premium membership page
│   ├── premium-success/              # Premium payment verification
│   ├── payment-success/              # Recipe payment verification
│   ├── blocked/                      # Blocked account page
│   │
│   └── api/
│       ├── auth/[...all]/route.js    # Better Auth Next.js handler
│       └── checkout_sessions/route.js # Stripe session creation
│
├── components/
│   ├── ui/                           # shadcn/ui components (button, card, dialog, etc.)
│   ├── layout/                       # Navbar, Footer
│   ├── dashboard/                    # DashboardNav, StatCard, SectionHeader
│   ├── home/                         # Hero, Featured, Popular, HowItWorks, Premium
│   └── recipes/                      # RecipeCard
│
├── lib/
│   ├── auth.js                       # Better Auth server config (MongoDB adapter, JWT plugin)
│   ├── auth-client.js                # Better Auth client config (jwtClient plugin, getSession, etc.)
│   ├── stripe.js                     # Stripe SDK initialization
│   └── utils.js                      # cn() classname utility
│
└── data/
    └── recipes.json                  # 9 seed recipes (fallback/initial data)
```

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Next.js rewrites over direct CORS | API calls proxied from port 3000 to 5000 so Better Auth cookies remain same-origin |
| Native `fetch()` over Axios | No extra dependency; all pages call `fetch()` directly through the proxy |
| JWT alongside session cookies | Backend validates requests independently via JWKS, no cookie forwarding needed |
| ImgBB over self-hosted uploads | Free, simple API; FE uploads directly from browser; no backend storage |
| Client-side search debounce | 300ms delay prevents excessive API calls while typing |
| Avoid `space-y-*` | Use `flex flex-col gap-*` consistently across all components |
| Glassmorphism + gradients | Consistent card patterns with backdrop blur, border transparency, and gradient accents |

## API Consumption

All API calls to the backend are proxied through Next.js rewrites defined in `next.config.mjs`. The following paths are forwarded to the backend at `http://localhost:5000`:

- `/api/recipes/*`
- `/api/users/*`
- `/api/favorites/*`
- `/api/reports/*`
- `/api/payments/*`

Better Auth API at `/api/auth/*` is handled directly by Next.js and is not proxied.

Protected API calls include both the Better Auth session cookie (for user enrichment) and an `Authorization: Bearer <jwt>` header (for backend JWT verification).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
