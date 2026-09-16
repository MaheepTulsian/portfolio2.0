"use client";

import { ReactNode, useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { ProgressiveBlur } from "@/components/layout/progressive-blur";
import { HeaderProvider, useHeader } from "@/components/layout/header-provider";
import Loading from "@/components/loader/greet-loader";
import { AnimatePresence, motion } from "framer-motion";

const GREETED_KEY = "greeted";

function LayoutContent({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const { showHeader } = useHeader();
  const [showLoader, setShowLoader] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Only play the greeting once per session, and never for visitors who
    // prefer reduced motion. Everyone else (repeat views, hard refreshes,
    // deep links) skips straight to the content.
    const alreadyGreeted =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(GREETED_KEY) === "1";
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyGreeted || prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLoader(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasLoaded(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    // Start fade-up animation after all greetings complete
    try {
      window.sessionStorage.setItem(GREETED_KEY, "1");
    } catch {
      // sessionStorage may be unavailable (private mode); non-fatal.
    }
    setTimeout(() => {
      setShowLoader(false);
      setTimeout(() => {
        setHasLoaded(true);
      }, 100);
    }, 300);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="loader"
            initial={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -50,
              transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <Loading onComplete={handleAnimationComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: hasLoaded ? 1 : 0,
          y: hasLoaded ? 0 : 30,
        }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 0.2
        }}
        className="w-full"
      >
        <div className="flex-1 flex flex-col items-center">
          {showHeader && <Header name={name} />}
          {children}
        </div>

        {/* Progressive blur at bottom */}
        {showHeader && <ProgressiveBlur />}
      </motion.div>
    </>
  );
}

export function LayoutWrapper({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <HeaderProvider>
      <LayoutContent name={name}>{children}</LayoutContent>
    </HeaderProvider>
  );
}
