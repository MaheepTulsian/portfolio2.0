import Link from "next/link";
import { ReactNode } from "react";
import { Mail, Github, Linkedin, FileText, ArrowRight, ArrowUpRight } from "lucide-react";
import { getData } from "@/lib/data";
import { getGitHubContributions } from "@/lib/github";
import { siteConfig } from "@/lib/site";
import { generateSlug } from "@/lib/utils";
import { Performance } from "@/components/home/performance";
import { ExperienceRail } from "@/components/home/experience-rail";
import { SkillsGrid } from "@/components/home/skills-grid";
import { ChromeHider } from "@/components/home/chrome-hider";

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

function IconLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-[lab(66.128_0_0)] transition-colors hover:text-[lab(94.2_0_0)]"
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
    <div className="min-h-screen w-full bg-[lab(3.04863_0_0)] text-[lab(94.2_0_0)]">
      <ChromeHider />
      <main className="mx-auto w-full max-w-[700px] px-8 pt-14">
        {/* Header */}
        <section className="animate-fade-in-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-lg font-semibold tracking-tight text-[lab(94.2_0_0)]">
                {personal.name}
              </h1>
              <p className="mt-0.5 text-sm text-[lab(60_0_0)]">
                Full-stack &amp; AI/ML engineer
              </p>
            </div>
            <div className="mt-1 flex items-center gap-4">
              <IconLink href={`https://twitter.com/${personal.contact.twitter}`} label="X" external>
                <XIcon className="h-[15px] w-[15px]" />
              </IconLink>
              <IconLink href={`https://github.com/${personal.contact.github}`} label="GitHub" external>
                <Github className="h-4 w-4" />
              </IconLink>
              <IconLink href={`https://linkedin.com/in/${personal.contact.linkedin}`} label="LinkedIn" external>
                <Linkedin className="h-4 w-4" />
              </IconLink>
              <IconLink href={`mailto:${personal.contact.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </IconLink>
              <IconLink href="/resume/MaheepTulsian.pdf" label="Resume" external>
                <FileText className="h-4 w-4" />
              </IconLink>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-7 space-y-4 text-base leading-relaxed text-[oklch(0.75_0_0)]">
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
          <div className="relative mt-6">
            <div className="pointer-events-none absolute right-full top-1/2 mr-6 hidden -translate-y-1/2 items-center gap-1 whitespace-nowrap lg:flex">
              <span className="font-heading-italic text-sm text-[lab(66.128_0_0)]">
                open to work
              </span>
              <svg viewBox="0 0 60 24" className="h-5 w-14 text-[lab(66.128_0_0)]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <path d="M2 4c14 14 30 16 54 14" />
                <path d="M50 12l6 6-9 1" />
              </svg>
            </div>
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
        </section>

        {/* Performance */}
        <section className="mt-16">
          <SectionHead>Performance</SectionHead>
          <Performance data={contributions} />
        </section>

        {/* Experience */}
        <section className="mt-16">
          <SectionHead>Experience</SectionHead>
          <ExperienceRail />
        </section>

        {/* Skills */}
        <section className="mt-16">
          <SkillsGrid />
        </section>

        {/* Projects */}
        <section className="mt-16 pb-24">
          <SectionHead action={<SeeMore href="/projects" label="See all" />}>Projects</SectionHead>
          <div className="-mx-3">
            {FEATURED.map((project) => (
              <Link
                key={project.name}
                href={`/projects/${generateSlug(project.name)}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[lab(100_0_0/0.035)]"
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
        </section>
      </main>
    </div>
  );
}
