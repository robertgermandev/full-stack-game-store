import type { GameDetails, GameInput, GameSummary, Genre } from "./types";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:5142";

async function request<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getGames() {
  return request<GameSummary[]>("/games");
}

export function getGame(id: number) {
  return request<GameDetails>(`/games/${id}`);
}

export function createGame(game: GameInput) {
  return request<GameDetails>("/games", {
    method: "POST",
    body: JSON.stringify(game),
  });
}

export function updateGame(id: number, game: GameInput) {
  return request<void>(`/games/${id}`, {
    method: "PUT",
    body: JSON.stringify(game),
  });
}

export function deleteGame(id: number) {
  return request<void>(`/games/${id}`, {
    method: "DELETE",
  });
}

export function getGenres() {
  return request<Genre[]>("/genres");
}
