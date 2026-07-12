import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { filterPalindromes, parsePalindromes } from "../docs/app.js";

test("parsePalindromes removes blank lines and normalizes line endings", () => {
  assert.deepEqual(parsePalindromes(" anna \r\n\nRoma\n"), ["anna", "Roma"]);
});

test("filterPalindromes matches Italian text without changing the source data", () => {
  const palindromes = ["Osiride è di riso", "Sator arepo tenet opera rotas"];

  assert.deepEqual(filterPalindromes(palindromes, "È DI"), ["Osiride è di riso"]);
  assert.deepEqual(palindromes, ["Osiride è di riso", "Sator arepo tenet opera rotas"]);
});

test("the canonical collection can be parsed without blank records", async () => {
  const data = await readFile(new URL("../docs/data/palindromes.txt", import.meta.url), "utf8");

  assert.equal(parsePalindromes(data).length, 1226);
});

test("the client renderer never interpolates collection data as HTML", async () => {
  const source = await readFile(new URL("../docs/app.js", import.meta.url), "utf8");

  assert.doesNotMatch(source, /innerHTML/);
  assert.match(source, /textContent = palindrome/);
});
