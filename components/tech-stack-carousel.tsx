"use client";

import { techStack } from "@/lib/tech-stack";
import * as SimpleIcons from "simple-icons";

export function TechStackCarousel() {
  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative flex overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling content - first set */}
        <div className="flex animate-scroll gap-8 pr-8">
          {techStack.map((tech, index) => {
            const icon = SimpleIcons[`si${tech.slug.charAt(0).toUpperCase() + tech.slug.slice(1)}` as keyof typeof SimpleIcons];

            return (
              <div
                key={`${tech.slug}-${index}`}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-muted group-hover:bg-muted/70 transition-colors"
                  title={tech.name}
                >
                  {icon && (
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="currentColor"
                      style={{ color: tech.color || "currentColor" }}
                    >
                      <path d={icon.path} />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-muted-foreground text-center">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Scrolling content - duplicate for infinite loop */}
        <div className="flex animate-scroll gap-8 pr-8">
          {techStack.map((tech, index) => {
            const icon = SimpleIcons[`si${tech.slug.charAt(0).toUpperCase() + tech.slug.slice(1)}` as keyof typeof SimpleIcons];

            return (
              <div
                key={`${tech.slug}-duplicate-${index}`}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-muted group-hover:bg-muted/70 transition-colors"
                  title={tech.name}
                >
                  {icon && (
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="currentColor"
                      style={{ color: tech.color || "currentColor" }}
                    >
                      <path d={icon.path} />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-muted-foreground text-center">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
