"use client";

import { useEffect, useState } from "react";

/** Live local time in Varanasi (IST) — a small sign-of-life detail. */
export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">{time ? `${time} IST` : " "}</span>
  );
}
