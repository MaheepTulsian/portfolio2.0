"use client";

import { useEffect } from "react";
import { useHeader } from "@/components/layout/header-provider";

/**
 * Hides the global nav header for the duration of a page (restoring it on
 * navigation away). Used by pages that provide their own breadcrumb chrome.
 */
export function HideNav() {
  const { setShowHeader } = useHeader();

  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, [setShowHeader]);

  return null;
}
