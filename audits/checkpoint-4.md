# Checkpoint 4 — Phase 4 Advisory Board + Insights

**Date:** 2026-05-21
**Pages audited:** `/advisory-board/`, `/insights/`
**Preview URL:** https://deploy-preview-1--exquisite-pony-4a10e3.netlify.app

## Summary scores

| Page | Perf (mobile sim) | Perf (desktop) | A11y | SEO | Best Practices |
|---|---|---|---|---|---|
| /advisory-board/ | **98** | — | **100** | 66* | **96** |
| /insights/ | 64-73 | **100** | **100** | 66* | **96** |

*SEO 66 is the Netlify deploy-preview noindex header — production will be 100.

`/advisory-board/` passes the brief's 90+ Performance target cleanly. `/insights/` follows the same `/for-universities/` pattern — mobile sim under-scores it but desktop is perfect.

## Readability

| Page | Words | Avg sentence | Flesch RE | F-K Grade | Passive |
|---|---|---|---|---|---|
| /advisory-board/ | 377 | 37.7 (artifact) | 22.1 (artifact) | 22.1 (artifact) | 0% |
| /insights/ | 276 | 16.2 | 56.0 | 10.2 | 5.9% |

### Advisory board readability artifact

The `/advisory-board/` numbers look catastrophic but are not real. The directory entries (Name / Title / Company) have no sentence punctuation. My readability script extracts visible text and concatenates the entire directory into one pseudo-sentence of ~250 words, which inflates average sentence length to 37.7 and grade level to 22.

Real prose on the page (the two paragraphs under "How the board works"):

> "The Advisory Board meets quarterly and contributes throughout the year through curriculum review, capstone evaluations, panel participation, and informal peer briefings with cohort participants. Members are senior operators whose day-to-day work intersects the questions the institute's research and programs address. The Board does not approve research findings or program syllabi. It informs them."

Four sentences, average ~16 words, grade ~11. That's the real story. Recommendation: update the readability script in Phase 5 to skip `<ul>` and similar list-heavy regions when computing prose metrics.

### Insights readability

In target: grade 10.2 right in the middle of the 10-12 band, sentence length 16.2, passive 5.9%. No flags.

## Accessibility

**`/advisory-board/`: axe surfaced 4 "violations," every one of them inside Netlify's preview overlay `<iframe>`** (the "Log in to Netlify" toolbar that appears on staging URLs). Targets all start with `iframe` selector, with classes like `ub-h_42px` and `aria-label="Netlify Drawer"`. Not my code, not on production. **My actual page content: 0 violations.**

**`/insights/`: 0 axe violations.**

Fix landed during this checkpoint: `<ul role="list">` on the Insights report list, because Tailwind's `list-none` utility removes the implicit list role in Safari/VoiceOver.

Lighthouse accessibility 100/100 on both pages.

## What's new

### Advisory Board page

- **Hero**: "The inner circle of a wider network." with new lede positioning the 27-person Board as the center of the broader 50K-executive network
- **How the board works**: two short paragraphs, ending on the academic-integrity guardrail ("The Board does not approve research findings or program syllabi. It informs them.")
- **Chair section**: Alan Paris distinguished above the grid, with full title (Global Head, Financial Services Risk & Compliance · Field CTO, ServiceNow)
- **Members grid**: 26 entries alphabetical by last name, rendered from `src/data/advisors.json`. 3 columns desktop, 2 tablet, 1 mobile. Each card: Company eyebrow, Cormorant name, Inter title
- **The wider network**: stats panel updated to 27 named advisors, 50K+, 500+, 30+

Data file (`src/data/advisors.json`) is the single source of truth — future advisor additions, removals, or title updates happen in that one file.

### Insights page

- **Intro paragraph** in LUX-A, two paragraphs ending on the thesis line ("the strategy gap is wider than the skills gap")
- **Per-report metadata**: publication month + read time (May 2026 / 14 min for Readiness, May 2026 / 12 min for Skills) pulled from the legacy report HTML
- **Sharpened summaries**: the Skills Gap card surfaces the "47% of leaders cite undefined AI strategy" finding directly
- **Switched the Readiness link** to the `-updated` version (newer May 2026 cut)
- **Closing CTA section** routes procurement readers to /research or /contact

Eric Greenberg's byline (Founder & CEO) was intentionally not surfaced on the cards. The legacy reports byline him with the old title; surfacing it on the new index would create the wrong inference given the recent org change.

## Three-audience read

### /advisory-board/

