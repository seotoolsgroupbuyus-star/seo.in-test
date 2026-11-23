import labels from '../../content/ui-labels.json';
import cmsProductDetails from '../../content/product-details.json';
import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';
import {motion} from 'motion/react';
import {Link} from 'react-router-dom';
import {usePageSeo} from '../hooks/usePageSeo';
import type {Product} from '../data/products';
import {formatUsd, productPath} from '../data/products';

import {SHOP_SIGNUP_URL} from '../data/shopLinks';

const DEFAULT_BUY = SHOP_SIGNUP_URL;

function SectionRule() {
  return <hr className="my-14 border-0 border-t border-white/10 md:my-16" />;
}

type Props = {
  product: Product;
};

export function ProductPage({product}: Props) {
  const path = productPath(product.slug);
  const buyHref = product.buyHref ?? DEFAULT_BUY;
  const logoSrc = product.imageUrl || `https://www.google.com/s2/favicons?domain=${product.domain}&sz=128`;

  usePageSeo({
    title: product.title,
    description: product.description,
    path,
  });

  const detail=cmsProductDetails.products.find(p=>p.slug===product.slug);
  const benefitRows=detail?.benefitRows||[];


  return (
    <main className="flex-grow bg-black pt-20">
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <p className="mb-6 text-sm text-zinc-500">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/all-tools" className="hover:text-white transition-colors">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{product.name}</span>
        </p>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 ring-1 ring-white/5">
              <div className="flex min-h-[280px] w-full items-center justify-center bg-gradient-to-b from-white/[0.06] to-transparent p-10 md:min-h-[320px]">
                <img
                  src={logoSrc}
                  alt={product.name}
                  className="max-h-56 w-auto object-contain"
                  width={224}
                  height={224}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <a href={buyHref} target="_blank" rel="noopener noreferrer" className="mt-4 flex lg:hidden">
              <Button className="h-12 w-full rounded-xl bg-emerald-600 text-base font-bold hover:bg-emerald-500">
                Buy Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>

          <div>
            <h1 className="text-3xl font-bold leading-tight font-display md:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight font-display text-white">
                  ${formatUsd(product.priceMonthly)}
                </span>
                <span className="text-lg text-zinc-500">/month</span>
              </div>
              <span className="mb-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
                or ${formatUsd(product.priceYearly)}/year
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-zinc-400">{product.shortDesc}</p>

            <div className="mt-8 hidden flex-col gap-3 lg:flex">
              <a href={buyHref} target="_blank" rel="noopener noreferrer">
                <Button className="h-14 w-full rounded-xl bg-emerald-600 text-base font-bold hover:bg-emerald-500">
                  Buy Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        <SectionRule />

        <section>
          <h2 className="text-2xl font-bold font-display md:text-3xl">{labels.product.pricingHeading}</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-zinc-400">
                <tr>
                  <th className="px-5 py-4">{labels.product.planColumn}</th>
                  <th className="px-5 py-4">{labels.product.priceColumn}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="text-zinc-300">
                  <td className="px-5 py-4 font-semibold text-white">{labels.product.monthly}</td>
                  <td className="px-5 py-4 text-zinc-400">${formatUsd(product.priceMonthly)} {labels.product.monthSuffix}</td>
                </tr>
                <tr className="text-zinc-300">
                  <td className="px-5 py-4 font-semibold text-white">{labels.product.yearly}</td>
                  <td className="px-5 py-4 text-zinc-400">${formatUsd(product.priceYearly)} {labels.product.yearSuffix}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-zinc-400">
                <tr>
                  <th className="px-5 py-4">{labels.product.benefitColumn}</th>
                  <th className="px-5 py-4">{labels.product.helpsColumn}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {benefitRows.map((row) => (
                  <tr key={row.benefit} className="text-zinc-300">
                    <td className="px-5 py-4 font-semibold text-white">{row.benefit}</td>
                    <td className="px-5 py-4 text-zinc-400">{row.helps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <SectionRule />

        <section>
          <motion.h2
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-2xl font-bold font-display md:text-3xl"
          >
            {labels.product.whatIsPrefix} {product.name}?
          </motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
              <h3 className="text-lg font-bold font-display text-white">{labels.product.overview}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{product.description}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
              <h3 className="text-lg font-bold font-display text-white">{labels.product.whyTeams}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {detail?.teamDescription}
              </p>
            </article>
          </div>
        </section>

        <SectionRule />

        <section>
          <h2 className="text-2xl font-bold font-display md:text-3xl">{labels.product.keyBenefitsPrefix} {product.name}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {(detail?.keyBenefits||[]).map(({title, body}) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
                <h3 className="text-lg font-bold font-display text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: product.name,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: product.description,
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: String(product.priceMonthly),
              highPrice: String(product.priceYearly),
              offerCount: 2,
            },
          }),
        }}
      />
    </main>
  );
}
