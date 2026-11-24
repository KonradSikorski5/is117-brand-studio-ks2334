# Brand Studio decisions

This is the durable agreement between the learner and agent. Keep it concise and update it only with agreed choices or actual evidence. `Not chosen yet` is a valid status. Persona cards are hypotheses unless supported by real research.

[LEARNING.md](LEARNING.md) holds the short, reviewable record of learner explanations and help received. Keep the brand decisions and implementation evidence here; link rather than duplicate them.

## Research

- T-shirt research: [Research.md](Research.md), with screenshots in [screenshots](screenshots). Sites checked Nov 3, 2026.
- Chosen audience (hypothesis, not tested yet): commuting students buying one everyday white tee. They need the right size and the full price before checkout.
- Next check: in class on Nov 5, a classmate finds the size guide and total without help. Feedback will go in a GitHub issue.

## Current stage

- Stage: BRAND-001 merged into `main` on Nov 1, 2026 (PR #2) and published at https://konradsikorski5.github.io/is117-brand-studio-ks2334/.
- Plan: submitted Nov 16, 2026. See [Plan](#plan) (two approaches, four stories with checks, simulated checkout, and SQLite).
- Current feature: Build A/B: size guide, full total, demo checkout, and SQLite orders (see [Build](#build)). Earlier: `BRAND-001`, the first branded storefront and live style guide.
- Status: Issue: https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/1 · Pull request: https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/2
- Build: done Nov 16, 2026. See [Build](#build): Version A and B, checkout, and SQLite. The classmate A/B test is pending.
- Next small decision: run the classmate A/B test in class, then pick A or B to launch (Build due Dec 3).

## Product boundary

The product is the same white T-shirt throughout the comparison. The store now has a size guide, quantity, a full total, and a demo checkout. Demo orders are saved in a local SQLite database (or the browser on GitHub Pages). No real orders, payment, accounts, or shipping. Keep product facts stable between directions; do not add unsupported claims about materials, manufacturing, sustainability, fit, delivery, scarcity, reviews, or sales.

## Audience hypotheses

| Tiny card                             | Primary audience                                                          | Secondary audience                                       |
| ------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------- |
| Person in a concrete situation        | A student who goes from class straight to a retail shift                  | Someone who wants to look sharp and put-together at work |
| Goal or meaning they seek             | One shirt that works for the whole day without changing                   | Look neat and professional                               |
| Concern before choosing               | Comfort: on their feet about 8–10 hours, and many shirts get hot or tight | That a comfort-focused shirt looks sloppy                |
| What the page should help them decide | Whether this shirt fits their class-to-shift day                          | Whether it still looks clean enough for work             |
| Evidence or assumption                | Assumption from the learner's own class-and-work routine; not validated   | Assumption; not validated                                |

## Early brand brief

| Decision                            | Agreement                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand name                          | Full Shift                                                                                                                                                            |
| One-sentence promise                | Built for long days on your feet, from hour one to hour nine. (Changed Nov 15: removed "comfortable" because the shirt is fictional and comfort cannot be supported.) |
| Primary archetype                   | Everyman — down to earth and relatable                                                                                                                                |
| Three voice traits                  | Chill, straight-up, encouraging                                                                                                                                       |
| One example line in this voice      | "Long day ahead? This one's got you."                                                                                                                                 |
| Learner's predicted audience effect | "They would be more likely to buy it because its made for them while working and being in school."                                                                    |

Help received: the AI coach suggested options for the secondary persona's concern, the name, promise, archetype, voice and example line; the learner chose each one. The primary situation, the 8–10 hours on their feet, and the predicted effect are the learner's own.

## Visual decision

| Item                                              | Agreement or evidence                                                                                                                                                                                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Shared headline / support / action                | "Long day ahead? This one's got you." / "Made for first class to closing time." (changed Nov 15 from "Comfortable from first class to closing time." because comfort cannot be supported) / "Choose your size" (learner picked from two AI options)                                              |
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

## Peer review decisions

Reviewer: Safwaan (safwaanarif). Decisions made Nov 12, 2026, with AI help (Claude).

| Issue                                                                       | Suggestion                                                                           | Decision                | Why                                                                                                                                                                                                                                             | Change                                                                                                                                                                                                          | Check                                                                                                                                                                                                                                                                                                                  | Reviewer retry                                                                                                                                               |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [#3](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/3) | Add fabric thickness (GSM or yarn count) so buyers know the shirt is not see-through | Decline adding a number | The shirt is fictional. I have no real fabric to measure, so any GSM number would be made up. The page already says "Product claims: None." If it became a real shirt, I would weigh a sample (GSM) and photograph it under bright light first. | Reason recorded in this table ([PR #6](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/6), merged Nov 12)                                                                                     | Storefront still shows "Product claims: None" and no fabric numbers. `npm run check` passed on [PR #6](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/6).                                                                                                                                           | Retried by Safwaan, Nov 15: "retried, looks good" ([comment](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/3#issuecomment-6902894081)) |
| [#4](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/4) | Add wash-test or shrinkage data for the collar                                       | Decline adding data     | The page does not say the collar holds its shape. A search of the repo found no collar or durability claim. Adding shrink numbers without a real wash test would be fake proof, and that breaks my own rule in Research.md.                     | Reason recorded in this table ([PR #6](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/6), merged Nov 12)                                                                                     | Repo search for collar, durable, shrink, and wash found no product claims. `npm run check` passed on [PR #6](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/6).                                                                                                                                     | Retried by Safwaan, Nov 15: "retried, looks good" ([comment](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/4#issuecomment-6902896142)) |
| [#5](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/5) | Make sure keyboard users can see which size is focused                               | Keep, and add a test    | It already worked. Tabbing to the sizes showed a dark outline (3px, 4px offset) and arrow keys moved it from S to M.                                                                                                                            | New browser test "keyboard: a focused size option shows a visible outline (#5)" in `tests/browser/studio.spec.js` ([PR #6](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/6), merged Nov 12) | Keyboard check in a real browser. 11 browser tests passed locally and on [PR #6](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/6). Removed the outline on purpose and the new test failed, then restored it. Steps written up in [docs/help-ticket-size-focus.md](docs/help-ticket-size-focus.md). | Retried by Safwaan, Nov 15: "retried, looks good" ([comment](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/5#issuecomment-6902898152)) |

## Plan

Plan date: Nov 16, 2026. Updated Nov 20 for the [IS117 Project Plan Guide](https://keithwilliams.org/is117-demo-days/process/project-plan/), and **updated Nov 24 for the professor's Nov 23 announcement**. **Due Nov 30, 11:30 a.m.** Build is due Dec 3, and Improve is due Dec 6.

**Where this plan lives:** in this project record (`SPEC.md`), which is my documentation. It is **not** on the storefront. The storefront is the finished site. It's a GitHub Pages store with a simulated checkout and demo data only: no real payments and no real customer information.

### One small idea

**Show the full total before checkout.** My research found the biggest problem was surprise costs (ASKET showed no shipping, and Uniqlo listed it as "TBD"). So the one idea I'm building around is a small "Your total" box with size, shirts, demo shipping, and the total, before the "Place demo order" button. I can explain it in one sentence: _students on a budget shouldn't get surprised at checkout._

### How I made this plan

1. **AI read my research.** I gave Claude my [Research.md](Research.md) and asked it to compare options for the page.
2. **Compared options:** two page orders (shop first vs. "your day" first, below) and two frameworks (Next.js vs. SvelteKit, below).
3. **Asked for short stories and simple checks** (S1–S4, below).
4. **I read and revised before any code.** I removed "comfortable" claims I couldn't prove, after my professor's feedback. I added a demo shipping line, because my research was about surprise costs. After Safwaan's question, I decided bad quantities and changed prices get rejected, not quietly fixed.

**Goal:** a student who goes from class straight to a shift picks the right size, sees the full total, and finishes a demo order fast.

**Carried forward:** promise "Built for long days on your feet, from hour one to hour nine." · Everyman, voice chill, straight-up, encouraging · the chosen postmodernist look (yellow, blocky type, Paula Scher reference) and [style guide](https://konradsikorski5.github.io/is117-brand-studio-ks2334/styleguide.html) · the two persuasion choices above (Unity and Commitment).

**Why these stories:** my [research](Research.md) found the biggest problem was not knowing the full cost. ASKET's add-to-cart panel showed no shipping, and Uniqlo's cart listed it as TBD. My audience also worries about getting the wrong fit.

### Two approaches

Both use the **same** shirt, price, headline, size guide, and checkout. Both keep the chosen postmodernist look. Only the **order** changes.

|                   | A. Shop first                                                                                                                | B. Your day first                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| First thing shown | Price, size guide, and size buttons together                                                                                 | The "Is this your day?" check and the class-to-shift story, then the same shopping controls |
| Main action       | Size guide → size and quantity → review total → demo checkout → confirmation                                                 | Same                                                                                        |
| Why try it        | A student between class and work wants to buy fast                                                                           | A first-time visitor may need to see it's for them first                                    |
| What I'll compare | Give a classmate the same task in A and B and record whether they found the size guide, the full total, and the confirmation | Same task                                                                                   |

### User stories, features, and checks (same in A and B)

| ID  | Story                                                                                         | Essential feature                                                                                                         | Check (someone else can tell if it passes)                                                                                                                                                                                                                              |
| --- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | As a student unsure about fit, I want measurements next to the sizes so I pick the right one. | F1: a size guide button next to S/M/L/XL that opens the chest and length for each size                                    | Open the guide, close it, and the size I already picked is still selected                                                                                                                                                                                               |
| S2  | As a student on a budget, I want the full total before I check out so there's no surprise.    | F2: quantity 1–5 and a summary showing price × quantity, a demo shipping line, and the total                              | Pick M and quantity 2: the summary shows M, 2 × $28 = $56, a shipping line, and the total before the checkout button                                                                                                                                                    |
| S3  | As a shopper, I want a clear confirmation so I know the demo order went through.              | F3: a demo checkout form (size + a fake email) that gives a demo order number                                             | With no size or a bad email, nothing is saved and an error shows. With valid info, a confirmation with an order number shows                                                                                                                                            |
| S4  | As the store owner, I want orders saved in a real database so they're still there later.      | F4: a local Node server that saves each order in **SQLite** and works out the total from its own price, not the browser's | Make an order, stop the server, start it again, and the same order number is still in "Demo order history". A request with quantity 0 or 6, or a changed price, is rejected with an error and nothing is saved; the saved total always uses the server's $28 price (#7) |

**Keep from before:** the size buttons keep their visible keyboard outline (issue #5 test).

**Deferred (not building):** real payments, accounts, discount codes, reviews, and stock counts.

### Data, states, and limits

- **Inputs:** size (S, M, L, XL), quantity 1–5, and a fake email like `demo@example.test`. The email is checked but **not** saved. The server **rejects** anything outside these values with an error. It does not change or clamp them (decided in #7).
- **Data:** price, size measurements, and orders. In local server mode, orders go in SQLite. The public GitHub Pages preview can't run a database, so it uses browser storage and will say so on the page.
- **States:** size missing → error · ready to check out · saving · confirmation with order number · save failed → error, with no fake success message.
- **SQLite plan:** start from the course's Campus Cotton SQLite starter (`server.mjs` with Node 24's built-in `node:sqlite`). I'll change the product name, price ($28), and look to Full Shift and explain each change. My computer has Node 24.
- **Limits:** Full Shift is fictional. The size measurements will be class assumptions, not real garment data, and will be labeled that way.

### Build first, save for later

- **Build first:** S2 (full total) and S3 (demo checkout). My research found surprise costs were the biggest problem, so the total has to work before anything else.
- **Save for later:** a "Clear demo orders" button. For now, demo orders can be cleared in the browser's site settings (see Hosting and browser storage).

### React idea from the documentary

The documentary ([React.js: The Documentary](https://www.youtube.com/watch?v=8pDqJVdNa44)) is about how a small team at Facebook built React around one idea: **build the page from small, reusable pieces (components), and let the page update itself when a value (state) changes.**

**On my site:**

- **Components:** the size picker, the quantity box, and the "Your total" summary are separate pieces of the page.
- **State:** the selected size and the quantity. When a shopper picks **M** and changes quantity to **2**, those two values change, and the summary updates on its own to show **2 × $28.00 = $56.00**. Nobody has to reload or click "calculate."
- **What the page shows when state changes:** no size picked → "Not chosen" in the summary and an error if they try to check out. Size picked → the summary shows that size and the new total.

### Framework and libraries

I asked AI (Claude) to compare two frameworks for my main task: pick a size, see the total, and place a demo order on GitHub Pages.

|                                | Next.js                                                            | SvelteKit                                                 |
| ------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------- |
| Static build for GitHub Pages  | `output: 'export'` in `next.config.js`                             | `adapter-static`, with `paths.base` set to the repo name  |
| What can't run on GitHub Pages | Anything that needs a server, like Server Actions and cookies      | Same idea: pages must be prerendered, with no server code |
| Fit for my site                | Uses React, the same component and state idea from the documentary | Also uses components, with less code                      |

- **My choice: Next.js with static export.** It's built on React, so I can use the documentary's idea directly: a `SizePicker` component and an `OrderSummary` component that share the selected size and quantity as state. Everything in my main task runs in the browser, so it works as a static export.
- **One tradeoff:** a static export can't run server code, so my **SQLite** order saving can't run on GitHub Pages. The public demo saves orders in the browser, and the separate local `server.mjs` keeps the SQLite version for `npm run dev`.
- **AI claim I checked:** AI said a Next.js static export can't use Server Actions. **Checked Nov 20 in the official [Next.js static export docs](https://nextjs.org/docs/app/guides/static-exports):** "Server Actions" and "Cookies" are listed under "Unsupported Features." ✅ True.
- **Libraries:** none planned. The browser already does form validation (`required`, `type="email"`) and storage (`localStorage`), and Node already includes SQLite (`node:sqlite`).
- **Right now:** the current Build is plain HTML, CSS, and JavaScript, and it already works and passes its tests. Moving it into Next.js components is the next Build step.

### Hosting and browser storage

- **Hosting:** GitHub Pages, at https://konradsikorski5.github.io/is117-brand-studio-ks2334/ (published, and links and images checked from the public URL).
- **What the demo saves (in `localStorage`, key `full-shift-demo-orders`):** the fake order reference (like FS-857C81), the size, the quantity, and the total. Up to 20 orders.
- **After a reload in the same browser:** the order reference and total are still in "Demo order history." **Check:** place a fake order, reload, and the same reference and total are still listed.
- **How to clear it:** delete the site's data in the browser (Settings → Privacy → site data, or DevTools → Application → Local Storage → delete `full-shift-demo-orders`). A "Clear demo orders" button is saved for later.
- **Optional research:** Shopify could run a real store, Stripe could take real payments, and Vercel could host a Next.js app with server code. **For class: fake orders only, no real payment or customer details.**

### Mobile, accessibility, and privacy

**Task for every check:** buy 2 shirts in size M with a fake email.

- **Keyboard check:** do the whole task with only Tab, Shift+Tab, Enter, Space, and the arrow keys. **Passes if** every focused control has a visible outline (the size buttons use a 3px outline), the order goes through, and nothing needs a mouse.
- **Phone-layout check:** do the whole task on a phone, or at 375px wide in the browser. **Passes if** text is readable without zooming, the size buttons are easy to tap, and nothing runs off the screen (no sideways scrolling).
- **How I'll protect private data:** the demo uses **demo data only**. It saves just the order reference, size, quantity, and total. The email is checked but **never saved or sent**, and no real payment or customer information is collected. Orders stay in the visitor's own browser and can be cleared in site settings. Before collecting real data, I'd research what I actually need, how I'd explain it, and when I'd delete it (data minimization, an EU data-protection principle).
- **One mistake and recovery:** a shopper clicks "Place demo order" without picking a size. The site shows "Choose a size before placing your demo order." and moves focus to the size buttons. Nothing is saved.
- **Images and fonts:** the shirt image (`white-shirt.svg`) came with the course template (MIT license). I made the logo (`full-shift-logo.svg`) in BRAND-001. Fonts are system fonts already on the visitor's device (Impact and system-ui), so no font files are downloaded.

### Search, sharing, and one measure

- **Page title:** "Full Shift — the white T-shirt for class-to-shift days" (already on the page).
- **Description:** "One plain white tee for students who go from class straight to a shift. Pick your size and see the full price before you check out."
- **Channel:** Instagram, where my audience (college students) already is.
- **Sample post:** "Class at 9, shift at 3? One white tee for the whole day. Check your size and see the full price up front 👕 link in bio"
- **Link preview sketch:** title "Full Shift — one tee, class to closing" · description "See your size and full price before you check out." · image: the white shirt on the yellow background.
- **After they click:** pick a size and place a demo order.
- **Usage measure:** **checkout completion**, meaning out of the visitors who open the store, how many reach the order confirmation. If many start but few finish, something in the checkout is confusing.
- **Tool:** [GoatCounter](https://www.goatcounter.com/), a free alternative to Google Analytics. Its site says it doesn't track personal data, doesn't use cookies to count visits, and probably doesn't need a GDPR consent notice. That fits my privacy plan better than Google Analytics. It can count an "event," so I'd count page views of the store and one "order confirmed" event. **Not installed** (the plan doesn't require tracking).
- **Classmate version of the same measure:** ask a classmate to start the demo checkout and watch whether they reach the confirmation without help. Note where they hesitate or get stuck.

### Partner review: feedback and what I revised

| Review                                                                                                   | Feedback from Safwaan                                                                                                                                                                                                 | What I revised                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#7](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/7), first plan                  | Explained story S2 back correctly ([comment](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/7#issuecomment-6902945621)). Asked: what if quantity is over 5, or the price is changed in DevTools? | Decided to **reject it with an error, not quietly change it**, and always use the server's own $28 price. Added to S4 and Inputs ([change](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/commit/6772bb5)), then built and tested it. Closed. |
| [#9](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/9), updated plan (Nov 23 rules) | Asked for Nov 24. He reviews the one small idea, the keyboard, phone, and privacy checks, and the usage measure                                                                                                       | **Waiting for his feedback.** I'll link it here with what I change                                                                                                                                                                                          |

**AI help:** I used Claude to organize this plan in the course format. The stories come from my own research and brand decisions, and I checked the facts against Research.md and this SPEC.

## Build

Built Nov 16, 2026, from the [Plan](#plan). The code was written with AI help (Claude). I chose the scope, and the checks below were actually run.

- **Version A, shop first:** [live](https://konradsikorski5.github.io/is117-brand-studio-ks2334/) · `public/index.html`
- **Version B, your day first:** [live](https://konradsikorski5.github.io/is117-brand-studio-ks2334/b.html) · `public/b.html`
- **Shared code:** `public/shop.js` (size guide, total, checkout, history) · `server.mjs` (SQLite orders) · `public/styles.css`

Both versions have the same shirt, price, headline, size guide, and checkout. Only the order changes: A puts price and sizes first, and B puts "Is this your day?" first.

### What each story does now

| Story            | Built                                                                                                                                                       | Automated check (passes)                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| S1 size guide    | "Size guide (chest and length)" opens a table next to the sizes. Measurements are labeled as class assumptions                                              | Pick L, open and close the guide, and L is still picked                                                                                       |
| S2 full total    | Quantity 1–5 and a "Your total" box with size, shirts, demo shipping ($0.00), and total                                                                     | M and quantity 2 shows "2 × $28.00 = $56.00" and a total of $56.00, on both A and B                                                           |
| S3 demo checkout | Fake email plus "Place demo order". Errors show for no size or a bad email                                                                                  | No size or a bad email shows an error and saves nothing. A valid order shows an FS- order number                                              |
| S4 SQLite        | `server.mjs` saves orders in SQLite and uses its own $28 price. Quantity outside 1–5, a bad size, or a bad email returns an error and nothing is saved (#7) | A server test sends price $1 and gets total $56.00. Quantities 0, 6, and 2.5 are rejected. An order is still listed after the server restarts |

### How to run it

```bash
npm ci
npm run dev
```

Open the printed address. The page says **"Local server mode: orders are saved in a SQLite database."** The terminal prints where the database file is. On GitHub Pages there's no server, so the page says it's in **preview mode** and saves orders in the browser only.

### Checks I ran (Nov 16)

- `npm run lint` passes. `npm test`: 10 of 10 server tests pass. `npx playwright test`: 15 of 15 browser tests pass, including axe accessibility on A and B and the narrow-screen check.
- **The tests can actually fail:** I changed the price to $27 and allowed quantity 6, and 2 server tests failed. Then I put it back.
- **By hand, in a real browser:** picked M and quantity 2, saw $56.00, and placed a demo order. It showed "Demo order FS-1AF886 … Saved in SQLite." I stopped the server, started it again, and `/api/orders` still listed FS-1AF886.

### Classmate A/B test (pending)

**Task:** "Buy 2 shirts in size M with a fake email and tell me the order number." Do it on A, then B, with no help.

| Version | Found size guide? | Saw full total before checkout? | Got an order number? | Notes                                                   |
| ------- | ----------------- | ------------------------------- | -------------------- | ------------------------------------------------------- |
| A       | Not tested yet    | Not tested yet                  | Not tested yet       | Not done yet. Planned in class before Build (due Dec 3) |
| B       | Not tested yet    | Not tested yet                  | Not tested yet       | Not done yet. Planned in class before Build (due Dec 3) |

**Launch choice:** not decided. I'll pick A or B after the classmate test, based on which one got through the task more easily, and write the reason here.

## Later

No follow-up is selected. After keeping `BRAND-001`, choose one next cycle: perhaps a brand story, a supported fit guide, or richer demo-bag behavior.
