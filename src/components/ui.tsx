import type { ReactNode } from "react";
import { Reveal } from "../lib/reveal";

/* ------------------------------------------------------------------ */
/* Section heading — mono eyebrow with index + serif display title     */
/* ------------------------------------------------------------------ */

interface SectionHeadProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  id?: string;
  align?: "left";
}

export function SectionHead({ index, eyebrow, title, lede, id }: SectionHeadProps) {
  return (
    <header className="mb-12 md:mb-16 lg:mb-20">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2 id={id} className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-light sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={170}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">{lede}</p>
        </Reveal>
      ) : null}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Small badge for marking placeholder / representative content        */
/* ------------------------------------------------------------------ */
export function PlaceholderBadge({ label = "Placeholder" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
      <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
      {label}
    </span>
  );
}
