import { dirname } from "node:path";
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

export interface CardHistoryEntry {
  readonly cardId: string;
  readonly lastSeenAt: number;
  readonly timesSeen: number;
}

export interface CardHistoryStore {
  get(profileId: string, cardId: string): CardHistoryEntry | undefined;
  recordSeen(profileId: string, cardId: string, seenAt: number): CardHistoryEntry;
}

export class InMemoryCardHistoryStore implements CardHistoryStore {
  protected readonly profiles = new Map<string, Map<string, CardHistoryEntry>>();

  get(profileId: string, cardId: string): CardHistoryEntry | undefined {
    const entry = this.profiles.get(profileId)?.get(cardId);
    return entry ? { ...entry } : undefined;
  }

  recordSeen(profileId: string, cardId: string, seenAt: number): CardHistoryEntry {
    if (!Number.isFinite(seenAt) || seenAt < 0) throw new Error("Seen timestamp must be a positive UTC timestamp.");
    const profile = this.profiles.get(profileId) ?? new Map<string, CardHistoryEntry>();
    const previous = profile.get(cardId);
    const entry = { cardId, lastSeenAt: seenAt, timesSeen: (previous?.timesSeen ?? 0) + 1 };
    profile.set(cardId, entry);
    this.profiles.set(profileId, profile);
    return { ...entry };
  }
}

interface StoredHistoryFile {
  version: 1;
  profiles: Record<string, Record<string, CardHistoryEntry>>;
}

export class JsonFileCardHistoryStore extends InMemoryCardHistoryStore {
  constructor(private readonly filePath: string) {
    super();
    this.load();
  }

  override recordSeen(profileId: string, cardId: string, seenAt: number): CardHistoryEntry {
    const entry = super.recordSeen(profileId, cardId, seenAt);
    try {
      this.persist();
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      console.error(`Card history write failed (${this.filePath}): ${message}`);
    }
    return entry;
  }

  private load(): void {
    let parsed: unknown;
    try {
      parsed = JSON.parse(readFileSync(this.filePath, "utf8"));
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "ENOENT") return;
      throw new Error(`Card history could not be loaded from ${this.filePath}.`, { cause: error });
    }
    if (!isRecord(parsed) || parsed.version !== 1 || !isRecord(parsed.profiles)) {
      throw new Error(`Card history has an invalid format: ${this.filePath}.`);
    }
    for (const [profileId, storedProfile] of Object.entries(parsed.profiles)) {
      if (!isRecord(storedProfile)) continue;
      const profile = new Map<string, CardHistoryEntry>();
      for (const [cardId, candidate] of Object.entries(storedProfile)) {
        if (!isRecord(candidate) || candidate.cardId !== cardId ||
            typeof candidate.lastSeenAt !== "number" || !Number.isFinite(candidate.lastSeenAt) ||
            typeof candidate.timesSeen !== "number" || !Number.isSafeInteger(candidate.timesSeen) ||
            candidate.timesSeen < 1) continue;
        profile.set(cardId, { cardId, lastSeenAt: candidate.lastSeenAt, timesSeen: candidate.timesSeen });
      }
      if (profile.size > 0) this.profiles.set(profileId, profile);
    }
  }

  private persist(): void {
    const profiles: StoredHistoryFile["profiles"] = {};
    for (const [profileId, entries] of this.profiles) {
      profiles[profileId] = Object.fromEntries(entries);
    }
    mkdirSync(dirname(this.filePath), { recursive: true });
    const temporaryPath = `${this.filePath}.${process.pid}.${randomUUID()}.tmp`;
    try {
      writeFileSync(temporaryPath, JSON.stringify({ version: 1, profiles } satisfies StoredHistoryFile),
        { encoding: "utf8", flag: "wx", flush: true });
      renameSync(temporaryPath, this.filePath);
    } catch (error) {
      rmSync(temporaryPath, { force: true });
      throw error;
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
