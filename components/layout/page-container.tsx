import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <main className={`w-full max-w-4xl mx-auto px-6 py-8 ${className}`}>
      {children}
    </main>
  );
}
