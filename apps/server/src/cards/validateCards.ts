import type { TabuCard } from "@tabu/shared";

export function validateCards(cards: unknown): asserts cards is readonly TabuCard[] {
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error("Tabu card collection must be a non-empty array.");
  }

  const ids = new Set<string>();
  for (const [index, candidate] of cards.entries()) {
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) {
      throw new Error(`Tabu card at index ${index} must be an object.`);
    }

    const record = candidate as Record<string, unknown>;
    if (typeof record.id !== "string" || record.id.trim().length === 0) {
      throw new Error(`Tabu card at index ${index} must have a non-empty ID.`);
    }
    if (ids.has(record.id)) {
      throw new Error(`Duplicate Tabu card ID: ${record.id}.`);
    }
    ids.add(record.id);

    if (typeof record.word !== "string" || record.word.trim().length === 0) {
      throw new Error(`Tabu card ${record.id} must have a non-empty main word.`);
    }
    if (!Array.isArray(record.forbiddenWords) || record.forbiddenWords.length !== 5) {
      throw new Error(`Tabu card ${record.id} must have exactly 5 forbidden words.`);
    }

    const forbiddenWords = new Set<string>();
    for (const forbiddenWord of record.forbiddenWords) {
      if (typeof forbiddenWord !== "string" || forbiddenWord.trim().length === 0) {
        throw new Error(`Tabu card ${record.id} must have non-empty forbidden words.`);
      }

      const normalizedWord = forbiddenWord.trim().toLocaleLowerCase("tr-TR");
      if (forbiddenWords.has(normalizedWord)) {
        throw new Error(`Tabu card ${record.id} has a duplicate forbidden word: ${forbiddenWord}.`);
      }
      forbiddenWords.add(normalizedWord);
    }
  }
}
