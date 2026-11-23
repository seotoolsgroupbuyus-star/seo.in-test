import {Link} from 'react-router-dom';
import {FAQ} from '../components/FAQ';
import {usePageSeo} from '../hooks/usePageSeo';
import {sectionMeta} from '../seo/sectionMeta';

export function FAQPage() {
  usePageSeo({
    title: sectionMeta.faq.title,
    description: sectionMeta.faq.description,
    path: '/faq',
  });

  return (
    <main className="flex-grow bg-black pt-20">
      <div className="container mx-auto px-4 pt-10">
        <p className="mb-4 text-sm text-zinc-500">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">FAQ</span>
        </p>
        <h1 className="text-4xl font-bold font-display md:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Clear answers about SEO group buy access, tool usage, privacy, and support.
        </p>
      </div>
      <FAQ showIntro={false} />
    </main>
  );
}
