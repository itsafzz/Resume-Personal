/* ------------------------------------------------------------------ */
/* Shared content for afsalseoexpert.in                                */
/* Timeline, project, and education entries marked "representative"    */
/* are anonymised placeholders — not fabricated claims.                */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Afsal",
  role: "SEO & Digital Marketing Professional",
  domain: "afsalseoexpert.in",
  url: "https://afsalseoexpert.in/",
  email: "hello@afsalseoexpert.in",
  location: "India · Remote-friendly",
  status: "Open to new projects & roles",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "LinkedIn", handle: "in/afsalseoexpert", href: "https://www.linkedin.com/in/afsalseoexpert", icon: "linkedin" },
  { label: "X / Twitter", handle: "@afsalseoexpert", href: "https://x.com/afsalseoexpert", icon: "twitter" },
  { label: "GitHub", handle: "afsalseoexpert", href: "https://github.com/afsalseoexpert", icon: "github" },
] as const;

/* ------------------------------ About ------------------------------ */

export const focusAreas = [
  {
    title: "Search visibility & organic growth",
    text: "Making the right pages findable for the queries that actually matter to the business.",
  },
  {
    title: "Technical SEO & site health",
    text: "Crawlability, indexation, site structure, speed — the unglamorous work that decides everything else.",
  },
  {
    title: "Content strategy & on-page work",
    text: "Content planned around intent, audited honestly, and internally linked like a system.",
  },
  {
    title: "Analytics & measurement",
    text: "Search Console and analytics over gut feeling. If it can't be measured, it can't be improved.",
  },
  {
    title: "Understanding user intent",
    text: "Keyword lists are inputs. The real job is understanding what a person wanted when they searched.",
  },
  {
    title: "Continuous learning",
    text: "Search changes constantly. I keep a testing habit and read the changelogs so clients don't have to.",
  },
];

/* ---------------------------- Experience --------------------------- */

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  representative?: boolean;
  overview: string;
  responsibilities: string[];
  outcome: string;
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "SEO Analyst",
    company: "Feathersoft Info Solutions",
    location: "Onsite · India",
    overview:
      "Leading organic search work end-to-end for small and mid-sized businesses — from technical foundations and research to content programs and measurement.",
    responsibilities: [
      "Technical and on-page SEO audits with prioritised fix lists",
      "Keyword research and search-intent mapping",
      "Content briefs, optimisation, and internal linking",
      "Site structure, indexation, and crawl health management",
      "Reporting in Search Console and Google Analytics",
      "Working directly with developers and stakeholders",
    ],
    outcome:
      "Progress measured through qualified clicks, positions, and conversions in Search Console & GA4 — client-specific figures shared privately on request.",
    tags: ["Technical SEO", "Content Strategy", "GA4", "Search Console"],
  },
  {
    period: "2020 — 2022",
    role: "SEO Analyst",
    company: "Digital Marketing Agency",
    location: "Kerala, India",
    representative: true,
    overview:
      "Managed day-to-day SEO for a portfolio of client websites across services, local businesses, and e-commerce.",
    responsibilities: [
      "Recurring site audits and issue tracking",
      "On-page optimisation across client portfolios",
      "Local SEO — business profiles, citations, reviews",
      "Monthly reporting and client communication",
      "Supporting development teams on technical fixes",
    ],
    outcome:
      "Representative entry shown for structure — verified role history and references are included in the full resume.",
    tags: ["Audits", "Local SEO", "On-page", "Reporting"],
  },
  {
    period: "2019 — 2020",
    role: "Digital Marketing Intern",
    company: "Marketing Studio",
    location: "Kerala, India",
    representative: true,
    overview:
      "Started in general digital marketing — content updates, basic on-page work, keyword research, and reporting — before specialising in search.",
    responsibilities: [
      "Keyword research and competitor checks",
      "On-page basics: titles, descriptions, headings",
      "Content updates and CMS publishing",
      "Assisting with monthly performance reports",
    ],
    outcome:
      "Representative entry shown for structure — verified role history and references are included in the full resume.",
    tags: ["Research", "CMS", "On-page basics"],
  },
];

/* ------------------------------ Skills ----------------------------- */

