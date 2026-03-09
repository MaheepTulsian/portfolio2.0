import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  seeking?: string;
}

export function Footer({ seeking }: FooterProps) {
  return (
    <footer className="w-full pb-8 pt-0 md:pt-16 md:mt-auto">
      <div className="w-full max-w-4xl mx-auto px-6">
        <Separator className="mb-8" />
        {seeking && (
          <p className="text-center text-sm text-muted-foreground">
            ⚠️ {seeking.split("reach out").map((part, index) =>
              index === 0 ? (
                <span key={index}>{part}</span>
              ) : (
                <span key={index}>
                  <Link
                    href="/contact"
                    className="underline hover:no-underline"
                  >
                    reach out
                  </Link>
                  {part}
                </span>
              )
            )}
          </p>
        )}
      </div>
    </footer>
  );
}
