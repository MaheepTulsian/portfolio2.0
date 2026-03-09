"use client";

import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

type FocusBadgeIcon =
  | { type: "node"; value: ReactNode }
  | { type: "image"; value: StaticImageData };

interface FocusBadgeProps {
  text: string;
  icon: FocusBadgeIcon;
  href?: string;
  external?: boolean;
}

export function FocusBadge({
  text,
  icon,
  href,
  external = false,
}: FocusBadgeProps) {
  const hasText = text && text.trim().length > 0;

  const baseClassName = `
    inline-flex items-center gap-2.5
    w-fit max-w-full

    rounded-xl
    px-3 py-1.5 sm:px-3.5 sm:py-2

    text-sm sm:text-base font-medium
    tracking-tight

    border border-dashed
    border-neutral-300
    dark:border-neutral-600

    bg-neutral-100
    text-neutral-800

    dark:bg-neutral-800
    dark:text-neutral-100

    shadow-sm
    transition-all duration-200 ease-out

    hover:shadow-md
    hover:-translate-y-0.5
    active:translate-y-0

    whitespace-nowrap
  `;

  const content = (
    <>
      {/* ICON — scaled properly */}
      {icon.type === "node" ? (
        <span className="flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
          {icon.value}
        </span>
      ) : (
        <Image
          src={icon.value}
          alt={text || "badge icon"}
          className="
            object-contain
            flex-shrink-0
            w-5 h-5
            sm:w-6 sm:h-6
          "
        />
      )}

      {hasText && (
        <span
          className="
            overflow-hidden
            text-ellipsis
            max-w-[160px]
            sm:max-w-[220px]
          "
          title={text}
        >
          {text}
        </span>
      )}
    </>
  );

  const className = baseClassName;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}