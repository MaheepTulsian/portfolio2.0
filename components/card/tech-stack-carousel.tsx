"use client";

import Image from "next/image";
import * as SimpleIcons from "simple-icons";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { techStack, type TechItem } from "@/lib/tech-stack";

// Local SVGs that are a single dark/black mark — flip them to white in dark
// mode so they stay visible. Colored local logos (Java, Azure) are left alone.
const MONO_DARK_LOCAL = new Set([
  "/icons/openai.svg",
  "/icons/groq.svg",
  "/icons/aws.svg",
]);

function siKey(slug: string): string {
  return `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
}

function simpleIcon(tech: TechItem) {
  return SimpleIcons[siKey(tech.slug) as keyof typeof SimpleIcons] as
    | { path: string; hex: string }
    | undefined;
}

function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function darken(hex: string, factor: number): string {
  const h = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) =>
    Math.round(parseInt(h.slice(i, i + 2), 16) * factor)
  );
  return `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Brand color resolved for each theme so every logo stays legible. */
function themeColors(tech: TechItem): { light: string; dark: string } {
  const brand = tech.color ?? (simpleIcon(tech) ? `#${simpleIcon(tech)!.hex}` : "#888888");
  const lum = relativeLuminance(brand);
  return {
    light: lum > 0.78 ? darken(brand, 0.7) : brand,
    dark: lum < 0.28 ? "#e9e9ec" : brand,
  };
}

function TechGlyph({ tech }: { tech: TechItem }) {
  if (tech.localIcon) {
    const flip = MONO_DARK_LOCAL.has(tech.localIcon);
    return (
      <Image
        src={tech.localIcon}
        alt=""
        width={20}
        height={20}
        className={`h-5 w-5 object-contain ${flip ? "dark:brightness-0 dark:invert" : ""}`}
      />
    );
  }

  const icon = simpleIcon(tech);
  if (!icon) {
    return (
      <span className="grid h-5 w-5 place-items-center text-xs font-semibold text-foreground">
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
      className="h-5 w-5 [color:var(--icl)] dark:[color:var(--icd)]"
    >
      <path d={icon.path} />
    </svg>
  );
}

function TechChip({ tech }: { tech: TechItem }) {
  const { light, dark } = themeColors(tech);
  return (
    <a
      href={tech.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group/tech relative flex shrink-0 items-center gap-2.5 rounded-full px-2.5 py-1"
      style={{ "--icl": light, "--icd": dark } as React.CSSProperties}
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1 rounded-full bg-[color:var(--icl)] opacity-0 blur-md transition-opacity duration-300 group-hover/tech:opacity-35 dark:bg-[color:var(--icd)]"
        />
        <span className="relative transition-transform duration-300 group-hover/tech:scale-110">
          <TechGlyph tech={tech} />
        </span>
      </span>
      <span className="whitespace-nowrap text-sm text-secondary transition-colors duration-300 group-hover/tech:text-foreground">
        {tech.name}
      </span>
    </a>
  );
}

export function TechStackCarousel() {
  const mid = Math.ceil(techStack.length / 2);
  const rowOne = techStack.slice(0, mid);
  const rowTwo = techStack.slice(mid);

  return (
    <div className="flex flex-col gap-2 py-2">
      <InfiniteSlider gap={8} speed={34} speedOnHover={9}>
        {rowOne.map((tech) => (
          <TechChip key={tech.name} tech={tech} />
        ))}
      </InfiniteSlider>
      <InfiniteSlider gap={8} speed={34} speedOnHover={9} reverse>
        {rowTwo.map((tech) => (
          <TechChip key={tech.name} tech={tech} />
        ))}
      </InfiniteSlider>
    </div>
  );
}
