import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-8">
      <p className="text-sm font-medium text-muted">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="text-sm text-muted">That game does not exist.</p>
      <Link
        href="/"
        className="mt-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        ← Back to games
      </Link>
    </div>
  );
}
