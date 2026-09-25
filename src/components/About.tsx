import { Reveal } from "../lib/reveal";
import { SectionHead } from "./ui";
import { focusAreas, site } from "../lib/data";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Sticky section intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                index="01"
                eyebrow="About"
                id="about-title"
                title={
                  <>
                    A quieter, more <em className="font-normal italic text-accent">honest</em> kind of SEO.
                  </>
                }
              />
              <Reveal delay={200}>
                <dl className="space-y-0 border-t border-line">
                  {[
                    ["Based in", "India — working remotely"],
                    ["Discipline", "SEO & digital marketing"],
                    ["Working style", "Calm, precise, long-term"],
                  ].map(([term, value]) => (
                    <div
                      key={term}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{term}</dt>
                      <dd className="text-right text-sm text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          {/* Body copy */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="font-display text-2xl font-light leading-snug text-ink sm:text-[1.7rem]">
                I&rsquo;m Afsal. My work sits at the intersection of technical detail and human intent — making
                websites easier to find for the people already looking for them.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-7 leading-relaxed text-muted">
                I care about the fundamentals done properly: pages that are crawlable, fast, and well structured;
                content that answers real questions; and measurement you can trust. I treat SEO less as a bag of
                tricks and more as a long-term practice — research, implement, measure, refine, repeat.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 leading-relaxed text-muted">
                That means saying &ldquo;it depends&rdquo; when it depends, preferring compounding improvements over
                shortcuts, and keeping one foot in the data and the other in the actual search results. Below is what
                that looks like in day-to-day work.
              </p>
            </Reveal>

            {/* Focus areas */}
            <div className="mt-12">
              <Reveal>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                  What I focus on
                </h3>
              </Reveal>
              <ul className="mt-5 border-t border-line">
                {focusAreas.map((area, i) => (
                  <Reveal as="li" key={area.title} delay={i * 60} className="group border-b border-line">
                    <div className="flex gap-5 py-5 sm:gap-8">
                      <span className="mt-1 font-mono text-[11px] text-faint transition-colors duration-300 group-hover:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                          {area.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{area.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={120}>
              <p className="mt-10 font-display text-xl italic text-muted">
                — quietly  obsessive  about search  engines <span className="text-accent">since 2019.</span>
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{site.name}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
