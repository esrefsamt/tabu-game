import type { TabuCard } from "@tabu/shared";
import { CARD_CATEGORIES } from "./data/index.js";
import { validateCards } from "./validateCards.js";

export { CARD_CATEGORIES } from "./data/index.js";
export const TABU_CARDS: readonly TabuCard[] = Object.values(CARD_CATEGORIES).flat();
validateCards(TABU_CARDS);
