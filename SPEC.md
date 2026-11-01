# Brand Studio decisions

This is the durable agreement between the learner and agent. Keep it concise and update it only with agreed choices or actual evidence. `Not chosen yet` is a valid status. Persona cards are hypotheses unless supported by real research.

[LEARNING.md](LEARNING.md) holds the short, reviewable record of learner explanations and help received. Keep the brand decisions and implementation evidence here; link rather than duplicate them.

## Current stage

- Stage: BRAND-001 built, checked, and ready to merge.
- Current feature: `BRAND-001` — first branded storefront and live style guide.
- Status: Issue: https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/1 · Pull request: https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/2
- Next small decision: None selected yet.

## Product boundary

The product is the same white T-shirt throughout the comparison. The baseline offers a size selector and temporary demo bag. No real orders, payment, accounts, or persistence. Keep product facts stable between directions; do not add unsupported claims about materials, manufacturing, sustainability, fit, delivery, scarcity, reviews, or sales.

## Audience hypotheses

| Tiny card                             | Primary audience                                                          | Secondary audience                                       |
| ------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------- |
| Person in a concrete situation        | A student who goes from class straight to a retail shift                  | Someone who wants to look sharp and put-together at work |
| Goal or meaning they seek             | One shirt that works for the whole day without changing                   | Look neat and professional                               |
| Concern before choosing               | Comfort: on their feet about 8–10 hours, and many shirts get hot or tight | That a comfort-focused shirt looks sloppy                |
| What the page should help them decide | Whether this shirt fits their class-to-shift day                          | Whether it still looks clean enough for work             |
| Evidence or assumption                | Assumption from the learner's own class-and-work routine; not validated   | Assumption; not validated                                |

## Early brand brief

| Decision                            | Agreement                                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| Brand name                          | Full Shift                                                                                         |
| One-sentence promise                | Built for long days on your feet, comfortable at hour one and hour nine.                           |
| Primary archetype                   | Everyman — down to earth and relatable                                                             |
| Three voice traits                  | Chill, straight-up, encouraging                                                                    |
| One example line in this voice      | "Long day ahead? This one's got you."                                                              |
| Learner's predicted audience effect | "They would be more likely to buy it because its made for them while working and being in school." |

Help received: the AI coach suggested options for the secondary persona's concern, the name, promise, archetype, voice and example line; the learner chose each one. The primary situation, the 8–10 hours on their feet, and the predicted effect are the learner's own.

## Visual decision

| Item                                              | Agreement or evidence                                                                                                                                                                                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Shared headline / support / action                | "Long day ahead? This one's got you." / "Comfortable from first class to closing time." / "Choose your size" (learner picked from two AI options)                                                                                                                                                |
| Modernist preview, reference, and annotations     | `public/hero-previews.html` Preview A. Reference: Josef Müller-Brockmann, Musica Viva poster, 1959 (V&A, https://collections.vam.ac.uk/item/O110243). White space, grid, one red block, plain sans-serif. Risk: too plain for a chill brand.                                                     |
| Postmodernist preview, reference, and annotations | `public/hero-previews.html` Preview B. Reference: Paula Scher, Bring in 'da Noise, Bring in 'da Funk poster, 1995 (Cooper Hewitt, https://collection.cooperhewitt.org/objects/18655855). Blocky type, mixed sizes, tilted line, loud color. Risk: could look messy to the "looks sharp" visitor. |
| Chosen direction and reason                       | Postmodernist. Learner: the modernist one was "too simple" and the yellow one "looked like a site i would buy from." Learner asked to fix overlapping words; fixed with spacing.                                                                                                                 |
| Original SVG logo                                 | `public/assets/full-shift-logo.svg` — blocky "FULL" over a tilted "SHIFT" (learner chose this idea from two AI options).                                                                                                                                                                         |
| Monochrome and small-size variants                | Same file; the logo is already one color (black). Shown at 110px and one-color on the style guide.                                                                                                                                                                                               |
| Logo review at actual use size                    | Seen in the storefront header at 150px wide; readable.                                                                                                                                                                                                                                           |
| Shared palette, typography, spacing, and assets   | Tokens in `public/styles.css`: Shift Yellow #ffd23f, Ink #111, Pop Blue #1d3fbb, Pink #ff9ecb, Muted #3d3a2a (darkened for contrast on yellow). Impact for headlines, system fonts for body. Shared by storefront and style guide.                                                               |

## Ethical persuasion

| Principle  | Actual copy or interaction                                                                                                                                              | Visitor benefit / factual support                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity      | Eyebrow "Made for students who work" plus the description of class-to-shift days                                                                                        | Helps visitors quickly see if the shirt is meant for people like them. True: it is the chosen audience.                                                                |
| Commitment | An "Is this your day?" check (class first, then a shift; on your feet most of it) placed before the size picker: "If that sounds like you, pick your usual size below." | The visitor agrees with two small true statements about their own day, then picking a size is the consistent next step. No fake reviews, countdowns, or stock numbers. |

The support line on the storefront was changed to "Made for first class to closing time." because the shirt is fictional and comfort cannot be supported as a fact. Product claims on the page say "None. This is a fictional demo shirt."

## BRAND-001 — first branded storefront and live style guide

**Scope:** turn the working neutral storefront into the chosen brand's first coherent page. Keep the existing size selector and demo bag usable. Do not add checkout or all future features.

Result: storefront (`public/index.html`), live style guide (`public/styleguide.html`), shared tokens (`public/styles.css`), logo, and hero previews are in place. Size selector and demo bag still work.

## Evidence

A passing browser check is evidence for its assertions, not customer research or proof of full accessibility.

| Spec ID   | Files                                                                                                                                            | Issue / PR                                                                       | Actual checks and observations                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BRAND-001 | SPEC.md, LEARNING.md, public/index.html, public/styleguide.html, public/styles.css, public/hero-previews.html, public/assets/full-shift-logo.svg | Issue #1; PR https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/2 | `npm run check` passed: format, lint, 7 server tests, 10 browser tests. One test explained: the negative test checks that adding without a size shows a "choose a size" message and keeps the bag empty; learner saw the same thing ("it says choose a size before adding to demo bag"). Learner browser checks: Tab, arrow keys, and Enter all work; phone-size view "everythings good"; impression "i like the way it looks." Decision: keep. |

## Later

No follow-up is selected. After keeping `BRAND-001`, choose one next cycle: perhaps a brand story, a supported fit guide, or richer demo-bag behavior.
