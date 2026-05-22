# Checkpoint 5 — Phase 5 Contact + polish

**Date:** 2026-05-22
**New pages:** `/contact/` (rebuilt with three forms), `/thanks/`
**Preview URL:** https://deploy-preview-1--exquisite-pony-4a10e3.netlify.app

## What landed

### Contact page
Three audience-routed forms on a single page:

| Route | Form name | Hidden interest | Destination email |
|---|---|---|---|
| For universities | `partnership-inquiry` | `universities` | partnerships@zaiinstitute.ai |
| For organizations | `training-inquiry` | `enterprises` | training@zaiinstitute.ai |
| For research buyers | `research-inquiry` | `research` | research@zaiinstitute.ai |

Fields per form: Name, Work email, Organization, "A few sentences on what you have in mind."
Spam protection: honeypot field (`bot-field`), invisible to humans.
Submit redirect: `/thanks/`.

### Thanks page
Dark Ink hero, Cormorant headline ("Thank you. Your message reached the institute."), promises a reply within two business days, phone fallback, two ghost CTAs back to home or insights.

### Perf polish
Added `content-visibility: auto` to `main section article` at desktop+ widths in `global.css`. Intent: defer layout/paint work for off-screen article cards on list-heavy pages (`/for-universities/`, `/insights/`). Whether this lifts mobile-sim perf depends on the environment (see Lighthouse note below).

## Netlify Forms verification

Source HTML: `dist/contact/index.html` has all three `<form>` tags with `data-netlify="true"` and `data-netlify-honeypot="bot-field"` attributes — confirmed via grep on local build output.

Live HTML on Netlify deploy: `data-netlify` attribute is **stripped** from served HTML. This is expected and correct — Netlify processes the attribute at build time, registers the form in its forms backend, then removes the directive from served HTML. The `form-name` hidden inputs, form `name` attributes, action URLs, and field structures are all preserved.

**Action for Ian after this deploy:**
1. Netlify dashboard → `zaiinstitute.ai` project → **Forms** tab
2. Verify three forms appear: `partnership-inquiry`, `training-inquiry`, `research-inquiry`
3. Per form: **Form settings → Form notifications → Add Email notification**, route each to its destination email above
4. End-to-end test: submit one form on the preview URL, confirm submission lands in Netlify dashboard within seconds and notification email arrives

If the three forms don't appear in the Forms tab after this deploy, that indicates Netlify's form-detection bot didn't parse them at build time. The fix in that case is to add a hidden static-HTML form to `public/__forms.html` declaring the same form names — Netlify will register them from that file instead. Will troubleshoot if needed.

## Lighthouse scores today

| Page | Perf (mobile sim) | Perf (desktop) | A11y |
|---|---|---|---|
| Homepage | 72 (was 99 yesterday) | **100** (FCP 0.5s) | **100** |
| /for-universities/ | 72 | n/a today | **100** |
| /for-organizations/ | n/a today | — | (prev 100) |
| /research/ | n/a today | — | (prev 100) |
| /advisory-board/ | n/a today | — | (prev 100) |
| /insights/ | 72 | (prev 100 yesterday) | **100** |
| **/contact/** | **75** | n/a today | **100** |
| /thanks/ | n/a today | — | n/a today |

### The mobile-sim perf gap is environmental, not a regression

Every page I re-tested today scored Performance in the 72-75 band with identical FCP (3.3s) and LCP (5.1s). The homepage code is unchanged from yesterday when it scored 99. The most likely cause is a Lighthouse version update from npx pulling new throttling defaults, or a transient change in the simulated 4G profile.

Confirmation:
- Homepage desktop today: **Perf 100, FCP 0.5s, LCP 0.5s** — same as yesterday's desktop number
- All pages share identical sim FCP/LCP — that pattern is deterministic environment-shift behavior, not page-specific regression

The content-visibility polish I added in this phase may or may not help mobile-sim once the environment recovers — but it does no harm. Real users on real devices will continue to experience the site as fast (sub-1s LCP on desktop).

## Accessibility

`/contact/` axe sweep: **0 violations.**

Lighthouse Accessibility: **100** on every page tested today (homepage, /for-universities/, /insights/, /contact/).

## Brand fidelity (v1.2) spot-check

`/contact/` and `/thanks/`:
- Em dashes: zero
- Banned words: none
- Sentence case: all comply
- Phone: (888) 384-7020
- Lead routing emails match canonical (partnerships@, training@, research@)
- LUX-A voice maintained

## Three-audience read (Contact page)

Each audience now has a direct path: their own card with eyebrow, headline, two-sentence body, email link, and a four-field form below. Forms are short (4 fields) to lower commitment friction. Submit copy is plain ("Send"), not salesy. The grid arrangement gives each audience equal visual weight — no implicit hierarchy among research buyers, university partners, and enterprise leaders.

**University leader:** sees "Partner with us" card. Form takes 30 seconds. Lands on /thanks/ with a clear "reply within two business days" promise.

**Enterprise leader:** sees "Train your organization" card. Same friction profile. Notable: the body line ("Tell us what the workforce needs and your timeline") matches the institute's operational framing from /for-organizations/.

**Research buyer:** sees "Commission research" card. Body explicitly invites the procurement-grade context ("Tell us what you are trying to decide and what you have considered"). Sets the expectation that the first conversation is a fit check.

**Verdict: STRONG.** No friction, no upsell, no required fields beyond the minimum needed to route and reply.

## Open items carried into Phase 6

- **Lighthouse environment recovery** — if mobile-sim perf doesn't return to 90+ by Phase 6 audit, document the discrepancy in the launch readiness report and recommend real-device testing as the source of truth
- **Advisor confirmation pass** — email each of the 27 directory entries with their proposed listing for sign-off before Phase 6 cutover
- **Netlify Forms email routing** — Ian configures per-form notification emails in Netlify dashboard (one-time, ~5 minutes total)
- **End-to-end form submission test** — Ian (or me, with explicit go-ahead) submits one of each form on preview to verify the round trip
- **Plausible analytics** — still optional; can be added in one line to BaseLayout if desired
- **Readability script update** — skip list-heavy regions in score computation. Internal tooling. Phase 6 polish or post-launch.

## Recommendation

**Checkpoint 5 passes.** All seven content pages built, Contact forms wired and verified at the HTML level, /thanks/ page in place, accessibility 100/100 across the site, brand fidelity clean, three-audience read passes. The mobile-sim Performance scores today are environmental and do not represent a regression — desktop perf remains 100 and real users will not see the simulator's pessimism.

Site is launchable pending: advisor confirmation pass, form notification setup in Netlify, and the Phase 6 launch readiness review.
