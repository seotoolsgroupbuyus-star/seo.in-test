import {getCompetitorMeta} from './competitorMeta';
// Pages CMS edits the JSON files; original product definition remains fallback.
const cmsProducts = import.meta.glob('../../content/products/*.json', { eager: true, import: 'default' }) as Record<string, Partial<Product>>;
const cmsProductMap = Object.fromEntries(Object.values(cmsProducts).map((p) => [p.slug, p]));
import {SHOP_SIGNUP_URL, shopCartUrl} from './shopLinks';

export type ProductCategory =
  | 'Premium SEO Tools'
  | 'Content & Writing'
  | 'AI Tools'
  | 'Design & Creative'
  | 'Learning & Media'
  | 'E-commerce';

export type Product = {
  slug: string;
  name: string;
  /** Browser / SEO title — price matches buy-link / STGB shop */
  title: string;
  description: string;
  domain: string;
  category: ProductCategory;
  /** Monthly USD from STGB cart / buy link */
  priceMonthly: number;
  /** Yearly USD from STGB cart / buy link */
  priceYearly: number;
  shortDesc: string;
  buyHref?: string;
};

/** Default when tool has no STGB product match */
const DEFAULT = {monthly: 5, yearly: 35} as const;

export function formatUsd(amount: number): string {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(/\.00$/, '');
}

export function formatMonthlyPriceLabel(product: Product): string {
  return `$${formatUsd(product.priceMonthly)}/mo`;
}

