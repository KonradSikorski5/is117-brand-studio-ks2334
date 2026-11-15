"use strict";

// Shared by Version A (index.html) and Version B (b.html).
(() => {
  const form = document.querySelector("#order-form");
  if (!form) return;

  const PRICE_CENTS = 2800;
  const SHIPPING_CENTS = 0;
  const STORAGE_KEY = "full-shift-demo-orders";
  const sizes = ["S", "M", "L", "XL"];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const sizeError = document.querySelector("#size-error");
  const emailInput = document.querySelector("#email");
  const emailError = document.querySelector("#email-error");
  const quantityInput = document.querySelector("#quantity");
  const submitButton = form.querySelector('button[type="submit"]');
  const result = document.querySelector("#order-result");
  const history = document.querySelector("#order-history");
  const orderCount = document.querySelector("#order-count");
  const modeNote = document.querySelector("#mode-note");

  // "sqlite" when the local server answers, otherwise "browser" (GitHub Pages).
  let mode = "browser";

  const money = (cents) => `$${(cents / 100).toFixed(2)}`;
  const selectedSize = () =>
    form.querySelector('input[name="size"]:checked')?.value;

  const updateSummary = () => {
    const quantity = Number(quantityInput.value);
    const items = PRICE_CENTS * quantity;
    document.querySelector("#summary-size").textContent =
      selectedSize() ?? "Not chosen";
    document.querySelector("#summary-items").textContent =
      `${quantity} × ${money(PRICE_CENTS)} = ${money(items)}`;
    document.querySelector("#summary-shipping").textContent =
      money(SHIPPING_CENTS);
    document.querySelector("#summary-total").textContent = money(
      items + SHIPPING_CENTS,
    );
  };

  const readBrowserOrders = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  };

  const renderHistory = (orders) => {
    orderCount.textContent = String(orders.length);
    history.replaceChildren(
      ...orders.map((order) => {
        const item = document.createElement("li");
        item.textContent = `${order.reference} · Size ${order.size} · ${order.quantity} × white T-shirt · ${money(order.total_cents)}`;
        return item;
      }),
    );
  };

  const loadHistory = async () => {
    if (mode === "sqlite") {
      const response = await fetch("api/orders");
      renderHistory((await response.json()).orders);
    } else {
      renderHistory(readBrowserOrders());
    }
  };

  const saveOrder = async (order) => {
    if (mode === "sqlite") {
      const response = await fetch("api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "The server said no.");
      return body;
    }
    const saved = {
      reference: `FS-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
      size: order.size,
      quantity: order.quantity,
      total_cents: PRICE_CENTS * order.quantity + SHIPPING_CENTS,
    };
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([saved, ...readBrowserOrders()].slice(0, 20)),
    );
    return saved;
  };

  const showErrors = (size, email) => {
    sizeError.hidden = Boolean(size);
    form.querySelectorAll('input[name="size"]').forEach((input) => {
      if (size) input.removeAttribute("aria-invalid");
      else input.setAttribute("aria-invalid", "true");
    });
    const emailOk = emailPattern.test(email);
    emailError.hidden = emailOk;
    if (emailOk) emailInput.removeAttribute("aria-invalid");
    else emailInput.setAttribute("aria-invalid", "true");
    if (!size) form.querySelector('input[name="size"]').focus();
    else if (!emailOk) emailInput.focus();
    return Boolean(size) && emailOk;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const size = selectedSize();
    const email = emailInput.value.trim();
    if (!showErrors(size, email) || !sizes.includes(size)) {
      result.textContent = "";
      return;
    }
    const order = { size, quantity: Number(quantityInput.value), email };
    submitButton.disabled = true;
    result.textContent = "Saving your demo order…";
    try {
      const saved = await saveOrder(order);
      result.textContent = `Demo order ${saved.reference} placed: size ${saved.size}, ${saved.quantity} × white T-shirt, total ${money(saved.total_cents)}. ${mode === "sqlite" ? "Saved in SQLite." : "Saved in this browser."}`;
      await loadHistory();
    } catch (error) {
      result.textContent = `Your order was not saved: ${error.message}`;
    } finally {
      submitButton.disabled = false;
    }
  });

  form.addEventListener("change", () => {
    if (selectedSize()) {
      sizeError.hidden = true;
      form.querySelectorAll('input[name="size"]').forEach((input) => {
        input.removeAttribute("aria-invalid");
      });
    }
    updateSummary();
  });

  updateSummary();
  fetch("api/health")
    .then((response) => (response.ok ? response.json() : null))
    .catch(() => null)
    .then((health) => {
      mode = health?.mode === "sqlite" ? "sqlite" : "browser";
      modeNote.textContent =
        mode === "sqlite"
          ? "Local server mode: orders are saved in a SQLite database."
          : "Preview mode: orders are saved in this browser only (no database on GitHub Pages).";
      return loadHistory();
    });
})();
