import Link from "next/link";
import type { Genre } from "@/lib/types";

type GameFormProps = {
  action: (formData: FormData) => Promise<void>;
  genres: Genre[];
  submitLabel: string;
  initialValues?: {
    name: string;
    genreId: number;
    price: number;
    releaseDate: string;
  };
};

const fieldClass =
  "rounded-md border border-border bg-surface px-3 py-2.5 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

export function GameForm({
  action,
  genres,
  submitLabel,
  initialValues,
}: GameFormProps) {
  return (
    <form
      action={action}
      className="flex max-w-md flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
    >
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Name
        <input
          name="name"
          required
          maxLength={50}
          defaultValue={initialValues?.name}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Genre
        <select
          name="genreId"
          required
          defaultValue={initialValues?.genreId ?? ""}
          className={fieldClass}
        >
          <option value="" disabled>
            Select a genre
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Price
          <input
            name="price"
            type="number"
            required
            min={1}
            max={100}
            step="0.01"
            defaultValue={initialValues?.price}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Release date
          <input
            name="releaseDate"
            type="date"
            required
            defaultValue={initialValues?.releaseDate}
            className={fieldClass}
          />
        </label>
      </div>

      <div className="mt-1 flex items-center gap-3 border-t border-border pt-5">
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          {submitLabel}
        </button>
        <Link
          href="/"
          className="px-2 py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
