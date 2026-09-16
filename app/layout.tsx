import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { isPublicSite, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const fontSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const fontSerif = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

const fontMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: `${profile.name} — Full-stack & AI Engineer`,
  description: profile.introduction,
  applicationName: "Nirbhay’s portfolio",
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${profile.name} — Full-stack & AI Engineer`,
    description: profile.introduction,
    url: "/",
    siteName: "Nirbhay’s portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full-stack & AI Engineer`,
    description: profile.introduction,
  },
  robots: { index: isPublicSite, follow: isPublicSite },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full font-sans antialiased",
        fontSans.variable,
        fontSerif.variable,
        fontMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
