import type { TabuCard } from "@tabu/shared";

// Turkish locale keeps I/ı and İ/i distinct; punctuation and spacing do not
// create a second playable concept.
export function normalizeCardText(value: string): string {
  return value.normalize("NFKC").trim().toLocaleLowerCase("tr-TR")
    .replace(/[\p{P}\p{S}]+/gu, " ")
    .replace(/\s+/gu, " ").trim();
}

export function validateCards(cards: unknown): asserts cards is readonly TabuCard[] {
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error("Tabu card collection must be a non-empty array.");
  }

  const ids = new Set<string>();
  const words = new Map<string, string>();
  for (const [index, candidate] of cards.entries()) {
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) {
      throw new Error(`Tabu card at index ${index} must be an object.`);
    }

    const record = candidate as Record<string, unknown>;
    if (typeof record.id !== "string" || record.id.trim().length === 0) {
      throw new Error(`Tabu card at index ${index} must have a non-empty ID.`);
    }
    const normalizedId = record.id.trim().toLowerCase();
    if (ids.has(normalizedId)) {
      throw new Error(`Duplicate Tabu card ID: ${record.id}.`);
    }
    ids.add(normalizedId);

    if (typeof record.word !== "string" || record.word.trim().length === 0) {
      throw new Error(`Tabu card ${record.id} must have a non-empty main word.`);
    }
    const normalizedMain = normalizeCardText(record.word);
    if (!normalizedMain) {
      throw new Error(`Tabu card ${record.id} must have a non-empty main word.`);
    }
    const existing = words.get(normalizedMain);
    if (existing) {
      throw new Error(`Duplicate Tabu main word: ${record.word} (${existing}, ${record.id}).`);
    }
    words.set(normalizedMain, record.id);
    if (!Array.isArray(record.forbiddenWords) || record.forbiddenWords.length !== 5) {
      throw new Error(`Tabu card ${record.id} must have exactly 5 forbidden words.`);
    }

    const forbiddenWords = new Set<string>();
    for (const forbiddenWord of record.forbiddenWords) {
      if (typeof forbiddenWord !== "string" || forbiddenWord.trim().length === 0) {
        throw new Error(`Tabu card ${record.id} must have non-empty forbidden words.`);
      }

      const normalizedWord = normalizeCardText(forbiddenWord);
      if (!normalizedWord) {
        throw new Error(`Tabu card ${record.id} must have non-empty forbidden words.`);
      }
      if (normalizedWord === normalizedMain) {
        throw new Error(`Tabu card ${record.id} repeats its main word as a forbidden word.`);
      }
      if (forbiddenWords.has(normalizedWord)) {
        throw new Error(`Tabu card ${record.id} has a duplicate forbidden word: ${forbiddenWord}.`);
      }
      forbiddenWords.add(normalizedWord);
    }
  }
}
