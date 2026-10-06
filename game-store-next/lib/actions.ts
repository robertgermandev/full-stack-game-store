"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createGame, deleteGame, updateGame } from "./api";
import type { GameInput } from "./types";

function parseGameForm(formData: FormData): GameInput {
  const name = String(formData.get("name") ?? "").trim();
  const genreId = Number(formData.get("genreId"));
  const price = Number(formData.get("price"));
  const releaseDate = String(formData.get("releaseDate") ?? "");

  if (!name || !genreId || !price || !releaseDate) {
    throw new Error("All fields are required.");
  }

  return { name, genreId, price, releaseDate };
}

export async function createGameAction(formData: FormData) {
  const game = parseGameForm(formData);
  const created = await createGame(game);
  revalidatePath("/");
  redirect(`/games/${created.id}`);
}

export async function updateGameAction(id: number, formData: FormData) {
  const game = parseGameForm(formData);
  await updateGame(id, game);
  revalidatePath("/");
  revalidatePath(`/games/${id}`);
  redirect(`/games/${id}`);
}

export async function deleteGameAction(id: number) {
  await deleteGame(id);
  revalidatePath("/");
  redirect("/");
}
