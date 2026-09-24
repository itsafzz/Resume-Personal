import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "../lib/data";

const marqueeItems = [
  "Technical SEO",
  "Content Strategy",
  "Keyword Research",
  "Analytics & Reporting",
  "Search Intent",
  "Site Architecture",
  "Organic Growth",
  "Experimentation",
  "Search Console",
  "Performance",
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  /* Subtle parallax / fade on the hero content as it leaves the viewport */
  useEffect(() => {
    const el = contentRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const vh = window.innerHeight || 1;
        if (y < vh) {
          el.style.transform = `translateY(${y * 0.07}px)`;
          el.style.opacity = String(Math.max(0.25, 1 - y / (vh * 1.05)));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-clip" aria-label="Introduction">
      {/* Soft background glow — restrained, not a light show */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-48 h-[42rem] w-[42rem] rounded-full bg-accent opacity-[0.05] blur-[130px]"
      />

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-32 sm:px-8 md:pt-36"
      >
        {/* Status row */}
        <div className="animate-rise flex flex-wrap items-center justify-between gap-4" style={{ animationDelay: "120ms" }}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-muted">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            {site.status}
          </p>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-faint sm:block">{site.location}</p>
        </div>

        {/* Name */}
        <h1
          className="animate-rise mt-10 font-display text-[clamp(3.9rem,14vw,10rem)] font-light leading-[0.95] tracking-[-0.02em] md:mt-14"
          style={{ animationDelay: "240ms" }}
        >
          Afsal<span className="text-accent">.</span>
        </h1>

        {/* Role */}
        <p
          className="animate-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.24em] text-muted sm:text-xs md:mt-8"
          style={{ animationDelay: "360ms" }}
        >
          <span className="text-accent">/</span>
          <span>SEO &amp; Digital Marketing Professional</span>
        </p>

        {/* Intro */}
        <p
          className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed"
          style={{ animationDelay: "480ms" }}
        >
          Building <span className="text-ink">discoverable</span>, <span className="text-ink">useful</span>, and{" "}
          <span className="text-ink">measurable</span> digital experiences through SEO, content, analytics, and
          continuous experimentation.
        </p>

        {/* CTAs */}
        <div className="animate-rise mt-11 flex flex-wrap items-center gap-3" style={{ animationDelay: "600ms" }}>
          <a href="#experience" className="btn btn-primary">
            View experience
            <ArrowDown size={14} strokeWidth={2} className="btn-icon btn-icon-down" />
          </a>
          <a href="#work" className="btn btn-outline">
            Explore my work
            <ArrowUpRight size={14} strokeWidth={2} className="btn-icon" />
          </a>
          <a href="#contact" className="btn btn-ghost link-underline">
            Contact me
          </a>
        </div>
      </div>

      {/* Focus-area strip */}
      <div className="group/marquee animate-rise border-t border-line py-4" style={{ animationDelay: "760ms" }}>
        <div className="marquee overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-8 group-hover/marquee:[animation-play-state:paused]">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                aria-hidden={i >= marqueeItems.length}
                className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-faint"
              >
                {item}
                <span aria-hidden className="text-accent/70">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical domain marker on wide screens */}
      <span
        aria-hidden
        className="absolute bottom-28 right-7 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-faint [writing-mode:vertical-rl] xl:block"
      >
        afsalseoexpert.in — portfolio
      </span>
    </section>
  );
}
