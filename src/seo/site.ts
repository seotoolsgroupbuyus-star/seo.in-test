import homepage from '../../content/homepage.json';
export const SITE_ORIGIN = 'https://seogroupbuy.in';
export const BRAND_NAME = 'SEO Group Buy';

/**
 * Put brand in the first half of every meta/document title.
 * Example: "SEO Group Buy | Majestic Group Buy - $10/mo"
 */
export function withBrandTitle(title: string): string {
  let rest = title.trim();
  // Drop trailing " | SEO Group Buy" / " - SEO Group Buy"
  rest = rest.replace(new RegExp(`\\s*[|–—-]\\s*${BRAND_NAME}\\s*$`, 'i'), '').trim();
  // Drop leading brand if already present so we don't double it
  rest = rest.replace(new RegExp(`^${BRAND_NAME}\\s*[|–—:-]\\s*`, 'i'), '').trim();
  if (!rest) return BRAND_NAME;
  if (rest.toLowerCase() === BRAND_NAME.toLowerCase()) return BRAND_NAME;
  return `${BRAND_NAME} | ${rest}`;
}

export const DEFAULT_META = {
  title: withBrandTitle(homepage.seoTitle || 'Affordable Group Buy SEO Tools at Better Prices'),
  description:
    homepage.seoDescription || 'Access popular group buy SEO tools at affordable prices with simple plans, reliable access, and tools built for everyday SEO work.',
  path: '/',
} as const;
