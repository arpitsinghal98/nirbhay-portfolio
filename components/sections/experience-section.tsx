import { Code2, Database, Sparkles } from "lucide-react";
import { experience, skillGroups } from "@/content/portfolio";

const icons = [Code2, Database, Sparkles];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="py-section"
    >
      <p className="font-mono text-eyebrow text-muted-foreground">
        03 / EXPERIENCE & TOOLKIT
      </p>
      <div className="mt-4 mb-10 flex flex-wrap items-end justify-between gap-5">
        <h2 id="experience-title" className="max-w-xl text-section-title">
          Built on{" "}
          <em className="font-serif font-normal text-brand">
            real-world experience.
          </em>
        </h2>
        <p className="text-xs leading-6 text-muted-foreground">
          From enterprise platforms
          <br />
          to intelligent automation.
        </p>
      </div>
      <div className="grid gap-5 border-y py-9 sm:grid-cols-[0.32fr_1fr]">
        <div>
          <span className="font-mono text-xs text-brand">
            {experience.period}
          </span>
          <p className="mt-3 text-xs text-muted-foreground">
            {experience.location}
          </p>
        </div>
        <div>
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <h3 className="text-xl tracking-tight">{experience.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {experience.company}
              </p>
            </div>
            <span className="h-fit rounded-full bg-secondary px-3 py-2 text-[0.625rem]">
              Client · {experience.client}
            </span>
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
            {experience.contributions.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-brand">
                  ↗
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid gap-8 pt-9 sm:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = icons[index];
          return (
            <div key={group.title}>
              <h3 className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest">
                <Icon aria-hidden="true" className="size-4 text-brand" />
                {group.title}
              </h3>
              <p className="mt-4 max-w-xs text-xs leading-7 text-muted-foreground">
                {group.skills.join(" · ")}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
