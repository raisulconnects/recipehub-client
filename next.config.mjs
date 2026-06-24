/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async rewrites() {
    const API = process.env.API_URL || "http://localhost:5000";
    return [
      { source: "/api/recipes/:path*", destination: `${API}/api/recipes/:path*` },
      { source: "/api/users/:path*", destination: `${API}/api/users/:path*` },
      { source: "/api/favorites/:path*", destination: `${API}/api/favorites/:path*` },
      { source: "/api/reports/:path*", destination: `${API}/api/reports/:path*` },
      { source: "/api/payments/:path*", destination: `${API}/api/payments/:path*` },
    ];
  },
};

export default nextConfig;
