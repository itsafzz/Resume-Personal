import { Reveal } from "../lib/reveal";
import { SectionHead } from "./ui";
import { skillCategories } from "../lib/data";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:py-36">
        <SectionHead
          index="04"
          eyebrow="Skills"
          id="skills-title"
          title={
            <>
              Capabilities, <em className="font-normal italic text-accent">measured honestly.</em>
            </>
          }
          lede="No invented percentages here — just the areas I work in regularly, grouped the way they tend to show up in real projects."
        />

        <div className="grid border-t border-l border-line sm:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <Reveal
              key={cat.index}
              delay={i * 90}
              className="border-b border-r border-line p-7 sm:p-9 lg:p-10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-light tracking-tight sm:text-[1.7rem]">{cat.title}</h3>
                <span className="font-mono text-[11px] text-faint">{cat.index}</span>
              </div>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{cat.note}</p>

              <ul className="mt-7 border-t border-line">
                {cat.items.map((item) => (
                  <li key={item} className="group relative border-b border-line">
                    <span className="flex items-baseline py-[13px]">
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-accent opacity-0 transition-all duration-400 group-hover:opacity-100"
                      />
                      <span className="text-[15px] text-muted transition-all duration-400 group-hover:translate-x-5 group-hover:text-ink">
                        {item}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            Tools change; judgement doesn&rsquo;t. The list above reflects current working practice — and it grows
            deliberately, one real project at a time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
