import {Link} from 'react-router-dom';
import {usePageSeo} from '../hooks/usePageSeo';
import {sectionMeta} from '../seo/sectionMeta';
import {blogPosts} from '../data/staticPages';

const blogMeta = sectionMeta.blog;

export function BlogIndexPage() {
  usePageSeo({
    title: blogMeta.title,
    description: blogMeta.description,
    path: '/blog',
  });

  return (
    <main className="flex-grow bg-black pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold font-display md:text-5xl">Blog</h1>
        <p className="mt-4 text-zinc-400">
          {blogMeta?.description ??
            'Guides on SEMrush group buy, Ahrefs group buy, AI tools, keyword research, and honest group buy comparisons.'}
        </p>

        <div className="mt-12 space-y-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/${post.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-blue-500/40"
            >
              <h2 className="text-xl font-bold font-display text-white">{post.heading}</h2>
              <p className="mt-2 text-sm text-zinc-400">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
