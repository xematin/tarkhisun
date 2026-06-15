// Generates public/sitemap.xml and public/rss.xml from blogPosts data.
// Runs via predev/prebuild npm scripts.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { blogPosts } from "../src/data/blogPosts";

const BASE_URL = "https://tarkhisun.com";

// ---- Persian (Jalali) digit + date helpers ----
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toEnDigits(s: string): string {
  return s.replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)));
}

// Jalali -> Gregorian conversion (Borkowski algorithm).
function jalaliToGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  let gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;
  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  gy += 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let gd = days + 1;
  const sal_a = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let gm = 0;
  for (gm = 1; gm <= 12 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
  return [gy, gm, gd];
}

function jalaliDateToISO(faDate: string): string {
  const parts = toEnDigits(faDate).split("/").map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some(isNaN)) return new Date().toISOString().slice(0, 10);
  const [gy, gm, gd] = jalaliToGregorian(parts[0], parts[1], parts[2]);
  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
}

function jalaliDateToRFC822(faDate: string): string {
  const iso = jalaliDateToISO(faDate);
  return new Date(`${iso}T08:00:00Z`).toUTCString();
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ---- Static routes (mirrors current sitemap priorities) ----
interface StaticEntry {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}
const today = new Date().toISOString().slice(0, 10);
const staticEntries: StaticEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { path: "/blog", changefreq: "daily", priority: "0.9", lastmod: today },
  { path: "/services", changefreq: "weekly", priority: "0.9", lastmod: today },
  { path: "/services/business-card", changefreq: "weekly", priority: "0.85", lastmod: today },
  { path: "/currencies", changefreq: "hourly", priority: "0.8", lastmod: today },
  { path: "/hscode", changefreq: "weekly", priority: "0.8", lastmod: today },
];

// ---- Build sitemap.xml ----
const sortedPosts = [...blogPosts].sort((a, b) => b.id - a.id);

const sitemapUrls = [
  ...staticEntries.map(
    (e) =>
      `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  ),
  ...sortedPosts.map((p) => {
    const iso = jalaliDateToISO(p.date);
    return `  <url>\n    <loc>${BASE_URL}/blog/${p.slug}</loc>\n    <lastmod>${iso}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  }),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join("\n")}
</urlset>
`;

writeFileSync(resolve("public/sitemap.xml"), sitemap, "utf-8");
console.log(`sitemap.xml written (${staticEntries.length + sortedPosts.length} entries)`);

// ---- Build rss.xml ----
const lastBuildDate = new Date().toUTCString();
const rssItems = sortedPosts
  .slice(0, 30)
  .map((p) => {
    const url = `${BASE_URL}/blog/${p.slug}`;
    const pubDate = jalaliDateToRFC822(p.date);
    const image = p.image ? `${BASE_URL}${p.image}` : "";
    const categories = [p.category, ...(p.keywords || [])]
      .map((c) => `      <category>${escapeXml(c)}</category>`)
      .join("\n");
    const enclosure = image
      ? `\n      <enclosure url="${escapeXml(image)}" type="image/webp" />`
      : "";
    return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
      <author>info@tarkhisun.com (${escapeXml(p.author)})</author>${enclosure}
${categories}
    </item>`;
  })
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>وبلاگ ترخیصان</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>آخرین مقالات و راهنمای ترخیص کالا، گمرک، تعرفه و تجارت بین‌الملل از ترخیصان</description>
    <language>fa-IR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>tarkhisun-sitemap-generator</generator>
${rssItems}
  </channel>
</rss>
`;

writeFileSync(resolve("public/rss.xml"), rss, "utf-8");
console.log(`rss.xml written (${Math.min(sortedPosts.length, 30)} items)`);