export interface SkillCategory {
  index: string;
  title: string;
  note: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    index: "01",
    title: "SEO",
    note: "Core organic search work",
    items: [
      "Technical SEO",
      "On-page SEO",
      "Off-page SEO",
      "Keyword research",
      "Competitor analysis",
      "SEO audits",
      "Search Console",
      "Google Analytics",
    ],
  },
  {
    index: "02",
    title: "Content",
    note: "Planned around intent",
    items: [
      "Content strategy",
      "Search intent",
      "Content optimisation",
      "Content auditing",
      "Internal linking",
    ],
  },
  {
    index: "03",
    title: "Analytics & Tools",
    note: "Measure, then decide",
    items: [
      "Google Search Console",
      "Google Analytics",
      "Google Tag Manager",
      "Looker Studio reporting",
      "SEO platforms (Ahrefs, Semrush)",
      "Crawling & auditing tools",
    ],
  },
  {
    index: "04",
    title: "Digital",
    note: "Wider context, same goal",
    items: [
      "Website optimisation",
      "Performance analysis",
      "Conversion-focused thinking",
      "Digital strategy",
    ],
  },
];

/* ---------------------------- Projects ----------------------------- */

export interface Project {
  name: string;
  context: string;
  visual: "growth" | "audit" | "clusters";
  problem: string;
  approach: string;
  result: string;
  tools: string[];
}

export const projects: Project[] = [
  {
    name: "Organic Growth Program",
    context: "Service business website",
    visual: "growth",
    problem: "Strong services, weak search presence — most pages were invisible for non-brand queries.",
    approach:
      "Technical cleanup first, then intent-based keyword mapping, a rebuild of core pages, and deliberate internal linking.",
    result:
      "Steady growth in non-brand impressions and clicks, tracked month over month in Search Console.",
    tools: ["Search Console", "GA4", "Screaming Frog", "Keyword research"],
  },
  {
    name: "Technical Audit & Migration Support",
    context: "Website redesign / platform change",
    visual: "audit",
    problem: "A planned redesign risked quietly losing the organic visibility the site had already earned.",
    approach:
      "Pre-launch crawl, careful redirect mapping, indexation monitoring, and structured post-launch QA.",
    result: "Indexation stayed stable through launch — issues caught and fixed within days, not months.",
    tools: ["Screaming Frog", "Search Console", "Redirect mapping", "QA checklists"],
  },
  {
    name: "Content Strategy Framework",
    context: "Blog & resource hub",
    visual: "clusters",
    problem: "Content was being published without a plan — overlapping topics, little traffic, no structure.",
    approach:
      "Topic clustering around core services, intent-first briefs, and pruning or consolidating weak pages.",
    result: "A clearer site structure, less cannibalisation, and a publishing cadence that could actually be sustained.",
    tools: ["Keyword clustering", "Content audits", "Spreadsheets", "Search Console"],
  },
];

/* ----------------------------- Approach ---------------------------- */

export interface ApproachStep {
  index: string;
  word: string;
  text: string;
}

export const approachSteps: ApproachStep[] = [
  {
    index: "01",
    word: "Understand",
    text: "The business, its audience, and what success should actually be measured against.",
  },
  {
    index: "02",
    word: "Analyse",
    text: "The search landscape, competitors, technical health, and the content already in place.",
  },
  {
    index: "03",
    word: "Optimise",
    text: "Fix the foundations first — then improve pages, structure, and content against the plan.",
  },
  {
    index: "04",
    word: "Measure",
    text: "Search Console and analytics over gut feeling. Watch what changed, and what didn't.",
  },
  {
    index: "05",
    word: "Iterate",
    text: "Refine, expand what works, and keep testing. Good SEO is never really finished.",
  },
];

/* ------------------------------ Resume ----------------------------- */

export const resumeSummary =
  "SEO and digital marketing professional working across technical SEO, content strategy, and analytics. Focused on building discoverable, useful, and measurable digital experiences — and on steady, compounding organic growth over shortcuts.";

export const resumeTools = [
  "Google Search Console",
  "Google Analytics (GA4)",
  "Tag Manager",
  "Looker Studio",
  "Screaming Frog",
  "Ahrefs / Semrush",
  "WordPress",
  "Spreadsheets",
];

export const resumeEducation = [
  { title: "Bachelor's degree", detail: "Details available on request", placeholder: true },
  { title: "Analytics & SEO certifications", detail: "Google Analytics / SEO coursework — placeholder", placeholder: true },
];
