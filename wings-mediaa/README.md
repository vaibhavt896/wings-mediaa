# Wings Mediaa — wings-mediaa

The motion-led studio site. Next.js 15 (App Router) + Lenis + GSAP + Motion + view-transitions API.

```
Stack          Next.js 15 · React 18 · TypeScript · Tailwind 3
Scroll          Lenis 1.x
Animation      GSAP 3.12+ (ScrollTrigger, Flip)
Component motion  Motion (Framer Motion 11+)
Fonts          Inter (display+body) · Instrument Serif (italic) · JetBrains Mono — via next/font
CMS            Sanity v3 schemas written; client stubbed (see `lib/sanity.ts`)
Forms          Stubbed in `ContactForm`; ready to swap to Resend Edge function
Host           Vercel (ISR, edge cache, PR previews)
```

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Type-check only:

```bash
npm run type-check
```

## Site map

```
/                              # Homepage — 9-beat scroll reel
/work                          # Mosaic + GSAP Flip filter
/work/[slug]                   # Case study (View Transitions tile→hero morph)
/services                      # 5 disciplines index
/services/[slug]               # Service template with pinned demo
/about                         # Editorial register — team, manifesto, press
/insights                      # Field-notes index (featured + chronological)
/insights/[slug]               # Long-form article column
/contact                       # Project brief form + Calendly/email
/sandbox                       # QA: every component in isolation (not in nav)

/sitemap.xml                   # Auto-generated from cases + services + insights
/robots.txt                    # Allows everything except /api/* and /sandbox
/manifest.webmanifest          # PWA-lite
/opengraph-image                # Default brand OG card
/work/[slug]/opengraph-image    # Per-case OG (accent-tinted)
/insights/[slug]/opengraph-image # Per-insight OG (article card)
```

## Project structure

```
app/
  (site)/                      # All public routes
  providers/lenis-provider.tsx # Smooth-scroll + GSAP ticker bridge
  layout.tsx                   # Root layout — Nav, Footer, Cursor, fonts, global JSON-LD
  template.tsx                 # Crimson color-flood route transition
  not-found.tsx                # Site-wide 404 (lime canvas)
  error.tsx                    # Global error boundary
  loading.tsx                  # Skeleton during route suspense
  opengraph-image.tsx          # Default OG card
  icon.tsx / apple-icon.tsx    # Favicons (generated)
  manifest.ts / robots.ts / sitemap.ts

components/                    # Component library
  Cursor.tsx Magnetic.tsx Button.tsx Field.tsx Marquee.tsx ...
  home/                        # 9 beat sections
  case/                        # Case study hero + blocks + credits
  service/                     # Service hero + demos × 5 + cta
  about/                       # About sections
  insights/                    # Index + article layouts
  contact/                     # Form + direct column
  work/                        # Mosaic + TransitionLink + FilterChips

lib/
  content/                     # Hardcoded v1 data (cases, services, home, about, insights)
  seo/                         # site constants + JSON-LD + sitemap helpers
  sanity.ts                    # Stub client (will fetch from Studio once wired)
  tokens.ts utils.ts

studio/
  schemas/                     # Sanity schemas — written ahead, not yet wired

styles/globals.css             # Design tokens + animation keyframes
tailwind.config.ts             # Token-mirrored utilities
```

## The design system

Single source of truth for tokens is `styles/globals.css` (CSS variables) +
`tailwind.config.ts` (utility classes) + `lib/tokens.ts` (typed exports).
All three share the same names — change once, propagates everywhere.

| Token  | Value     | Use |
|--------|-----------|-----|
| ink     | #0A0A0F   | Default canvas, dark register |
| bone    | #F4F4F1   | Light register (branding service, 404 background contrast) |
| crimson | #FF3D2E   | The weapon. CTAs, accents, italic words |
| lime    | #E6FF3C   | **Reserved** — 404 only, one testimonial per case |
| mute    | #8A8A95   | Captions, mono labels |

## Performance budgets

```
LCP        < 2.0s    on 4G mid-range mobile
CLS        < 0.05    fonts via next/font, reserved image space
INP        < 200ms   throttle scroll handlers, dynamic-import 3D
JS         < 220KB   gzipped, per route (current largest: home @ 169KB)
Media      < 1.5MB   non-3D pages
```

Verify via `npm run build` — bundle sizes print per-route.

## A11y baseline

- WCAG 2.2 AA target
- `prefers-reduced-motion` honored by every motion component
- Focus rings: 2px crimson + 2px ink offset
- Skip link, semantic heading order, ARIA labels on interactive surfaces
- Cursor + Lenis disable on touch + reduced-motion

## Deploy

```bash
# First time:
npx vercel link

# Push to main → auto-deploy. PRs get preview URLs.
git push origin main
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel project settings (Production = canonical URL).
Optional env vars in `.env.example`.

## Sanity (when ready)

```bash
npx sanity init        # creates project + dataset
npm i @sanity/client groq
# Set NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET in env
# In lib/sanity.ts: uncomment the real client block + replace stubs
```

Schemas already written at `studio/schemas/*` — they ship with the case body-block
sub-types (`posterBlock`, `galleryBlock`, etc.) referenced by the case schema.

## Conventions

- Every animated component checks `prefers-reduced-motion` and bails to a static state
- Every interactive surface has `data-cur="link"` (or `media` / `drag`) so the cursor swaps
- WebGL / heavy demos are `dynamic(..., { ssr: false })` to keep first-load light
- `app/(site)/` is a route group so the marketing routes share the same Nav/Footer chrome
- Form submissions are simulated locally; swap to `/api/contact` (Resend) for production
