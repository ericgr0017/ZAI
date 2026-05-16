# Brand assets

Source of truth for the ZAI Institute visual identity used by this site.

## Files committed

- `z-mark-light.svg` — Z-mark for light backgrounds (Paper)
- `z-mark-dark.svg` — Z-mark for dark backgrounds (Ink)
- `zai-logo/` — extracted asset zip with PNG renders at 16 / 32 / 64 / 128 / 256 / 512 / 1024 px, plus favicon SVG and reverse / mono variants

## Files not committed

- `ZAI_Brand_Guidelines_v1.2.pdf` — marked **Confidential**. Held locally only. The full document lives in the team's shared drive and is the canonical reference for any brand decision affecting this site.

## How brand rules flow into the codebase

- **Colors** → `tailwind.config.mjs` (palette tokens including Ink, Ink Soft, Gold and variants, Paper, Slate, Muted, plus the body-text gold fallback `gold-deep`)
- **Typography** → `tailwind.config.mjs` and `src/styles/global.css` (Cormorant Garamond, Inter, JetBrains Mono via Google Fonts in `BaseLayout.astro`)
- **Voice and content rules** → README.md "Brand rules that affect the codebase" section
- **Logo lockup** → inline SVG in `src/components/chrome/Header.astro` and `Footer.astro` to avoid any reproduction drift
- **Favicon** → `public/z-mark-favicon.svg`

For any question of brand expression that isn't covered in code or README, refer to the PDF before making a call.
