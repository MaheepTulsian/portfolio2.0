import { notFound } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { getData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { generateSlug } from "@/lib/utils";

export async function generateStaticParams() {
  const data = getData();
  return data.projects.map((project) => ({
    slug: generateSlug(project.name),
  }));
}

interface ProjectDetailsProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetails({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const data = getData();
  const project = data.projects.find(
    (p) => generateSlug(p.name) === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          ← Back to projects
        </Link>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {project.awards && project.awards.length > 0 && (
              <Badge variant="default" className="shrink-0">
                Winner
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            {project.category}
          </p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-muted-foreground mt-1.5">•</span>
                  <span className="text-muted-foreground leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Impact */}
        {project.impact && Object.keys(project.impact).length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Impact & Results</h2>
            <div className="space-y-2">
              {Object.entries(project.impact).map(([key, value], index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    <span className="capitalize">{key.replace(/_/g, " ")}</span>
                    : {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance */}
        {project.performance && Object.keys(project.performance).length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Performance Metrics</h2>
            <div className="space-y-2">
              {Object.entries(project.performance).map(([key, value], index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    <span className="capitalize">{key.replace(/_/g, " ")}</span>
                    : {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {project.awards && project.awards.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Awards & Recognition</h2>
            <div className="space-y-2">
              {project.awards.map((award, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-muted-foreground">🏆</span>
                  <span className="font-medium">{award}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.github || project.link) && (
          <div className="flex gap-4 pt-4 border-t">
            {project.github && project.github !== "GITHUB LINK" && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:no-underline"
              >
                View on GitHub →
              </Link>
            )}
            {project.link && project.link !== "PROJECT LINK" && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:no-underline"
              >
                View Live Project →
              </Link>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
