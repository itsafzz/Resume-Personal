import { useEffect, useRef, useState } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { Reveal, watchSectionProgress } from "../lib/reveal";
import { SectionHead, PlaceholderBadge } from "./ui";
import { experience } from "../lib/data";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<(HTMLElement | null)[]>([]);

  /* Animate the timeline rail fill + markers as the section scrolls */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanup = watchSectionProgress(
      rail,
      (p) => {
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleY(${reduced ? 1 : p})`;
        }
        // Light up markers as the fill passes them
        markerRefs.current.forEach((marker, i) => {
          if (!marker) return;
          const threshold = (i + 0.4) / experience.length;
          marker.dataset.passed = p >= threshold || reduced ? "true" : "false";
        });
      },
      { startVh: 0.8, endVh: 0.35 }
    );
    return cleanup;
  }, []);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:py-36">
        <SectionHead
          index="02"
          eyebrow="Experience"
          id="experience-title"
          title={
            <>
              Work so far — <em className="font-normal italic text-accent">steadily</em> in search.
            </>
          }
          lede="A chronological view of roles and responsibilities. Expand any position for detail on scope and outcomes."
        />

        <div className="relative">
          {/* Rail */}
          <div ref={railRef} aria-hidden className="absolute bottom-4 left-[7px] top-8 w-px bg-line md:left-[169px]">
            <div
              ref={fillRef}
              className="h-full w-full origin-top bg-accent/70"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="relative">
            {experience.map((job, i) => {
              const open = openIndex === i;
              const panelId = `job-panel-${i}`;
              const buttonId = `job-button-${i}`;
              return (
                <Reveal as="li" key={job.role} delay={i * 80} className="relative pb-14 pl-8 last:pb-0 md:pl-56">
                  {/* Marker node */}
                  <div
                    aria-hidden
                    className="absolute left-0 top-[10px] flex h-[15px] w-[15px] items-center justify-center md:left-[162px]"
                  >
                    <span
                      ref={(el) => {
                        markerRefs.current[i] = el;
                      }}
                      data-passed="false"
                      className={`h-[9px] w-[9px] rounded-full border transition-all duration-500 ${
                        open ? "border-accent bg-accent" : "border-line-strong bg-bg"
                      } data-[passed=true]:border-accent/60`}
                    />
                  </div>

                  {/* Sticky period on md+ */}
                  <div className="hidden md:absolute md:left-0 md:top-1 md:block md:w-32">
                    <p className="font-mono text-[12px] tracking-[0.08em] text-muted">{job.period}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{job.location}</p>
                  </div>

                  <div
                    className={`group border-b border-line pb-8 transition-all duration-500 ${
                      open ? "" : "hover:pl-1"
                    }`}
                  >
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <span>
                        <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-faint md:hidden">
                          {job.period} · {job.location}
                        </span>
                        <span
                          className={`font-display text-2xl font-light tracking-tight transition-colors duration-300 sm:text-3xl ${
                            open ? "text-ink" : "text-ink/90 group-hover:text-accent"
                          }`}
                        >
                          {job.role}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <span className="font-mono text-xs text-muted">{job.company}</span>
                          {job.representative ? <PlaceholderBadge label="Representative" /> : null}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          open
                            ? "rotate-180 border-accent text-accent"
                            : "border-line text-muted group-hover:border-line-strong group-hover:text-ink"
                        }`}
                      >
                        <ChevronDown size={15} strokeWidth={1.75} />
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-6">
                          <p className="max-w-2xl leading-relaxed text-muted">{job.overview}</p>

                          <div className="mt-7 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                            <div>
                              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                                Key responsibilities
                              </h4>
                              <ul className="mt-3 space-y-2.5">
                                {job.responsibilities.map((r) => (
                                  <li key={r} className="flex items-baseline gap-3 text-sm leading-relaxed text-ink/85">
                                    <span aria-hidden className="text-accent">
                                      ›
                                    </span>
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                                Outcomes &amp; measurement
                              </h4>
                              <p className="mt-3 border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-muted">
                                {job.outcome}
                              </p>
                              <div className="mt-5 flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-muted"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal delay={120}>
          <p className="mt-12 flex max-w-2xl items-start gap-2.5 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-faint">
            <CircleAlert size={13} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden />
            Timeline entries marked &ldquo;Representative&rdquo; are anonymised placeholders — a verified,
            detailed history is available in the full resume on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
