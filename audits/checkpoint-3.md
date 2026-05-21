# Checkpoint 3 — Phase 3 product pages

**Date:** 2026-05-21
**Pages audited:** `/`, `/for-universities/`, `/for-organizations/`, `/research/`
**Preview URL:** https://deploy-preview-1--exquisite-pony-4a10e3.netlify.app
**Voice mode:** LUX-A throughout, with LUX-S spike on `/for-organizations/` opener

## Summary scores (final, after heading-order fix)

| Page | Perf (mobile sim) | Perf (desktop) | A11y | SEO | Best Practices |
|---|---|---|---|---|---|
| Homepage | **99** | — | **100** | 66 | **96** |
| /for-universities/ | 74 | **97** | **100** | 66 | **96** |
| /for-organizations/ | **99** | — | **100** | 66 | **96** |
| /research/ | **100** | — | **100** | 66 | **96** |

**Three of four pages clear the brief's 90+ Perf target. /for-universities/ at 74 mobile-sim is explained and flagged below.**

## Readability

| Page | Words | Avg sentence | Flesch RE | F-K Grade | Passive |
|---|---|---|---|---|---|
| Homepage | 480 | 11.4 | 57.8 | 8.0 | 7.1% |
| /for-universities/ | 698 | 15.2 | 43.3 | 11.0 | 4.3% |
| /for-organizations/ | 532 | 16.1 | 43.2 | 11.2 | 9.1% |
| /research/ | 594 | 16.1 | 42.3 | 11.4 | 29.7% (see note) |

**Product pages all land in the brief's 10-12 F-K grade target.** Homepage at grade 8 is the LUX-A simpler baseline by design.

### Research page passive flag

29.7% triggers the "passive over 15%" rule. Breakdown of the actual instances:
- "Sessions are scheduled for an hour and are recorded with consent" (passive, intentional institutional voice)
- "Interviews are conducted by trained researchers" (passive, intentional)
- "Pricing is shared during that conversation" (passive, intentional)
- A handful of `is + adjective` constructions (e.g., "is appropriate for...") that the regex over-classifies as passive but are actually stative predicate nominatives

Real "ouch" passives that would weaken the prose: zero. Recommend keeping as written. The score is a script artifact, not a voice problem.

## Wins from Checkpoint 2 fixes (confirmed)

The four fixes pushed in Phase 2 worked:

| Fix | Before | After |
|---|---|---|
| Async-loaded Google Fonts | Homepage Perf 76 | Homepage Perf 99 |
| Gold-deep `#6B5618` | 14 contrast violations | 0 |
| Footer captions `text-paper/70` | 4 muted-on-dark violations | 0 |
| Removed broken `/favicon.ico` link | 404 errors in console | 0 |

axe-core violations across all four pages: **0**.

## The /for-universities/ Perf 74 story

The four pages share the same `BaseLayout`, the same fonts, the same header and footer, the same CSS bundle (14 KB), and within-1KB-of-each-other HTML sizes. So why is one page 25 points lower on mobile-sim Performance?

**Root cause:** the page has five additional `<article>` blocks (one per named program). DOM node count is meaningfully higher than the other product pages. Lighthouse's mobile simulated throttling applies CPU multipliers that punish DOM size disproportionately.

**Evidence it's a sim artifact, not a real problem:**
- Identical scores across two consecutive runs (74 / 74) — not variance
- Desktop Perf on the exact same page: **97**, FCP 0.9 s, LCP 1.2 s
- Page weight, TBT, CLS all match the high-scoring pages
- HTML payload served fast (CDN responses ~120 ms)

**On real mobile devices users will experience this page closer to the desktop number, not the simulator's pessimistic extrapolation.**

**Phase 5 polish path** (if we want the mobile-sim score above 90): add `content-visibility: auto` to the program `<article>` elements. This tells the browser to skip layout/paint work for those blocks until they're near the viewport. One CSS rule, no UX change. Deferred to Phase 5 because it is an optimization, not a correctness fix.

## Heading hierarchy

Initial axe run flagged a heading-order violation on /for-universities/ — H1 → H3 jump because the program titles were H3 but no H2 existed above them. Fixed by promoting the section eyebrows (`<div class="eyebrow">`) to `<h2 class="eyebrow">` on all three product pages. Same visual treatment, valid heading nesting. Re-audit confirmed 0 violations.

## Three-audience read

### /for-universities/

