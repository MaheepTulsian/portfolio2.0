"use client";

export function ProgressiveBlur() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-30">
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(to top, var(--background) 0%, transparent 100%)`,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          maskImage: `
            radial-gradient(
              ellipse 100% 100% at center bottom,
              black 0%,
              black 40%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              ellipse 100% 100% at center bottom,
              black 0%,
              black 40%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  );
}
