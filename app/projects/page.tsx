import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { getData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { generateSlug } from "@/lib/utils";

export default function Projects() {
  const data = getData();
  const { projects } = data;

  return (
    <PageContainer>
      <h2 className="text-2xl font-semibold mb-8">Things I have worked on</h2>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <article key={index} className="border-l-2 border-border pl-4 hover:border-foreground transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link href={`/projects/${generateSlug(project.name)}`}>
                <h3 className="text-lg font-semibold hover:underline">{project.name}</h3>
              </Link>
              {project.awards && project.awards.length > 0 && (
                <Badge variant="default" className="shrink-0">
                  Winner
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {project.category}
            </p>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.technologies.slice(0, 5).map((tech, techIndex) => (
                <Badge key={techIndex} variant="outline" className="text-xs font-normal">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 5 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{project.technologies.length - 5} more
                </Badge>
              )}
            </div>
            {project.awards && project.awards.length > 0 && (
              <p className="text-sm font-medium mb-3">
                {project.awards[0]}
              </p>
            )}
            <Link
              href={`/projects/${generateSlug(project.name)}`}
              className="text-sm underline hover:no-underline"
            >
              View Details →
            </Link>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
