"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const TECH = "FastAPI · Postgres · Hatchet · Lambda · React";

const HL = "font-medium text-[lab(88_0_0)]";

const BULLETS: ReactNode[] = [
  <>
    Rebuilt the alerts dashboard with a Postgres LISTEN/NOTIFY pub/sub for
    real-time server push, cutting alert latency from{" "}
    <span className={HL}>~15s to near-instant</span>.
  </>,
  <>
    Built durable Hatchet workflows for the CVAT annotation pipeline, replacing
    manual tracking and making it <span className={HL}>~20× faster</span>.
  </>,
  <>
    Automated client reporting via <span className={HL}>AWS Lambda</span>,
    generating and emailing detailed device-health reports{" "}
    <span className={HL}>on a schedule</span> and cutting manual triage.
  </>,
];

function EnviewLogo() {
  const [ok, setOk] = useState(true);
  if (!ok) return <span className="text-sm font-medium text-[lab(94.2_0_0)]">Enview</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logos/enview.png"
      alt="Enview"
      height={22}
      onError={() => setOk(false)}
      className="h-[18px] max-w-[80px] w-auto object-contain object-left [filter:brightness(0)_invert(1)] opacity-85"
    />
  );
}

export function ExperienceRail() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="min-w-0 flex flex-col gap-1.5">
          {/* logo + dates on same row */}
          <div className="flex items-center justify-between gap-4">
            <EnviewLogo />
            <div className="shrink-0 flex items-center gap-2 text-sm text-[lab(66.128_0_0)] tnum">
              <span>Mar 2026 – Present</span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--accent-live)" }}
                aria-hidden
              />
            </div>
          </div>
          {/* role + tech */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm text-[lab(66.128_0_0)]">SWE Intern</span>
            <span className="text-[lab(35_0_0)] text-xs">·</span>
            <p className="font-mono text-[11px] tracking-wide text-[lab(42_0_0)]">
              {TECH}
            </p>
          </div>
        </div>
      </div>

      {/* Bullets */}
      <ul className="mt-5 space-y-2.5">
        {BULLETS.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed text-[lab(66.128_0_0)]"
          >
            {/* dot: 4px, offset by half leading above cap = ~(22.75-14)/2 + 14*0.35 ≈ 9px */}
            <span className="mt-2 block h-[3px] w-[3px] shrink-0 rounded-full bg-[lab(45_0_0)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
