import { deleteGameAction } from "@/lib/actions";

type DeleteGameButtonProps = {
  id: number;
};

export function DeleteGameButton({ id }: DeleteGameButtonProps) {
  return (
    <form action={deleteGameAction.bind(null, id)}>
      <button
        type="submit"
        className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
