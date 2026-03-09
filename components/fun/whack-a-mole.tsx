"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Expression = "happy" | "surprised" | "cheeky" | "sleepy" | "worried";

interface Mole {
  id: number;
  x: number;
  y: number;
  side: "left" | "right";
}

interface FlyingScore {
  id: number;
  x: number;
  y: number;
}

const EXPRESSIONS: Expression[] = ["happy", "surprised", "cheeky", "sleepy", "worried"];

// Mole face expressions
function MoleFace({ expression, whacked }: { expression: Expression; whacked: boolean }) {
  if (whacked) {
    return (
      <>
        {/* Whacked eyes - XX */}
        <text x="30" y="28" fontSize="12" fontWeight="bold" fill="#4a5568" textAnchor="middle">x</text>
        <text x="50" y="28" fontSize="12" fontWeight="bold" fill="#4a5568" textAnchor="middle">x</text>
        {/* Dizzy mouth */}
        <path d="M32 38 Q40 42 48 38" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
      </>
    );
  }

  switch (expression) {
    case "happy":
      return (
        <>
          <circle cx="30" cy="24" r="3" fill="#4a5568" />
          <circle cx="50" cy="24" r="3" fill="#4a5568" />
          <path d="M30 36 Q40 46 50 36" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "surprised":
      return (
        <>
          <circle cx="30" cy="24" r="4" fill="none" stroke="#4a5568" strokeWidth="2" />
          <circle cx="50" cy="24" r="4" fill="none" stroke="#4a5568" strokeWidth="2" />
          <circle cx="30" cy="24" r="1.5" fill="#4a5568" />
          <circle cx="50" cy="24" r="1.5" fill="#4a5568" />
          <ellipse cx="40" cy="40" rx="4" ry="5" fill="#4a5568" />
        </>
      );
    case "cheeky":
      return (
        <>
          {/* Winking */}
          <circle cx="30" cy="24" r="3" fill="#4a5568" />
          <path d="M45 24 Q50 20 55 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
          {/* Tongue out */}
          <path d="M32 36 Q40 44 48 36" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="40" cy="42" rx="4" ry="3" fill="#e57373" />
        </>
      );
    case "sleepy":
      return (
        <>
          <path d="M25 24 Q30 20 35 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
          <path d="M45 24 Q50 20 55 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="22" cy="32" rx="4" ry="2" fill="#f0b6b6" opacity="0.7" />
          <ellipse cx="58" cy="32" rx="4" ry="2" fill="#f0b6b6" opacity="0.7" />
          <ellipse cx="40" cy="40" rx="3" ry="2" fill="#4a5568" />
        </>
      );
    case "worried":
      return (
        <>
          {/* Worried eyebrows */}
          <path d="M24 18 L34 22" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
          <path d="M56 18 L46 22" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="26" r="3" fill="#4a5568" />
          <circle cx="50" cy="26" r="3" fill="#4a5568" />
          <path d="M32 42 Q40 36 48 42" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
        </>
      );
  }
}

// Full mole character - cylindrical body with rounded head
function MoleCharacter({ expression, whacked }: { expression: Expression; whacked: boolean }) {
  return (
    <svg viewBox="0 0 80 70" className="w-full h-full">
      {/* Body - cylindrical */}
      <rect x="15" y="45" width="50" height="25" fill="#8B7355" rx="2" />
      {/* Head - rounded */}
      <ellipse cx="40" cy="32" rx="28" ry="24" fill="#A0826D" />
      {/* Inner face area */}
      <ellipse cx="40" cy="34" rx="22" ry="18" fill="#C4A484" />
      {/* Face */}
      <MoleFace expression={expression} whacked={whacked} />
      {/* Nose */}
      <ellipse cx="40" cy="32" rx="4" ry="3" fill="#6B4423" />
      {/* Ears */}
      <ellipse cx="14" cy="20" rx="6" ry="8" fill="#A0826D" />
      <ellipse cx="66" cy="20" rx="6" ry="8" fill="#A0826D" />
      <ellipse cx="14" cy="20" rx="3" ry="5" fill="#C4A484" />
      <ellipse cx="66" cy="20" rx="3" ry="5" fill="#C4A484" />
    </svg>
  );
}

export function WhackAMole() {
  const [mole, setMole] = useState<Mole | null>(null);
  const [phase, setPhase] = useState<"idle" | "burrow" | "rising" | "visible" | "hiding" | "whacked">("idle");
  const [expression, setExpression] = useState<Expression>("happy");
  const [flyingScores, setFlyingScores] = useState<FlyingScore[]>([]);
  const [mounted, setMounted] = useState(false);
  const [hasSpace, setHasSpace] = useState(false);
  const moleIdRef = useRef(0);
  const scoreIdRef = useRef(0);
  const expressionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkSpace = () => {
      setHasSpace(window.innerWidth > 1200);
    };

    checkSpace();
    window.addEventListener("resize", checkSpace);
    return () => window.removeEventListener("resize", checkSpace);
  }, []);

  // Spawn mole sequence
  const spawnMole = useCallback(() => {
    if (phase !== "idle") return;

    const side = Math.random() > 0.5 ? "left" : "right";
    const y = 150 + Math.random() * (window.innerHeight - 400);
    const sideWidth = (window.innerWidth - 720) / 2;
    const x = side === "left"
      ? 40 + Math.random() * (sideWidth - 120)
      : window.innerWidth - sideWidth + 40 + Math.random() * (sideWidth - 120);

    const newMole: Mole = {
      id: moleIdRef.current++,
      x,
      y,
      side,
    };

    setMole(newMole);
    setExpression(EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)]);
    setPhase("burrow");

    // Burrow appears, then mole rises
    setTimeout(() => setPhase("rising"), 400);
    setTimeout(() => setPhase("visible"), 800);

    // Start expression cycling
    expressionIntervalRef.current = setInterval(() => {
      setExpression(EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)]);
    }, 800);

    // Auto hide after some time
    setTimeout(() => {
      if (expressionIntervalRef.current) {
        clearInterval(expressionIntervalRef.current);
      }
      setPhase(prev => prev === "visible" ? "hiding" : prev);
    }, 4000 + Math.random() * 2000);

  }, [phase]);

  // Reset after hiding
  useEffect(() => {
    if (phase === "hiding") {
      const timer = setTimeout(() => {
        setMole(null);
        setPhase("idle");
      }, 400);
      return () => clearTimeout(timer);
    }
    if (phase === "whacked") {
      const timer = setTimeout(() => {
        setMole(null);
        setPhase("idle");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Spawn timer
  useEffect(() => {
    if (!mounted || !hasSpace) return;

    const scheduleSpawn = () => {
      const delay = 2000 + Math.random() * 3000;
      return setTimeout(() => {
        spawnMole();
        scheduleSpawn();
      }, delay);
    };

    // Initial spawn
    const initialTimer = setTimeout(() => {
      spawnMole();
    }, 2000);

    const spawnTimer = scheduleSpawn();

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(spawnTimer);
    };
  }, [mounted, hasSpace, spawnMole]);

  // Handle whack
  const handleWhack = useCallback(() => {
    if (phase !== "visible" && phase !== "rising") return;

    if (expressionIntervalRef.current) {
      clearInterval(expressionIntervalRef.current);
    }

    // Add flying score
    if (mole) {
      const newScore: FlyingScore = {
        id: scoreIdRef.current++,
        x: mole.x + 18,
        y: mole.y - 10,
      };
      setFlyingScores(prev => [...prev, newScore]);

      // Remove flying score after animation
      setTimeout(() => {
        setFlyingScores(prev => prev.filter(s => s.id !== newScore.id));
      }, 1000);
    }

    setPhase("whacked");
  }, [phase, mole]);

  if (!mounted || !hasSpace) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Flying +1 scores */}
      <AnimatePresence>
        {flyingScores.map(score => (
          <motion.div
            key={score.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none font-bold text-sm text-green-600 dark:text-green-400"
            style={{ left: score.x, top: score.y }}
          >
            +1
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Mole */}
      <AnimatePresence>
        {mole && phase !== "idle" && (
          <div
            className="absolute pointer-events-none"
            style={{ left: mole.x, top: mole.y, width: 50, height: 60 }}
          >
            {/* Burrow (disc - dark on light theme, light on dark theme) */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-stone-700 to-stone-900 dark:from-stone-400 dark:to-stone-500 rounded-full shadow-inner"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: 44,
                height: 10,
                opacity: 1,
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Mole container with clipping */}
            <div className="absolute bottom-1 left-0 right-0 h-12 overflow-hidden">
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-10 ${phase === "visible" || phase === "rising" ? "pointer-events-auto cursor-pointer" : ""}`}
                initial={{ y: 45 }}
                animate={{
                  y: phase === "burrow" ? 45 :
                     phase === "rising" ? 6 :
                     phase === "visible" ? 0 :
                     phase === "hiding" ? 45 :
                     phase === "whacked" ? 3 : 45,
                }}
                transition={{
                  duration: phase === "whacked" ? 0.1 : 0.4,
                  ease: phase === "rising" ? "easeOut" : "easeIn",
                }}
                onClick={handleWhack}
              >
                {/* Shake animation when whacked */}
                <motion.div
                  animate={phase === "whacked" ? {
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <MoleCharacter expression={expression} whacked={phase === "whacked"} />
                </motion.div>
              </motion.div>
            </div>

            {/* Stars when whacked */}
            <AnimatePresence>
              {phase === "whacked" && (
                <>
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 1, scale: 0, x: 25, y: 12 }}
                      animate={{
                        opacity: 0,
                        scale: 1.2,
                        x: 25 + (i - 1) * 15,
                        y: -5 - i * 5,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="absolute text-yellow-500 text-xs pointer-events-none"
                    >
                      *
                    </motion.span>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
