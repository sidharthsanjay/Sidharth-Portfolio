import { marquee, stats } from "@/lib/site";
import { Counter, Reveal } from "./motion-primitives";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x group flex overflow-hidden">
      <ul
        className={`flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {/* Four copies: the loop shifts by half, and each half must outrun a wide screen. */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <span className="size-1.5 rounded-full bg-gradient-to-br from-violet to-teal" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechMarquee() {
  const half = Math.ceil(marquee.length / 2);
  return (
    <section aria-label="Technologies I work with" className="relative py-10">
      <div className="flex flex-col gap-3">
        <Row items={marquee.slice(0, half)} />
        <Row items={marquee.slice(half)} reverse />
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section aria-label="At a glance" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-bg p-6 sm:p-8">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <Counter
                to={s.value}
                suffix={s.suffix}
                className="block bg-gradient-to-b from-fg to-fg/50 bg-clip-text text-5xl font-semibold tracking-tight text-transparent tabular-nums sm:text-6xl"
              />
              <span className="mt-3 block text-sm leading-snug text-muted">{s.label}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
