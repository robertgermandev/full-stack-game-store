import Link from "next/link";
import { GameForm } from "@/components/GameForm";
import { createGameAction } from "@/lib/actions";
import { getGenres } from "@/lib/api";

export default async function NewGamePage() {
  const genres = await getGenres();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Games
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Add game</h1>
        <p className="mt-1.5 text-sm text-muted">Create a new catalog entry</p>
      </div>
      <GameForm action={createGameAction} genres={genres} submitLabel="Create" />
    </div>
  );
}
