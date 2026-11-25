import {useEffect} from 'react';
import {SITE_ORIGIN, withBrandTitle} from '../seo/site';

type PageSeoOptions = {
  title: string;
  description: string;
  path: string;
  /** Default: indexable pages */
  robots?: string;
  /** Use on client-only 404: avoid setting canonical / OG URL to a dead path */
  omitCanonical?: boolean;
};

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function usePageSeo({
  title,
  description,
  path,
  robots = 'index, follow',
  omitCanonical = false,
}: PageSeoOptions) {
  useEffect(() => {
    const brandedTitle = withBrandTitle(title);
    const url = `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
    document.title = brandedTitle;
    setMetaName('description', description);
    setMetaName('robots', robots);

    if (!omitCanonical) {
      setCanonical(url);
      setMetaProperty('og:title', brandedTitle);
      setMetaProperty('og:description', description);
      setMetaProperty('og:url', url);
      setMetaName('twitter:title', brandedTitle);
      setMetaName('twitter:description', description);
    }
  }, [title, description, path, robots, omitCanonical]);
}
