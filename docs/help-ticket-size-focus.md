# Help ticket: can keyboard users see which size is selected?

A write-up of one fix in the style of a support ticket. It comes from peer review issue [#5](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/issues/5).

## Problem

Reviewer question (issue #5): when someone shops with only the keyboard (Tab and Enter, no mouse), can they see which size option has focus?

**Impact:** if focus is invisible, a keyboard-only shopper can't tell which size they're on and may add the wrong size, or give up.

## Steps to reproduce

1. Run `npm run dev` in the repository and open the printed address (normally `http://127.0.0.1:5173`).
2. Click once on the page background, then press **Tab** until focus moves past "Demo bag" in the header.
3. Press **Tab** once more. Focus should be on size **S**.
4. Press the **Right arrow** key once.

## Expected result

- At step 3, a dark outline appears around **S**.
- At step 4, the outline and the selection move to **M**.

## Actual result (checked Nov 12, 2026)

It already worked. The outline is a solid 3px dark line, 4px outside the box (`public/styles.css`, rule `.size-option input:focus-visible + span`). Right arrow moved it from S to M, and Enter on "Add to demo bag" added the shirt.

## Fix

No visual change was needed. To keep it from breaking later, I added a browser test, `keyboard: a focused size option shows a visible outline (#5)`, in `tests/browser/studio.spec.js`. It was merged in [PR #6](https://github.com/KonradSikorski5/is117-brand-studio-ks2334/pull/6).

## How I checked

- Keyboard test in a real browser, following the steps above.
- `npm run check`: all browser tests pass locally and on GitHub.
- **I made sure the test can actually fail:** I removed the outline on purpose, the new test failed, and then I put the outline back.

## Reviewer retry

Follow only the steps above, without asking me anything. Record the result here:

| Reviewer        | Date | Got the expected result? | Notes |
| --------------- | ---- | ------------------------ | ----- |
| Not yet retried |      |                          |       |
