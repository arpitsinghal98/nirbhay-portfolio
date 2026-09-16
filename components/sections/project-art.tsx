import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function ProjectArt({ project }: { project: Project }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex h-64 flex-col overflow-hidden rounded-md p-6",
        project.id === "rag"
          ? "bg-primary text-primary-foreground"
          : project.id === "econnect"
            ? "bg-[#dfe5d6]"
            : "bg-[#ede2d2]",
      )}
    >
      <div className="flex justify-between font-mono text-[0.5625rem] tracking-wider opacity-80">
        <span>
          {project.id === "rag"
            ? "APPLIED AI / RAG"
            : project.id === "econnect"
              ? "KNOWLEDGE SHARING"
              : "E-COMMERCE / MERN"}
        </span>
        <span>{project.number}</span>
      </div>
      {project.id === "rag" ? (
        <>
          <p className="mt-8 text-[2.375rem] leading-[1.12] tracking-tight">
            Context in.
            <br />
            <em className="font-serif text-[#e9c1ad]">Clarity out.</em>
          </p>
          <div className="mt-auto flex items-center justify-between gap-1 font-mono text-[0.5625rem]">
            {["Ingest", "Retrieve", "Respond"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded border border-white/25 px-2 py-2">
                  {step}
                </span>
                {index < 2 && <ArrowRight className="size-3 opacity-60" />}
              </div>
            ))}
          </div>
        </>
      ) : project.id === "econnect" ? (
        <>
          <p className="mt-6 text-4xl font-semibold tracking-[-0.06em]">
            e<span className="text-brand">—</span>connect.
          </p>
          <div className="mt-5 -rotate-3 rounded border border-primary/10 bg-background/90 p-4 shadow-sm">
            <p className="font-mono text-[0.4375rem] tracking-wide">
              ● &nbsp; A SPACE TO LEARN TOGETHER
            </p>
            <p className="mt-3 text-xs leading-relaxed">
              Good questions.
              <br />
              Shared knowledge. Better ideas.
            </p>
            <p className="mt-3 text-[0.5rem] text-muted-foreground">
              Anonymous peer learning ↗
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="mt-8 text-[2.1rem] leading-[1.15] tracking-tight">
            From browse
            <br />
            to <em className="font-serif text-brand">checkout.</em>
          </p>
          <div className="mt-auto flex items-center gap-4">
            <span className="text-xl font-bold tracking-tight">bewakoof.</span>
            <span className="h-6 border-l border-primary/20" />
            <span className="font-serif text-xs tracking-wider">MODESENS</span>
          </div>
        </>
      )}
    </div>
  );
}
