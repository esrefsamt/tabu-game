import type { TabuCard } from "@tabu/shared";

export type CardDifficulty = "easy" | "medium" | "difficult";

const CASUAL_CATEGORIES = new Set([
  "original", "food", "animals", "places", "sports", "objects", "home",
  "transportation", "clothing", "nature", "health", "everyday", "verbs",
  "concepts", "cuisine", "travel", "hobbies", "plants", "miscellaneous",
  "entertainment", "sportEquipment"
]);

/** Small manual watchlist. These are still playable, but sit at the hard edge. */
export const POTENTIALLY_DIFFICULT_CARDS: Readonly<Record<string, string>> = {
  science_nebula: "Astronomi terimi; yaygınlığı oyuncu grubuna göre değişebilir.",
  science_iyon: "Temel bilim terimi olsa da günlük konuşmada az kullanılır.",
  science_kromozom: "Biyoloji terimidir; çoğu kişi duymuştur ancak anlatması zordur.",
  geography_lejant: "Harita terimidir; okul dışında seyrek kullanılır.",
  geography_fiyort: "Bilinen bir coğrafya terimidir ancak günlük değildir.",
  language_redif: "Edebiyat dersi terimidir; günlük konuşmada kullanılmaz.",
  arts_pigment: "Sanat ve boya terimidir; günlük kullanım sıklığı düşüktür.",
  arts_porte: "Müzik eğitimi terimidir; herkes aktif olarak kullanmayabilir.",
  arts_arpej: "Müzik terimidir; enstrüman çalmayanlar için zor olabilir.",
  architecture_derz: "Yapı terimidir; ev tadilatı bağlamı dışında seyrektir.",
  technology_onbellek: "Bilgisayar terimidir; teknik bilgisi az oyuncular için zor olabilir."
};

export function classifyCardDifficulty(category: string, card: TabuCard): CardDifficulty {
  if (POTENTIALLY_DIFFICULT_CARDS[card.id]) return "difficult";
  if (CASUAL_CATEGORIES.has(category)) return "easy";

  const tokenCount = card.word.trim().split(/\s+/u).length;
  const compactLength = card.word.replace(/\s+/gu, "").length;
  return tokenCount >= 4 || compactLength >= 15 ? "difficult" : "medium";
}
