import { randomBytes } from "node:crypto";

export const RECONNECT_GRACE_MS = 30_000;

export interface SessionClock {
  setTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout>;
  clearTimeout(timer: ReturnType<typeof setTimeout>): void;
}

const systemClock: SessionClock = { setTimeout, clearTimeout };

interface PlayerSession {
  roomCode: string;
  playerId: string;
  token: string;
  socketId: string | null;
  removalTimer: ReturnType<typeof setTimeout> | null;
}

export class PlayerSessionManager {
  private readonly byToken = new Map<string, PlayerSession>();
  private readonly bySocket = new Map<string, PlayerSession>();

  constructor(
    private readonly onExpiry: (roomCode: string, playerId: string) => void,
    private readonly clock: SessionClock = systemClock
  ) {}

  create(roomCode: string, playerId: string, socketId: string): string {
    let token: string;
    do { token = randomBytes(32).toString("hex"); } while (this.byToken.has(token));
    const session: PlayerSession = { roomCode, playerId, token, socketId, removalTimer: null };
    this.byToken.set(token, session);
    this.bySocket.set(socketId, session);
    return token;
  }

  resume(roomCode: string, token: string, socketId: string): { playerId: string; previousSocketId: string | null } | null {
    if (this.bySocket.has(socketId)) return null;
    const session = this.byToken.get(token);
    if (!session || session.roomCode !== roomCode) return null;
    if (session.removalTimer) this.clock.clearTimeout(session.removalTimer);
    session.removalTimer = null;
    const previousSocketId = session.socketId;
    if (previousSocketId) this.bySocket.delete(previousSocketId);
    session.socketId = socketId;
    this.bySocket.set(socketId, session);
    return { playerId: session.playerId, previousSocketId };
  }

  current(socketId: string): { roomCode: string; playerId: string } | null {
    const session = this.bySocket.get(socketId);
    return session?.socketId === socketId ? { roomCode: session.roomCode, playerId: session.playerId } : null;
  }

  disconnect(socketId: string): { roomCode: string; playerId: string } | null {
    const session = this.bySocket.get(socketId);
    if (!session || session.socketId !== socketId) return null;
    this.bySocket.delete(socketId);
    session.socketId = null;
    session.removalTimer = this.clock.setTimeout(() => {
      if (session.socketId !== null) return;
      this.byToken.delete(session.token);
      session.removalTimer = null;
      this.onExpiry(session.roomCode, session.playerId);
    }, RECONNECT_GRACE_MS);
    session.removalTimer.unref?.();
    return { roomCode: session.roomCode, playerId: session.playerId };
  }

  remove(socketId: string): { roomCode: string; playerId: string } | null {
    const session = this.bySocket.get(socketId);
    if (!session) return null;
    this.bySocket.delete(socketId);
    this.byToken.delete(session.token);
    if (session.removalTimer) this.clock.clearTimeout(session.removalTimer);
    return { roomCode: session.roomCode, playerId: session.playerId };
  }
}
