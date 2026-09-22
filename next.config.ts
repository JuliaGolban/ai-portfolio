import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Зображення ───────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 днів
  },

  // ─── Стиснення відповідей ─────────────────────────────────────
  compress: true,

  // ─── Компілятор ───────────────────────────────────────────────
  compiler: {
    // Styled Components з підтримкою SSR (без цього — флікер при завантаженні)
    styledComponents: true,
    // Прибираємо console.log у продакшені
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ─── Заголовки кешування ──────────────────────────────────────
  async headers() {
    return [
      // Статичні медіафайли — кеш на рік
      {
        source: "/:path*\\.(svg|ico|png|jpg|jpeg|webp|avif|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Відео — кеш на добу (може оновлюватись)
      {
        source: "/:path*\\.(mp4|webm)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
      // Усі сторінки — security headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // ─── Редіректи (якщо є стара структура URL) ───────────────────
  // async redirects() {
  //   return [];
  // },
};

export default nextConfig;
