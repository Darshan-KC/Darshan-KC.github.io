import articles from "@data/articles.json";
import { siteConfig } from "@lib/site";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const items = articles
    .slice()
    .sort((a, b) => b.id - a.id)
    .map((article) => {
      const url = new URL(
        `/articles/${article.slug}`,
        siteConfig.url,
      ).toString();
      const pubDate = new Date(`${article.published}T00:00:00Z`).toUTCString();
      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${article.summary}]]></description>
          <content:encoded><![CDATA[${article.content}]]></content:encoded>
        </item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} — Articles`)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(new URL("/rss.xml", siteConfig.url).toString())}" rel="self" type="application/rss+xml" />
    <image>
      <url>${escapeXml(new URL(siteConfig.ogImage, siteConfig.url).toString())}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${escapeXml(siteConfig.url)}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
