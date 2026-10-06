import Link from "next/link";
import { getGames } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";

export default async function HomePage() {
  let games;
  let error: string | null = null;

  try {
    games = await getGames();
  } catch {
    error =
      "Could not load games. Make sure the API is running on http://localhost:5142.";
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Games</h1>
          <p className="mt-1.5 text-sm text-muted">
            {games ? `${games.length} in catalog` : "Browse the catalog"}
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : games && games.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
          <p className="text-sm text-muted">No games yet.</p>
          <Link
            href="/games/new"
            className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover"
          >
            Add the first one →
          </Link>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {games?.map((game, index) => (
            <li
              key={game.id}
              className={index > 0 ? "border-t border-border" : undefined}
            >
              <Link
                href={`/games/${game.id}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-teal-50/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium tracking-tight transition-colors group-hover:text-accent">
                    {game.name}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    {game.genre}
                    <span className="mx-1.5 text-border">·</span>
                    {formatDate(game.releaseDate)}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium tabular-nums text-foreground/80">
                  {formatPrice(game.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
