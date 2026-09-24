import type { ComponentType } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { Reveal } from "../lib/reveal";
import { SectionHead, PlaceholderBadge } from "./ui";
import { projects, type Project } from "../lib/data";

/* ------------------------------------------------------------------ */
/* Abstract SVG visuals — honest, minimal graphics rather than         */
/* fake screenshots or invented photography.                           */
/* ------------------------------------------------------------------ */

function VisualGrowth() {
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label="Abstract ascending line chart" className="h-full w-full">
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="20" x2="300" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />
      ))}
      <path
        d="M24 182 L72 166 L116 172 L160 132 L204 140 L248 96 L296 58"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="transition-transform duration-700 ease-out group-hover:-translate-y-1.5"
      />
      {[
        [24, 182],
        [116, 172],
        [204, 140],
        [296, 58],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i === 3 ? 4.5 : 3}
          fill={i === 3 ? "var(--accent)" : "var(--bg)"}
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="transition-all duration-700 group-hover:-translate-y-1.5"
          style={{ transitionDelay: `${i * 60}ms` }}
        />
      ))}
      <text x="24" y="208" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="2">
        NON-BRAND CLICKS / SIX MONTHS
      </text>
    </svg>
  );
}

function VisualAudit() {
  const flagged = new Set([2, 6, 11, 15, 21, 27, 33]);
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label="Abstract crawl grid with flagged cells" className="h-full w-full">
      {Array.from({ length: 40 }, (_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        const isFlag = flagged.has(i);
        return (
          <rect
            key={i}
            x={28 + col * 34}
            y={28 + row * 34}
            width="26"
            height="26"
            rx="3"
            strokeWidth="1"
            className={`transition-all duration-500 ${
              isFlag
                ? "fill-accent stroke-accent opacity-75 group-hover:opacity-100"
                : "fill-transparent stroke-line-strong group-hover:fill-accent-soft"
            }`}
            style={{ transitionDelay: `${i * 14}ms` }}
          />
        );
      })}
      <text x="28" y="208" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="2">
        URLS CRAWLED — ISSUES FLAGGED
      </text>
    </svg>
  );
}

function VisualClusters() {
  const center = [160, 110];
  const satellites = [
    [70, 52],
    [256, 46],
    [56, 168],
    [214, 178],
    [282, 122],
  ];
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label="Abstract topic cluster node map" className="h-full w-full">
      {satellites.map(([x, y], i) => (
        <line
          key={`l${i}`}
          x1={center[0]}
          y1={center[1]}
          x2={x}
          y2={y}
          stroke="var(--line-strong)"
          strokeWidth="1"
          pathLength={1}
          className="transition-all duration-700"
          style={{ transitionDelay: `${i * 70}ms` }}
        />
      ))}
      {satellites.map(([x, y], i) => (
        <circle
          key={`c${i}`}
          cx={x}
          cy={y}
          r="9"
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeOpacity="0.55"
          strokeWidth="1.25"
          className="transition-all duration-700 group-hover:stroke-opacity-100"
          style={{ transitionDelay: `${i * 70}ms` }}
        />
      ))}
      <circle cx={center[0]} cy={center[1]} r="14" fill="var(--accent)" />
      <circle cx={center[0]} cy={center[1]} r="24" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" />
      <text x="24" y="208" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="2">
        TOPIC CLUSTERS / INTERNAL LINKS
      </text>
    </svg>
  );
}

const visuals: Record<Project["visual"], ComponentType> = {
  growth: VisualGrowth,
  audit: VisualAudit,
  clusters: VisualClusters,
};

/* ------------------------------------------------------------------ */

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:py-36">
        <SectionHead
          index="03"
          eyebrow="Selected work"
          id="work-title"
          title={
            <>
              Projects, <em className="font-normal italic text-accent">presented honestly.</em>
            </>
          }
          lede="Problem, approach, and outcome — the shape of real engagements, without invented metrics or borrowed screenshots."
        />

        <Reveal delay={140}>
          <p className="mb-16 flex max-w-2xl items-start gap-2.5 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-faint">
            <Info size={13} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden />
            Entries are anonymised and representative, marked accordingly. Client-specific data and figures are
            shared privately on request.
          </p>
        </Reveal>

        <div className="space-y-16 md:space-y-20">
          {projects.map((project, i) => {
            const Visual = visuals[project.visual];
            return (
              <Reveal as="article" key={project.name} delay={i * 60} className="group border-t border-line pt-10 md:pt-14">
                <div className="grid items-start gap-9 lg:grid-cols-12">
                  {/* Visual */}
                  <div className="relative overflow-hidden border border-line bg-elev lg:col-span-5">
                    <div className="aspect-[16/11] p-4 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                      <Visual />
                    </div>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/[0.07] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
                    />
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg/60 text-muted opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-7 lg:pl-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                        {project.context}
                      </span>
                      <PlaceholderBadge label="Representative" />
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-light tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-[2rem]">
                      {project.name}
                    </h3>

                    <dl className="mt-7 border-t border-line">
                      {[
                        ["Problem", project.problem],
                        ["Approach", project.approach],
                        ["Result", project.result],
                      ].map(([label, value]) => (
                        <div key={label} className="grid gap-1.5 border-b border-line py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                          <dt className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-accent">
                            {label}
                          </dt>
                          <dd className="text-sm leading-relaxed text-muted">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
