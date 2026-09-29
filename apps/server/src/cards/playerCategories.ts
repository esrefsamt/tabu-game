import { PLAYER_CATEGORY_IDS, type CardSelection, type PlayerCategoryId, type TabuCard } from "@tabu/shared";
import { CARD_CATEGORIES } from "./data/index.js";
import { TABU_CARDS } from "./cards.js";

export const PLAYER_CATEGORY_SOURCES = {
  DAILY: ["original", "everyday", "verbs", "concepts", "miscellaneous"],
  FOOD: ["food", "cuisine"],
  SPORTS: ["sports", "sportEquipment", "hobbies"],
  TECH: ["technology", "media", "entertainment"],
  WORK_EDUCATION: ["professions", "education", "language"],
  SCIENCE_HEALTH: ["science", "health"],
  NATURE: ["nature", "animals", "plants"],
  TRAVEL: ["places", "geography", "travel", "transportation", "architecture"],
  HOME_OBJECTS: ["objects", "home", "clothing"],
  CULTURE_ART: ["culture", "arts"]
} as const satisfies Record<PlayerCategoryId, readonly (keyof typeof CARD_CATEGORIES)[]>;

export function isValidCardSelection(value: unknown): value is CardSelection {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  if (record.mode === "GENERAL") return Object.keys(record).length === 1;
  if (record.mode !== "CUSTOM" || Object.keys(record).length !== 2 || !Array.isArray(record.categories)) return false;
  const categories = record.categories;
  return categories.length > 0 && categories.length <= PLAYER_CATEGORY_IDS.length &&
    categories.every((id) => typeof id === "string" && PLAYER_CATEGORY_IDS.some((allowed) => allowed === id)) &&
    new Set(categories).size === categories.length;
}

export function cardsForSelection(selection: CardSelection): readonly TabuCard[] {
  if (selection.mode === "GENERAL") return TABU_CARDS;
  return selection.categories.flatMap((category) =>
    PLAYER_CATEGORY_SOURCES[category].flatMap((source) => CARD_CATEGORIES[source])
  );
}

export const PLAYER_CATEGORY_COUNTS = Object.fromEntries(PLAYER_CATEGORY_IDS.map((id) => [
  id, PLAYER_CATEGORY_SOURCES[id].reduce((total, source) => total + CARD_CATEGORIES[source].length, 0)
])) as Record<PlayerCategoryId, number>;
