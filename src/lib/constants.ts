import type { DietaryRestriction } from "./types";

export const CUISINES = [
  "🍜 Ramen",
  "🍣 Sushi",
  "🥩 Yakiniku",
  "🍱 Bento",
  "🍤 Tempura",
  "🍺 Izakaya",
  "☕ Café",
  "🍡 Wagashi",
  "🍛 Curry",
  "🥟 Gyoza",
];

export const AREAS = [
  "Shinjuku & Shibuya",
  "Asakusa & Ueno",
  "Ginza & Marunouchi",
  "Roppongi & Azabu",
  "Shimokitazawa & Nakameguro",
  "All Areas Mix",
];

export const DIETARY_RESTRICTIONS: DietaryRestriction[] = [
  "None",
  "Halal",
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Nut Allergy",
];

export const BUDGET_LABELS: Record<string, string> = {
  budget: "¥ Budget (under ¥1,500)",
  mid: "¥¥ Mid-Range (¥1,500–5,000)",
  high: "¥¥¥ High-End (¥5,000+)",
};

export const DEFAULT_FORM = {
  days: "2",
  area: "Shinjuku & Shibuya",
  budget: "mid" as const,
  restriction: "None" as DietaryRestriction,
  style: "local" as const,
  cuisines: ["🍜 Ramen", "🍣 Sushi", "🍺 Izakaya"],
};
