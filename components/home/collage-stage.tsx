"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A fixed-size design canvas that scales to fit its container (transform:scale,
 * origin top-left) — the same technique smritidesign.work uses, so children can
 * be absolutely positioned in exact pixels and stay pixel-perfect at any width.
 */
export function CollageStage({
  width,
  height,
  className,
  children,
}: {
  width: number;
  height: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScale(Math.min(el.clientWidth / width, 1));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={className} style={{ height: height * scale }}>
      <div
        className="relative"
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
