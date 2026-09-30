# Tabu

React/Vite client and Express/Socket.IO server in npm workspaces. The card library and cross-day card history stay on the server.

## Local development

Requires Node.js 20.19+ or 22.12+ and npm. From the repository root:

```sh
npm install
npm run dev
```

The client runs at `http://localhost:5173` and the server at `http://localhost:3001`. The Vite development proxy forwards `/api` and `/socket.io` to the local server. Copy the example files in each app to `.env` if you need custom values. Environment files are intentionally ignored by Git.

## Production deployment

Deploy `apps/client/dist` as a static site and run `apps/server/dist/index.js` as a Node service. They may be on separate hosts. The TLS certificate and HTTPS termination belong to the hosting platform or reverse proxy.

1. Install dependencies at the repository root with `npm ci` (or `npm install`).
2. Set `VITE_SERVER_URL=https://your-server.example` **before** `npm run build`. Vite embeds this URL in the static client bundle. If the client and server share an origin and the proxy forwards `/socket.io`, omit the variable to use the current origin.
3. Run `npm run build`. This builds shared types/runtime, the server, and the client in order. Upload/serve `apps/client/dist` as static files.
4. Set server variables and run `npm run start` at the repository root. This executes compiled JavaScript, not `tsx`.
5. Configure a health check against `GET /api/health`, which returns `{ "status": "ok" }`.

| Server variable | Purpose |
| --- | --- |
| `PORT` | HTTP listener port; defaults to `3001`. |
| `CLIENT_ORIGIN` | Exact public client origin, for example `https://your-client.example`. Required when `NODE_ENV=production`; no wildcard or path. |
| `CARD_HISTORY_FILE` | JSON history location, for example `/data/card-history.json`. Defaults to `apps/server/data/card-history.json` for local development. |
| `NODE_ENV` | Set to `production` on the deployed server. |

The client variable is `VITE_SERVER_URL`. Set it to the public **HTTPS** server origin for a separate client host. Socket.IO derives secure WSS transport from the HTTPS URL and retains its normal polling fallback. The reverse proxy must forward both HTTP polling and WebSocket upgrade requests on `/socket.io` to the same server. Keep the proxy's connection and upgrade support enabled. The server accepts browser connections only from `CLIENT_ORIGIN` for both polling and WebSocket handshakes.

Configure the static client host to serve `index.html` for unknown application paths. A direct visit or refresh at `/room/ABC123` must load the React app rather than return 404. Keep `/socket.io` routed to the backend if using a shared origin.

Mount persistent storage and set `CARD_HISTORY_FILE` to a path on that mount if cross-day card history must survive restarts and redeployments. A normal ephemeral app filesystem will lose this history. The server creates the parent directory when writing, writes to a temporary file, flushes it, and renames it into place. Use one server process for this JSON store; multiple replicas need coordinated storage in a later architecture phase. Runtime history files and temporary writes must not be committed.

Use `npm run test`, `npm run typecheck`, `npm run build`, `npm run cards:quality`, and `npm audit` for verification. After building, `npm run smoke:production` starts the compiled server with a temporary production-style configuration, verifies health/CORS/WebSocket room creation and joining, checks the client bundle, and loads a direct room URL from Vite preview.
