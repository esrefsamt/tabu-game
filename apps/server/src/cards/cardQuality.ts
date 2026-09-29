import type { TabuCard } from "@tabu/shared";
import { normalizeCardText } from "./validateCards.js";

export interface CardQualityReport {
  total: number;
  categoryCounts: Record<string, number>;
  duplicateIds: string[];
  duplicateWords: string[];
  invalidForbiddenWords: string[];
  suspiciousNearDuplicates: string[];
}

function isCloseSpelling(left: string, right: string): boolean {
  if (left === right) return false;
  const a = left.replaceAll(" ", "");
  const b = right.replaceAll(" ", "");
  if (a === b) return true;
  if (Math.min(a.length, b.length) < 6 || Math.abs(a.length - b.length) > 1) return false;
  // One insertion, deletion or substitution. Semantic variants remain for review.
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else { i++; j++; }
  }
  return edits + Number(i < a.length || j < b.length) <= 1;
}

export function inspectCardQuality(categories: Record<string, readonly TabuCard[]>): CardQualityReport {
  const categoryCounts: Record<string, number> = {};
  const duplicateIds: string[] = [];
  const duplicateWords: string[] = [];
  const invalidForbiddenWords: string[] = [];
  const suspiciousNearDuplicates: string[] = [];
  const ids = new Map<string, string>();
  const words = new Map<string, string>();
  const cards = Object.entries(categories).flatMap(([category, entries]) => {
    categoryCounts[category] = entries.length;
    return entries;
  });

  for (const card of cards) {
    const idKey = card.id.trim().toLowerCase();
    if (ids.has(idKey)) duplicateIds.push(`${ids.get(idKey)} / ${card.id}`);
    ids.set(idKey, card.id);

    const wordKey = normalizeCardText(card.word);
    if (words.has(wordKey)) duplicateWords.push(`${words.get(wordKey)} / ${card.word}`);
    words.set(wordKey, card.word);

    const forbidden = new Set<string>();
    if (card.forbiddenWords.length !== 5) invalidForbiddenWords.push(`${card.id}: count ${card.forbiddenWords.length}`);
    for (const entry of card.forbiddenWords) {
      const key = normalizeCardText(entry);
      if (!key || key === wordKey || forbidden.has(key)) invalidForbiddenWords.push(`${card.id}: ${entry}`);
      forbidden.add(key);
    }
  }

  const signatures = new Map<string, Set<string>>();
  const wordNames = new Map<string, string>();
  for (const [key, display] of words) {
    const compact = key.replaceAll(" ", "");
    wordNames.set(compact, display);
    for (let index = -1; index < compact.length; index++) {
      const signature = index === -1 ? compact : compact.slice(0, index) + compact.slice(index + 1);
      const candidates = signatures.get(signature) ?? new Set<string>();
      candidates.add(compact);
      signatures.set(signature, candidates);
    }
  }
  const pairs = new Set<string>();
  for (const candidates of signatures.values()) {
    const entries = [...candidates];
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const left = entries[i]!;
        const right = entries[j]!;
        if (!isCloseSpelling(left, right)) continue;
        const pair = [left, right].sort().join("\0");
        pairs.add(pair);
      }
    }
  }
  for (const pair of pairs) {
    const [left, right] = pair.split("\0");
    if (left && right) suspiciousNearDuplicates.push(`${wordNames.get(left)} / ${wordNames.get(right)}`);
  }

  return { total: cards.length, categoryCounts, duplicateIds, duplicateWords, invalidForbiddenWords, suspiciousNearDuplicates };
}
