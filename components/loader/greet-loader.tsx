"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const languages = [
  // Global openers
  { id: "lang_001", message: "Hello" },        // English
  { id: "lang_002", message: "Bonjour" },      // French

  // Western Europe
  { id: "lang_003", message: "Hola" },         // Spanish
  { id: "lang_004", message: "Ciao" },         // Italian

  // Asia
  { id: "lang_005", message: "你好" },         // Chinese (Mandarin)
  { id: "lang_006", message: "こんにちは" },    // Japanese
  { id: "lang_007", message: "안녕하세요" },     // Korean

  // Indian languages
  { id: "lang_008", message: "السلام علیکم" }, // Urdu
  { id: "lang_09", message: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },   // Punjabi
  { id: "lang_010", message: "নমস্কার" },       // Bengali
  { id: "lang_011", message: "നമസ്കാരം" },   // Malayalam
  { id: "lang_012", message: "ನಮಸ್ಕಾರ" },    // Kannada
  { id: "lang_013", message: "வணக்கம்" },    // Tamil
  { id: "lang_014", message: "నమస్కారం" },    // Telugu
  { id: "lang_015", message: "नमस्ते" }        // Hindi
];




interface LoadingProps {
  onComplete?: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [index, setIndex] = useState(0);

  const animationDuration = {
    firstAndLast: 600,
    normal: 150,
  };

  useEffect(() => {
    // FINAL language → trigger completion
    if (index === languages.length - 1) {
      const finalTimer = setTimeout(() => {
        onComplete?.();
      }, animationDuration.firstAndLast);
      return () => clearTimeout(finalTimer);
    }

    const delay =
      index === 0
        ? animationDuration.firstAndLast
        : animationDuration.normal;

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  const currentLanguage = languages[index];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        key={currentLanguage.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-4xl font-normal text-foreground">
          {currentLanguage.message}
        </h2>
      </motion.div>
    </div>
  );
};

export default Loading;
