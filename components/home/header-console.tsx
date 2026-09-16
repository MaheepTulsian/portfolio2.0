"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useEffect, useState } from "react";

const TZ = "Asia/Kolkata";

function clockString(now: Date): string {
  return (
    now
      .toLocaleTimeString("en-US", {
        timeZone: TZ,
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .toLowerCase() + " IST"
  );
}

type Contact = {
  twitter: string;
  github: string;
  linkedin: string;
  email: string;
};

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function Social({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-[lab(60_0_0)] transition-colors hover:text-[lab(94.2_0_0)]"
    >
      {children}
    </Link>
  );
}

export function HeaderConsole({
  name,
  tagline,
  avatarSrc,
  contact,
}: {
  name: string;
  tagline: string;
  avatarSrc: string;
  contact: Contact;
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Increment once per browser session; read-only afterwards.
    const counted = sessionStorage.getItem("counted") === "1";
    fetch("/api/views", { method: counted ? "GET" : "POST" })
      .then((r) => r.json())
      .then((d: { views: number | null }) => {
        if (typeof d.views === "number") setViews(d.views);
        sessionStorage.setItem("counted", "1");
      })
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="grid grid-cols-[160px_1fr] divide-x divide-[lab(100_0_0/0.15)] border-b border-[lab(100_0_0/0.15)]">
        {/* Avatar — circular photo inside a square cell */}
        <div className="flex aspect-square w-full self-start items-center justify-center">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image
              src={avatarSrc}
              alt={name}
              width={320}
              height={320}
              className="h-full w-full scale-[1.12] object-cover object-[center_24%]"
              priority
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col divide-y divide-[lab(100_0_0/0.15)]">
          {/* Meta row — visitors + live clock */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-xs">
            <span className="text-[lab(55_0_0)]">
              {/* <span className="uppercase tracking-[0.18em] text-[lab(48_0_0)]">
                // Visitors
              </span>{" "} */}
              <span className="font-semibold text-[lab(94.2_0_0)]">
                {views !== null ? views.toLocaleString() : "—"}
              </span>{" "}
              Visited
            </span>
            <span className="text-[lab(55_0_0)]">{now ? clockString(now) : " "}</span>
          </div>

          {/* Name */}
          <div className="flex flex-1 items-center px-4 py-3">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-[lab(94.2_0_0)]">
              {name}
            </h1>
          </div>

          {/* Tagline + socials */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5">
            <p className="font-mono text-sm text-[lab(60_0_0)]">{tagline}</p>
            <div className="flex items-center gap-3.5">
              <Social href={`https://twitter.com/${contact.twitter}`} label="X" external>
                <XIcon className="h-[13px] w-[13px]" />
              </Social>
              <Social href={`https://github.com/${contact.github}`} label="GitHub" external>
                <Github className="h-4 w-4" />
              </Social>
              <Social href={`https://linkedin.com/in/${contact.linkedin}`} label="LinkedIn" external>
                <Linkedin className="h-4 w-4" />
              </Social>
              <Social href={`mailto:${contact.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </Social>
              <Social href="/resume/MaheepTulsian.pdf" label="Resume" external>
                <FileText className="h-4 w-4" />
              </Social>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
