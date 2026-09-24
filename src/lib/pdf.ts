/* ------------------------------------------------------------------ */
/* Minimal, dependency-free PDF writer.                                */
/* Generates a clean single-column resume PDF (A4) using only the      */
/* built-in Helvetica fonts — small file, ATS-friendly, no libraries.  */
/* All output is ASCII; byte offsets are computed for a valid xref.    */
/* ------------------------------------------------------------------ */

import { site, experience, resumeSummary, resumeTools, resumeEducation, skillCategories } from "./data";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;

const ACCENT: [number, number, number] = [0.71, 0.31, 0.13];
const INK = 0.13;
const MUTED = 0.42;

function sanitize(s: string): string {
  return s
    .replace(/[\u2018\u2019\u201A]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2022/g, "-")
    .replace(/\u00B7/g, "|")
    .replace(/\u2192/g, "->")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdf(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

/* Rough width estimate for wrap decisions (Helvetica-ish). */
function estWidth(text: string, size: number, bold = false): number {
  let w = 0;
  for (const ch of text) {
    if (ch === " ") w += 0.28;
    else if ("iljI.,:;!'|".includes(ch)) w += 0.26;
    else if ("mwMW".includes(ch)) w += 0.92;
    else if (ch >= "A" && ch <= "Z") w += 0.68;
    else w += 0.52;
  }
  return w * size * (bold ? 1.05 : 1);
}

function wrap(text: string, size: number, maxW: number, bold = false): string[] {
  const words = sanitize(text).split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (estWidth(candidate, size, bold) <= maxW || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

class PageWriter {
  ops: string[] = [];
  y = PAGE_H - MARGIN;

  text(x: number, y: number, str: string, size: number, opts: { bold?: boolean; color?: number | [number, number, number] } = {}) {
    const font = opts.bold ? "F2" : "F1";
    const color = opts.color ?? INK;
    const paint = Array.isArray(color) ? `${color[0]} ${color[1]} ${color[2]} rg` : `${color} g`;
    this.ops.push(`BT /${font} ${size} Tf ${paint} 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdf(sanitize(str))}) Tj ET`);
  }

  rule(x0: number, x1: number, y: number, gray = 0.75, width = 0.6) {
    this.ops.push(`${gray} G ${width} w ${x0.toFixed(2)} ${y.toFixed(2)} m ${x1.toFixed(2)} ${y.toFixed(2)} l S`);
  }
}

export function buildResumePdf(): Blob {
  const pages: PageWriter[] = [];
  let page = new PageWriter();
  pages.push(page);

  const ensureSpace = (needed: number) => {
    if (page.y - needed < MARGIN + 30) {
      page = new PageWriter();
      pages.push(page);
    }
  };

  const sectionLabel = (label: string) => {
    ensureSpace(34);
    page.y -= 16;
    page.text(MARGIN, page.y, label.toUpperCase(), 7.5, { bold: true, color: ACCENT });
    page.rule(MARGIN, MARGIN + CONTENT_W, page.y - 5, 0.8, 0.5);
    page.y -= 15;
  };

  const bodyLines = (text: string, size = 9, color: number = 0.25, indent = 0) => {
    for (const line of wrap(text, size, CONTENT_W - indent)) {
      ensureSpace(size + 4);
      page.text(MARGIN + indent, page.y, line, size, { color });
      page.y -= size + 3.4;
    }
  };

  /* ------------------------------- Header ------------------------------ */
  page.text(MARGIN, page.y, site.name, 24, { bold: true });
  page.y -= 16;
  page.text(MARGIN, page.y, site.role, 10.5, { color: ACCENT });
  page.y -= 14;
  page.text(MARGIN, page.y, `${site.email}  |  ${site.domain}  |  ${site.location}`, 8, { color: MUTED });
  page.y -= 6;
  page.rule(MARGIN, MARGIN + CONTENT_W, page.y, 0.25, 1);
  page.y -= 18;

  /* ------------------------------ Profile ------------------------------ */
  sectionLabel("Profile");
  bodyLines(resumeSummary, 9.2);

  /* ---------------------------- Experience ----------------------------- */
  sectionLabel("Experience");
  for (const job of experience) {
    ensureSpace(60);
    page.text(MARGIN, page.y, job.role, 10, { bold: true });
    page.y -= 12.5;
    page.text(
      MARGIN,
      page.y,
      `${job.company}${job.representative ? " (representative)" : ""}  |  ${job.period}  |  ${job.location}`,
      8,
      { color: MUTED }
    );
    page.y -= 13;
    bodyLines(job.overview, 9);
    page.y -= 2;
    for (const r of job.responsibilities.slice(0, 5)) {
      for (const [i, line] of wrap(r, 8.6, CONTENT_W - 14).entries()) {
        ensureSpace(12);
        page.text(MARGIN + 10, page.y, `${i === 0 ? "-" : " "}  ${line}`, 8.6, { color: 0.25 });
        page.y -= 11.6;
      }
    }
    page.y -= 9;
  }

  /* ------------------------------ Skills ------------------------------- */
  sectionLabel("Core skills");
  for (const cat of skillCategories) {
    ensureSpace(24);
    page.text(MARGIN, page.y, `${cat.title}:`, 8.8, { bold: true });
    const labelW = estWidth(`${cat.title}:`, 8.8, true) + 6;
    for (const [i, line] of wrap(cat.items.join(", "), 8.8, CONTENT_W - labelW).entries()) {
      page.text(MARGIN + labelW + (i > 0 ? 0 : 0), page.y, line, 8.8, { color: 0.25 });
      page.y -= 11.6;
    }
    page.y -= 4;
  }

  /* ------------------------------- Tools ------------------------------- */
  sectionLabel("Tools");
  bodyLines(resumeTools.join("  |  "), 8.8);

  /* ------------------------- Education & certs ------------------------- */
  sectionLabel("Education & certifications");
  for (const ed of resumeEducation) {
    ensureSpace(24);
    page.text(MARGIN, page.y, ed.title, 9.2, { bold: true });
    page.text(MARGIN + estWidth(ed.title, 9.2, true) + 8, page.y, "placeholder", 7.5, { color: ACCENT });
    page.y -= 12;
    bodyLines(ed.detail, 8.6, MUTED);
    page.y -= 4;
  }

  /* ------------------------------ Footers ------------------------------ */
  pages.forEach((p, i) => {
    p.rule(MARGIN, MARGIN + CONTENT_W, MARGIN - 12, 0.85, 0.4);
    p.text(MARGIN, MARGIN - 24, site.url, 7.5, { color: MUTED });
    const pg = `Page ${i + 1} of ${pages.length}`;
    p.text(MARGIN + CONTENT_W - estWidth(pg, 7.5), MARGIN - 24, pg, 7.5, { color: MUTED });
  });

  /* --------------------------- PDF assembly ---------------------------- */
  const numPages = pages.length;
  const catalogId = 1;
  const pagesId = 2;
  const firstPageId = 3;
  const firstContentsId = firstPageId + numPages;
  const fontRegularId = firstContentsId + numPages;
  const fontBoldId = fontRegularId + 1;
  const fontItalicId = fontBoldId + 1;
  const totalObjects = fontItalicId;

  const objects: Record<number, string> = {};
  objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  const kids = pages.map((_, i) => `${firstPageId + i} 0 R`).join(" ");
  objects[pagesId] = `<< /Type /Pages /Kids [${kids}] /Count ${numPages} >>`;
  pages.forEach((p, i) => {
    objects[firstPageId + i] =
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontItalicId} 0 R >> >> ` +
      `/Contents ${firstContentsId + i} 0 R >>`;
    const stream = p.ops.join("\n");
    objects[firstContentsId + i] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });
  objects[fontRegularId] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`;
  objects[fontBoldId] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`;
  objects[fontItalicId] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`;

  let out = "%PDF-1.4\n";
  const offsets: number[] = new Array(totalObjects + 1).fill(0);
  for (let id = 1; id <= totalObjects; id++) {
    offsets[id] = out.length;
    out += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }
  const startXref = out.length;
  out += `xref\n0 ${totalObjects + 1}\n`;
  out += "0000000000 65535 f \n";
  for (let id = 1; id <= totalObjects; id++) {
    out += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  out += `trailer\n<< /Size ${totalObjects + 1} /Root ${catalogId} 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  return new Blob([out], { type: "application/pdf" });
}

export function downloadResumePdf() {
  const blob = buildResumePdf();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Afsal-SEO-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
