import { PLAYER_CATEGORY_IDS, type CardSelection, type PlayerCategoryId } from "@tabu/shared";

export const CATEGORY_LABELS: Record<PlayerCategoryId, string> = {
  DAILY: "Günlük Hayat", FOOD: "Yeme & İçme", SPORTS: "Spor & Hobi",
  TECH: "Teknoloji & Medya", WORK_EDUCATION: "Meslek & Eğitim",
  SCIENCE_HEALTH: "Bilim & Sağlık", NATURE: "Doğa & Hayvanlar",
  TRAVEL: "Yerler & Seyahat", HOME_OBJECTS: "Ev & Eşyalar",
  CULTURE_ART: "Kültür & Sanat"
};

export const CATEGORY_ICONS: Record<PlayerCategoryId, string> = {
  DAILY: "☀", FOOD: "☕", SPORTS: "⚽", TECH: "⌘", WORK_EDUCATION: "✎",
  SCIENCE_HEALTH: "✚", NATURE: "✿", TRAVEL: "✈", HOME_OBJECTS: "⌂", CULTURE_ART: "♫"
};

export function categorySummary(selection: CardSelection): string {
  return selection.mode === "GENERAL" ? "Genel" :
    PLAYER_CATEGORY_IDS.filter((id) => selection.categories.includes(id)).map((id) => CATEGORY_LABELS[id]).join(", ");
}
