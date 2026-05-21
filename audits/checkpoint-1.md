# Checkpoint 1 — Phase 1 scaffold

**Date:** 2026-05-21
**Preview URL:** https://deploy-preview-1--exquisite-pony-4a10e3.netlify.app
**Branch:** `phase-1/scaffold`
**Build:** passing (7 pages + sitemap-index.xml, 722 ms)

## Brief requirement

> CHECKPOINT 1: show me the scaffold, deployed to a preview URL, with the nav working and all pages reachable.

## Verification

### Pages reachable

| Path | Status | Notes |
|---|---|---|
| `/` | ✓ | Hero, three product lines, by-the-numbers, who-we-serve, recent research, CTA |
| `/for-universities/` | ✓ (after fix) | First preview served legacy `.html` due to URL collision. Resolved by deleting `public/for-universities.html` and adding 301 redirect. |
| `/for-organizations/` | ✓ (after fix) | Same collision and fix |
| `/research/` | ✓ | Hero, six methodology sections, commission CTA |
| `/advisory-board/` | ✓ | Hero, "how the board works", stats panel. Member directory deferred to Phase 4. |
| `/insights/` | ✓ | Three report cards: AI readiness, AI skills, Agent readiness (Forthcoming) |
| `/contact/` | ✓ (after fix) | Same collision and fix. Three routing cards + phone + Fort Lauderdale address. |

### Legacy URLs preserved

Recruiting traffic and SEO equity protected by passing legacy HTML through `public/`.

| Legacy URL | Status | Notes |
|---|---|---|
| `/insights/ai-readiness-gap-2026.html` | ✓ | Serves original report HTML unchanged |
| `/insights/ai-skills-gap-2026.html` | ✓ (passthrough) | Confirmed in dist |
| `/insights/ai-readiness-gap-2026-updated.html` | ✓ (passthrough) | Confirmed in dist |
| `/nexus.html`, `/summit.html`, `/platform.html`, `/growth-fellowship.html`, `/leadership.html`, three article HTMLs | ✓ (passthrough) | All confirmed in dist |
| `/agent-readiness-survey/` | ✓ (passthrough) | Folder passthrough preserved |
| `/for-universities.html`, `/for-organizations.html`, `/contact.html` | 301 → new pages | Per Ian's "Reading A" direction: recruiting links land on the new content. |

### Navigation

- Desktop: Programs `<details>` dropdown opens to For universities / For organizations. Research, Advisory board, Insights, Contact direct links.
- Mobile: hamburger toggle, full-screen menu, all routes present including dropdown children.
- Active state styling: gold text when on matching route.
- Keyboard navigation: skip link present at top of every page (`<a class="skip-link" href="#main">`). Focus rings on all interactive elements via `:focus-visible { outline: 2px solid gold }`.
- Logo links to homepage with proper aria-label.

### Brand fidelity to Guidelines v1.2

| Element | Spec | Implemented |
|---|---|---|
| Ink (primary dark) | #0A0A0F | ✓ |
| Gold (primary accent) | #B8962E | ✓ |
| Gold body fallback on Paper | #8B6F1F (gold-deep token) | ✓ |
| Paper (light) | #F5F2ED | ✓ |
| Slate (deep navy headings) | #2C3E5A | ✓ |
| Display serif | Cormorant Garamond via Google Fonts | ✓ |
| Body sans | Inter via Google Fonts | ✓ |
| Eyebrow / data mono | JetBrains Mono, letter-spaced 0.12em, uppercase, Gold | ✓ |
| Sentence case headings | "Advisory board," "Recent research" | ✓ |
| No em dashes | Pages and templates | ✓ |
| Dark dominant, Paper alternation | Hero on Ink, content on Paper, stat band on Ink Soft, CTA on Ink | ✓ |
| No motion / no gradients / no shadows | Static, plain | ✓ |
| `prefers-reduced-motion` respected | Global CSS rule disables animation and transition | ✓ |
| No custom cursor | None added | ✓ |
| No photography | None used | ✓ |

### Tooling baseline

- Astro 4.16.19 (pinned to ^4.16.18)
- Tailwind 3.4.x
- `@astrojs/sitemap` 3.2.1 (pinned, as 3.7+ requires Astro 6)
- TypeScript strict
- Node 20

### Build output

```
dist/index.html
dist/advisory-board/index.html
dist/agent-readiness-survey/index.html
dist/contact/index.html
dist/for-organizations/index.html
dist/for-universities/index.html
dist/insights/index.html
dist/research/index.html
dist/sitemap-0.xml
dist/sitemap-index.xml
+ all legacy passthrough HTML at original paths
```

## Audit scope deferred

Lighthouse, axe, and readability audits are reserved for Phase 2 onward when real content lands. Running them against placeholder text would produce noise without signal (empty headings flagged, low word counts, etc.). The scaffold's structural baseline — semantic HTML, focus management, alt text, skip link, reduced-motion — is in place.

## Recommendation

**Checkpoint 1 passes after the collision fix lands.** Ian to push the fix commit; preview will redeploy; re-verify the three previously-broken URLs; then move to Phase 2.

## Open items carried into Phase 2

- Alan Paris confirmed as Chair on the Advisory Board page (per Ian, 2026-05-21).
- Plausible analytics decision pending. Site shippable without it.
- Homepage copy in LUX voice needed to begin Phase 2.
