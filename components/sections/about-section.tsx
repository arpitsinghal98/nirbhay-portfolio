import { about, education } from "@/content/portfolio";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-muted">
      <div className="mx-auto grid w-[calc(100%-var(--page-gutter)*2)] max-w-site gap-10 py-section md:grid-cols-[1fr_1.05fr] md:gap-16">
        <div>
          <p className="font-mono text-eyebrow text-muted-foreground">
            02 / A LITTLE ABOUT ME
          </p>
          <h2 id="about-title" className="mt-5 text-section-title">
            Curiosity led me here.
            <br />
            <em className="font-serif font-normal text-brand">
              Building keeps me going.
            </em>
          </h2>
          <p className="mt-8 font-serif text-sm italic text-muted-foreground">
            Always an engineer. Always a learner.
          </p>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="grid gap-6 border-t pt-6 sm:grid-cols-2">
            {education.map((item) => (
              <div key={item.qualification}>
                <span className="font-mono text-[0.625rem] text-brand">
                  {item.period}
                </span>
                <h3 className="mt-2 text-xs font-medium text-foreground">
                  {item.qualification}
                </h3>
                <p className="mt-1 text-xs leading-5">{item.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
