import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "../lib/reveal";
import { socials, site, navLinks } from "../lib/data";

/* Brand marks — lucide-react no longer ships brand icons, so these are */
/* compact inline SVGs (24×24, fill = currentColor).                    */
const brandPaths: Record<string, string> = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z",
  twitter:
    "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
};

function BrandIcon({ type, className }: { type: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" className={className} fill="currentColor">
      <path d={brandPaths[type]} />
    </svg>
  );
}

export default function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 md:pt-32 lg:pt-40">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            <span className="text-accent">07</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span>Contact</span>
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="contact-title"
            className="mt-8 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em]"
          >
            Let&rsquo;s build something <em className="font-normal italic text-accent">worth finding.</em>
          </h2>
        </Reveal>

        <Reveal delay={190}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            For projects, collaborations, professional opportunities, or simply a conversation about SEO and digital
            growth.
          </p>
        </Reveal>

        <Reveal delay={270}>
          <a
            href={`mailto:${site.email}`}
            className="group mt-12 inline-flex flex-wrap items-center gap-3 border-b border-line pb-4 transition-colors duration-300 hover:border-accent"
          >
            <span className="font-display text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl md:text-[2.75rem]">
              {site.email}
            </span>
            <ArrowUpRight
              size={26}
              strokeWidth={1.5}
              aria-hidden
              className="text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </a>
          <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            <Mail size={12} strokeWidth={1.75} aria-hidden />
            Usually replies within a day or two
          </p>
        </Reveal>

        {/* Profiles */}
        <Reveal delay={340}>
          <ul className="mt-16 divide-y divide-line border-y border-line">
            {socials.map((social) => {
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4 sm:gap-6"
                  >
                    <BrandIcon
                      type={social.icon}
                      className="shrink-0 text-faint transition-colors duration-300 group-hover:text-accent"
                    />
                    <span className="text-[15px] font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                      {social.label}
                    </span>
                    <span className="hidden font-mono text-xs text-faint sm:inline">/{social.handle}</span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.75}
                      aria-hidden
                      className="ml-auto text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            * profile URLs are placeholders pending final handles
          </p>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col gap-6 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
            © 2026 {site.name} — <span className="text-faint">{site.domain}</span>
          </p>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline font-mono text-[10px] uppercase tracking-[0.18em] text-faint transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <p className="hidden font-mono text-[10px] tracking-[0.14em] text-faint xl:block">
              Set in Fraunces &amp; Inter — built with React &amp; Tailwind
            </p>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <ArrowUp size={15} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
