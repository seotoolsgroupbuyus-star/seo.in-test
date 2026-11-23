import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {BrandLogo} from './BrandLogo';

import {SHOP_LOGIN_URL, SHOP_SIGNUP_URL} from '../data/shopLinks';
import site from '../../content/site.json';

const LOGIN_URL = site.header.loginUrl || SHOP_LOGIN_URL;
const SIGNUP_URL = site.header.signupUrl || SHOP_SIGNUP_URL;

const navLinkClass =
  'text-sm font-medium text-zinc-400 hover:text-white transition-colors';
const mobileLinkClass = 'text-2xl font-bold font-display hover:text-blue-400';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo />
          <span className="text-2xl font-bold tracking-tight font-display">{site.header.brand}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {site.header.links.map(link=><Link key={link.url} to={link.url} className={navLinkClass}>{link.label}</Link>)}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-11 items-center rounded-lg px-4 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            {site.header.loginText}
          </a>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-blue-600 px-6 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            {site.header.signupText}
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-white/10 text-zinc-50">
              <div className="mt-12 flex flex-col gap-6">
                {site.header.links.map(link=>(
                  <Link key={link.url} to={link.url} onClick={close} className={mobileLinkClass}>{link.label}</Link>
                ))}
                <hr className="border-white/10" />
                <a
                  href={LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="text-xl font-bold font-display text-zinc-300 hover:text-white"
                >
                  {site.header.loginText}
                </a>
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="inline-flex h-14 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white transition-colors hover:bg-blue-700"
                >
                  {site.header.signupText}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
