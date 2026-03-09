"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  onAnimationComplete?: () => void;
};

const greetings = [
  { text: "hello", lang: "en" },
  { text: "ciao", lang: "it" },
  { text: "bonjour", lang: "fr" },
  { text: "नमस्ते", lang: "hi" },
];

export function AppleHelloLoader({ className, onAnimationComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Detect system theme
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const hasDocumentDark = document.documentElement.classList.contains("dark");

    setTheme(savedTheme || (hasDocumentDark ? "dark" : isDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    // Cycle through greetings every 1.5 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1;
        } else {
          // Last greeting completed, trigger completion after showing it
          clearInterval(timer);
          setTimeout(() => {
            onAnimationComplete?.();
          }, 1500);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [onAnimationComplete]);

  return (
    <div className={cn("relative h-24 sm:h-32 flex items-center justify-center", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="absolute"
        >
          <motion.h1
            className={cn(
              "text-6xl sm:text-8xl font-light tracking-tight",
              greetings[currentIndex].lang === "hi" ? "font-sans" : "font-serif",
              "bg-clip-text text-transparent bg-gradient-to-r",
              theme === "dark"
                ? "from-gray-100 via-gray-300 to-gray-100"
                : "from-gray-900 via-gray-700 to-gray-900"
            )}
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: 0,
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            {greetings[currentIndex].text}
          </motion.h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
