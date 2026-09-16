"use client";

import { ArrowUpRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Read about ${project.title}`}
          />
        }
      >
        <ArrowUpRight aria-hidden="true" className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-y-auto bg-background p-7 sm:max-w-xl sm:p-9">
        <DialogHeader>
          <p className="pr-6 font-mono text-eyebrow uppercase text-brand">
            {project.category}
          </p>
          <DialogTitle className="pt-2 pr-5 text-3xl tracking-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="pt-3 leading-7">
            {project.overview}
          </DialogDescription>
        </DialogHeader>
        <div>
          <h3 className="mb-3 font-medium">What it explores</h3>
          <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-brand">
                  ↗
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="rounded-md bg-muted p-4 text-xs leading-6 text-muted-foreground">
          {project.note}
        </p>
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                {link.label}
                <ArrowUpRight className="size-3" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
