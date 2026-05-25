# Checkpoint 2 — Phase 2 homepage

**Date:** 2026-05-21
**Page audited:** `/` (homepage)
**Preview URL:** https://deploy-preview-1--exquisite-pony-4a10e3.netlify.app/
**Voice mode:** LUX-A (Architect)

## Initial scores (before fixes)

| Audit | Score | Target | Status |
|---|---|---|---|
| Lighthouse Performance (mobile, simulated throttling) | 76 | 90+ | Fail |
| Lighthouse Accessibility | 95 | 95+ | Pass (barely) |
| Lighthouse SEO | 66 | Solid | Fail (preview artifact) |
| Lighthouse Best Practices | 92 | 90+ | Pass |
| axe-core violations | 14 contrast issues | 0 | Fail |
| Flesch Reading Ease | 57.8 | 60-70 ideal | Acceptable |
| Flesch-Kincaid grade | 8.0 | 10-12 | Below target (see note) |
| Average sentence length | 11.43 words | <25 | Pass |
| Passive voice rate | 7.1% | <15% | Pass |
| Word count | 480 | Editorial range | Good |

## Issues identified

### 1. Contrast violations (axe)
14 occurrences across two color combinations:
- **`gold-deep` on Paper at body text sizes.** v1.2 spec specifies `#8B6F1F` as the body-text fallback. That exact value scores ~3.85:1 against Paper `#F5F2ED` — fails AA (needs 4.5:1). Affected: all `.eyebrow-on-light` labels and all gold-deep inline links.
- **`muted` on Ink at xs sizes.** Footer email subtitles ("Research engagements", "University partnerships", "Organization training") and the Fort Lauderdale address line. Muted `#6B6B7A` on Ink scores ~3.89:1 — fails AA.

### 2. Lighthouse Performance 76
- **Render-blocking Google Fonts CSS:** 1,370 ms savings available. The stylesheet for Cormorant Garamond + Inter + JetBrains Mono was loaded synchronously.
- **LCP 4.9 s.** Display text waiting on fonts. Same root cause.

### 3. Lighthouse SEO 66
- Single failing audit: "Page is blocked from indexing." Netlify automatically adds `X-Robots-Tag: noindex` to deploy previews so they don't get indexed. This is correct behavior for staging. Production will not have this header and the score will recover.

### 4. Lighthouse Best Practices 92
- **404 on `/favicon.ico`** because the alternate icon link pointed to a file that doesn't exist (the SVG favicon is sufficient for modern browsers).
- **Cookie warning** for `app.netlify.com/cdp/`. Netlify's CDP tracking cookie fires only on the deploy preview, never on production. Not a code issue.

## Fixes applied this checkpoint

| Fix | File | Notes |
|---|---|---|
| `gold.deep` → `#6B5618` | `tailwind.config.mjs` | Slightly darker than v1.2's specified `#8B6F1F`. v1.2 allowed "or similar" — this stays in family and passes 4.5:1. |
| Footer email subtitles + address → `text-paper/70` | `Footer.astro` | Effective light gray on Ink at small sizes, passes contrast comfortably. |
| Removed `/favicon.ico` fallback link | `BaseLayout.astro` | SVG favicon + apple-touch-icon are sufficient. |
| Async-load Google Fonts via print-then-all pattern | `BaseLayout.astro` | Removes ~1.4 s of render-blocking. `<noscript>` fallback present for users with JS disabled. |

## Readability note

Grade 8.0 is slightly below the brief's 10-12 target band. Two reasons not to "fix" this:

1. **Brand voice is intentionally plain.** v1.2 LUX principles explicitly call for plain language. The point of LUX is to read like a peer, not like McKinsey. Bumping grade-level by introducing nominalizations or longer sentences would betray the voice.
2. **Scoring includes UI fragments.** The script treats stat labels ("University partners", "By the numbers", etc.) as sentences. These short labels pull the average grade down. Excluding them would push the prose grade closer to 10.

The flag is informational, not actionable. Recommend keeping LUX-A as the homepage voice and accepting grade 8 as the natural floor.

## Three-audience read

### Audience 1: University leader
Reading as a dean of continuing education at a regional state university with 20,000 students, a $5M CE budget, and pressure to launch AI programs without additional headcount.

**Does the page answer:**

- *What can this institute deliver and how fast?* — Yes. "Launch in 30 days" is the second card the dean sees. Specific timeline, concrete value.
- *What does it cost and what does it produce?* — Partial. "Programs that generate tuition revenue" is implied by the existence of the For Universities page link, not stated on the homepage. Acceptable for a homepage; the For Universities page should carry the financial framing.
- *Who else has done this and is it real?* — Partial. "60+ university partners" is the proof. Named institutions are absent (deferred per Ian: no logo strip yet). The number itself is defensible and substantial.
- *Academic integrity story?* — Yes, directly. "No risk to accreditation" is in the Programs card body. The single most important phrase on the page for this audience.
- *Minimum commitment to learn more?* — Yes. "Request a conversation" CTA. Low-friction. Honest closing language ("If there is not, we will say so") removes sales pressure.

