import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { navigation, profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="flex min-h-[6.75rem] flex-wrap items-center justify-between gap-x-5 border-b max-[45rem]:min-h-[5.125rem]">
      <a
        href="#home"
        aria-label={`${profile.firstName}, home`}
        className="inline-flex items-center text-[1.8125rem] font-[650] tracking-[-0.06em] max-[45rem]:text-[1.625rem]"
      >
        {profile.firstName.toLowerCase()}
        <span className="text-brand">.</span>
        <span
          aria-hidden="true"
          className="ml-3 text-[2.1875rem] leading-none font-normal text-brand max-[45rem]:text-3xl"
        >
          ✳
        </span>
      </a>
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-8 min-[56.25rem]:ml-10 max-[45rem]:order-3 max-[45rem]:w-full max-[45rem]:justify-between max-[45rem]:gap-4 max-[45rem]:border-t max-[45rem]:py-2"
      >
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="inline-flex min-h-11 items-center text-xs text-muted-foreground transition-colors first:text-foreground hover:text-brand motion-reduce:transition-none"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className={cn(
          buttonVariants({
            variant: "outline",
            className: "my-5 h-11 gap-5 px-4 text-xs max-[45rem]:gap-3",
          }),
        )}
      >
        Let’s talk
        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
      </a>
    </header>
  );
}
