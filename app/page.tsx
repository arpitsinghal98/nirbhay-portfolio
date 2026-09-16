import { AssistantProvider } from "@/components/assistant/assistant-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfessionalOverview } from "@/components/sections/professional-overview";
import { WorkSection } from "@/components/sections/work-section";

export default function Home() {
  return (
    <AssistantProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <div className="mx-auto w-[calc(100%-var(--page-gutter)*2)] max-w-site">
        <SiteHeader />
      </div>
      <main id="main" tabIndex={-1}>
        <div className="mx-auto w-[calc(100%-var(--page-gutter)*2)] max-w-site">
          <HeroSection />
          <ProfessionalOverview />
          <WorkSection />
        </div>
        <AboutSection />
        <div className="mx-auto w-[calc(100%-var(--page-gutter)*2)] max-w-site">
          <ExperienceSection />
          <ContactSection />
        </div>
      </main>
      <div className="mx-auto w-[calc(100%-var(--page-gutter)*2)] max-w-site">
        <SiteFooter />
      </div>
    </AssistantProvider>
  );
}
