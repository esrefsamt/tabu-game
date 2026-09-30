import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  rectIntersection,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent
} from "@dnd-kit/core";
import type { MovePlayerPayload, Player, RoomState, Team } from "@tabu/shared";

const ZONE_IDS = { unassigned: "zone-unassigned", A: "zone-A", B: "zone-B" } as const;

const zoneCollision: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args);
  return pointerHits.length > 0 ? pointerHits : rectIntersection(args);
};

function PlayerFace({ player, captainId }: { player: Player; captainId: string | null }) {
  return (
    <>
      <span className="player-avatar" aria-hidden="true">{player.name.trim().charAt(0).toLocaleUpperCase("tr-TR")}</span>
      <span className="player-chip-name">{player.name}</span>
      <span className="room-wins" aria-label={`${player.roomWins} oda galibiyeti`}>🏆 {player.roomWins}</span>
      {!player.isConnected && <span className="reconnect-badge">Bağlantı bekleniyor…</span>}
      <span className="player-badges">
        {player.isHost && <span className="host-badge">Host</span>}
        {player.id === captainId && <span className="captain-badge">Kaptan</span>}
      </span>
    </>
  );
}

function PlayerChip({ player, captainId, draggable, canKick, onKick }: {
  player: Player;
  captainId: string | null;
  draggable: boolean;
  canKick: boolean;
  onKick: (playerId: string) => void;
}) {
  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: player.id,
    disabled: !draggable
  });

  return (
    <li className="player-chip-item">
      {draggable ? (
        <button
          {...attributes}
          {...listeners}
          aria-label={`${player.name} oyuncusunu taşı`}
          className={`player-chip player-chip-draggable${isDragging ? " player-chip-dragging" : ""}`}
          ref={setNodeRef}
          type="button"
        >
          <PlayerFace player={player} captainId={captainId} />
          <span className="drag-grip" aria-hidden="true">⠿</span>
        </button>
      ) : (
        <div className="player-chip" ref={setNodeRef}>
          <PlayerFace player={player} captainId={captainId} />
        </div>
      )}
      {canKick && (
        <button className="player-kick-button" type="button" aria-label={`${player.name} oyuncusunu odadan at`}
          onClick={() => onKick(player.id)}>At</button>
      )}
    </li>
  );
}

function PlayerZone({
  team,
  players,
  captainId,
  isHost,
  movePending,
  selfPlayerId,
  onKick
}: {
  team: Team | null;
  players: Player[];
  captainId: string | null;
  isHost: boolean;
  movePending: boolean;
  selfPlayerId: string | null;
  onKick: (playerId: string) => void;
}) {
  const id = team ?? "unassigned";
  const { isOver, setNodeRef } = useDroppable({ id: ZONE_IDS[id] });
  const title = team ? `Takım ${team}` : "Takımsız Oyuncular";
  return (
    <section
      className={`player-zone player-zone-${id}${isHost && isOver ? " player-zone-over" : ""}`}
      ref={setNodeRef}
      aria-label={title}
    >
      <header className="player-zone-heading">
        <div>
          <span className="zone-kicker">{team ? "TAKIM" : "BEKLEME ALANI"}</span>
          <h3>{title}</h3>
        </div>
        <span className="zone-count">{players.length} oyuncu</span>
      </header>
      {players.length > 0 ? (
        <ul className="player-chip-list">
          {players.map((player) => (
            <PlayerChip key={player.id} player={player} captainId={captainId}
              draggable={isHost && !movePending} canKick={isHost && player.id !== selfPlayerId} onKick={onKick} />
          ))}
        </ul>
      ) : (
        <p className="zone-empty">{isHost ? "Oyuncuları buraya sürükle" : "Henüz oyuncu yok"}</p>
      )}
    </section>
  );
}

export default function LobbyTeamBoard({ room, isHost, movePending, selfPlayerId, onMove, onKick }: {
  room: RoomState;
  isHost: boolean;
  movePending: boolean;
  selfPlayerId: string | null;
  onMove: (payload: MovePlayerPayload) => Promise<void>;
  onKick: (playerId: string) => void;
}) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor)
  );
  const draggedPlayer = room.players.find((player) => player.id === draggedId);
  const draggedCaptainId = draggedPlayer?.team === "A" ? room.captainAId :
    draggedPlayer?.team === "B" ? room.captainBId : null;

  function handleDragEnd(event: DragEndEvent) {
    setDraggedId(null);
    if (!isHost || movePending || !event.over) return;
    const player = room.players.find((entry) => entry.id === event.active.id);
    if (!player) return;
    const zoneId = String(event.over.id);
    if (zoneId !== ZONE_IDS.A && zoneId !== ZONE_IDS.B && zoneId !== ZONE_IDS.unassigned) return;
    const team = zoneId === ZONE_IDS.unassigned ? null : zoneId === ZONE_IDS.A ? "A" : "B";
    if (player.team !== team) void onMove({ playerId: player.id, team });
  }

  return (
    <DndContext
      collisionDetection={zoneCollision}
      onDragCancel={() => setDraggedId(null)}
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => setDraggedId(String(active.id))}
      sensors={sensors}
    >
      <div className="lobby-board">
        <PlayerZone team={null} players={room.players.filter((player) => player.team === null)} captainId={null} isHost={isHost} movePending={movePending} selfPlayerId={selfPlayerId} onKick={onKick} />
        <div className="team-grid">
          <PlayerZone team="A" players={room.players.filter((player) => player.team === "A")} captainId={room.captainAId} isHost={isHost} movePending={movePending} selfPlayerId={selfPlayerId} onKick={onKick} />
          <PlayerZone team="B" players={room.players.filter((player) => player.team === "B")} captainId={room.captainBId} isHost={isHost} movePending={movePending} selfPlayerId={selfPlayerId} onKick={onKick} />
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {draggedPlayer ? (
          <div className="player-chip player-chip-overlay">
            <PlayerFace player={draggedPlayer} captainId={draggedCaptainId} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
