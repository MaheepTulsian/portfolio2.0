"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  showHeader: boolean;
  setShowHeader: (show: boolean) => void;
  showFooter: boolean;
  setShowFooter: (show: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  return (
    <HeaderContext.Provider
      value={{ showHeader, setShowHeader, showFooter, setShowFooter }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within HeaderProvider");
  }
  return context;
}
