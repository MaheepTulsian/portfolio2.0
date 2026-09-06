# Collage cutouts

Drop **transparent-background PNGs** here (e.g. `vinyl.png`, `lamp.png`, `camera.png`)
to scatter real objects across the homepage canvas.

Then add an entry to `collageImages` in
`components/home/manifesto.tsx`:

```ts
{ src: "/collage/vinyl.png", alt: "Vinyl record", left: "44%", top: "10%", w: 120, rotate: -6 },
```

- `left` / `top` — position as a percentage of the canvas
- `w` — width in px
- `rotate` — tilt in degrees
- `mobileHidden: true` — optional, hides it on small screens

## Removing backgrounds
Google Images → download → run through one of:
- remove.bg, Photoroom, or Adobe Express (web, free)
- macOS: open in **Photos** or **Preview**, right-click subject → **Remove Background**
