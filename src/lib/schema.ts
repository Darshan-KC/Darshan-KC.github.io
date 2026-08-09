import { siteConfig } from "@lib/site";
import profile from "@data/profile.json";
import settings from "@data/settings.json";
import skills from "@data/skills.json";
import social from "@data/social.json";

const SITE_URL = siteConfig.url;

const toAbsolute = (path: string) => new URL(path, SITE_URL).toString();

const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

export const personSchema = () => ({
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.about.summary,
  url: SITE_URL,
  image: toAbsolute(profile.picture),
  email: settings.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: settings.location.split(",")[0].trim() || "Pokhara",
    addressCountry: "Nepal",
  },
  knowsAbout: [
    ...new Set([
      ...profile.focus,
      ...skills.categories.flatMap((category) => category.items),
    ]),
  ],
  sameAs: social
    .filter((link) => isExternal(link.href))
    .map((link) => link.href),
});

export const webSiteSchema = () => ({
  "@type": "WebSite",
  name: siteConfig.name,
  url: SITE_URL,
  description: siteConfig.description,
});

export const webPageSchema = (
  canonicalPath: string,
  title: string,
  description?: string,
) => ({
  "@type": "WebPage",
  url: toAbsolute(canonicalPath),
  name: title,
  description,
});

export const collectionPageSchema = (
  canonicalPath: string,
  title: string,
  description?: string,
) => ({
  "@type": "CollectionPage",
  url: toAbsolute(canonicalPath),
  name: title,
  description,
});

export const profilePageSchema = (
  canonicalPath: string,
  title: string,
  description?: string,
) => ({
  "@type": "ProfilePage",
  url: toAbsolute(canonicalPath),
  name: title,
  description,
  mainEntity: personSchema(),
});

export const contactPageSchema = (
  canonicalPath: string,
  title: string,
  description?: string,
) => ({
  "@type": "ContactPage",
  url: toAbsolute(canonicalPath),
  name: title,
  description,
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsolute(item.path),
  })),
});

export const articleSchema = (article: {
  title: string;
  summary: string;
  published: string;
  slug: string;
  image: string[];
}) => ({
  "@type": "Article",
  headline: article.title,
  description: article.summary,
  datePublished: article.published,
  dateModified: article.published,
  mainEntityOfPage: toAbsolute(`/articles/${article.slug}`),
  image: article.image.map((src) => toAbsolute(src)),
  author: {
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
  },
  publisher: {
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
  },
  inLanguage: "en",
});

export const techArticleSchema = (project: {
  title: string;
  summary: string;
  slug: string;
  stack: string[];
}) => ({
  "@type": "TechArticle",
  headline: project.title,
  description: project.summary,
  mainEntityOfPage: toAbsolute(`/case-studies/${project.slug}`),
  keywords: project.stack,
  author: {
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
  },
  publisher: {
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
  },
  inLanguage: "en",
});
