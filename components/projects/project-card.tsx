import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { generateSlug } from "@/lib/utils";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const slug = generateSlug(project.name);
  const hasLink = !!project.link && project.link !== "PROJECT LINK";
  const isWinner = !!project.awards && project.awards.length > 0;
  const tech = project.technologies.slice(0, 4).join(" · ");

  return (
    <Link
      href={`/projects/${slug}`}
      className="list-row group grid grid-cols-1 gap-1.5 border-b border-[lab(100_0_0/0.1)] py-6 first:pt-2 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-10"
    >
      <div className="relative flex items-baseline gap-2">
        <h3 className="text-base font-medium tracking-tight text-[lab(94.2_0_0)]">
          {project.name}
        </h3>
        {isWinner && (
          <span className="text-[11px] text-[lab(66.128_0_0)]">Winner</span>
        )}
        {hasLink && (
          <span
            className="mb-0.5 inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full"
            style={{ backgroundColor: "var(--accent-live)" }}
            aria-hidden
          />
        )}
        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 self-center text-[lab(50_0_0)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:hidden" />
      </div>

      <div className="relative">
        <p className="text-sm leading-relaxed text-[lab(66.128_0_0)]">
          {project.description}
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-wide text-[lab(45_0_0)]">
          {tech}
        </p>
      </div>
    </Link>
  );
}
