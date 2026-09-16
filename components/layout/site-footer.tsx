import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pt-8 pb-28 text-xs text-muted-foreground">
      <span className="flex items-center gap-2 text-foreground">
        <span aria-hidden="true" className="text-2xl text-brand">
          ✳
        </span>
        {profile.name}
      </span>
      <div className="flex gap-5">
        {[
          { label: "GitHub", href: profile.links.github },
          { label: "LinkedIn", href: profile.links.linkedin },
          { label: "Writing", href: profile.links.writing },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center hover:text-brand"
          >
            {link.label} ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
      <small className="font-mono text-[0.5625rem]">
        © {new Date().getFullYear()} · MADE WITH INTENTION
      </small>
    </footer>
  );
}
