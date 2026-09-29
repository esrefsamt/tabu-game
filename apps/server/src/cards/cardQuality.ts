import type { TabuCard } from "@tabu/shared";
import { normalizeCardText } from "./validateCards.js";
import { CARD_MULTIWORD_EXCEPTIONS } from "./cardWordExceptions.js";
import { classifyCardDifficulty, POTENTIALLY_DIFFICULT_CARDS, type CardDifficulty } from "./cardFamiliarity.js";

export interface CardQualityReport {
  total: number;
  singleWordMainWordCount: number;
  twoWordMainWordCount: number;
  longerMainWordCount: number;
  longerProperNameOrTitleCount: number;
  multiWordMainWordCount: number;
  difficultyCounts: Record<CardDifficulty, number>;
  potentiallyTooObscure: { category: string; id: string; word: string; reason: string }[];
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
  let singleWordMainWordCount = 0;
  let twoWordMainWordCount = 0;
  let longerMainWordCount = 0;
  let longerProperNameOrTitleCount = 0;
  const difficultyCounts: Record<CardDifficulty, number> = { easy: 0, medium: 0, difficult: 0 };
  const potentiallyTooObscure: CardQualityReport["potentiallyTooObscure"] = [];
  const cards = Object.entries(categories).flatMap(([category, entries]) => {
    categoryCounts[category] = entries.length;
    return entries.map((card) => ({ card, category }));
  });

  for (const { card, category } of cards) {
    const idKey = card.id.trim().toLowerCase();
    if (ids.has(idKey)) duplicateIds.push(`${ids.get(idKey)} / ${card.id}`);
    ids.set(idKey, card.id);

    const wordKey = normalizeCardText(card.word);
    const tokenCount = wordKey.split(" ").length;
    if (tokenCount === 1) singleWordMainWordCount += 1;
    else if (tokenCount === 2) twoWordMainWordCount += 1;
    else {
      longerMainWordCount += 1;
      if (CARD_MULTIWORD_EXCEPTIONS[card.id]) longerProperNameOrTitleCount += 1;
    }
    difficultyCounts[classifyCardDifficulty(category, card)] += 1;
    const familiarityReason = POTENTIALLY_DIFFICULT_CARDS[card.id];
    if (familiarityReason) potentiallyTooObscure.push({
      category, id: card.id, word: card.word, reason: familiarityReason
    });
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

  return {
    total: cards.length,
    singleWordMainWordCount,
    twoWordMainWordCount,
    longerMainWordCount,
    longerProperNameOrTitleCount,
    multiWordMainWordCount: twoWordMainWordCount + longerMainWordCount,
    difficultyCounts,
    potentiallyTooObscure,
    categoryCounts,
    duplicateIds,
    duplicateWords,
    invalidForbiddenWords,
    suspiciousNearDuplicates
  };
}
