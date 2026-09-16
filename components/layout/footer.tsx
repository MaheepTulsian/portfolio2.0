import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/data";
import { siteConfig } from "@/lib/site";

function SocialChip({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = !href.startsWith("mailto:");
  return (
    <Link
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const { personal } = getData();
  const { contact } = personal;

  // A single OpenStreetMap tile — a real map with no interactive chrome and no
  // API key. We render it monochrome and focus the crop on the location.
  const lat = 12.9716;
  const lon = 77.5946; // Bengaluru
  const zoom = 11;
  const n = 2 ** zoom;
  const xF = ((lon + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const yF =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  const tileX = Math.floor(xF);
  const tileY = Math.floor(yF);
  const mapTile = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;
  const mapPos = `${(xF - tileX) * 100}% ${(yF - tileY) * 100}%`;

  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[720px] px-8 pb-16 pt-12">

        {/* Talk + socials, with the location map alongside */}
        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Let&apos;s talk
            </h2>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-secondary">
              Open to full-time and internship roles, or a good conversation.
              Grab a slot or say hi.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={siteConfig.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/chat relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/chat:translate-x-full"
                />
                <Calendar className="h-4 w-4" />
                Let&apos;s chat
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/chat:translate-x-0.5 group-hover/chat:-translate-y-0.5" />
              </Link>

              <div className="flex items-center gap-2">
                <SocialChip href={`mailto:${contact.email}`} label="Email">
                  <Mail className="h-4 w-4" />
                </SocialChip>
                <SocialChip
                  href={`https://github.com/${contact.github}`}
                  label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </SocialChip>
                <SocialChip
                  href={`https://linkedin.com/in/${contact.linkedin}`}
                  label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </SocialChip>
                <SocialChip
                  href={`https://twitter.com/${contact.twitter}`}
                  label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </SocialChip>
              </div>
            </div>
          </div>

          {/* Monochrome location map */}
          <div className="shrink-0 sm:w-52">
            <div className="relative overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mapTile}
                alt={`Map of ${siteConfig.location}`}
                width={256}
                height={256}
                loading="lazy"
                style={{ objectPosition: mapPos }}
                className="block h-32 w-full object-cover [filter:grayscale(1)_contrast(1.05)] dark:[filter:grayscale(1)_invert(0.92)_hue-rotate(180deg)_brightness(0.95)]"
              />
              <span className="pointer-events-none absolute bottom-0 right-0 bg-background/60 px-1 text-[8px] leading-tight text-muted-foreground">
                © OpenStreetMap
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {siteConfig.location}
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground/70">
          Built with Next.js & Tailwind — and a lot of late nights :)
        </p>
      </div>
    </footer>
  );
}
