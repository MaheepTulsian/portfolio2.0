"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import * as SimpleIcons from "simple-icons";
import { techStack, type TechItem } from "@/lib/tech-stack";

const MONO_DARK_LOCAL = new Set([
  "/icons/openai.svg",
  "/icons/groq.svg",
  "/icons/aws.svg",
]);

function siKey(slug: string): string {
  return `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
}

function findTech(name: string): TechItem | undefined {
  return techStack.find((t) => t.name.toLowerCase() === name.toLowerCase());
}

function Glyph({ tech }: { tech: TechItem }) {
  if (tech.localIcon) {
    const flip = MONO_DARK_LOCAL.has(tech.localIcon);
    return (
      <Image
        src={tech.localIcon}
        alt=""
        width={16}
        height={16}
        className={`h-4 w-4 object-contain opacity-90 ${flip ? "brightness-0 invert" : ""}`}
      />
    );
  }
  const icon = SimpleIcons[siKey(tech.slug) as keyof typeof SimpleIcons] as
    | { path: string }
    | undefined;
  if (!icon) {
    return (
      <span className="grid h-4 w-4 place-items-center text-[10px] font-semibold text-[lab(66.128_0_0)]">
        {tech.name.charAt(0)}
      </span>
    );
  }
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      className="h-4 w-4 text-[lab(80_0_0)]"
    >
      <path d={icon.path} />
    </svg>
  );
}

function SkillItem({ name }: { name: string }) {
  const tech = findTech(name);
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[lab(94.2_0_0)]">
      {tech ? (
        <Glyph tech={tech} />
      ) : (
        <span className="grid h-4 w-4 place-items-center text-[10px] font-semibold text-[lab(66.128_0_0)]">
          {name.charAt(0)}
        </span>
      )}
      {name}
    </span>
  );
}

// items shown per row before "See more" is clicked
const VISIBLE = 4;

type Row = { label: string; items: string[] };

const ROWS: Row[] = [
  { label: "Language",       items: ["TypeScript", "Python", "JavaScript", "Go", "Dart", "Java", "Shell"] },
  { label: "Frontend",       items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Flutter", "Redux", "Material UI"] },
  { label: "Backend",        items: ["Node.js", "FastAPI", "Express.js", "Firebase"] },
  { label: "Databases",      items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
  { label: "AI / ML",        items: ["LangChain", "OpenAI", "Hugging Face", "Groq"] },
  { label: "Infrastructure", items: ["AWS", "Docker", "GitHub Actions", "Cloudflare", "NGINX", "Azure"] },
  { label: "Blockchain",     items: ["Solidity", "Ethereum", "Ethers.js", "Web3.js"] },
  { label: "Tools",          items: ["GitHub", "VS Code", "Figma", "Postman", "Slack", "Linear", "Notion", "Prisma"] },
];

export function SkillsGrid() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = ROWS.some((row) => row.items.length > VISIBLE);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-[lab(94.2_0_0)]">Skills</h2>
        {hasMore && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-sm text-[lab(66.128_0_0)] transition-colors hover:text-[lab(94.2_0_0)]"
          >
            {expanded ? "Show less" : "See more"}
            <ChevronsUpDown className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-5">
        {ROWS.map((row) => {
          const items = expanded ? row.items : row.items.slice(0, VISIBLE);
          return (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-2 sm:grid-cols-[128px_1fr] sm:items-start"
            >
              <span className="text-sm text-[lab(66.128_0_0)]">{row.label}</span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {items.map((item) => (
                  <SkillItem key={item} name={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
