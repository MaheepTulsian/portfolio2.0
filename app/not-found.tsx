"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    // If there's history within the site, go back; otherwise fall back home so
    // visitors arriving from an external link don't get bounced off the site.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 */}
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-semibold tracking-tighter">
            4<span className="text-foreground">0</span>4
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Page not found
          </p>
        </div>

        {/* Message */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-full hover:border-foreground/20 hover:bg-accent/50 transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Quick links</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/projects" className="link-underline text-muted-foreground hover:text-foreground">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