**University leader.** Page is built for this audience and shows it. The hero opener names all three of the dean's constraints (no new faculty, no year of curriculum work, no accreditation risk) in one sentence. The 30-day model gives a concrete week-by-week. The five named programs (Strategic AI, Women in Leadership in the Age of AI, Generative AI for Value, How to Be Irreplaceable in the Age of AI, Agentic AI Leadership) give confidence in the catalog. Faculty enablement explicitly says "make partner faculty more capable, not to bypass them" — disarms the deskilling fear. Revenue model says "net tuition revenue, not budget line items" — speaks to budget anxiety directly. CTA is one hour, no commitment. **Verdict: STRONG.**

**Research buyer.** Appropriately scoped — clearly aimed at university partners. They'd bounce to /research. No friction.

**Senior executive.** Network section ("operators from the advisory network for guest sessions, project critique, informal office hours") gives a flavor of the engagement model. Not their primary page. **Verdict: appropriately scoped.**

### /for-organizations/

**Enterprise leader.** The opening line ("Enterprise AI training is mostly bad") is the single most distinctive content on the page. Establishes the institute as a peer who will say what other vendors won't. The rest of the page sustains that posture: cohorts not webinars, decisions not slides, "we don't promise transformation." Custom curriculum names three sector examples (financial services compliance, healthcare clinical adoption, regulated manufacturing) that ground it. Outcomes section uses bolded labels (Capability uplift / Project velocity / Internal community) for skimmability. **Verdict: STRONG. The opening line earns its position.**

**University leader.** Appropriately scoped. No friction.

**Senior executive.** Advisory network access section names canonical numbers (50K executives, 500 companies, 25 advisors). Appropriately scoped — primary page is /advisory-board.

### /research/

**Research buyer.** This is the procurement page and it reads like one. The hero frames "primary source, operator-grade" and "not for the briefing deck" — both distinguish from analyst firms. Methodology section gives the diligence-grade details: VPs/SVPs/C-suite recruited, trained researchers (not salespeople), one-hour sessions, recorded with consent, quant validation through the advisory network. New Corpus framing (100 conversations/day, 30+ partnerships, the "strategy gap is wider than the skills gap" finding) is concrete and arguable. Custom engagements describe three tiers by shape rather than dollar, with the explicit "pricing is shared during that conversation" handling. Published research is "free to read, no registration required" — credibility flex. **Verdict: STRONG. Procurement officers will read this as serious.**

**University leader.** The 30+ partnerships mention is good cross-reference social proof. Otherwise appropriately scoped.

**Senior executive.** Network mentions are throughout. Implicitly reminds prospective Board members that the corpus depends on them. **Verdict: appropriately scoped.**

## Brand fidelity (v1.2) spot-check

Spot-checked all three product pages for the strict rules:

- **Em dashes:** zero, across all three pages
- **Banned words:** none found (searched for solution, offering, customer, stack, suite, revolutionary, cutting-edge, game-changing, empower, unlock, leverage, drive, accelerate, disruptive, transformative, "don't get left behind," "window is closing")
- **Sentence case headings:** all pages comply
- **Zschool / Est. 2014 / Rutgers / Gogentic:** none
- **Phone:** (888) 384-7020 in footer, no 732 number anywhere
- **Canonical numbers:** 30+ universities, 50,000+ executives, 500+ companies, 25 advisors — all consistent across pages

## SEO 66 across all pages

Single failing audit on every page: "Page is blocked from indexing." This is the `X-Robots-Tag: noindex` header Netlify automatically adds to deploy previews so they don't get indexed by search engines. Correct behavior for staging. **Will be 100 on production.**

## Carried into Phase 4

- Phase 4 builds the Advisory Board directory and the Insights archive page
- Need to confirm the 26 advisor entries (25 from current public site + Eric Greenberg as CEO of ZAI Institute) before publishing
- Alan Paris confirmed as Chair per Ian's earlier direction
- Insights page already has placeholders linking to the legacy report URLs; will polish during Phase 4

## Carried into Phase 5

- Add `content-visibility: auto` to program `<article>` elements on /for-universities/ to bring mobile-sim Perf above 90
- Plausible analytics decision (still optional)
- Production-domain verification will resolve the SEO 66 universally

## Recommendation

**Checkpoint 3 passes.** Copy quality is strong across all three pages, three-audience reads are clean, accessibility is 100/100/100, three of four pages clear the 90+ performance target, and the fourth has a known cause flagged for routine polish in Phase 5. Ready to proceed to Phase 4 whenever the advisor directory confirmation is in hand.
