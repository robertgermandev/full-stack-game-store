import Link from "next/link";
import { notFound } from "next/navigation";
import { GameForm } from "@/components/GameForm";
import { updateGameAction } from "@/lib/actions";
import { getGame, getGenres } from "@/lib/api";

type EditGamePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditGamePage({ params }: EditGamePageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  let game;
  try {
    game = await getGame(id);
  } catch {
    notFound();
  }

  const genres = await getGenres();
  const updateAction = updateGameAction.bind(null, id);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link
          href={`/games/${id}`}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← {game.name}
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Edit game</h1>
        <p className="mt-1.5 text-sm text-muted">Update catalog details</p>
      </div>
      <GameForm
        action={updateAction}
        genres={genres}
        submitLabel="Save changes"
        initialValues={{
          name: game.name,
          genreId: game.genreId,
          price: game.price,
          releaseDate: game.releaseDate,
        }}
      />
    </div>
  );
}
