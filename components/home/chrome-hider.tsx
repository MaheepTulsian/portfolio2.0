"use client";

import { useEffect } from "react";
import { useHeader } from "@/components/layout/header-provider";

/**
 * The landing page has its own header row, so hide the global nav while this
 * page is mounted (and restore it on navigation). The footer is rendered by the
 * landing page itself (inside its grid), not globally.
 */
export function ChromeHider() {
  const { setShowHeader } = useHeader();

  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, [setShowHeader]);

  return null;
}
