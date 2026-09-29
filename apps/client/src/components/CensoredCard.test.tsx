import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import CensoredCard from "./CensoredCard";

test("censored card renders six fixed placeholders without card data", () => {
  const markup = renderToStaticMarkup(createElement(CensoredCard));
  assert.equal((markup.match(/>\*{5}</g) ?? []).length, 6);
  assert.equal((markup.match(/<li>/g) ?? []).length, 5);
  assert.equal(markup.includes("Penguen"), false);
  assert.equal(markup.includes("Kutup"), false);
  assert.equal(markup.includes("cardVersion"), false);
});
