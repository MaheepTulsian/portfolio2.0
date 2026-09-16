import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getData } from "@/lib/data";
import { getGitHubContributions } from "@/lib/github";
import { siteConfig } from "@/lib/site";
import { generateSlug } from "@/lib/utils";
import { Performance } from "@/components/home/performance";
import { ExperienceRail } from "@/components/home/experience-rail";
import { SkillsGrid } from "@/components/home/skills-grid";
import { ChromeHider } from "@/components/home/chrome-hider";
import { HeaderConsole } from "@/components/home/header-console";
import { Footer } from "@/components/layout/footer";
import { HatchDivider } from "@/components/layout/hatch-divider";

function SectionHead({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <h2 className="font-heading text-lg font-semibold tracking-tight text-[lab(94.2_0_0)]">{children}</h2>
      {action}
    </div>
  );
}

function SeeMore({ href, label = "See more" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1 text-sm text-[lab(66.128_0_0)] transition-colors hover:text-[lab(94.2_0_0)]"
    >
      {label}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function BioLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-[lab(94.2_0_0)] underline decoration-[lab(100_0_0/0.25)] underline-offset-[3px] transition-colors hover:decoration-[lab(94.2_0_0)]"
    >
      {children}
    </Link>
  );
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type FeaturedProject = {
  name: string;
  tagline: string;
};

const FEATURED: FeaturedProject[] = [
  { name: "Up.ly", tagline: "AI career-prep platform with a custom MCP server" },
  { name: "Redeem", tagline: "Production coupon-management REST API in Go" },
  { name: "cUrlBaby", tagline: "Terminal-native API testing, a lightweight Postman" },
  { name: "VibeUI", tagline: "AI-customizable component library on shadcn/ui" },
];

export default async function Home() {
  const { personal } = getData();
  const contributions = await getGitHubContributions(siteConfig.githubUsername);

  return (
    <div className="relative min-h-screen w-full bg-[#121214] text-[lab(94.2_0_0)]">
      <ChromeHider />

      {/* Full-height vertical rails framing the content column (no fill). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="mx-auto h-full max-w-[720px] border-x border-[lab(100_0_0/0.15)]" />
      </div>

      <main className="relative z-10 w-full">
        <HatchDivider />
        {/* Header */}
        <section className="animate-fade-in-blur">
          <HeaderConsole
            name={personal.name}
            tagline="Full-stack & AI/ML engineer"
            avatarSrc="/pfp.png"
            contact={personal.contact}
          />
          <div className="mx-auto max-w-[720px] px-8 pb-10 pt-8">
          {/* Bio */}
          <div className="space-y-4 text-base leading-relaxed text-[oklch(0.75_0_0)]">
            <p>
              yo, I&apos;m Maheep, a full-stack &amp; AI/ML engineer based in
              India, obsessed with user experience, real-time systems, and good
              design.
            </p>
            <p>
              So far my projects have won{" "}
              <BioLink href="/projects">2 hackathon tracks</BioLink> and earned
              real revenue.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={siteConfig.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 items-center rounded-[10px] bg-[lab(94.2_0_0)] px-2.5 text-sm font-medium text-[lab(8_0_0)] transition-opacity hover:opacity-90"
              >
                Book a call
              </a>
              <a
                href={`https://twitter.com/${personal.contact.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 items-center gap-[3px] rounded-[10px] border border-[lab(100_0_0/0.14)] px-2.5 text-sm font-medium text-[lab(94.2_0_0)] transition-colors hover:border-[lab(100_0_0/0.3)]"
              >
                Message on <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          </div>
        </section>

        <HatchDivider />
        {/* Performance */}
        <section>
          <div className="mx-auto max-w-[720px] px-8 py-10">
            <SectionHead>Performance</SectionHead>
            <Performance data={contributions} />
          </div>
        </section>

        <HatchDivider />
        {/* Experience */}
        <section>
          <div className="mx-auto max-w-[720px] px-8 py-10">
            <SectionHead>Experience</SectionHead>
            <ExperienceRail />
          </div>
        </section>

        <HatchDivider />
        {/* Skills */}
        <section>
          <div className="mx-auto max-w-[720px] px-8 py-10">
            <SkillsGrid />
          </div>
        </section>

        <HatchDivider />
        {/* Projects */}
        <section>
          <div className="mx-auto max-w-[720px] px-8 py-10">
          <SectionHead action={<SeeMore href="/projects" label="See all" />}>Projects</SectionHead>
          <div className="-mx-3 divide-y divide-[lab(100_0_0/0.1)]">
            {FEATURED.map((project) => (
              <Link
                key={project.name}
                href={`/projects/${generateSlug(project.name)}`}
                className="group flex items-center gap-3 px-3 py-3.5 transition-colors hover:bg-[lab(100_0_0/0.035)]"
              >
                <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <span className="text-sm font-medium text-[lab(94.2_0_0)]">
                    {project.name}
                  </span>
                  <span className="truncate text-sm text-[lab(55_0_0)]">
                    {project.tagline}
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 text-[lab(50_0_0)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          </div>
        </section>

        <HatchDivider />
        {/* Footer — part of the landing page (not global) */}
        <Footer />
        <HatchDivider />
      </main>
    </div>
  );
}
