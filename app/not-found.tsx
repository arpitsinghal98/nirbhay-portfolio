import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-6 px-7">
      <p className="font-mono text-eyebrow text-brand">404 / A SMALL DETOUR</p>
      <h1 className="text-section-title">
        This page isn’t here.
        <br />
        <em className="font-serif font-normal text-brand">
          The work is, though.
        </em>
      </h1>
      <p className="text-sm text-muted-foreground">
        Head back to Nirbhay’s portfolio to explore his projects and experience.
      </p>
      <Link href="/" className={cn(buttonVariants())}>
        Back to the portfolio
      </Link>
    </main>
  );
}
