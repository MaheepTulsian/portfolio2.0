import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { getData } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, ExternalLink, Mail, MapPin } from "lucide-react";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function formatDateRange(start: string, end: string): string {
  return `${formatDate(start)} — ${formatDate(end)}`;
}

export default function Resume() {
  const data = getData();
  const {
    personal,
    education,
    work_experience,
    volunteering_leadership,
    skills,
    projects,
  } = data;

  const featuredProjects = projects
    .filter((p) => p.awards || p.impact)
    .slice(0, 3);

  return (
    <PageContainer>
      <TooltipProvider>
        {/* Top Actions */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="https://drive.google.com/file/d/1S5fiuZRxgnsIvw0_3yH047Di-F-aURWF/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Public URL
          </Link>
          <Link
            href="/resume/MaheepTulsian.pdf"
            download
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </Link>
        </div>

        {/* Header - Clean, no card */}
        <header className="mb-16">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {personal.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{personal.title}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {personal.location.city}, {personal.location.country}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {personal.contact.email}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm">
            <Link
              href={`https://github.com/${personal.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              GitHub
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href={`https://linkedin.com/in/${personal.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              LinkedIn
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Education
          </h2>

          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-medium">{education.university}</h3>
              <span className="text-sm text-muted-foreground">
                {formatDateRange(education.duration.start, education.duration.end)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {education.degree} in {education.specialization}
            </p>
            <p className="text-sm text-muted-foreground">
              CGPA: {education.cgpa}
            </p>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Experience
          </h2>

          <div className="space-y-10">
            {work_experience.map((exp, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDateRange(exp.duration.start, exp.duration.end)}
                  </span>
                </div>

                <ul className="space-y-1.5 mt-3">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li
                      key={respIndex}
                      className="text-sm text-muted-foreground pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-muted-foreground"
                    >
                      {resp}
                    </li>
                  ))}
                </ul>

                {/* Tech stack as inline text */}
                <p className="text-xs text-muted-foreground/70 mt-3">
                  {exp.technologies.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Skills - Accordion for cleaner look */}
        <section className="mb-12">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Skills
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="languages" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="text-sm font-normal">Languages</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3">
                {skills.programming_languages.join(", ")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="frontend" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="text-sm font-normal">Frontend</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3">
                {skills.frontend.join(", ")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="backend" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="text-sm font-normal">Backend & Databases</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3">
                {[...skills.backend, ...skills.databases].join(", ")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="devops" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="text-sm font-normal">DevOps & Cloud</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3">
                {skills.devops_cloud.join(", ")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="aiml" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="text-sm font-normal">AI/ML & Blockchain</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3">
                {[...skills.ai_ml, ...skills.blockchain].join(", ")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator className="mb-12" />

        {/* Featured Projects */}
        <section className="mb-12">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Projects
          </h2>

          <div className="space-y-8">
            {featuredProjects.map((project, index) => (
              <div key={index}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-medium">{project.name}</h3>
                  {project.github && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>View on GitHub</TooltipContent>
                    </Tooltip>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {project.description}
                </p>

                <p className="text-xs text-muted-foreground/70">
                  {project.technologies.slice(0, 6).join(" · ")}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/projects"
            className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all projects →
          </Link>
        </section>

        <Separator className="mb-12" />

        {/* Leadership */}
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Leadership
          </h2>

          <div className="space-y-4">
            {volunteering_leadership.slice(0, 3).map((vol, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="font-medium text-sm">{vol.role}</span>
                <span className="text-sm text-muted-foreground">
                  <span className="hidden sm:inline">— </span>
                  {vol.organization}
                </span>
              </div>
            ))}
          </div>
        </section>
      </TooltipProvider>
    </PageContainer>
  );
}
