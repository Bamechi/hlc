import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the High-Lvl Conversations experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>High-Lvl Conversations with 19Keys<\/title>/i);
  assert.match(html, /Season 5 \/ The future is in session/);
  assert.match(html, /Ask the Archive/);
  assert.match(html, /Follow your curiosity/);
  assert.match(html, /Pre-order for \$88/);
  assert.match(html, /Sponsor and product placement/i);
  assert.match(html, /Apply to be on the show/i);
  assert.match(html, /ziion\.io\/nations\/high-lvl-nation/);
  assert.match(html, /ask\.19keys\.com/);
  assert.match(html, /open\.spotify\.com\/show\/2Xuv0FRgrJsN4Dl2QE0a9Y/);
  assert.match(html, /podcasts\.apple\.com\/us\/podcast\/19-keys-presents-high-level-conversations\/id1331519433/);
  assert.match(html, /iheart\.com\/podcast\/256-19-keys-presents-high-leve-43053795/);
  assert.doesNotMatch(html, />THE<br\s*\/>LEDGER</i);
  assert.match(html, /og:image/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("removes starter-only code and keeps production metadata", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /HlcExperience/);
  assert.match(layout, /High-Lvl Conversations with 19Keys/);
  assert.match(layout, /\/assets\/hlc-favicon\.png/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/assets/hero-keys-circle-v3.webp", import.meta.url));
  await access(new URL("../public/assets/season5-hero.webp", import.meta.url));
  await access(new URL("../public/fonts/Antonio-Bold.ttf", import.meta.url));
  assert.ok(templateRoot);
});
