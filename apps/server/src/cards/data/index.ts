import { ANIMAL_CARDS } from "./animals.js";
import { ARCHITECTURE_CARDS } from "./architecture.js";
import { ARTS_CARDS } from "./arts.js";
import { CLOTHING_CARDS } from "./clothing.js";
import { CONCEPT_CARDS } from "./concepts.js";
import { CUISINE_CARDS } from "./cuisine.js";
import { CULTURE_CARDS } from "./culture.js";
import { EDUCATION_CARDS } from "./education.js";
import { ENTERTAINMENT_CARDS } from "./entertainment.js";
import { EVERYDAY_CARDS } from "./everyday.js";
import { FOOD_CARDS } from "./food.js";
import { HEALTH_CARDS } from "./health.js";
import { LANGUAGE_CARDS } from "./language.js";
import { HOBBY_CARDS } from "./hobbies.js";
import { HOME_CARDS } from "./home.js";
import { GEOGRAPHY_CARDS } from "./geography.js";
import { NATURE_CARDS } from "./nature.js";
import { PLANT_CARDS } from "./plants.js";
import { OBJECT_CARDS } from "./objects.js";
import { ORIGINAL_CARDS } from "./original.js";
import { PLACE_CARDS } from "./places.js";
import { PROFESSION_CARDS } from "./professions.js";
import { SPORT_CARDS } from "./sports.js";
import { SCIENCE_CARDS } from "./science.js";
import { SPORT_EQUIPMENT_CARDS } from "./sportEquipment.js";
import { TECHNOLOGY_CARDS } from "./technology.js";
import { TRANSPORTATION_CARDS } from "./transportation.js";
import { TRAVEL_CARDS } from "./travel.js";
import { VERB_CARDS } from "./verbs.js";
import { MEDIA_CARDS } from "./media.js";
import { MISCELLANEOUS_CARDS } from "./miscellaneous.js";

import type { TabuCard } from "@tabu/shared";
import { CARD_FAMILIARITY_OVERRIDES } from "./cardFamiliarityOverrides.js";

export const SOURCE_CARD_CATEGORIES = {
  original: ORIGINAL_CARDS,
  food: FOOD_CARDS,
  animals: ANIMAL_CARDS,
  places: PLACE_CARDS,
  technology: TECHNOLOGY_CARDS,
  sports: SPORT_CARDS,
  professions: PROFESSION_CARDS,
  objects: OBJECT_CARDS,
  home: HOME_CARDS,
  transportation: TRANSPORTATION_CARDS,
  education: EDUCATION_CARDS,
  clothing: CLOTHING_CARDS,
  nature: NATURE_CARDS,
  health: HEALTH_CARDS,
  everyday: EVERYDAY_CARDS,
  science: SCIENCE_CARDS,
  culture: CULTURE_CARDS,
  entertainment: ENTERTAINMENT_CARDS,
  verbs: VERB_CARDS,
  concepts: CONCEPT_CARDS,
  cuisine: CUISINE_CARDS,
  travel: TRAVEL_CARDS,
  hobbies: HOBBY_CARDS,
  media: MEDIA_CARDS,
  plants: PLANT_CARDS,
  architecture: ARCHITECTURE_CARDS,
  sportEquipment: SPORT_EQUIPMENT_CARDS,
  miscellaneous: MISCELLANEOUS_CARDS,
  geography: GEOGRAPHY_CARDS,
  language: LANGUAGE_CARDS,
  arts: ARTS_CARDS
} as const satisfies Record<string, readonly TabuCard[]>;

function applyCardCleanup(cards: readonly TabuCard[]): readonly TabuCard[] {
  return cards.map((card) => {
    const replacement = CARD_FAMILIARITY_OVERRIDES[card.id as keyof typeof CARD_FAMILIARITY_OVERRIDES];
    return replacement ? { ...card, ...replacement } : card;
  });
}

export const CARD_CATEGORIES = Object.fromEntries(
  Object.entries(SOURCE_CARD_CATEGORIES).map(([category, cards]) => [category, applyCardCleanup(cards)])
) as { [Category in keyof typeof SOURCE_CARD_CATEGORIES]: readonly TabuCard[] };


