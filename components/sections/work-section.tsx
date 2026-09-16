import { ArrowUpRight } from "lucide-react";
import { AssistantTrigger } from "@/components/assistant/assistant-provider";
import { ProjectArt } from "@/components/sections/project-art";
import { ProjectDetails } from "@/components/sections/project-details";
import { projects } from "@/content/portfolio";
import { profile } from "@/content/profile";

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <p className="font-mono text-eyebrow text-muted-foreground">
        01 / SELECTED WORK
      </p>
      <div className="mt-4 mb-9 flex flex-wrap items-end justify-between gap-5">
        <h2 id="work-title" className="text-section-title">
          A few things I’ve{" "}
          <em className="font-serif font-normal text-brand">built.</em>
        </h2>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-xs hover:text-brand"
        >
          More on GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-5">
        {projects.map((project) => (
          <article
            key={project.id}
            className="grid min-w-0 items-center gap-x-7 sm:grid-cols-2 lg:block"
          >
            <ProjectArt project={project} />
            <div className="min-w-0">
              <p className="mt-6 font-mono text-[0.5625rem] uppercase tracking-wider text-muted-foreground sm:mt-0 lg:mt-6">
                {project.category}
              </p>
              <div className="mt-1 flex items-center justify-between gap-1">
                <h3 className="text-lg font-medium tracking-tight">
                  {project.title}
                </h3>
                <ProjectDetails project={project} />
              </div>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                {project.description}
              </p>
              <ul
                aria-label="Technologies"
                className="mt-4 flex flex-wrap gap-1.5"
              >
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border px-2 py-1 font-mono text-[0.5625rem] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-5 rounded-md border bg-card/50 px-6 py-5">
        <span aria-hidden="true" className="text-4xl text-brand">
          ✳
        </span>
        <p className="grow text-sm">
          Curious about the thinking behind the work?
          <span className="mt-1.5 block text-xs text-muted-foreground">
            Ask my portfolio assistant about my projects, skills, or experience.
          </span>
        </p>
        <AssistantTrigger variant="ghost" className="h-11 px-0 text-xs">
          Let’s explore <ArrowUpRight aria-hidden="true" className="size-4" />
        </AssistantTrigger>
      </div>
    </section>
  );
}
