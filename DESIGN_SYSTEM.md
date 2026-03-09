# Portfolio Design System

This document outlines the design language, spacing, typography, and component guidelines for the portfolio.

---

## Core Principles

1. **Minimalism over decoration** - No cards, shadows, or heavy borders
2. **Generous spacing** - Large vertical gaps create premium feel
3. **Typography as hierarchy** - Size, weight, and color create structure
4. **Subtle interactions** - Hover states are color changes, not transformations
5. **Flat design** - No depth, everything on same plane

---

## Color Palette

### Light Mode
```css
--background: #EDEBE8;           /* Warm beige background */
--foreground: #0A0A0A;           /* Sharp black for primary text */
--muted-foreground: #6B6966;     /* Gray for secondary text */
--border: #D4D2CD;               /* Subtle warm gray for separators */
--accent: #E0DED9;               /* Slightly warm gray for badges */
```

### Dark Mode
```css
--background: #0A0A0A;           /* Deep black background */
--foreground: #EDEBE8;           /* Warm beige for primary text */
--muted-foreground: #A3A19D;     /* Light gray for secondary text */
--border: #333330;               /* Dark gray for separators */
--accent: #262626;               /* Dark gray for badges */
```

### Usage Rules
- **Primary text**: `text-foreground` - For headings, important content
- **Secondary text**: `text-muted-foreground` - For descriptions, meta info
- **Links**: Start as `text-muted-foreground`, hover to `text-foreground`
- **Borders**: Use `<Separator />` component, never manual borders

---

## Spacing System

### Vertical Spacing (Between Sections)
```tsx
{/* Large section break */}
<div className="h-20 md:h-28" />

{/* Medium section break */}
<div className="h-12 md:h-16" />

{/* Small breathing room */}
<div className="h-4 md:h-6" />
```

### Container Padding
```tsx
{/* Page containers */}
<PageContainer>  {/* py-16 md:py-24 px-6 */}

{/* Header */}
<header className="pt-20 md:pt-32 pb-12 px-6">

{/* Footer */}
<footer className="pt-24 pb-12">
```

### Component Spacing
```tsx
{/* Section internal spacing */}
<section className="space-y-4">      {/* 16px gaps */}
<section className="space-y-6">      {/* 24px gaps */}
<section className="space-y-8">      {/* 32px gaps */}

{/* List spacing */}
<div className="space-y-12">         {/* Blog posts, projects */}
<div className="space-y-16">         {/* Large project cards */}
```

### Max Width
- All content: `max-w-4xl` (672px)
- Centered: `mx-auto`

---

## Typography

### Font Families
```tsx
// Headings, body
font-family: Geist Sans (--font-geist-sans)

// Logo, code
font-family: Geist Mono (--font-geist-mono)
```

### Heading Hierarchy
```tsx
{/* Page title / Name */}
<h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tight">

{/* Page heading */}
<h2 className="text-3xl md:text-4xl font-semibold tracking-tight">

{/* Section heading */}
<h3 className="text-xl font-semibold">

{/* Section label (uppercase) */}
<h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
```

### Body Text
```tsx
{/* Large intro text */}
<p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">

{/* Regular body */}
<p className="text-base leading-relaxed">

{/* Small text / metadata */}
<p className="text-sm text-muted-foreground">

{/* Tiny text / labels */}
<span className="text-xs text-muted-foreground">
```

### Font Weights
- Bold: `font-bold` (600) - Logo only
- Semibold: `font-semibold` (600) - Headings
- Medium: `font-medium` (500) - Labels, active states
- Regular: `font-normal` (400) - Body text

### Letter Spacing
```tsx
tracking-tight      // -0.025em - Large headings
tracking-widest     // 0.1em - Small uppercase labels
```

---

## Components

### Links
```tsx
{/* Text link (default) */}
<Link
  href="..."
  className="text-muted-foreground hover:text-foreground transition-colors"
>

{/* Underlined link in paragraph */}
<Link
  href="..."
  className="text-foreground underline underline-offset-4 hover:no-underline"
>

{/* External link with icon */}
<Link
  href="..."
  className="inline-flex items-center gap-2"
>
  Text <ArrowUpRight className="w-4 h-4" />
</Link>
```

### Badges
```tsx
{/* Tag badge */}
<Badge
  variant="secondary"
  className="font-normal px-4 py-1.5 text-sm"
>

{/* Highlight badge */}
<Badge
  variant="default"
  className="shrink-0 text-xs"
>
```

### Separators
```tsx
{/* Full width horizontal rule */}
<Separator className="mb-6" />
<Separator className="mt-6" />
```

### Lists
```tsx
{/* Numbered list with monospace indices */}
<ul className="space-y-4">
  <li className="flex items-baseline gap-4">
    <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">
      01
    </span>
    <span className="text-foreground">Content</span>
  </li>
</ul>

{/* Bullet list with em dash */}
<ul className="space-y-2">
  <li className="text-sm text-muted-foreground pl-4 relative before:content-['—'] before:absolute before:left-0">
    Content
  </li>
</ul>
```

