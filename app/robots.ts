import type { MetadataRoute } from "next";
import { isPublicSite, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPublicSite ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    ...(isPublicSite ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
