# Game Store

Monorepo with a .NET Minimal API backend and a Next.js frontend.

## Structure

```
game-store-api/    ASP.NET Core API (SQLite) — http://localhost:5142
game-store-next/   Next.js App Router UI      — http://localhost:3000
```

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (project targets .NET 10)
- [Node.js](https://nodejs.org/) 20+

## Run locally

Start both processes in separate terminals.

**API**

```bash
cd game-store-api
dotnet run
```

**Frontend**

```bash
cd game-store-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The frontend reads `API_BASE_URL` from `game-store-next/.env.local` (defaults to `http://localhost:5142`). Copy `.env.example` if you need to recreate it.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/games` | List games |
| GET | `/games/{id}` | Game details |
| POST | `/games` | Create game |
| PUT | `/games/{id}` | Update game |
| DELETE | `/games/{id}` | Delete game |
| GET | `/genres` | List genres |

## Frontend routes

| Path | Description |
|------|-------------|
| `/` | Games list |
| `/games/new` | Create game |
| `/games/[id]` | Game details |
| `/games/[id]/edit` | Edit game |
