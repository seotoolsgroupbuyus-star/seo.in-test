import cmsSectionSeo from '../../content/section-seo.json';
import {withBrandTitle} from './site';

// One shared metadata source for Astro pre-rendering and hydrated React pages.
// This prevents the four previously-mismatched routes from diverging again.
export const sectionMeta = cmsSectionSeo;

export function sectionSeo(slug: keyof typeof sectionMeta) {
  const meta = sectionMeta[slug];
  return {title:withBrandTitle(meta.title),description:meta.description,path:'/'+slug};
}
