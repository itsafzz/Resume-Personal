import { useEffect, useRef, useState } from "react";
import { Reveal, watchSectionProgress } from "../lib/reveal";
import { SectionHead } from "./ui";
import { approachSteps } from "../lib/data";

export default function Approach() {
  const [scrollStep, setScrollStep] = useState(0);
  const [focusStep, setFocusStep] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  /* Steps light up progressively as the section moves through the viewport */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScrollStep(approachSteps.length - 1);
      return;
    }
    return watchSectionProgress(
      el,
      (p) => {
        const idx = Math.min(approachSteps.length - 1, Math.floor(p * (approachSteps.length + 0.5)));
        setScrollStep((a) => (a === idx ? a : idx));
      },
      { startVh: 0.72, endVh: 0.4 }
    );
  }, []);

  const active = focusStep ?? scrollStep;

  return (
    <section id="approach" aria-labelledby="approach-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:py-36">
        <SectionHead
          index="05"
          eyebrow="Approach"
          id="approach-title"
          title={
            <>
              Understand first. <em className="font-normal italic text-accent">Optimise</em> second.
            </>
          }
          lede="Every engagement runs through the same five movements — in order, every time. The scale changes; the discipline doesn't."
        />

        <div ref={trackRef}>
          {/* Desktop: horizontal sequence */}
          <Reveal className="hidden lg:block">
            <div className="relative">
              {/* Progress rail */}
              <div aria-hidden className="absolute left-0 right-0 top-[5px] h-px bg-line">
                <div
                  className="h-full bg-accent transition-[width] duration-700 ease-out"
                  style={{ width: `${((active + 0.3) / approachSteps.length) * 100}%` }}
                />
              </div>

              <ol className="grid grid-cols-5">
                {approachSteps.map((step, i) => {
                  const reached = i <= active;
                  const current = i === active;
                  return (
                    <li key={step.index} className="pr-8">
                      <div
                        tabIndex={0}
                        onMouseEnter={() => setFocusStep(i)}
                        onMouseLeave={() => setFocusStep(null)}
                        onFocus={() => setFocusStep(i)}
                        onBlur={() => setFocusStep(null)}
                        aria-label={`Step ${i + 1}: ${step.word}`}
                        className="group cursor-default pt-9"
                      >
                        <span
                          aria-hidden
                          className={`block h-[11px] w-[11px] -translate-y-[37px] rounded-full border-2 transition-all duration-500 ${
                            current
                              ? "border-accent bg-accent"
                              : reached
                                ? "border-accent/60 bg-accent/40"
                                : "border-line-strong bg-bg"
                          }`}
                        />
                        <span
                          className={`block font-mono text-[11px] transition-colors duration-500 ${
                            reached ? "text-accent" : "text-faint"
                          }`}
                        >
                          {step.index}
                        </span>
                        <span
                          className={`mt-2.5 block font-display text-[1.65rem] font-light tracking-tight transition-colors duration-500 ${
                            reached ? "text-ink" : "text-faint"
                          }`}
                        >
                          {step.word}
                        </span>
                        <span
                          className={`mt-3 block text-sm leading-relaxed transition-colors duration-500 ${
                            current ? "text-muted" : "text-faint"
                          }`}
                        >
                          {step.text}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* Mobile / tablet: vertical sequence */}
          <div className="lg:hidden">
            <ol className="relative space-y-10 border-l border-line pl-8">
              {approachSteps.map((step, i) => {
                const reached = i <= active;
                return (
                  <Reveal as="li" key={step.index} delay={i * 70} className="relative">
                    <span
                      aria-hidden
                      className={`absolute -left-[37px] top-1 h-[11px] w-[11px] rounded-full border-2 transition-colors duration-500 ${
                        reached ? "border-accent bg-accent" : "border-line-strong bg-bg"
                      }`}
                    />
                    <p className={`font-mono text-[11px] ${reached ? "text-accent" : "text-faint"}`}>{step.index}</p>
                    <h3 className="mt-1.5 font-display text-2xl font-light tracking-tight">{step.word}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{step.text}</p>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>

        <Reveal delay={120}>
          <p className="mt-16 border-t border-line pt-6 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
            …then back to the data, and around again.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
