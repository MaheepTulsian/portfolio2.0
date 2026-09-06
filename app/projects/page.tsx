import type { Metadata } from "next";
import { getData } from "@/lib/data";
import { ProjectCard } from "@/components/projects/project-card";
import { HideNav } from "@/components/layout/hide-nav";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Maheep Tulsian spanning web, AI/ML, and systems — each built to solve a real problem end to end.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  const { projects } = getData();

  return (
    <div className="min-h-screen w-full bg-[lab(3.04863_0_0)] text-[lab(94.2_0_0)]">
      <HideNav />
      <main className="mx-auto w-full max-w-[700px] px-8 pb-24 pt-14">
        <Breadcrumb
          backHref="/"
          items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />

        <header className="mt-10 animate-fade-in-blur">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[lab(50_0_0)]">
            {projects.length} projects
          </p>
          <h1 className="mt-3 text-2xl font-medium tracking-tight text-[lab(94.2_0_0)]">
            Things I&apos;ve{" "}
            <span className="font-heading-italic font-normal">built</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[lab(66.128_0_0)]">
            A selection of projects spanning web, AI/ML, and systems — each one
            built to solve a real problem end to end.
          </p>
        </header>

        <div className="mt-10 border-t border-[lab(100_0_0/0.08)]">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
