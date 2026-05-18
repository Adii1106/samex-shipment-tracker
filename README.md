# Samex Shipment Tracker

A full-stack B2B logistics shipment tracking mini-app built with Node.js + Express (backend) and React + Vite (frontend).

---

## Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/Adii1106/samex-shipment-tracker.git
cd samex-shipment-tracker

# 2. Install all dependencies (root + server + client)
npm run install:all

# 3. Start both servers concurrently
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001

**Login credentials**: `admin` / `samex123`

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Get JWT token |
| `GET` | `/api/shipments` | List shipments (filter: `?status=&destination=`) |
| `POST` | `/api/shipments` | Create shipment |
| `PATCH` | `/api/shipments/:id/status` | Update status |
| `GET` | `/api/health` | Health check |

All `/api/shipments` routes require `Authorization: Bearer <token>` header.

### Valid Status Transitions
```
Pending → Picked Up → In Transit → Delivered
Any state → Cancelled (except Delivered/Cancelled)
```

### Sample Request: Create Shipment
```bash
curl -X POST http://localhost:5001/api/shipments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"sender":"A","receiver":"B","origin":"Mumbai","destination":"Delhi"}'
```

---

## Project Structure

```
samex-shipment-tracker/
├── server/
│   ├── index.js      # Express app, middleware setup
│   ├── routes.js     # Shipment CRUD routes
│   ├── auth.js       # JWT login + middleware
│   └── data.js       # In-memory seed data + status constants
└── client/
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── styles.css
        ├── components/
        │   ├── LoginPage.jsx
        │   ├── StatsStrip.jsx
        │   ├── FilterBar.jsx
        │   ├── CreateShipmentForm.jsx
        │   └── ShipmentTable.jsx
        ├── hooks/
        │   └── useShipments.js
        └── utils/
            ├── api.js         # Typed fetch wrappers
            └── constants.js   # Status metadata + transitions
```

---

## Features

- [x] JWT-protected API (single user login gate)
- [x] Full CRUD: list, create, update status
- [x] Enforced status transition rules (Pending → Picked Up → In Transit → Delivered)
- [x] Filter by status and destination (server-side)
- [x] Stats strip: counts per status
- [x] Input validation with clear error states
- [x] Optimistic UI updates (no full refetch on status change)
- [x] In-memory store with 7 seeded shipments

---

## Architecture Decisions

### Backend (`/server` — 4 files total)
- **`data.js`** — Seed and constants are isolated; swapping in MongoDB later touches only this file.
- **`routes.js`** — Status transitions are enforced server-side with a `VALID_TRANSITIONS` map; this is not just a string check, but actual state machine logic.
- **`auth.js`** — Real JWT implementation with 8h expiry, not a static token; uses a hardcoded user as required by the assignment.
- **`index.js`** — Minimal orchestration, cleanly injects the store into routes.

### Frontend (`/client/src` — clean separation)
- **`utils/api.js`** — All fetch logic in one place, ensuring consistent error handling.
- **`utils/constants.js`** — Status metadata (colors, transitions) defined once, and used by both `StatsStrip` and `ShipmentTable`.
- **`hooks/useShipments.js`** — Optimistic UI: status updates patch local state instantly without re-fetching the full list.
- **Vite Proxy** — Ensures no CORS issues in dev and maintains clean API URLs in the code.

---

## What I'd Do Next

1. **MongoDB integration** — Replace the in-memory array with Mongoose. The store is isolated in `data.js`, so the swap is contained to one file.
2. **Pagination** — Add `?page=&limit=` on the GET endpoint; the table can be large in production.
3. **Role-based access** — Separate shipper vs. dispatcher views; dispatchers update status, shippers only view their own.
4. **Real-time updates** — WebSocket or SSE to push status changes to all connected clients without polling.
5. **Full test coverage** — Unit tests for transition rules and integration tests for each API endpoint with supertest.

---

## AI Usage Note

I used Gemini as the primary coding assistant throughout this build. AI helped most with: rapidly scaffolding the project architecture, keeping the status-transition state machine consistent between server and client, and establishing a robust React frontend with optimistic UI updates. During setup, we encountered an `EADDRINUSE` port conflict on `5000` (occupied by macOS Control Center / AirPlay), which we quickly debugged and resolved by dynamically mapping the Express server and Vite proxy to port `5001`. I reviewed every generated file for correctness — particularly the auth middleware, state transition logic, and clean codebase separation — before finalizing.
