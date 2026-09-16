import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="flex flex-wrap items-center justify-between gap-10 rounded-lg bg-secondary px-7 py-12 sm:px-12 sm:py-14"
    >
      <div>
        <p className="font-mono text-eyebrow text-muted-foreground">
          04 / START A CONVERSATION
        </p>
        <h2 id="contact-title" className="mt-5 text-section-title">
          Have something in mind?
          <br />
          <em className="font-serif font-normal text-brand">
            Let’s make it happen.
          </em>
        </h2>
        <p className="mt-5 max-w-md text-xs leading-6 text-muted-foreground">
          A thoughtful product, a tricky problem, or a conversation about what’s
          next — I’d love to hear about it.
        </p>
      </div>
      <div className="flex flex-col items-start gap-4">
        <a
          href={`mailto:${profile.email}`}
          className={cn(buttonVariants({ size: "lg" }), "gap-8 px-6 text-xs")}
        >
          Say hello <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="break-all text-xs underline decoration-foreground/20 underline-offset-4 hover:text-brand"
        >
          {profile.email}
        </a>
      </div>
    </section>
  );
}
