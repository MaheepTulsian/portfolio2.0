"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/types";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface HeaderProps {
  name: string;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle theme">
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

export function Header({ name }: HeaderProps) {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if navbar should be sticky (when scrolled past the name section)
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full pt-20 md:pt-32 pb-8 px-2">
      {/* Name - centered */}
      <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto mb-12">
        <Link href="/" className="group">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              &gt;
            </span>{" "}
            {name}
          </h1>
        </Link>

        {/* Latest Commit */}
        <p className="text-sm text-muted-foreground">
          Latest Commit:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Navigation - sticky with glassmorphic effect */}
      <div className={cn("w-full", isSticky ? "h-16" : "")}>
        <nav
          className={cn(
            "transition-all duration-300 ease-in-out",
            isSticky
              ? "fixed top-0 left-0 right-0 z-40 py-3 px-2 bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm"
              : "relative w-full max-w-4xl mx-auto"
          )}
        >
          <div className={cn("flex items-center justify-between gap-4", isSticky ? "max-w-4xl mx-auto" : "mb-3")}>
            <div className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide flex-1 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base transition-colors whitespace-nowrap",
                    pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex-shrink-0 pr-4 pt-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Bottom Divider - only show when not sticky */}
          {!isSticky && <div className="h-px bg-border mt-3" />}
        </nav>
      </div>
    </header>
  );
}