function titleBaseFromMeta(slug: string, name: string): string {
  const meta = getCompetitorMeta(slug);
  if (!meta?.title) return name;
  return meta.title
    .replace(/\s*[-–—]\s*₹[\d,]+\s*\/?\s*mo.*/i, '')
    .replace(/\s*[-–—]\s*Rs\.?\s*[\d,]+\s*\/?\s*mo.*/i, '')
    .replace(/\s*₹[\d,]+\s*\/?\s*mo.*/i, '')
    .replace(/\s*Rs\.?\s*[\d,]+\s*\/?\s*mo.*/i, '')
    .replace(/\s*\(\s*Save\s*~?\d+%?\s*\)/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim() || name;
}

function buildTitle(slug: string, name: string, monthly: number): string {
  return `${titleBaseFromMeta(slug, name)} - $${formatUsd(monthly)}/mo`;
}

function buildDescription(name: string, monthly: number, yearly: number): string {
  const tool = name.replace(/\s+Group Buy$/i, '');
  return `Get ${tool} group buy at $${formatUsd(monthly)}/mo or $${formatUsd(yearly)}/year. Instant one-click access, secure checkout, and 24/7 support by SEO Group Buy.`;
}

function buildShortDesc(name: string, monthly: number, yearly: number): string {
  const tool = name.replace(/\s+Group Buy$/i, '');
  return `${tool} group buy — $${formatUsd(monthly)}/mo or $${formatUsd(yearly)}/year with instant access.`;
}

type BuyLink = number | 'signup';

function p(
  slug: string,
  name: string,
  domain: string,
  category: ProductCategory,
  priceMonthly: number,
  priceYearly: number,
  buy?: BuyLink,
): Product {
  const buyHref =
    buy === 'signup' ? SHOP_SIGNUP_URL : buy !== undefined ? shopCartUrl(buy) : SHOP_SIGNUP_URL;
  return {
    slug,
    name,
    title: buildTitle(slug, name, priceMonthly),
    description: buildDescription(name, priceMonthly, priceYearly),
    domain,
    category,
    priceMonthly,
    priceYearly,
    shortDesc: buildShortDesc(name, priceMonthly, priceYearly),
    buyHref,
  };
}

/** Prices + buy links from https://seogroupsbuy.com shop (product id) */
const originalProducts: Product[] = [
  {
    ...p('screaming-frog-website-audit-tool', 'Screaming Frog Website Audit Tool', 'screamingfrog.co.uk', 'Premium SEO Tools', 10, 80, 110),
    title: 'Screaming Frog Website Audit Tool for SEO Error Checks',
    description:
      'Scan your website with Screaming Frog to find SEO errors, review page data, fix crawl issues, improve internal links, and keep your site technically clean. Plans from $10/mo or $80/year.',
    shortDesc: 'Screaming Frog — $10/mo or $80/year for website audits and technical SEO checks.',
  },

  p('ahrefs-group-buy', 'Ahrefs Group Buy', 'ahrefs.com', 'Premium SEO Tools', 25, 180, 13),
  p('semrush-group-buy', 'SEMrush Group Buy', 'semrush.com', 'Premium SEO Tools', 5, 50, 104),
  p('moz-pro-group-buy', 'Moz Pro Group Buy', 'moz.com', 'Premium SEO Tools', 10, 80, 19),
  p('spyfu-group-buy', 'SpyFu Group Buy', 'spyfu.com', 'Premium SEO Tools', 5, 35, 59),
  p('majestic-group-buy', 'Majestic Group Buy', 'majestic.com', 'Premium SEO Tools', 10, 90, 31),
  p('se-ranking-group-buy', 'SE Ranking Group Buy', 'seranking.com', 'Premium SEO Tools', 5, 35, 87),
  p('ubersuggest-group-buy', 'Ubersuggest Group Buy', 'neilpatel.com', 'Premium SEO Tools', 5, 35, 70),
  p('keywordtool-io-group-buy', 'Keywordtool.io Group Buy', 'keywordtool.io', 'Premium SEO Tools', 12, 35, 24),
  p('spamzilla-group-buy', 'SpamZilla Group Buy', 'spamzilla.com', 'Premium SEO Tools', 25, 75, 23),
  p('indexification-group-buy', 'Indexification Group Buy', 'indexification.com', 'Premium SEO Tools', 5, 35, 46),
  p('links-indexer-group-buy', 'Links Indexer Group Buy', 'linksindexer.com', 'Premium SEO Tools', DEFAULT.monthly, DEFAULT.yearly, 46),

  p('chatgpt-group-buy', 'ChatGPT Business Group Buy', 'chatgpt.com', 'AI Tools', 12, 35, 106),
  p('claude-pro-max-group-buy', 'Claude Pro Max Group Buy', 'claude.ai', 'AI Tools', 10, 100, 52),
  p('jasper-ai-group-buy', 'Jasper AI Group Buy', 'jasper.ai', 'AI Tools', 5, 35, 27),
  p('frase-group-buy', 'Frase Group Buy', 'frase.io', 'Content & Writing', 5, 35, 26),
  p('copymatic-group-buy', 'Copymatic Group Buy', 'copymatic.ai', 'Content & Writing', 5, 35, 148),
  p('closerscopy-group-buy', 'ClosersCopy Group Buy', 'closerscopy.com', 'Content & Writing', 5, 35, 151),
  p('articleforge-group-buy', 'Article Forge Group Buy', 'articleforge.com', 'Content & Writing', 5, 35, 28),
  p('rytr-group-buy', 'Rytr Group Buy', 'rytr.me', 'Content & Writing', 5, 35, 153),
  p('wordai-unlimited-group-buy', 'WordAI Unlimited Group Buy', 'wordai.com', 'Content & Writing', 5, 35, 130),
  p('wordhero-group-buy', 'WordHero Group Buy', 'wordhero.co', 'Content & Writing', 5, 35, 132),
  p('wordtune-group-buy', 'Wordtune Group Buy', 'wordtune.com', 'Content & Writing', 5, 35, 131),
  p('writehuman-group-buy', 'WriteHuman Group Buy', 'writehuman.ai', 'Content & Writing', 10, 90, 50),
  p('writerzen-group-buy', 'WriterZen Group Buy', 'writerzen.com', 'Content & Writing', 5, 35, 152),
  p('spin-rewriter-group-buy', 'Spin Rewriter Group Buy', 'spinrewriter.com', 'Content & Writing', 5, 35, 136),
  p('stealthwriter-group-buy', 'StealthWriter Group Buy', 'stealthwriter.ai', 'Content & Writing', 5, 35, 113),
  p('phrasly-ai-group-buy', 'Phrasly.ai Group Buy', 'phrasly.ai', 'Content & Writing', DEFAULT.monthly, DEFAULT.yearly, 'signup'),
  p('bypassgpt-group-buy', 'BypassGPT Group Buy', 'bypassgpt.ai', 'AI Tools', 5, 35, 65),
  p('quetext-group-buy', 'Quetext Group Buy', 'quetext.com', 'Content & Writing', DEFAULT.monthly, DEFAULT.yearly, 17),
  p('quillbot-group-buy', 'QuillBot Group Buy', 'quillbot.com', 'Content & Writing', 5, 30, 43),
  p('grammarly-group-buy', 'Grammarly Premium Group Buy', 'grammarly.com', 'Content & Writing', 5, 35, 18),

  p('canva-pro-group-buy', 'Canva Pro Group Buy', 'canva.com', 'Design & Creative', 12, 35, 108),
  p('envato-elements-group-buy', 'Envato Elements Group Buy', 'elements.envato.com', 'Design & Creative', 5, 35, 32),
  p('iconscout-group-buy', 'Iconscout Group Buy', 'iconscout.com', 'Design & Creative', 10, 70, 69),
  p('lovepik-group-buy', 'LovePik Group Buy', 'lovepik.com', 'Design & Creative', DEFAULT.monthly, DEFAULT.yearly, 29),
  p('placeit-group-buy', 'Placeit Group Buy', 'placeit.net', 'Design & Creative', DEFAULT.monthly, DEFAULT.yearly, 32),
  p('motion-array-group-buy', 'Motion Array Group Buy', 'motionarray.com', 'Design & Creative', 5, 50, 76),
  p('renderforest-group-buy', 'Renderforest Group Buy', 'renderforest.com', 'Design & Creative', 5, 35, 63),
  p('runwayml-group-buy', 'RunwayML Group Buy', 'runwayml.com', 'AI Tools', DEFAULT.monthly, DEFAULT.yearly, 'signup'),
  p('hailuo-ai-group-buy', 'Hailuo AI Unlimited Group Buy', 'hailuoai.video', 'AI Tools', DEFAULT.monthly, DEFAULT.yearly, 'signup'),
  p('heygen-group-buy', 'HeyGen Group Buy', 'heygen.com', 'AI Tools', DEFAULT.monthly, DEFAULT.yearly, 124),
  p('steve-ai-group-buy', 'Steve AI Group Buy', 'steve.ai', 'AI Tools', DEFAULT.monthly, DEFAULT.yearly, 27),
  p('stockimg-ai-group-buy', 'Stockimg AI Group Buy', 'stockimg.ai', 'AI Tools', DEFAULT.monthly, DEFAULT.yearly, 'signup'),
  p('ai-image-generator-group-buy', 'AI Image Generator (Leo) Group Buy', 'leonardo.ai', 'AI Tools', 5, 35, 51),
  p('stockunlimited-group-buy', 'StockUnlimited Group Buy', 'stockunlimited.com', 'Design & Creative', DEFAULT.monthly, DEFAULT.yearly, 22),
  p('storyblocks-groupbuy', 'Storyblocks Group Buy', 'storyblocks.com', 'Design & Creative', 13, 50, 22),
  p('vyond-group-buy', 'Vyond Group Buy', 'vyond.com', 'Design & Creative', 20, 160, 20),

  p('heligum-10-group-buy', 'Helium 10 Group Buy', 'helium10.com', 'E-commerce', 25, 80, 16),
  p('scribd-group-buy', 'Scribd Group Buy', 'scribd.com', 'Learning & Media', 5, 35, 112),
  p('skillshare-group-buy', 'Skillshare Group Buy', 'skillshare.com', 'Learning & Media', 5, 35, 141),
  p('udemy-group-buy', 'Udemy Group Buy', 'udemy.com', 'Learning & Media', 12, 42, 34),
];

export const products: Product[] = originalProducts.map((p) => {
  const updated = cmsProductMap[p.slug];
  if (!updated) return p;
  const changes = Object.fromEntries(Object.entries(updated).filter(([,v]) => v !== '' && v !== null));
  const merged = {...p,...changes};
  const priceChanged = merged.priceMonthly !== p.priceMonthly || merged.priceYearly !== p.priceYearly;
  const nameChanged = merged.name !== p.name;
  // Preserve live metadata unless the CMS explicitly changes its underlying values.
  // Never leave stale dollar amounts in the title/description after a CMS price edit.
  if ((priceChanged || nameChanged) && !updated.title)
    merged.title = p.slug === 'screaming-frog-website-audit-tool'
      ? p.title
      : buildTitle(p.slug, merged.name, merged.priceMonthly);
  if ((priceChanged || nameChanged) && !updated.description)
    merged.description = buildDescription(merged.name, merged.priceMonthly, merged.priceYearly);
  if ((priceChanged || nameChanged) && !updated.shortDesc)
    merged.shortDesc = buildShortDesc(merged.name, merged.priceMonthly, merged.priceYearly);
  return merged;
});

export const productsBySlug = Object.fromEntries(products.map((x) => [x.slug, x])) as Record<
  string,
  Product
>;

export function productPath(slug: string) {
  if (slug === 'screaming-frog-website-audit-tool') return `/${slug}`;
  return `/tool/${slug}`;
}

export function productsByCategory() {
  const map = new Map<ProductCategory, Product[]>();
  for (const product of products) {
    const list = map.get(product.category) ?? [];
    list.push(product);
    map.set(product.category, list);
  }
  return [...map.entries()].map(([name, tools]) => ({name, tools}));
}