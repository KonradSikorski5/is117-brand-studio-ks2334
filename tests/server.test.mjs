import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createApp } from "../server.mjs";

let app;
let base;
before(async () => {
  app = createApp();
  app.listen(0, "127.0.0.1");
  await once(app, "listening");
  base = `http://127.0.0.1:${app.address().port}`;
});
after(() => new Promise((resolve) => app.close(resolve)));

test("serves the storefront and shared stylesheet with useful MIME types", async () => {
  const page = await fetch(base);
  assert.equal(page.status, 200);
  assert.match(page.headers.get("content-type"), /text\/html/);
  const css = await fetch(`${base}/styles.css`);
  assert.equal(css.status, 200);
  assert.match(css.headers.get("content-type"), /text\/css/);
});

test("returns 404 for missing files and private project files", async () => {
  for (const url of [
    "/does-not-exist",
    "/.env",
    "/README.md",
    "/docs/assessment.md",
    "/%2e%2e%2fpackage.json",
    "/%2e%2e%5cpackage.json",
  ]) {
    assert.equal((await fetch(`${base}${url}`)).status, 404, url);
  }
});

test("rejects malformed paths and POST requests", async () => {
  assert.equal((await fetch(`${base}/%E0%A4%A`)).status, 400);
  const response = await fetch(base, { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, HEAD");
});

test("HEAD returns headers without downloading a page body", async () => {
  const response = await fetch(base, { method: "HEAD" });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "");
});

test("plain preview serves original HTML without development routes", async () => {
  const original = await readFile(
    new URL("../public/index.html", import.meta.url),
    "utf8",
  );
  assert.equal(await (await fetch(base)).text(), original);
  for (const route of ["/__dev/reload.js", "/__dev/events"]) {
    assert.equal((await fetch(`${base}${route}`)).status, 404);
  }
});

test("development injects its client into responses without changing saved HTML", async () => {
  const filename = new URL("../public/index.html", import.meta.url);
  const original = await readFile(filename, "utf8");
  const development = createApp({ development: true });
  development.listen(0, "127.0.0.1");
  await once(development, "listening");
  const address = `http://127.0.0.1:${development.address().port}`;
  try {
    const response = await fetch(address);
    assert.match(
      await response.text(),
      /<script src="\/__dev\/reload.js" defer><\/script>/,
    );
    const script = await fetch(`${address}/__dev/reload.js`);
    assert.match(script.headers.get("content-type"), /text\/javascript/);
    assert.match(await script.text(), /EventSource/);
    assert.equal(await readFile(filename, "utf8"), original);
    assert.equal((await fetch(`${address}/README.md`)).status, 404);
  } finally {
    await new Promise((resolve) => development.close(resolve));
  }
});

test("a symlink cannot expose a file outside the public directory", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "brand-studio-private-"));
  const publicRoot = path.join(directory, "public");
  const privateRoot = path.join(directory, "private");
  await mkdir(publicRoot);
  await mkdir(privateRoot);
  await writeFile(path.join(privateRoot, "notes.txt"), "private project notes");
  await symlink(privateRoot, path.join(publicRoot, "leak"), "junction");
  const isolated = createApp({ publicRoot });
  isolated.listen(0, "127.0.0.1");
  await once(isolated, "listening");
  try {
    assert.equal(
      (
        await fetch(
          `http://127.0.0.1:${isolated.address().port}/leak/notes.txt`,
        )
      ).status,
      404,
    );
  } finally {
    await new Promise((resolve) => isolated.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
});

// Orders API (Plan S3/S4). Each test uses its own throwaway SQLite file.
async function startOrdersApp(databasePath) {
  const ordersApp = createApp({ databasePath });
  ordersApp.listen(0, "127.0.0.1");
  await once(ordersApp, "listening");
  return {
    url: `http://127.0.0.1:${ordersApp.address().port}`,
    close: () => new Promise((resolve) => ordersApp.close(resolve)),
  };
}

const postOrder = (url, body) =>
  fetch(`${url}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("orders: a valid order is saved with the server's price, not the browser's", async () => {
  const folder = await mkdtemp(path.join(tmpdir(), "full-shift-"));
  const server = await startOrdersApp(path.join(folder, "orders.sqlite"));
  try {
    const health = await (await fetch(`${server.url}/api/health`)).json();
    assert.equal(health.mode, "sqlite");
    const response = await postOrder(server.url, {
      size: "M",
      quantity: 2,
      email: "demo@example.test",
      price: 1,
      total_cents: 1,
    });
    assert.equal(response.status, 201);
    const saved = await response.json();
    assert.match(saved.reference, /^FS-[0-9A-F]{6}$/);
    assert.equal(saved.total_cents, 5600);
    assert.equal(saved.unit_price_cents, 2800);
    assert.equal("email" in saved, false);
    const list = await (await fetch(`${server.url}/api/orders`)).json();
    assert.equal(list.orders.length, 1);
    assert.equal(list.orders[0].reference, saved.reference);
    assert.equal(JSON.stringify(list).includes("example.test"), false);
  } finally {
    await server.close();
    await rm(folder, { recursive: true, force: true });
  }
});

test("orders: bad size, quantity, or email is rejected and nothing is saved (#7)", async () => {
  const folder = await mkdtemp(path.join(tmpdir(), "full-shift-"));
  const server = await startOrdersApp(path.join(folder, "orders.sqlite"));
  try {
    for (const bad of [
      { quantity: 1, email: "demo@example.test" },
      { size: "XXL", quantity: 1, email: "demo@example.test" },
      { size: "M", quantity: 0, email: "demo@example.test" },
      { size: "M", quantity: 6, email: "demo@example.test" },
      { size: "M", quantity: 2.5, email: "demo@example.test" },
      { size: "M", quantity: 1, email: "not-an-email" },
    ]) {
      const response = await postOrder(server.url, bad);
      assert.equal(response.status, 400, JSON.stringify(bad));
      assert.ok((await response.json()).error);
    }
    const notJson = await fetch(`${server.url}/api/orders`, {
      method: "POST",
      body: "size=M",
    });
    assert.equal(notJson.status, 400);
    const list = await (await fetch(`${server.url}/api/orders`)).json();
    assert.equal(list.orders.length, 0);
  } finally {
    await server.close();
    await rm(folder, { recursive: true, force: true });
  }
});

test("orders: a saved order is still there after the server restarts (S4)", async () => {
  const folder = await mkdtemp(path.join(tmpdir(), "full-shift-"));
  const databasePath = path.join(folder, "orders.sqlite");
  try {
    const first = await startOrdersApp(databasePath);
    const saved = await (
      await postOrder(first.url, {
        size: "L",
        quantity: 1,
        email: "demo@example.test",
      })
    ).json();
    await first.close();
    const second = await startOrdersApp(databasePath);
    const list = await (await fetch(`${second.url}/api/orders`)).json();
    await second.close();
    assert.deepEqual(
      list.orders.map((order) => order.reference),
      [saved.reference],
    );
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});
