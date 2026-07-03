export interface Profile {
  name: string;
  title: string;
  tagline: string;
  heroSubtitle: string;
  focus: string[];
  about: {
    summary: string;
    narrative: string[];
    highlights: string[];
  };
  picture: string;
  stats: { label: string; value: string }[];
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  challenges: string[];
  lessons: string[];
  github: string;
  demo: string;
}

export interface ExperienceItem {
  id: string;
  type: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
}

export interface SkillsData {
  categories: { name: string; items: string[] }[];
  learning: string[];
}

export interface CommunityItem {
  title: string;
  summary: string;
  highlights: string[];
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  href: string;
  published: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Settings {
  siteTitle: string;
  description: string;
  email: string;
  location: string;
  availability: string;
  linkedin: string;
  github: string;
  formspree: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}
