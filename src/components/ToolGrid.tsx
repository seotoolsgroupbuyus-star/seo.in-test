import {motion} from 'motion/react';
import {Search, Plus, Zap} from 'lucide-react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {productPath, productsByCategory, formatMonthlyPriceLabel} from '../data/products';

export function ToolGrid() {
  const [query, setQuery] = useState('');
  const categories = productsByCategory();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter((t) => t.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [categories, query]);

  return (
    <section id="tools" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <h2 className="mb-6 text-4xl font-bold font-display md:text-6xl">
              Complete Group Buy SEO Tools Collection
            </h2>
            <p className="text-xl text-zinc-400">
              Pick the tools you actually use for SEO. Keyword research, backlinks, audits, writing, and design
              all in one place. This SEO tools group buy helps freelancers and agencies keep costs low and
              productivity high.
            </p>
          </div>
          <div className="relative w-full group md:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a tool..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-20">
          {filtered.map((category) => (
            <div key={category.name}>
              <h3 className="mb-8 flex items-center gap-4 text-lg font-bold uppercase tracking-widest text-zinc-500">
                {category.name}
                <div className="h-px flex-grow bg-white/5" />
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool, i) => (
                  <motion.div
                    key={tool.slug}
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{delay: Math.min(i * 0.03, 0.3)}}
                    viewport={{once: true}}
                    className="glass-card group relative cursor-pointer overflow-hidden rounded-3xl p-6 transition-all hover:border-blue-500/30"
                  >
                    <Link
                      to={productPath(tool.slug)}
                      className="absolute inset-0 z-20 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70"
                      aria-label={`Open ${tool.name} product page`}
                    />
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-lg transition-transform group-hover:scale-110">
                        <img
                          src={tool.imageUrl || `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
                          alt={tool.name}
                          className="h-full w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold transition-colors group-hover:text-blue-400">
                            {tool.name.replace(/ Group Buy$/, '')}
                          </span>
                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                        </div>
                        <p className="text-sm text-zinc-500">{formatMonthlyPriceLabel(tool)} · View details</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/5 transition-all group-hover:bg-blue-600 group-hover:text-white"
                      >
                        <Zap className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden glass-card rounded-[3rem] p-12 text-center">
          <div className="blue-glow -top-20 -right-20 h-64 w-64 opacity-20" />
          <h3 className="mb-4 text-2xl font-bold font-display md:text-3xl">Need a Specific Tool?</h3>
          <p className="mx-auto mb-8 max-w-xl text-zinc-400">
            If your favorite tool is not listed, tell us. We review requests weekly and add the most needed SEO
            and marketing tools as soon as seats are available.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/all-tools"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 px-10 font-bold text-white transition-colors hover:bg-white/5"
            >
              View all tools
            </Link>
            <a
              href="https://wa.me/447845432224"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-10 font-bold text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" /> Request a New Tool
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
