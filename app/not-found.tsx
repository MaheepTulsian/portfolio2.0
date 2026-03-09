"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 */}
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-bold tracking-tight">
            404
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Page not found
          </p>
        </div>

        {/* Message */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg hover:bg-muted/50 transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Quick links</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <span className="text-border">•</span>
            <Link href="/resume" className="text-muted-foreground hover:text-foreground transition-colors">
              Resume
            </Link>
            <span className="text-border">•</span>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <span className="text-border">•</span>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
