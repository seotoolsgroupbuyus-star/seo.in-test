import {getCompetitorMeta} from '../data/competitorMeta';
import {withBrandTitle} from './site';

// One shared metadata source for Astro pre-rendering and hydrated React pages.
// This prevents the four previously-mismatched routes from diverging again.
export const sectionMeta = {
  'all-tools': {
    title: getCompetitorMeta('all-tools')?.title ?? 'All Tools | SEO Group Buy',
    description: getCompetitorMeta('all-tools')?.description ?? 'Browse all group buy SEO, AI, writing, and design tools available on SEO Group Buy.',
  },
  blog: {
    title: getCompetitorMeta('blog')?.title ?? 'Blog | SEO Group Buy',
    description: getCompetitorMeta('blog')?.description ?? 'Guides and articles about group buy SEO and AI tools from SEO Group Buy.',
  },
  pricing: {
    title: 'Pricing Plans',
    description: 'Compare SEO Group Buy plans — Lite $10/mo, Growth Starter $15/mo, Ahrefs Power Bundle $25/mo, Writer Toolkit, and more. Affordable group buy SEO tool access.',
  },
  faq: {
    title: 'FAQ',
    description: 'Frequently asked questions about SEO Group Buy — how group buy access works, data privacy, refunds, uptime, and using tools for client projects.',
  },
} as const;

export function sectionSeo(slug: keyof typeof sectionMeta) {
  const meta = sectionMeta[slug];
  return {title:withBrandTitle(meta.title),description:meta.description,path:'/'+slug};
}
