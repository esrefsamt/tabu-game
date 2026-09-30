const KEY = "tabu:room-session";
const ROOM_CODE = /^[A-HJ-NP-Z2-9]{6}$/;
const TOKEN = /^[0-9a-f]{64}$/i;

export interface StoredRoomSession {
  roomCode: string;
  playerId: string;
  sessionToken: string;
}

export interface RoomSessionStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

let temporarySession: StoredRoomSession | null = null;

function storage(): RoomSessionStorage | null {
  try { return typeof window === "undefined" ? null : window.localStorage; }
  catch { return null; }
}

export function loadRoomSession(roomCode: string, target: RoomSessionStorage | null = storage()): StoredRoomSession | null {
  try {
    const raw = target?.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : temporarySession;
    if (typeof parsed !== "object" || parsed === null) return null;
    const session = parsed as Partial<StoredRoomSession>;
    return session.roomCode === roomCode.toUpperCase() && ROOM_CODE.test(session.roomCode) &&
      typeof session.sessionToken === "string" && TOKEN.test(session.sessionToken) &&
      typeof session.playerId === "string" && session.playerId.length > 0
      ? session as StoredRoomSession : null;
  } catch {
    return temporarySession?.roomCode === roomCode.toUpperCase() ? temporarySession : null;
  }
}

export function saveRoomSession(session: StoredRoomSession, target: RoomSessionStorage | null = storage()): void {
  temporarySession = session;
  try { target?.setItem(KEY, JSON.stringify(session)); } catch { /* Session memory remains usable. */ }
}

export function clearRoomSession(roomCode: string, target: RoomSessionStorage | null = storage()): void {
  if (temporarySession?.roomCode === roomCode.toUpperCase()) temporarySession = null;
  try {
    const current = target?.getItem(KEY);
    if (current && (JSON.parse(current) as StoredRoomSession).roomCode === roomCode.toUpperCase()) {
      target?.removeItem(KEY);
    }
  } catch {
    try { target?.removeItem(KEY); } catch { /* Storage is optional. */ }
  }
}
