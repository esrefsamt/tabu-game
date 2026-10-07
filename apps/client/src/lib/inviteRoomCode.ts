export function inviteRoomCode(searchParams: URLSearchParams): string {
  return searchParams.get("room")?.toUpperCase() ?? "";
}
