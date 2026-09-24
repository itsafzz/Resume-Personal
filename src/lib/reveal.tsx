import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Reveal — adds .is-visible once the element scrolls into view.       */
/* Styled via src/index.css (.reveal). Reduced-motion safe (CSS).      */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "li" | "span" | "p" | "figure";
}

export function Reveal({ children, className = "", delay = 0, style, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* usePrefersReducedMotion                                             */
/* ------------------------------------------------------------------ */
export function usePrefersReducedMotion(): boolean {
  const ref = useRef(false);
  if (typeof window !== "undefined" && !ref.current) {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

/* ------------------------------------------------------------------ */
/* useSectionProgress — 0 → 1 as a section travels through the         */
/* viewport. Calls back with rAF-throttled scroll updates; the         */
/* callback receives the progress so callers can mutate DOM directly   */
/* (no re-render) or set state conditionally.                          */
/* ------------------------------------------------------------------ */
export function watchSectionProgress(
  el: HTMLElement,
  onProgress: (p: number) => void,
  opts: { startVh?: number; endVh?: number } = {}
): () => void {
  const startVh = opts.startVh ?? 0.85;
  const endVh = opts.endVh ?? 0.25;
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const total = (startVh - endVh) * vh + rect.height;
    const passed = startVh * vh - rect.top;
    const p = Math.min(1, Math.max(0, passed / Math.max(1, total)));
    onProgress(p);
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}
