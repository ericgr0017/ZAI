# ZAI Institute website

Public site for ZAI Institute, at [zaiinstitute.ai](https://zaiinstitute.ai). Built with Astro 4, TypeScript, and Tailwind CSS. Deployed to Netlify.

## Stack

- **Astro 4** for static site generation
- **TypeScript** with strict settings
- **Tailwind CSS** with brand tokens from `tailwind.config.mjs`
- **@astrojs/sitemap** for `sitemap-index.xml` generation
- **Google Fonts** for Cormorant Garamond, Inter, and JetBrains Mono
- **No client-side framework.** A small inline script in the Header powers the mobile menu. Everything else is server-rendered HTML.

## Repo layout

```
zai-website/
├── astro.config.mjs            # Astro + sitemap + tailwind integrations
├── tailwind.config.mjs         # brand tokens (palette, fonts, type scale)
├── netlify.toml                # build command, headers, caching
├── tsconfig.json
├── package.json
├── brand/                      # source brand assets (PDF guidelines, logo zip, SVGs)
│   ├── ZAI_Brand_Guidelines_v1.2.pdf
│   ├── z-mark-light.svg
│   ├── z-mark-dark.svg
│   └── zai-logo/               # full logo asset zip extracted
├── public/                     # static passthrough
│   ├── z-mark-favicon.svg
│   ├── z-mark-light.svg
│   ├── z-mark-dark.svg
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   ├── insights/               # legacy report HTML (URLs preserved)
│   ├── agent-readiness-survey/ # legacy survey page (URL preserved)
│   └── *.html                  # legacy article and product pages (URLs preserved)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro    # html + head + skip link + header + main + footer
    ├── components/
    │   ├── chrome/
    │   │   ├── Header.astro    # sticky nav, Programs dropdown, mobile menu
    │   │   └── Footer.astro
    │   └── ui/
    │       ├── SectionHero.astro
    │       ├── Eyebrow.astro
    │       └── Placeholder.astro
    ├── pages/
    │   ├── index.astro
    │   ├── for-universities.astro
    │   ├── for-organizations.astro
    │   ├── research.astro
    │   ├── advisory-board.astro
    │   ├── insights.astro
    │   └── contact.astro
    └── styles/
        └── global.css
```

## Local development

```bash
nvm use            # Node 20
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to ./dist
npm run preview    # serve the built site locally
```

## Brand rules that affect the codebase

Pulled from `brand/ZAI_Brand_Guidelines_v1.2.pdf`. Treat as canonical.

- **Colors** are in `tailwind.config.mjs`. Body-text gold on Paper backgrounds uses `gold-deep` (`#8B6F1F`) because the brand gold (`#B8962E`) fails WCAG AA at body sizes on light surfaces.
- **No em dashes** anywhere in copy. Use commas, periods, or a new sentence.
- **Sentence case** for headings. Capitalize the first word and proper nouns only.
- **No Zschool, no "Est. 2014," no Rutgers, no Gogentic** in any public copy. Founded 2026.
- **Phone:** (888) 384-7020 only.
- **Banned words:** solution, offering, customer, stack, suite, revolutionary, cutting-edge, game-changing, empower, unlock, leverage, drive, accelerate (as marketing verbs), disruptive, transformative.
- **Dark dominant.** Ink and Ink Soft are the canonical surfaces. Paper sections appear as alternation, not as default.
- **Minimal motion.** No gradients, drop shadows, or animated illustrations. `prefers-reduced-motion` is respected globally in `global.css`.
- **No photography by default.** Type-driven hierarchy carries the visual weight.

## Adding a published report

1. Drop the report HTML into `public/insights/<slug>.html` (preserving any current production URLs).
2. Add a list item in `src/pages/insights.astro` pointing to `/insights/<slug>.html`.
3. If it should appear on the homepage strip, add a card in `src/pages/index.astro` under "Recent research."

## Updating advisor list

The advisor directory lives in `src/data/advisors.json` (added in Phase 4). Each entry is `{ name, title, company }`. Keep the list to the canonical roster from Ian. Do not add, remove, or relabel without his approval.

## Deploy

Netlify builds from the `main` branch. `netlify.toml` sets the build command and security headers. Preview deploys run automatically on every branch push.

### First-time Netlify setup

1. Connect the GitHub repo (`ericgr0017/ZAI`) to a new Netlify site.
2. Set the build command to `npm run build` and the publish directory to `dist` (already configured in `netlify.toml`).
3. Set `NODE_VERSION=20` in the Netlify env (already in `netlify.toml`).
4. Add the production domain `zaiinstitute.ai` in Netlify, point DNS, and enable HTTPS.

### Analytics

Plausible is the chosen analytics provider. Once the account is set up, add this line to the `<head>` slot in `BaseLayout.astro`:

```html
<script defer data-domain="zaiinstitute.ai" src="https://plausible.io/js/script.js"></script>
```

Plausible is cookieless and does not require a consent banner.

## Build phases

This repo is being built in six phases with explicit checkpoints. Do not skip checkpoints.

1. **Scaffold** — current phase. Astro project, layout, navigation, page stubs.
2. **Homepage** — full content per Ian's approved copy.
3. **Product pages** — For Universities, For Organizations, Research.
4. **Advisory Board + Insights** — directory and report archive.
5. **Contact + polish** — forms wired (Formspree), Calendly per route.
6. **Pre-launch review** — full audit, multi-audience read, launch readiness report.

Each phase ends with audit results committed to `audits/checkpoint-N.md` (Lighthouse, axe, readability, three-audience review).
