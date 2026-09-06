"use client";

import { useEffect, useRef, useState } from "react";
import { HeatmapCalendar } from "@/components/ui/contribution-heatmap";
import type { ContributionDay } from "@/lib/github";

// Monochrome ink ramp — reads as data density instead of a GitHub-green clone,
// and works in both themes because it's relative to the foreground color.
const HEAT_PALETTE = [
  "color-mix(in oklch, var(--foreground) 5%, transparent)",
  "color-mix(in oklch, var(--foreground) 18%, transparent)",
  "color-mix(in oklch, var(--foreground) 38%, transparent)",
  "color-mix(in oklch, var(--foreground) 62%, transparent)",
  "color-mix(in oklch, var(--foreground) 92%, transparent)",
];

function computeStats(data: ContributionDay[]) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const activeDays = data.filter((d) => d.value > 0).length;

  let longest = 0;
  let running = 0;
  for (const d of data) {
    running = d.value > 0 ? running + 1 : 0;
    longest = Math.max(longest, running);
  }

  let current = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].value > 0) current++;
    else break;
  }

  return { total, activeDays, longest, current };
}

export function ActivityHeatmap({ data }: { data: ContributionDay[] }) {
  const [cellSize, setCellSize] = useState<number>();
  const [cellGap, setCellGap] = useState<number>();
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCellSize = () => {
      // ~53 week columns; fill the section width for a larger, sleeker grid.
      const availableWidth = Math.min(window.innerWidth - 48, 860);
      const gap = 3;
      const size = Math.floor((availableWidth - 52 * gap) / 53);
      setCellSize(Math.max(9, Math.min(15, size)));
      setCellGap(gap);
    };

    updateCellSize();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    window.addEventListener("resize", updateCellSize, { passive: true });
    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  // Keep the grid scrolled to the most recent weeks (right edge) by default.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [mounted, cellSize, cellGap, data.length]);

  const { total, activeDays, longest, current } = computeStats(data);

  if (mounted && data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Contribution activity is unavailable right now.
      </p>
    );
  }

  return (
    <div>
      {/* Summary */}
      <div className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-3">
        <Stat value={total.toLocaleString()} label="contributions" />
        <Stat value={activeDays.toString()} label="active days" />
        <Stat value={longest.toString()} label="longest streak" />
        {current > 0 && <Stat value={current.toString()} label="current streak" />}
      </div>

      {mounted && cellSize !== undefined && cellGap !== undefined ? (
        <>
          <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide">
            <HeatmapCalendar
              data={data}
              rangeDays={365}
              cellSize={cellSize}
              cellGap={cellGap}
              palette={HEAT_PALETTE}
              axisLabels={{ showWeekdays: false, monthFormat: "short", minWeekSpacing: 2 }}
              legend={false}
              renderTooltip={(cell) =>
                cell.disabled ? (
                  "Outside range"
                ) : (
                  <div className="text-sm">
                    <div className="font-medium tnum">
                      {cell.value} {cell.value === 1 ? "contribution" : "contributions"}
                    </div>
                    <div className="text-muted-foreground">{cell.label}</div>
                  </div>
                )
              }
            />
          </div>

          {/* Minimal legend */}
          <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {HEAT_PALETTE.map((color, i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-[3px]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </>
      ) : (
        <div className="h-28" />
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-heading text-lg font-semibold tracking-tight tnum text-foreground">
        {value}
      </span>
      <span className="text-sm text-secondary">{label}</span>
    </div>
  );
}
