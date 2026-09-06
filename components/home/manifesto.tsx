import { Gamepad2, Coffee, Headphones, Cpu, BookOpen, Trophy } from "lucide-react";
import { CollageStage } from "@/components/home/collage-stage";

// Fixed design canvas — positions are in these pixel coordinates and scale to
// fit smaller screens. Everything is grid-aligned (40px) and kept straight.
const DESIGN_W = 680;
const DESIGN_H = 560;
const GRID = 40;

const DROP_SHADOW =
  "[filter:drop-shadow(0_6px_14px_rgba(20,22,28,0.12))_drop-shadow(0_2px_4px_rgba(20,22,28,0.08))]";

/**
 * Drop transparent-background PNG cutouts into /public/collage/ and add entries
 * here to scatter real persona objects across the canvas. Coordinates are in
 * the DESIGN_W × DESIGN_H space; keep them multiples of 40 to sit on the grid.
 */
type CollageImage = {
  src: string;
  alt: string;
  left: number;
  top: number;
  w: number;
  z?: number;
};

const collageImages: CollageImage[] = [
  // { src: "/collage/vinyl.png", alt: "Vinyl record", left: 320, top: 120, w: 120 },
];

/**
 * An object sitting on a "merged cell": a same-coloured backing clears the grid
 * lines beneath it and feathers softly into the surrounding grid. Kept straight.
 */
function Artifact({
  left,
  top,
  z = 10,
  pad = 10,
  className = "",
  children,
}: {
  left: number;
  top: number;
  z?: number;
  pad?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute" style={{ left, top, zIndex: z }}>
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-lg bg-background"
        style={{
          inset: -pad,
          boxShadow: "0 0 18px 12px var(--background)",
        }}
      />
      <div className="relative transition-transform duration-300 will-change-transform hover:-translate-y-0.5">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

function Sticker({
  left,
  top,
  z,
  children,
}: {
  left: number;
  top: number;
  z?: number;
  children: React.ReactNode;
}) {
  return (
    <Artifact left={left} top={top} z={z} pad={12} className="flex h-12 w-12 items-center justify-center text-foreground/80">
      {children}
    </Artifact>
  );
}

function Statement({
  left,
  top,
  children,
}: {
  left: number;
  top: number;
  children: React.ReactNode;
}) {
  return (
    <p
      className="absolute font-heading font-semibold uppercase leading-[1.04] tracking-tight text-foreground"
      style={{ left, top, fontSize: 30, zIndex: 5 }}
    >
      {children}
    </p>
  );
}

export function Manifesto() {
  return (
    <section className="mb-12" aria-label="What I do">
      <CollageStage width={DESIGN_W} height={DESIGN_H} className="w-full">
        {/* Grid — confined to the canvas */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 8%, transparent) 1px, transparent 1px)",
            backgroundSize: `${GRID}px ${GRID}px`,
          }}
        />

        {/* Statement — broken across the canvas */}
        <Statement left={40} top={48}>
          Software is
          <br />
          full of
        </Statement>

        <Statement left={40} top={232}>
          slow, brittle
          <br />
          systems
        </Statement>

        <div className="absolute" style={{ left: 40, top: 400, zIndex: 5 }}>
          <span className="font-heading-italic text-muted-foreground" style={{ fontSize: 16 }}>
            so I build the ones
          </span>
          <p className="mt-1 font-heading font-semibold uppercase leading-[1.04] tracking-tight text-foreground" style={{ fontSize: 30 }}>
            that stay fast
            <br />
            &amp; hold up
          </p>
        </div>

        {/* Polaroid */}
        <Artifact left={480} top={48} z={20} pad={6} className="rounded-sm bg-white p-1.5 pb-5 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.4)]">
          <div
            className="h-24 w-20 bg-cover"
            style={{ backgroundImage: "url('/avatar.jpg')", backgroundPosition: "center 20%", backgroundSize: "150%" }}
          />
          <span className="mt-1 block text-center font-heading-italic text-[10px] text-neutral-500">
            shipping :)
          </span>
        </Artifact>

        {/* Persona stickers */}
        <Sticker left={320} top={128} z={15}>
          <Gamepad2 className="h-7 w-7" strokeWidth={1.5} />
        </Sticker>
        <Sticker left={600} top={120} z={15}>
          <Headphones className="h-7 w-7" strokeWidth={1.5} />
        </Sticker>
        <Sticker left={400} top={240} z={15}>
          <Coffee className="h-7 w-7" strokeWidth={1.5} />
        </Sticker>
        <Sticker left={560} top={320} z={15}>
          <Cpu className="h-7 w-7" strokeWidth={1.5} />
        </Sticker>
        <Sticker left={320} top={360} z={15}>
          <BookOpen className="h-7 w-7" strokeWidth={1.5} />
        </Sticker>
        <Sticker left={480} top={440} z={16}>
          <Trophy className="h-7 w-7" strokeWidth={1.5} />
        </Sticker>

        {/* User-supplied cutout objects (straight, grid-aligned) */}
        {collageImages.map((img) => (
          <Artifact key={img.src} left={img.left} top={img.top} z={img.z ?? 12} pad={8} className={DROP_SHADOW}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} width={img.w} style={{ width: img.w }} className="h-auto select-none" />
          </Artifact>
        ))}
      </CollageStage>
    </section>
  );
}
