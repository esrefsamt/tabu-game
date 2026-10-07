import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import RoomEntryForms from "./RoomEntryForms";
import { inviteRoomCode } from "../lib/inviteRoomCode";

test("invite code remains prefilled and join is the first red primary action", () => {
  const roomCode = inviteRoomCode(new URLSearchParams("?room=mhpfzq"));
  assert.equal(roomCode, "MHPFZQ");
  const markup = renderToStaticMarkup(<RoomEntryForms playerName="" roomCode={roomCode} error={null} pending={false}
    onNameChange={() => {}} onCodeChange={() => {}} onJoin={() => {}} onCreate={() => {}} />);
  const nameIndex = markup.indexOf("Oyuncu adın");
  const codeIndex = markup.indexOf("Oda kodu");
  const joinIndex = markup.indexOf("Odaya Katıl");
  const dividerIndex = markup.indexOf("veya");
  const createIndex = markup.indexOf("Oda Oluştur");
  assert.ok(nameIndex >= 0 && nameIndex < codeIndex && codeIndex < joinIndex && joinIndex < dividerIndex && dividerIndex < createIndex);
  assert.match(markup, /id="room-code"[^>]*value="MHPFZQ"/);
  assert.match(markup, /class="button button-primary join-button"[^>]*>Odaya Katıl/);
  assert.match(markup, /class="button button-secondary create-button"[^>]*>Oda Oluştur/);
  assert.equal(inviteRoomCode(new URLSearchParams()), "");
});
