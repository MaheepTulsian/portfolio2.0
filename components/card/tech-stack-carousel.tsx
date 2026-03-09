"use client";

import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import { FocusBadge } from "@/components/card/focus-bage";
import { techStack } from "@/lib/tech-stack";
import * as SimpleIcons from "simple-icons";

type TechItem = {
  name: string;
  icon: React.ReactNode;
  link?: string;
};

// Convert tech stack to include Simple Icons or local SVGs
const TECH_STACK: TechItem[] = techStack.map((tech) => {
  // Prefer local icon if available
  if (tech.localIcon) {
    return {
      name: tech.name,
      link: tech.link,
      icon: (
        <img
          src={tech.localIcon}
          alt={tech.name}
          className="h-4 w-4 object-contain"
        />
      ),
    };
  }

  // Fall back to Simple Icons
  const icon = SimpleIcons[`si${tech.slug.charAt(0).toUpperCase() + tech.slug.slice(1)}` as keyof typeof SimpleIcons];

  return {
    name: tech.name,
    link: tech.link,
    icon: icon ? (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        style={{ color: tech.color || "currentColor" }}
      >
        <path d={icon.path} />
      </svg>
    ) : null,
  };
});

export function TechStackCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });

  const [loopWidth, setLoopWidth] = useState(0);
  const [speed, setSpeed] = useState(90); // seconds per loop
  const [isHovered, setIsHovered] = useState(false);

  // Measure loop width safely
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      setLoopWidth(containerRef.current!.scrollWidth / 2);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Continuous animation loop
  useAnimationFrame((_, delta) => {
    if (!loopWidth) return;

    const velocity = loopWidth / speed;
    const moveBy = (delta / 1000) * velocity;

    const currentX = x.get();
    let nextX = currentX - moveBy;

    // Seamlessly loop back when reaching the end of first set
    if (nextX <= -loopWidth) {
      // Calculate the remainder to maintain smooth position
      const remainder = (nextX % loopWidth);
      nextX = remainder;
      // Jump both x and smoothX to prevent spring animation
      x.jump(nextX);
      smoothX.jump(nextX);
    } else {
      x.set(nextX);
    }
  });

  return (
    <div className="relative w-full overflow-hidden py-4">

      {/* Main carousel container */}
      <motion.div
        ref={containerRef}
        style={{ x: smoothX }}
        onHoverStart={() => {
          setSpeed(270);
          setIsHovered(true);
        }}
        onHoverEnd={() => {
          setSpeed(90);
          setIsHovered(false);
        }}
        className="
          flex w-max gap-3 sm:gap-4 md:gap-5
          cursor-grab active:cursor-grabbing
          select-none
        "
      >
        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.02,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 },
            }}
            className="relative"
          >
            {/* Hover glow effect */}
            <motion.div
              className="
                absolute inset-0 -z-10
                rounded-full
                bg-primary/20
                blur-lg
                dark:bg-primary/30
              "
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />

            {tech.link ? (
              <Link
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <FocusBadge
                  text={tech.name}
                  icon={{ type: "node", value: tech.icon }}
                />
              </Link>
            ) : (
              <FocusBadge
                text={tech.name}
                icon={{ type: "node", value: tech.icon }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Animated border accent */}
      <motion.div
        className="
          absolute bottom-0 left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent via-primary/50 to-transparent
          dark:via-primary/70
        "
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}