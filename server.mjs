import { createServer } from "node:http";
import { readFile, realpath } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomBytes } from "node:crypto";
import { tmpdir } from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createDevelopmentReload } from "./dev-reload.mjs";

// Demo prices live on the server, so a changed price in the browser is ignored.
export const SHIRT_PRICE_CENTS = 2800;
export const SHIPPING_CENTS = 0;
const sizes = ["S", "M", "L", "XL"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultDatabase =
  process.env.FULLSHIFT_DB ?? path.join(tmpdir(), "full-shift-orders.sqlite");

export function openOrders(databasePath = defaultDatabase) {
  const db = new DatabaseSync(databasePath);
  db.exec(`CREATE TABLE IF NOT EXISTS orders (
    reference TEXT PRIMARY KEY,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price_cents INTEGER NOT NULL,
    shipping_cents INTEGER NOT NULL,
    total_cents INTEGER NOT NULL,
    created_at TEXT NOT NULL
  )`);
  return db;
}

// Returns an error message, or null when the order is valid.
export function validateOrder(order) {
  if (!order || typeof order !== "object") return "Send the order as JSON.";
  if (!sizes.includes(order.size)) return "Choose a size: S, M, L, or XL.";
  if (
    !Number.isInteger(order.quantity) ||
    order.quantity < 1 ||
    order.quantity > 5
  ) {
    return "Quantity must be a whole number from 1 to 5.";
  }
  if (typeof order.email !== "string" || !emailPattern.test(order.email)) {
    return "Enter an email like demo@example.test.";
  }
  return null;
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let text = "";
  for await (const chunk of request) {
    text += chunk;
    if (text.length > 10_000) throw new Error("Order is too large.");
  }
  return JSON.parse(text);
}

async function handleOrders(request, response, getDb) {
  if (request.method === "GET") {
    const rows = getDb()
      .prepare(
        "SELECT reference, size, quantity, total_cents, created_at FROM orders ORDER BY created_at DESC LIMIT 20",
      )
      .all();
    sendJson(response, 200, { orders: rows });
    return;
  }
  if (request.method !== "POST") {
    response.writeHead(405, { Allow: "GET, POST" });
    response.end();
    return;
  }
  let order;
  try {
    order = await readJson(request);
  } catch {
    sendJson(response, 400, { error: "Send the order as JSON." });
    return;
  }
  const problem = validateOrder(order);
  if (problem) {
    sendJson(response, 400, { error: problem });
    return;
  }
  // The email is checked above but never stored or sent anywhere.
  const saved = {
    reference: `FS-${randomBytes(3).toString("hex").toUpperCase()}`,
    size: order.size,
    quantity: order.quantity,
    unit_price_cents: SHIRT_PRICE_CENTS,
    shipping_cents: SHIPPING_CENTS,
    total_cents: SHIRT_PRICE_CENTS * order.quantity + SHIPPING_CENTS,
    created_at: new Date().toISOString(),
  };
  getDb()
    .prepare(
      "INSERT INTO orders (reference, size, quantity, unit_price_cents, shipping_cents, total_cents, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .run(...Object.values(saved));
  sendJson(response, 201, saved);
}

const publicDirectory = path.resolve(
  fileURLToPath(new URL("./public/", import.meta.url)),
);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
};

// Local server only. GitHub Pages serves the unchanged public/ files and has
// no /api routes, so the page falls back to browser storage there.
export function createApp({
  development = false,
  publicRoot = publicDirectory,
  databasePath = defaultDatabase,
} = {}) {
  const reload = development ? createDevelopmentReload(publicRoot) : undefined;
  let db;
  const getDb = () => (db ??= openOrders(databasePath));
  const app = createServer(async (request, response) => {
    const apiPath = new URL(request.url, "http://localhost").pathname;
    if (apiPath === "/api/health") {
      sendJson(response, 200, { mode: "sqlite" });
      return;
    }
    if (apiPath === "/api/orders") {
      try {
        await handleOrders(request, response, getDb);
      } catch (error) {
        sendJson(response, 500, { error: `Order not saved: ${error.message}` });
      }
      return;
    }
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end("This demo serves files; it does not accept orders.");
      return;
    }
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      if (reload?.handle(pathname, request, response)) return;
      const segments = pathname.split("/");
      if (
        segments.some((segment) => segment.startsWith(".")) ||
        pathname.includes("\\") ||
        pathname.includes("\0")
      ) {
        response.writeHead(404);
        response.end("File not found");
        return;
      }
      const filename = path.resolve(
        publicRoot,
        `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`,
      );
      const resolvedRoot = await realpath(publicRoot);
      const resolvedFile = await realpath(filename);
      if (!resolvedFile.startsWith(`${resolvedRoot}${path.sep}`)) {
        response.writeHead(404);
        response.end("File not found");
        return;
      }
      const content = await readFile(resolvedFile);
      const servedContent =
        reload && path.extname(filename) === ".html"
          ? reload.inject(content)
          : content;
      response.writeHead(200, {
        "Content-Type":
          types[path.extname(filename)] ?? "application/octet-stream",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(request.method === "HEAD" ? undefined : servedContent);
    } catch (error) {
      response.writeHead(error instanceof URIError ? 400 : 404);
      response.end(
        error instanceof URIError ? "Invalid file path" : "File not found",
      );
    }
  });
  app.on("close", () => {
    reload?.close();
    db?.close();
  });
  return app;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const port = Number(process.env.PORT ?? 5173);
  const host = process.env.HOST ?? "127.0.0.1";
  const development = process.argv.includes("--dev");
  const app = createApp({ development });
  app.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Stop the other preview or choose another PORT.`,
      );
    } else {
      console.error(error.message);
    }
    process.exitCode = 1;
  });
  app.listen(port, host, () => {
    console.log(`Brand studio: http://${host}:${port}`);
    console.log(`Demo orders are saved in SQLite at ${defaultDatabase}`);
    console.log(
      development
        ? "Development mode: save public/ files to refresh the browser automatically."
        : "Plain preview mode: refresh the browser yourself after saving files.",
    );
    console.log(
      "Press Ctrl+C to stop. Local changes do not publish to GitHub Pages.",
    );
  });
}
