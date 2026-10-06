import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Store",
  description: "Browse and manage games",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-10 border-b border-border/80 bg-surface/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-[1.05rem] font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              Game Store
            </Link>
            <Link
              href="/games/new"
              className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Add game
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-border/60 py-6 text-center text-xs text-muted">
          Catalog powered by the Game Store API
        </footer>
      </body>
    </html>
  );
}
