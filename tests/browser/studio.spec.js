import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const placeOrder = (page) =>
  page.getByRole("button", { name: "Place demo order", exact: true }).click();

test("negative: no size or a bad email shows an error and saves nothing (S3)", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#mode-note")).toContainText("SQLite");
  const before = await page.locator("#order-count").textContent();
  await placeOrder(page);
  await expect(page.locator("#size-error")).toBeVisible();
  await page.locator('input[name="size"][value="M"]').check();
  await page.getByLabel("Email (use a fake one)").fill("not-an-email");
  await placeOrder(page);
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#order-result")).toBeEmpty();
  await expect(page.locator("#order-count")).toHaveText(before);
});

test("size guide: opening and closing it keeps the chosen size (S1)", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('input[name="size"][value="L"]').check();
  const guide = page.getByText("Size guide (chest and length)");
  await guide.click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("row", { name: /^L 42–44 30$/ })).toBeVisible();
  await guide.click();
  await expect(page.locator('input[name="size"][value="L"]')).toBeChecked();
  await expect(page.locator("#summary-size")).toHaveText("L");
});

for (const route of ["/", "/b.html"]) {
  test(`positive: M and quantity 2 shows $56.00, then the order saves in SQLite (S2, S3, S4) ${route}`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("#mode-note")).toContainText("SQLite");
    await page.locator('input[name="size"][value="M"]').check();
    await page.getByLabel("Quantity").selectOption("2");
    await expect(page.locator("#summary-size")).toHaveText("M");
    await expect(page.locator("#summary-items")).toHaveText(
      "2 × $28.00 = $56.00",
    );
    await expect(page.locator("#summary-shipping")).toHaveText("$0.00");
    await expect(page.locator("#summary-total")).toHaveText("$56.00");
    await page.getByLabel("Email (use a fake one)").fill("demo@example.test");
    await placeOrder(page);
    const result = page.locator("#order-result");
    await expect(result).toContainText("Saved in SQLite.");
    await expect(result).toContainText("$56.00");
    const reference = (await result.textContent()).match(/FS-[0-9A-F]{6}/)[0];
    await page.reload();
    await expect(page.locator("#order-history")).toContainText(reference);
  });
}

test("keyboard: the skip link reaches main and the size controls work without a mouse", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip/i });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  // Focus a native radio, then use its real keyboard behavior and the next control.
  await page.locator('input[name="size"][value="S"]').focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('input[name="size"][value="M"]')).toBeChecked();
  await page.keyboard.press("Tab");
  await expect(page.getByText("Size guide (chest and length)")).toBeFocused();
  await expect(page.locator("#summary-size")).toHaveText("M");
});

test("keyboard: a focused size option shows a visible outline (#5)", async ({
  page,
}) => {
  await page.goto("/");
  // Reach the sizes with real keys: the orders link comes right before them.
  await page.getByRole("link", { name: "View demo orders" }).focus();
  await page.keyboard.press("Tab");
  for (const size of ["S", "M"]) {
    const radio = page.locator(`input[name="size"][value="${size}"]`);
    await expect(radio).toBeFocused();
    const outline = await radio.evaluate((input) => {
      const style = getComputedStyle(input.nextElementSibling);
      return {
        style: style.outlineStyle,
        width: parseFloat(style.outlineWidth),
      };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);
    await page.keyboard.press("ArrowRight");
  }
});

for (const route of ["/", "/b.html", "/styleguide.html", "/studio.html"]) {
  test(`page integrity and automated accessibility: ${route}`, async ({
    page,
  }) => {
    const failures = [];
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("response", (response) => {
      if (
        response.url().startsWith("http://127.0.0.1:5174") &&
        response.status() >= 400
      ) {
        failures.push(`${response.status()} ${response.url()}`);
      }
    });
    await page.goto(route);
    await expect(page.getByRole("main")).toBeVisible();
    const brokenImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.src),
      );
    expect(brokenImages).toEqual([]);
    const links = await page
      .locator("a[href]")
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")),
      );
    for (const href of links) {
      if (href.startsWith("#")) {
        expect(
          await page.locator(`[id="${href.slice(1)}"]`).count(),
          href,
        ).toBeGreaterThan(0);
      } else if (!/^(https?:|mailto:)/.test(href)) {
        const response = await page.request.get(new URL(href, page.url()).href);
        expect(response.ok(), href).toBeTruthy();
      }
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(failures).toEqual([]);
  });

  test(`narrow screen: readable page without horizontal overflow ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.getByRole("main")).toBeVisible();
  });
}