### Tech Stack Display
```tsx
{/* Inline separated list */}
<div className="flex flex-wrap gap-2">
  {techs.map((tech, i) => (
    <span className="text-xs text-muted-foreground">
      {tech}
      {i < techs.length - 1 && <span className="ml-2">/</span>}
    </span>
  ))}
</div>

{/* Dot separated (skills) */}
<p className="text-sm text-muted-foreground">
  {skills.join(" · ")}
</p>
```

---

## Layout Patterns

### Header
```tsx
<header className="pt-20 md:pt-32 pb-12 px-6">
  <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
    {/* Name with emoji */}
    <h1 className="font-mono text-3xl md:text-4xl">
      <span>{emoji}</span> {name}
    </h1>

    {/* Tagline */}
    <p className="text-sm text-muted-foreground italic">

    {/* Spacer before nav */}
    <div className="h-4" />

    {/* Navigation with separators */}
    <nav className="w-full">
      <Separator className="mb-6" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Links */}
        </div>
        {/* Theme toggle */}
      </div>
      <Separator className="mt-6" />
    </nav>
  </div>
</header>
```

### Page Content
```tsx
<PageContainer>
  {/* Hero section */}
  <section className="space-y-6">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
    <p className="text-muted-foreground">
  </section>

  {/* Large spacer */}
  <div className="h-16 md:h-24" />

  {/* Content section */}
  <section>
    <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
      Label
    </h3>
    {/* Content */}
  </section>

  {/* Repeat... */}
</PageContainer>
```

### Project Card
```tsx
<article className="group">
  {/* Header */}
  <div className="flex items-start justify-between gap-4 mb-4">
    <div className="space-y-1">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {category}
      </p>
    </div>
    {award && <Badge variant="default">Winner</Badge>}
  </div>

  {/* Description */}
  <p className="text-muted-foreground mb-6 leading-relaxed">

  {/* Tech stack */}
  <div className="flex flex-wrap gap-2 mb-6">
    {/* Inline with / separators */}
  </div>

  {/* Link */}
  <Link className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
    View Project <ArrowUpRight className="w-3 h-3" />
  </Link>
</article>
```

### Footer
```tsx
<footer className="pt-24 pb-12">
  <div className="max-w-4xl mx-auto px-6">
    <Separator className="mb-12" />
    <p className="text-center text-sm text-muted-foreground">
      {/* Message with inline link */}
    </p>
  </div>
</footer>
```

---

## Interaction States

### Hover Effects
```tsx
// Text links
hover:text-foreground

// Underlined links
hover:no-underline

// Icons
hover:scale-110 transition-transform

// External link icon
hover:translate-x-1 transition-transform
```

### Transitions
```tsx
// Global (in globals.css)
* {
  transition-property: color, background-color, border-color;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}

// Individual overrides
transition-colors      // Just colors
transition-transform   // Just transforms
transition-all         // Everything (use sparingly)
```

---

## Special Elements

### Emoji Usage
- Used for personality and reactions
- Scale on hover: `hover:scale-110 transition-transform`
- Route-specific reactions in header
- Inline with text (no extra spacing)

### Date Formatting
```tsx
// Short format
date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric"
})
// Output: "Jan 18, 2026"

// Minimal format
date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short"
})
// Output: "Jan 2026"
```

### External Link Indicator
```tsx
import { ArrowUpRight } from "lucide-react";

<ArrowUpRight className="w-3 h-3" />  // Small, 12px
<ArrowUpRight className="w-4 h-4" />  // Medium, 16px
```

---

## Responsive Behavior

### Breakpoint
- Mobile first design
- Main breakpoint: `md:` (768px)

### Responsive Patterns
```tsx
// Spacing scales up
className="h-16 md:h-24"
className="pt-20 md:pt-32"

// Text scales up
className="text-3xl md:text-4xl"
className="text-xl md:text-2xl"

// Gaps scale up
className="gap-4 md:gap-6"

// Flex direction changes
className="flex-col md:flex-row"
```

---

## Don'ts

❌ Don't use cards with borders and shadows
❌ Don't use buttons for simple links
❌ Don't use heavy animations or transitions
❌ Don't use multiple font families beyond Geist Sans/Mono
❌ Don't create tight spacing - be generous
❌ Don't use emojis everywhere - be intentional
❌ Don't use colors beyond the defined palette
❌ Don't add decorative elements
❌ Don't use rounded corners on content (only subtle on badges)
❌ Don't use vertical separators
❌ Don't break the max-width constraint

---

## Quick Reference

### Most Common Classes

```tsx
// Containers
"max-w-4xl mx-auto px-6"

// Section spacing
"space-y-4"  "space-y-6"  "space-y-8"  "space-y-12"  "space-y-16"

// Large spacers
<div className="h-16 md:h-24" />

// Headings
"text-3xl md:text-4xl font-semibold tracking-tight"
"text-xl font-semibold"
"text-xs font-medium uppercase tracking-widest text-muted-foreground"

// Body text
"text-muted-foreground leading-relaxed"
"text-sm text-muted-foreground"

// Links
"text-muted-foreground hover:text-foreground transition-colors"
"underline underline-offset-4 hover:no-underline"

// Lists
"space-y-4"
"flex items-baseline gap-4"
"pl-4 relative before:content-['—'] before:absolute before:left-0"
```

---

**Last Updated**: February 8, 2026