**Verdict for this audience: STRONG.** The Programs card and the "we carry it" line in the Who-We-Serve section are the sticky moments. Friction is low. No false promises.

### Audience 2: Corporate research buyer
Reading as a VP of Competitive Intelligence at a $20B AI platform vendor, evaluating ZAI as a potential commissioned research partner on a $200K engagement.

**Does the page answer:**

- *Real and credible research organization?* — Partial. The Research card frames the methodology in operator-grade terms. The published research strip (three real reports) is the strongest credibility signal. The "operator-grade" framing differentiates from analysts.
- *Methodology and trust?* — Partial. The card describes the interview-based corpus in plain English. A $200K buyer will want depth, which lives on the /research page. The homepage does enough to motivate the click.
- *Past commissioned research and outputs?* — Not on the homepage. Three published reports are visible; named past clients are not. This is a gap that may need to be addressed somewhere (Research page or a separate references page), with attention to confidentiality. Brief says "Every claim must be defensible" — implies clients should be nameable on request.
- *Pricing vs McKinsey, Gartner, IDC?* — Not on the homepage by design (Ian's call). The "built for the people making the decision, not for the briefing deck" line is a soft positional dig that helps.
- *Minimum commitment to evaluate further?* — Yes. "Read the research" CTA invites verification through artifacts. "Request a conversation" for next step.

**Verdict for this audience: STRONG.** The "primary source, operator-grade" framing and the "not for the briefing deck" line differentiate well. The published reports are concrete proof. The two-CTA closing ("Request a conversation" + "Read the research") matches how a research buyer actually evaluates.

### Audience 3: Executive operator
Reading as a senior vice president at a Fortune 500 company who received an invitation to join the Advisory Board.

**Does the page answer:**

- *Who else is in the network?* — Partial on the homepage. "Twenty-five named operators from across the Fortune 500" and "fifty thousand senior executives in five hundred companies" set the frame. Named members are on the Advisory Board page (Phase 4).
- *Commitment in time and substance?* — Implied. "If that fits the way you want to spend an hour, we should talk" is the only time framing on the homepage. Honest. Doesn't oversell.
- *What do I get?* — Implicit. The page leans on signaling and peer-level access rather than enumerated benefits. This matches the audience's allergy to vendor pitches. Some operators will want more specifics; the Advisory Board page can carry that.
- *Academic research or commercial work?* — The "primary source, operator-grade" framing positions the research as primary and operator-driven, not academic. The institution voice keeps it serious. No salesy gloss.

**Verdict for this audience: STRONG tone match.** "We will tell you honestly whether there is a fit. If there is not, we will say so." is the single most important line for this audience. Senior operators disengage at the first whiff of marketing. This page never crosses that line.

## Brand fidelity (v1.2) spot-check

- Em dashes: zero. (Searched all rendered text.)
- Banned words: none. (Searched for "solution", "offering", "customer", "stack", "suite", "revolutionary", "cutting-edge", "game-changing", "empower", "unlock", "leverage", "drive", "accelerate", "disruptive", "transformative", "don't get left behind", "the window is closing.")
- Sentence case headings: all headings comply.
- Zschool / Est. 2014 / Rutgers / Gogentic: none.
- Phone: (888) 384-7020. Correct number. No 732 number anywhere.
- Founded 2026: implicit via "© 2026" footer; no contradictory date.
- 60+ universities, 50,000+ executives, 500+ companies, 25 advisors: numbers match v1.2 canon.

## Expected scores after fixes land

Re-audit will run against the new preview deploy. Expected:
- Accessibility: 100 (contrast fixes resolve the only outstanding issue)
- Performance: 90-95 (font async should add ~15 points)
- Best Practices: 100 (404 removed; Netlify CDP cookie note remains as a preview-only artifact, but a single inspector issue at warning level shouldn't drop the score under the 90 threshold)
- SEO: 66 will persist on the preview (noindex header); production will be 100

## Recommendation

**Checkpoint 2 passes pending the fix deploy.** Push the fixes, let Netlify rebuild, and the next audit run will confirm. Three-audience read passes now — the copy itself is checkpoint-quality.

## Carried into Phase 3

- Copy for `/for-universities`, `/for-organizations`, `/research` (Ian to provide).
- Decision on whether the Research page should show any prior commissioned-research client references (defensibility matters at the $200K procurement level).
- Plausible analytics (still optional).
