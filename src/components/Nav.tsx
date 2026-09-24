import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { navLinks, site } from "../lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [theme, setTheme] = useState<string>(() =>
    typeof document !== "undefined" ? document.documentElement.dataset.theme || "dark" : "dark"
  );
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  /* Scroll state for header chrome */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Mobile menu: lock scroll, Esc to close, focus management */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      menuBtnRef.current?.focus();
    };
  }, [open]);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("afsal-theme", next);
    } catch {
      /* private mode — non-fatal */
    }
  }, [theme]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 md:h-[4.5rem]">
          <a
            href="#top"
            className="group flex items-baseline gap-2 font-display text-xl tracking-tight"
            aria-label="Afsal — back to top"
          >
            <span>
              afsal<span className="text-accent">.</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-faint transition-colors group-hover:text-muted sm:inline">
              seo — afsalseoexpert.in
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`link-underline font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active === link.href ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
            >
              {theme === "dark" ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
            </button>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink lg:hidden"
            >
              <Menu size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------- Mobile overlay ------------------------ */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-50 flex flex-col bg-bg transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8">
          <span className="font-display text-xl tracking-tight">
            afsal<span className="text-accent">.</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-6 sm:px-10">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={`overflow-hidden transition-all duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                  <span className="font-display text-4xl font-light tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="ml-auto self-center text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`px-6 pb-10 transition-all delay-300 duration-700 sm:px-10 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{site.status}</p>
          <a href={`mailto:${site.email}`} className="link-underline mt-2 inline-block text-lg text-ink">
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
