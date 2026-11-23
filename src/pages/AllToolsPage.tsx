import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {Search} from 'lucide-react';
import {usePageSeo} from '../hooks/usePageSeo';
import {getCompetitorMeta} from '../data/competitorMeta';
import {productPath, products, productsByCategory, formatMonthlyPriceLabel} from '../data/products';

const allToolsMeta = getCompetitorMeta('all-tools');

export function AllToolsPage() {
  usePageSeo({
    title: allToolsMeta?.title ?? 'All Tools | SEO Group Buy',
    description:
      allToolsMeta?.description ??
      'Browse all group buy SEO, AI, writing, and design tools available on SEO Group Buy.',
    path: '/all-tools',
  });

  const [query, setQuery] = useState('');
  const categories = productsByCategory();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) => t.name.toLowerCase().includes(q) || t.shortDesc.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [categories, query]);

  return (
    <main className="flex-grow bg-black pt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold font-display md:text-6xl">All Tools</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Browse {products.length}+ premium SEO, AI, writing, and design tools at group buy pricing. Search by
          name or explore by category.
        </p>

        <div className="relative mt-10 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-16 space-y-16">
          {filtered.map((category) => (
            <section key={category.name}>
              <h2 className="mb-8 text-lg font-bold uppercase tracking-widest text-zinc-500">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={productPath(tool.slug)}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-blue-500/40"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2">
                      <img
                        src={tool.imageUrl || `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
                        alt=""
                        className="h-full w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white">{tool.name}</div>
                      <div className="text-sm text-zinc-500">{formatMonthlyPriceLabel(tool)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
