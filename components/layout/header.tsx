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
    // The inline script in the document head has already applied the correct
    // theme class before paint (avoiding a flash), so we just read it back here
    // to keep the toggle's icon in sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const toggleClasses =
    "flex items-center justify-center w-9 h-9 -mr-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors";

  if (!mounted) {
    return (
      <button className={toggleClasses} aria-label="Toggle theme">
        <Moon className="w-[18px] h-[18px]" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={toggleClasses}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-[18px] h-[18px]" />
      ) : (
        <Moon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
}

export function Header({ name }: HeaderProps) {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full pt-4 md:pt-6">
      <div className={cn("w-full", isSticky ? "h-14" : "")}>
        <nav
          className={cn(
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isSticky
              ? "fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl"
              : "relative mx-auto w-full max-w-2xl"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4 px-4",
              isSticky ? "mx-auto h-14 max-w-2xl" : "h-14"
            )}
          >
            {/* Brand */}
            <Link
              href="/"
              className="group shrink-0 font-heading text-base font-semibold tracking-tight"
            >
              <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                &gt;
              </span>{" "}
              {name}
            </Link>

            {/* Nav + theme */}
            <div className="flex min-w-0 items-center">
              <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative rounded-full px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors",
                        active
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                      )}
                    >
                      {item.name}
                      {active && (
                        <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground" />
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="ml-1 shrink-0">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {!isSticky && (
            <div className="mx-auto max-w-2xl px-4">
              <div className="h-px bg-border/70" />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
