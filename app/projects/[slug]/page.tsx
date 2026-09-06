import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Github, ArrowUpRight } from "lucide-react";
import { getData } from "@/lib/data";
import { generateSlug } from "@/lib/utils";
import { HideNav } from "@/components/layout/hide-nav";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateStaticParams() {
  const data = getData();
  return data.projects.map((project) => ({
    slug: generateSlug(project.name),
  }));
}

interface ProjectDetailsProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getData().projects.find((p) => generateSlug(p.name) === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.description,
      url: `/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
    },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[lab(50_0_0)]">
      {children}
    </h2>
  );
}

export default async function ProjectDetails({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const data = getData();
  const project = data.projects.find((p) => generateSlug(p.name) === slug);

  if (!project) {
    notFound();
  }

  const isWinner = !!project.awards && project.awards.length > 0;
  const hasGithub = project.github && project.github !== "GITHUB LINK";
  const hasLink = project.link && project.link !== "PROJECT LINK";

  return (
    <div className="min-h-screen w-full bg-[lab(3.04863_0_0)] text-[lab(94.2_0_0)]">
      <HideNav />
      <main className="mx-auto w-full max-w-[700px] px-8 pb-24 pt-14">
        <div className="mb-10">
          <Breadcrumb
            backHref="/projects"
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.name },
            ]}
          />
        </div>

        <div className="space-y-12 animate-fade-in-blur">
          {/* Header */}
          <div>
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <h1 className="text-2xl font-medium tracking-tight text-[lab(94.2_0_0)] md:text-3xl">
                  {project.name}
                </h1>
                <div className="flex shrink-0 items-center gap-1">
                  {hasGithub && (
                    <a
                      href={project.github!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[lab(55_0_0)] transition-colors hover:bg-[lab(100_0_0/0.04)] hover:text-[lab(94.2_0_0)]"
                    >
                      <Github className="h-[18px] w-[18px]" />
                    </a>
                  )}
                  {hasLink && (
                    <a
                      href={project.link!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} live project`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[lab(55_0_0)] transition-colors hover:bg-[lab(100_0_0/0.04)] hover:text-[lab(94.2_0_0)]"
                    >
                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>
                  )}
                </div>
              </div>
              {isWinner && (
                <span className="mt-1.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[lab(100_0_0/0.10)] bg-[lab(100_0_0/0.04)] px-2.5 py-1 text-[11px] font-medium text-[lab(66.128_0_0)]">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "var(--accent-live)" }}
                    aria-hidden
                  />
                  Winner
                </span>
              )}
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[lab(50_0_0)]">
              {project.category}
            </p>
          </div>

          {/* Overview */}
          <section>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-sm leading-relaxed text-[lab(66.128_0_0)]">
              {project.description}
            </p>
          </section>

          {/* Tech Stack */}
          <section>
            <SectionLabel>Tech Stack</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded border border-[lab(100_0_0/0.10)] bg-[lab(100_0_0/0.04)] px-2 py-1 font-mono text-[11px] tracking-wide text-[lab(66.128_0_0)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section>
              <SectionLabel>Key Features</SectionLabel>
              <ul className="space-y-2.5">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[lab(66.128_0_0)]"
                  >
                    <span className="mt-2 block h-[3px] w-[3px] shrink-0 rounded-full bg-[lab(45_0_0)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Impact */}
          {project.impact && Object.keys(project.impact).length > 0 && (
            <section>
              <SectionLabel>Impact &amp; Results</SectionLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(project.impact).map(([key, value], index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-[lab(100_0_0/0.08)] bg-[lab(100_0_0/0.03)] p-4"
                  >
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[lab(50_0_0)]">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p className="text-sm font-medium text-[lab(88_0_0)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Performance */}
          {project.performance &&
            Object.keys(project.performance).length > 0 && (
              <section>
                <SectionLabel>Performance Metrics</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(project.performance).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-[lab(100_0_0/0.08)] bg-[lab(100_0_0/0.03)] p-4"
                      >
                        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[lab(50_0_0)]">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className="text-sm font-medium text-[lab(88_0_0)]">
                          {value}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

          {/* Awards */}
          {isWinner && (
            <section>
              <SectionLabel>Awards &amp; Recognition</SectionLabel>
              <div className="space-y-2.5">
                {project.awards!.map((award, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--accent-live)" }}
                      aria-hidden
                    />
                    <span className="text-sm font-medium text-[lab(88_0_0)]">
                      {award}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
