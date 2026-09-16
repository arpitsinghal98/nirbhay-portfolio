const configuredUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const siteUrl = new URL(configuredUrl);
export const isPublicSite =
  siteUrl.protocol === "https:" && process.env.VERCEL_ENV !== "preview";
