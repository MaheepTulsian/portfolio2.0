"use client";

import { ReactNode, useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgressiveBlur } from "@/components/layout/progressive-blur";
// import { WhackAMole } from "@/components/fun/whack-a-mole";
import { HeaderProvider, useHeader } from "@/components/layout/header-provider";
// import { AppleHelloLoader } from "@/components/loader/apple-hello-loader";
import Loading from "@/components/loader/greet-loader";
import { AnimatePresence, motion } from "framer-motion";

function LayoutContent({
  name,
  seeking,
  children,
}: {
  name: string;
  seeking: string;
  children: ReactNode;
}) {
  const { showHeader } = useHeader();
  const [showLoader, setShowLoader] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleAnimationComplete = () => {
    // Start fade-up animation after all greetings complete
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
            {/* <AppleHelloLoader onAnimationComplete={handleAnimationComplete} /> */}
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
        {/* {showHeader && <WhackAMole />} */}
        <div className="flex-1 flex flex-col items-center">
          {showHeader && <Header name={name} />}
          {children}
          {showHeader && <Footer seeking={seeking} />}
        </div>

        {/* Progressive blur at bottom */}
        {showHeader && <ProgressiveBlur />}
      </motion.div>
    </>
  );
}

export function LayoutWrapper({
  name,
  seeking,
  children,
}: {
  name: string;
  seeking: string;
  children: ReactNode;
}) {
  return (
    <HeaderProvider>
      <LayoutContent name={name} seeking={seeking}>
        {children}
      </LayoutContent>
    </HeaderProvider>
  );
}
