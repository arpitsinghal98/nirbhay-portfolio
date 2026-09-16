import { ArrowDown, Download, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social-icons";
import { HeroPortrait } from "@/components/sections/hero-portrait";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title">
      <div className="grid grid-cols-[1.64fr_1fr] items-center gap-[2.375rem] pt-[4.5625rem] pb-[3.9375rem] max-[68.75rem]:grid-cols-[1.55fr_1fr] max-[68.75rem]:gap-8 max-[56.25rem]:pt-14 max-[45rem]:grid-cols-1 max-[45rem]:gap-[2.625rem] max-[45rem]:py-[2.625rem]">
        <div className="min-w-0">
          <p className="flex items-center gap-2.5 font-mono text-eyebrow uppercase max-[45rem]:text-[0.5625rem]">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-success ring-4 ring-success/10"
            />
            {profile.role}
          </p>
          <h1
            id="hero-title"
            className="my-[1.625rem] text-display font-[450] max-[68.75rem]:text-[clamp(2.625rem,5.55vw,3.75rem)] max-[45rem]:my-6 max-[45rem]:text-[clamp(1.875rem,9.5vw,4.125rem)]"
          >
            <span className="block">{profile.headline.first}</span>
            <em className="block font-serif font-normal tracking-[-0.04em] text-brand">
              {profile.headline.second}
            </em>
          </h1>
          <p className="mb-2.5 text-lg tracking-[-0.015em] max-[56.25rem]:text-base max-[45rem]:text-[1.0625rem]">
            Hi, I’m <strong className="font-semibold">{profile.name}.</strong>
          </p>
          <p className="max-w-[26.5625rem] text-sm leading-[1.9] text-muted-foreground">
            {profile.introduction}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 max-[56.25rem]:gap-x-4">
            <a
              href="#work"
              className={cn(
                buttonVariants({
                  size: "lg",
                  className:
                    "gap-6 px-5 text-xs motion-safe:hover:-translate-y-0.5",
                }),
              )}
            >
              Explore my work
              <ArrowDown
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.6}
              />
            </a>
            <a
              href={profile.resume}
              download
              className={cn(
                buttonVariants({
                  variant: "link",
                  size: "lg",
                  className: "gap-2 px-0 text-xs font-normal",
                }),
              )}
            >
              Download résumé
              <Download
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.6}
              />
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-2 text-[0.625rem] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.6}
              />
              Based in {profile.location}
            </span>
            <span
              aria-hidden="true"
              className="mx-3 h-3.5 w-px bg-border max-[23.125rem]:mx-1"
            />
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nirbhay on GitHub (opens in a new tab)"
              className="grid size-11 place-items-center transition-colors hover:text-brand motion-reduce:transition-none"
            >
              <GitHubIcon
                aria-hidden="true"
                className="size-[1.0625rem]"
                strokeWidth={1.6}
              />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nirbhay on LinkedIn (opens in a new tab)"
              className="grid size-11 place-items-center transition-colors hover:text-brand motion-reduce:transition-none"
            >
              <LinkedInIcon
                aria-hidden="true"
                className="size-[1.0625rem]"
                strokeWidth={1.6}
              />
            </a>
          </div>
        </div>
        <HeroPortrait />
      </div>
    </section>
  );
}
