import type { TabuCard } from "@tabu/shared";

export interface CardGroup {
  /** Two associations shared by this narrow topic. */
  readonly common: readonly [string, string];
  /** One card per line: main word | three concept-specific forbidden words. */
  readonly rows: string;
}

function stableSlug(word: string): string {
  return word.trim().normalize("NFD").toLocaleLowerCase("tr-TR")
    .replace(/\p{M}/gu, "")
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export function defineCategory(category: string, groups: readonly CardGroup[]): readonly TabuCard[] {
  return groups.flatMap(({ common, rows }) => rows.trim().split("\n").filter(Boolean).map((line) => {
    const fields = line.split("|").map((field) => field.trim());
    if (fields.length !== 4) {
      throw new Error(`Card row in ${category} needs a word and three forbidden words: ${line}`);
    }
    const [word, first, second, third] = fields as [string, string, string, string];
    return {
      id: `${category}_${stableSlug(word)}`,
      word,
      forbiddenWords: [common[0], common[1], first, second, third]
    };
  }));
}
