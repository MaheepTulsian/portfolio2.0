"use client";

import { useMotionValue, animate, motion } from "framer-motion";
import { useState, useEffect, useRef, Fragment } from "react";
import { cn } from "@/lib/utils";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

/**
 * Infinite, seamless marquee. Adapted from motion-primitives' InfiniteSlider
 * to this project's `framer-motion` (measuring with a ResizeObserver rather
 * than react-use-measure). https://motion-primitives.com/docs/infinite-slider
 */
export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSize(direction === "horizontal" ? el.offsetWidth : el.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction]);

  useEffect(() => {
    if (!size) return;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const controls = isTransitioning
      ? animate(translation, [translation.get(), to], {
          ease: "linear",
          duration:
            currentSpeed === 0
              ? 0
              : Math.abs((translation.get() - to) / currentSpeed),
          onComplete: () => {
            setIsTransitioning(false);
            setKey((prev) => prev + 1);
          },
        })
      : animate(translation, [from, to], {
          ease: "linear",
          duration: currentSpeed === 0 ? 0 : contentSize / currentSpeed,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          onRepeat: () => translation.set(from),
        });

    return () => controls.stop();
  }, [
    key,
    translation,
    currentSpeed,
    size,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {[0, 1].map((copy) => (
          <Fragment key={copy}>{children}</Fragment>
        ))}
      </motion.div>
    </div>
  );
}
