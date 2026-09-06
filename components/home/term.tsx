"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import Image, { type StaticImageData } from "next/image";

type TermProps = {
  children: React.ReactNode;
  /** Title shown in the tooltip card. */
  name: string;
  /** Small caption under the name (e.g. "Hackathon", "Track sponsor"). */
  sub?: string;
  /** A logo: an imported image, or any node (e.g. an inline SVG). */
  logo?: StaticImageData | React.ReactNode;
  /** Monogram fallback when no logo is available. */
  mono?: string;
};

function LogoTile({
  name,
  logo,
  mono,
}: Pick<TermProps, "name" | "logo" | "mono">) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-card">
      {logo ? (
        React.isValidElement(logo) ? (
          logo
        ) : (
          <Image
            src={logo as StaticImageData}
            alt=""
            className="h-6 w-6 object-contain"
          />
        )
      ) : (
        <span className="font-heading text-sm font-semibold text-foreground">
          {mono ?? name.charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  );
}

/** Underlined term that reveals a premium logo card on hover. */
export function Term({ children, name, sub, logo, mono }: TermProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <span className="cursor-default font-medium text-foreground underline decoration-dotted decoration-foreground/40 underline-offset-[3px] transition-colors hover:decoration-foreground">
          {children}
        </span>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={8}
          className="z-50 origin-(--radix-tooltip-content-transform-origin) animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 rounded-xl border border-border bg-popover px-3 py-2.5 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center gap-2.5">
            <LogoTile name={name} logo={logo} mono={mono} />
            <div className="leading-tight">
              <div className="text-sm font-medium text-popover-foreground">
                {name}
              </div>
              {sub && (
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {sub}
                </div>
              )}
            </div>
          </div>
          <TooltipPrimitive.Arrow className="fill-popover" width={11} height={6} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
