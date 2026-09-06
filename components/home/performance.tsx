"use client";

import { useEffect, useRef, useState } from "react";
import { HeatmapCalendar } from "@/components/ui/contribution-heatmap";
import type { ContributionDay } from "@/lib/github";

// White ink ramp on the near-black canvas — reads as raw density.
const HEAT_PALETTE = [
  "lab(100 0 0 / 0.05)",
  "lab(100 0 0 / 0.14)",
  "lab(100 0 0 / 0.30)",
  "lab(100 0 0 / 0.55)",
  "lab(100 0 0 / 0.90)",
];

export function Performance({ data }: { data: ContributionDay[] }) {
  const [cellSize, setCellSize] = useState<number>();
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const available = Math.min(window.innerWidth - 64, 636);
      const gap = 3;
      const size = Math.floor((available - 52 * gap) / 53);
      setCellSize(Math.max(6, Math.min(9, size)));
    };
    update();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [mounted, cellSize, data.length]);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (mounted && data.length === 0) {
    return (
      <p className="text-sm text-[lab(66.128_0_0)]">
        Contribution activity is unavailable right now.
      </p>
    );
  }

  return (
    <div>
      {mounted && cellSize !== undefined ? (
        <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide">
          <HeatmapCalendar
            data={data}
            rangeDays={365}
            cellSize={cellSize}
            cellGap={3}
            palette={HEAT_PALETTE}
            axisLabels={{ showWeekdays: false, monthFormat: "short", minWeekSpacing: 3 }}
            legend={false}
            renderTooltip={(cell) =>
              cell.disabled ? (
                "Outside range"
              ) : (
                <div className="text-sm">
                  <div className="font-medium tnum">
                    {cell.value} {cell.value === 1 ? "contribution" : "contributions"}
                  </div>
                  <div className="text-[lab(66.128_0_0)]">{cell.label}</div>
                </div>
              )
            }
          />
        </div>
      ) : (
        <div className="h-24" />
      )}

      <p className="mt-4 text-sm text-[lab(66.128_0_0)] tnum">
        {total.toLocaleString()} last year
      </p>
    </div>
  );
}
