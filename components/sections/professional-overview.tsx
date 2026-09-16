export function ProfessionalOverview() {
  return (
    <section
      aria-label="Professional overview"
      className="grid gap-6 border-y py-7 sm:grid-cols-3 sm:gap-5"
    >
      <div className="flex items-center gap-4">
        <strong className="font-serif text-4xl font-normal">3+</strong>
        <span className="text-xs leading-relaxed text-muted-foreground">
          Years of building
          <br />
          real-world software
        </span>
      </div>
      <div className="flex flex-col justify-center gap-2 sm:border-l sm:pl-7">
        <span className="font-mono text-[0.5625rem] tracking-widest text-muted-foreground">
          ENTERPRISE EXPERIENCE
        </span>
        <strong className="text-sm font-medium">
          NewgenDigital <span className="px-1 text-brand">×</span> TVS Motor
        </strong>
      </div>
      <div className="flex flex-col justify-center gap-2 sm:border-l sm:pl-7">
        <span className="font-mono text-[0.5625rem] tracking-widest text-muted-foreground">
          BRINGING IT ALL TOGETHER
        </span>
        <strong className="text-sm font-medium">
          Full-stack <span className="px-1 text-brand">+</span> Applied AI
        </strong>
      </div>
    </section>
  );
}
