import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import CategorySelector from "./CategorySelector";
import { categorySummary } from "../lib/categories";
import { isSoundEnabled, playSound, setSoundEnabled } from "../lib/sound";

test("category selector shows ten compact options for host and read-only summary for guest", () => {
  const selection = { mode: "CUSTOM" as const, categories: ["FOOD" as const, "SPORTS" as const] };
  const host = renderToStaticMarkup(createElement(CategorySelector, { selection, isHost: true, pending: false, onChange: () => {} }));
  assert.equal((host.match(/class="category-tile/g) ?? []).length, 10);
  assert.ok(host.includes("Özelleştir"));
  assert.ok(host.includes("aria-pressed=\"true\""));
  const guest = renderToStaticMarkup(createElement(CategorySelector, { selection, isHost: false, pending: false, onChange: () => {} }));
  assert.ok(guest.includes("Spor &amp; Hobi"));
  assert.ok(guest.includes("Yeme &amp; İçme"));
  assert.equal(guest.includes("category-tile"), false);
  assert.equal(categorySummary({ mode: "GENERAL" }), "Genel");
});

test("sound preference can be muted locally and optional audio does not throw", () => {
  const before = isSoundEnabled();
  try {
    setSoundEnabled(false);
    assert.equal(isSoundEnabled(), false);
    playSound("correct");
    setSoundEnabled(true);
    assert.equal(isSoundEnabled(), true);
    playSound("win");
  } finally { setSoundEnabled(before); }
});