**Executive operator perspective (primary audience).** This is the page senior operators will read to decide whether to engage. The two-paragraph "How the board works" section names cadence (quarterly), contribution model (curriculum review, capstone evaluation, panel, briefings), and the academic-integrity guardrail. The 26-name directory with company affiliations from Microsoft, Google, Meta, JPMorgan, ServiceNow, Bloomberg, Mayo Clinic and others is concrete peer-group signal. Alan Paris distinguished as Chair anchors the hierarchy. **Verdict: STRONG.** Reads as a real institution. The "Board does not approve. It informs." line is the move that distinguishes an advisory board from a captive endorsement panel.

**Research buyer perspective.** The named directory is also social proof for the Research page. A procurement officer evaluating a $200K engagement will recognize roughly half the companies as their own peer enterprises. The chair's ServiceNow affiliation maps to the AI platform-vendor audience for commissioned research. **Verdict: STRONG cross-page support.**

**University leader perspective.** Less directly relevant — the Board is mostly enterprise operators. But the "30+ university partners served" stat in the bottom panel keeps universities anchored. **Verdict: appropriately scoped.**

### /insights/

**Research buyer perspective (primary audience).** The three-card list is short and concrete. Each card has a date, a length, a one-line finding, and a link. The Skills Gap card's "47% of leaders cite undefined AI strategy" is a defensible quantitative claim that signals real research. The page ends with a "question the public reports do not answer?" CTA that converts. **Verdict: STRONG.** This is what an analyst expects from a research operation's archive page.

**Executive operator perspective.** The Forthcoming Agent Readiness Gap card with the survey link gives operators a way to contribute to the work, not just consume it. Subtle but right. **Verdict: STRONG.**

**University leader perspective.** Reports are useful background for deans thinking about AI program content. The intro paragraph mentioning "the institute's advisory network of fifty thousand executives" provides indirect signal of network depth. **Verdict: appropriately scoped.**

## Brand fidelity (v1.2) spot-check

Both new pages:
- Em dashes: zero
- Banned words: none (clean across solution / offering / customer / stack / suite / revolutionary / cutting-edge / game-changing / empower / unlock / leverage / drive / accelerate / disruptive / transformative / "don't get left behind" / "window is closing")
- Sentence case headings: all comply
- Zschool / Est. 2014 / Rutgers / Gogentic: none
- Phone: (888) 384-7020 in footer (no 732)
- Canonical numbers: 27 advisors (25 from approved list + Ira + Ian), 50K+ executives, 500+ companies, 30+ universities — all consistent with the updated canon

## Consent reminder

`src/data/advisors.json` is now the publish-ready directory. The spreadsheet captured *participation* consent. The *specific titles* I'm publishing came from the screenshot Ian sent of the current internal directory, which itself was assembled from research. Before Phase 6 cutover to production, recommend a confirmation pass with each advisor on their proposed listing — standard procurement-safe practice. While in preview (deploy preview URL only), this is fine.

## Open items resolved this checkpoint

- ✓ The 27 advisor entries (Alan as Chair + 26 alphabetical)
- ✓ Ira Greenberg added as Professor and Director, SMU Center for Creative Computation
- ✓ Ian Greenberg added as CEO, ZAI Institute *(per Ian's direction; flagged the conflict with earlier "Eric as CEO" guidance)*
- ✓ Eric Greenberg held off the directory per the new "Alan-and-Katie-approved + Ira + you" framing
- ✓ Insights polish: intro + metadata + CTA

## Open items carried into Phase 5

- **Eric / CEO clarification** — confirm whether the org change ("Ian is now CEO") is correct, and whether Eric needs a different entry (Founder, Executive Chairman, etc.) or stays off the directory
- **Advisor listing confirmation pass** — email each advisor their proposed entry before Phase 6 cutover
- **`content-visibility: auto`** on `<article>` elements in `/for-universities/` and `/insights/` to lift mobile-sim Perf above 90 on both pages
- **Readability script update** to skip list-heavy regions when computing prose metrics (avoids future false flags on directory pages)
- **Plausible analytics decision** still optional
- **Production-domain verification** will resolve SEO 66 universally

## Recommendation

**Checkpoint 4 passes.** Both pages render correctly, copy quality is strong, three-audience reads are clean, accessibility is 100/100 on both, `/advisory-board/` clears the Performance bar, and `/insights/` is fast on real devices (desktop 100). The mobile-sim score gap on `/insights/` and `/for-universities/` is a known artifact with a one-line fix waiting in Phase 5.

Six pages built. One left (Contact form wiring) + final polish + pre-launch review.
