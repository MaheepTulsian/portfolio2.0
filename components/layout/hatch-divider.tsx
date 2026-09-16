/**
 * A full-width horizontal separator band: a top and bottom hairline with a
 * diagonal hatch filling the strip between them. Used between page sections in
 * place of a single divider line.
 */
export function HatchDivider() {
  return (
    <div
      aria-hidden
      className="mx-4 h-8 border-y border-[lab(100_0_0/0.15)] md:mx-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent 0, transparent 7px, rgba(255,255,255,0.05) 7px, rgba(255,255,255,0.05) 8px)",
      }}
    />
  );
}
