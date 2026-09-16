import type { Metadata } from "next";
import { getData } from "@/lib/data";
import { ProjectCard } from "@/components/projects/project-card";
import { HideNav } from "@/components/layout/hide-nav";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { HatchDivider } from "@/components/layout/hatch-divider";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Maheep Tulsian spanning web, AI/ML, and systems — each built to solve a real problem end to end.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  const { projects } = getData();

  return (
    <div className="relative min-h-screen w-full bg-[#121214] text-[lab(94.2_0_0)]">
      <HideNav />

      {/* Vertical rails — inset from the screen edges on mobile, a centred 720
          column on desktop. Content wrappers use the same mx-4/md:mx-auto. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="mx-4 h-full max-w-[720px] border-x border-[lab(100_0_0/0.15)] md:mx-auto" />
      </div>

      <main className="relative z-10 w-full">
        <HatchDivider />
        {/* Intro */}
        <section className="animate-fade-in-blur">
          <div className="mx-4 max-w-[720px] md:mx-auto px-5 sm:px-8 pb-10 pt-12">
            <Breadcrumb
              backHref="/"
              items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
            />

            <header className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[lab(50_0_0)]">
                {projects.length} projects
              </p>
              <h1 className="mt-3 text-2xl font-medium tracking-tight text-[lab(94.2_0_0)]">
                Things I&apos;ve{" "}
                <span className="font-heading-italic font-normal">built</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[lab(66.128_0_0)]">
                A selection of projects spanning web, AI/ML, and systems — each
                one built to solve a real problem end to end.
              </p>
            </header>
          </div>
        </section>

        <HatchDivider />
        {/* Project list */}
        <section>
          <div className="mx-4 max-w-[720px] md:mx-auto px-5 sm:px-8 pb-16 pt-4">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
        <HatchDivider />
      </main>
    </div>
  );
}
