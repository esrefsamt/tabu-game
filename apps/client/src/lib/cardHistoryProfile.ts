export const CARD_HISTORY_PROFILE_STORAGE_KEY = "tabu:card-history-profile";

export interface CardHistoryProfileStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let temporaryProfileId: string | null = null;

export function isValidHistoryProfileId(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

function createStrongUuid(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
}

function browserStorage(): CardHistoryProfileStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function getCardHistoryProfileId(
  storage: CardHistoryProfileStorage | null = browserStorage(),
  generateId: () => string = createStrongUuid
): string {
  if (storage) {
    let stored: string | null;
    try {
      stored = storage.getItem(CARD_HISTORY_PROFILE_STORAGE_KEY);
      if (isValidHistoryProfileId(stored)) {
        temporaryProfileId = stored;
        return stored;
      }
    } catch {
      if (temporaryProfileId) return temporaryProfileId;
      stored = null;
    }
    if (stored === null && temporaryProfileId) {
      try {
        storage.setItem(CARD_HISTORY_PROFILE_STORAGE_KEY, temporaryProfileId);
      } catch {
        // The in-memory profile remains valid for this browser session.
      }
      return temporaryProfileId;
    }
  } else if (temporaryProfileId) {
    return temporaryProfileId;
  }

  const generated = generateId();
  if (!isValidHistoryProfileId(generated)) {
    throw new Error("History profile generator returned an invalid UUID.");
  }
  temporaryProfileId = generated;
  try {
    storage?.setItem(CARD_HISTORY_PROFILE_STORAGE_KEY, generated);
  } catch {
    // The temporary profile still keeps the current browser session playable.
  }
  return generated;
}
