import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { profile } from "@/content/profile";

export function HeroPortrait() {
  return (
    <figure className="relative w-full max-w-[21.1875rem] justify-self-end pt-1 max-[45rem]:w-4/5 max-[45rem]:max-w-[20.625rem] max-[45rem]:justify-self-center">
      <span
        aria-hidden="true"
        className="absolute -left-7 top-1 z-10 grid size-[3.875rem] place-items-center rounded-full border bg-background text-[2.3125rem] leading-none text-brand max-[56.25rem]:-left-5 max-[56.25rem]:size-14 max-[56.25rem]:text-[2rem]"
      >
        ✳
      </span>
      <div className="relative h-[24.6875rem] overflow-hidden rounded-t-full rounded-b-lg bg-secondary max-[68.75rem]:h-[22.8125rem] max-[56.25rem]:h-[20.625rem] max-[45rem]:h-[23.125rem] max-[23.125rem]:h-[20.9375rem]">
        <Image
          src={profile.portrait.src}
          alt={profile.name}
          fill
          sizes="(max-width: 450px) 80vw, (max-width: 720px) 330px, (max-width: 1100px) 34vw, 339px"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[50%_68%]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-primary/95 px-5 py-4 text-primary-foreground">
          <span className="font-mono text-[0.5rem] tracking-[0.175em] max-[56.25rem]:text-[0.4375rem]">
            THE PERSON BEHIND THE CODE
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0"
            strokeWidth={1.6}
          />
        </div>
      </div>
      <figcaption className="mt-[1.125rem] text-center font-serif text-[0.8125rem] text-muted-foreground italic">
        {profile.portrait.caption}
      </figcaption>
    </figure>
  );
}
