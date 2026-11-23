/** Third website build gate. No external requests and no production modifications. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=process.cwd();
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const json=(p)=>JSON.parse(read(p));
const files=(dir)=>fs.readdirSync(path.join(root,dir)).filter(f=>f.endsWith('.json'));
const products=files('content/products').map(f=>json(`content/products/${f}`));
const pages=files('content/pages').map(f=>json(`content/pages/${f}`));
const routes=[ '/', '/all-tools', '/blog', '/pricing', '/faq',
  ...products.map(p=>p.slug==='screaming-frog-website-audit-tool'?'/'+p.slug:'/tool/'+p.slug),
  ...pages.map(p=>'/'+p.slug) ];
const sitemap=[...read('public/sitemap.xml').matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m=>new URL(m[1].trim()).pathname.replace(/\/$/,'')||'/');
assert.equal(products.length,52,'Product count changed from source');
assert.equal(pages.length,20,'Static/blog CMS entry count changed from source');
assert.equal(new Set(routes).size,routes.length,'Duplicate route found');
assert.deepEqual([...routes].sort(),[...sitemap].sort(),'Astro routes differ from source sitemap');
for(const p of products) {
  assert(p.slug && p.buyHref,`Missing slug or checkout destination: ${p.slug}`);
  assert(/^https:\/\//.test(p.buyHref),`Invalid checkout destination for ${p.slug}`);
}
const site='https://seogroupbuy.in';
const dist=path.join(root,'dist');
assert(fs.existsSync(dist),'Astro dist/ missing: run npm run build first');
let checked=0,productSchemas=0;
for(const route of routes){
  const rel=route==='/'?'index.html':path.posix.join(route.slice(1),'index.html');
  const filename=path.join(dist,rel);
  assert(fs.existsSync(filename),`Missing prerendered HTML for ${route}: ${rel}`);
  const html=fs.readFileSync(filename,'utf8');
  const expected=site+(route==='/'?'/':route);
  assert(html.includes('rel="canonical"'),`Missing canonical: ${route}`);
  assert(html.includes(expected),`Expected original URL not found: ${route}`);
  assert(/<meta\s+name="description"/i.test(html),`Missing meta description: ${route}`);
  assert(/name="robots"\s+content="noindex,nofollow"/.test(html) || /name="robots"\s+content="index,follow"/.test(html),`Missing explicit robots on ${route}`);
  assert(/<h1\b/i.test(html),`No server-rendered H1: ${route}. React SSR may be broken.`);
  const jsonlds=[...html.matchAll(/<script[^>]*type="application\\/ld\\+json"[^>]*>([\\s\\S]*?)<\\/script>/gi)].map(m=>JSON.parse(m[1]));
  if(route.startsWith('/tool/')||route==='/screaming-frog-website-audit-tool'){
    const product=products.find(p=>(p.slug==='screaming-frog-website-audit-tool'?'/'+p.slug:'/tool/'+p.slug)===route);
    const productLd=jsonlds.find(j=>j['@type']==='Product');
    assert(productLd,'Missing Product JSON-LD: '+route);
    assert.equal(productLd.name,product.name,'Incorrect schema name '+route);
    assert.equal(Number(productLd.offers?.price),product.priceMonthly,'Incorrect schema monthly price '+route);
    assert.equal(productLd.url,expected,'Incorrect schema URL '+route);
    productSchemas++;
  }
  checked++;
}
for(const asset of ['favicon.svg','sitemap.xml','robots.txt']){
 assert(fs.existsSync(path.join(dist,asset)),`Asset missing in build: ${asset}`);
}
assert.equal(productSchemas,52,'Not all 52 products have valid Product JSON-LD');
console.log(JSON.stringify({ok:true,checked,productSchemas,products:products.length,pages:pages.length,sourceSitemap:sitemap.length,canonicalOrigin:site},null,2));
