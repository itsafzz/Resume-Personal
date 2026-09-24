import { useCallback } from "react";
import { Download, Mail } from "lucide-react";
import { Reveal } from "../lib/reveal";
import { SectionHead, PlaceholderBadge } from "./ui";
import { downloadResumePdf } from "../lib/pdf";
import { experience, resumeSummary, resumeTools, resumeEducation, skillCategories, site } from "../lib/data";

function SheetLabel({ children }: { children: string }) {
  return (
    <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
      {children}
    </h3>
  );
}

export default function ResumeSection() {
  const handleDownload = useCallback(() => {
    downloadResumePdf();
  }, []);

  return (
    <section id="resume" aria-labelledby="resume-title" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Intro column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                index="06"
                eyebrow="Resume"
                id="resume-title"
                title={
                  <>
                    The <em className="font-normal italic text-accent">one-page</em> version.
                  </>
                }
              />
              <Reveal delay={180}>
                <p className="-mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
                  A distilled view of experience, skills, and tools. The PDF is generated in your browser — clean,
                  text-based, and ATS-friendly. No email gate, no tracking.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={handleDownload} className="btn btn-primary">
                    Download resume
                    <Download size={14} strokeWidth={2} className="btn-icon btn-icon-down" />
                  </button>
                  <a href={`mailto:${site.email}`} className="btn btn-ghost link-underline">
                    <Mail size={14} strokeWidth={1.75} aria-hidden />
                    Ask for it instead
                  </a>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  PDF · A4 · ~40 KB · generated locally
                </p>
              </Reveal>
            </div>
          </div>

          {/* Resume sheet */}
          <Reveal delay={120} className="lg:col-span-8">
            <article
              aria-label="Resume preview"
              className="relative border border-line bg-elev p-7 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.6)] sm:p-10"
            >
              <span className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.16em] text-faint sm:right-7 sm:top-6">
                v.2026
              </span>

              {/* Sheet header */}
              <header className="border-b border-line pb-7">
                <h3 className="font-display text-3xl font-light tracking-tight sm:text-4xl">
                  Afsal<span className="text-accent">.</span>
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{site.role}</p>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-faint">
                  <span>{site.email}</span>
                  <span aria-hidden>·</span>
                  <span>{site.domain}</span>
                  <span aria-hidden>·</span>
                  <span>India / Remote</span>
                </p>
              </header>

              <div className="mt-8 space-y-9">
                {/* Summary */}
                <section>
                  <SheetLabel>Professional summary</SheetLabel>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{resumeSummary}</p>
                </section>

                {/* Experience */}
                <section>
                  <SheetLabel>Experience</SheetLabel>
                  <ul className="mt-4 divide-y divide-line border-y border-line">
                    {experience.map((job) => (
                      <li key={job.role} className="py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <p className="text-[15px] font-medium text-ink">
                            {job.role} <span className="text-muted">— {job.company}</span>
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{job.period}</p>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{job.overview}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Skills */}
                <section>
                  <SheetLabel>Core skills</SheetLabel>
                  <dl className="mt-4 space-y-2.5">
                    {skillCategories.map((cat) => (
                      <div key={cat.index} className="grid gap-0.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                        <dt className="text-[13px] font-medium text-ink">{cat.title}</dt>
                        <dd className="text-[13px] leading-relaxed text-muted">{cat.items.join(", ")}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                {/* Tools */}
                <section>
                  <SheetLabel>Tools</SheetLabel>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {resumeTools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <SheetLabel>Education &amp; certifications</SheetLabel>
                  <ul className="mt-4 space-y-3">
                    {resumeEducation.map((ed) => (
                      <li key={ed.title} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="text-[13px] font-medium text-ink">{ed.title}</p>
                        <PlaceholderBadge />
                        <p className="w-full text-[13px] text-muted sm:w-auto">{ed.detail}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <footer className="mt-10 border-t border-line pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  References &amp; full role history on request
                </p>
              </footer>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
