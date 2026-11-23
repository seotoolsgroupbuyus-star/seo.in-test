import {ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {BrandLogo} from './BrandLogo';
import site from '../../content/site.json';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="blue-glow -bottom-48 -left-48 h-[720px] w-[720px] opacity-15" />
        <div className="blue-glow -top-64 -right-64 h-[640px] w-[640px] opacity-10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative py-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <BrandLogo />
                <div className="leading-tight">
                  <div className="text-xl font-bold tracking-tight font-display text-white">{site.footer.brand}</div>
                  <div className="text-xs text-zinc-500">{site.footer.tagline}</div>
                </div>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                {site.footer.description}
              </p>
            </div>

            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/90">Quick links</p>
              <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-zinc-400">
                {site.footer.quickLinks.map(link=>(
                  <Link key={link.url} to={link.url} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60 transition-colors group-hover:bg-blue-400" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/90">{site.footer.newsletterHeading}</p>
              <p className="mt-4 text-sm text-zinc-400">{site.footer.newsletterDescription}</p>

              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-blue-500/70"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {site.footer.brand}. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {site.footer.legalLinks.map(link=>(
                <Link key={link.url} to={link.url} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
