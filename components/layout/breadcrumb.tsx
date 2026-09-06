import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  backHref,
}: {
  items: Crumb[];
  backHref: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-3 animate-fade-in-blur"
    >
      <Link
        href={backHref}
        aria-label="Go back"
        className="group inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[lab(100_0_0/0.10)] bg-[lab(100_0_0/0.04)] text-[lab(66.128_0_0)] transition-colors hover:border-[lab(100_0_0/0.25)] hover:text-[lab(94.2_0_0)]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      </Link>

      <ol className="flex min-w-0 items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex min-w-0 items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="shrink-0 text-[lab(50_0_0)] transition-colors hover:text-[lab(94.2_0_0)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    last
                      ? "truncate text-[lab(88_0_0)]"
                      : "shrink-0 text-[lab(50_0_0)]"
                  }
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-[lab(35_0_0)]"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
