import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">This page isn&apos;t in the dataset.</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
