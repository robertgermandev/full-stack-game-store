import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteGameButton } from "@/components/DeleteGameButton";
import { getGame, getGenres } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export default async function GamePage({ params }: GamePageProps) {
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
  const genreName =
    genres.find((genre) => genre.id === game.genreId)?.name ?? "Unknown";

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Games
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {game.name}
        </h1>
        <p className="mt-1.5 text-sm text-muted">{genreName}</p>
      </div>

      <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        <div className="bg-surface px-5 py-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Price
          </dt>
          <dd className="mt-1.5 text-lg font-semibold tabular-nums">
            {formatPrice(game.price)}
          </dd>
        </div>
        <div className="bg-surface px-5 py-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Genre
          </dt>
          <dd className="mt-1.5 text-lg font-semibold">{genreName}</dd>
        </div>
        <div className="bg-surface px-5 py-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Released
          </dt>
          <dd className="mt-1.5 text-lg font-semibold">
            {formatDate(game.releaseDate)}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/games/${game.id}/edit`}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Edit
        </Link>
        <DeleteGameButton id={game.id} />
      </div>
    </div>
  );
}
