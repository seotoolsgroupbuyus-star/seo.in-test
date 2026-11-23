import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {sectionSeo, sectionMeta} from '../src/seo/sectionMeta';

// Verify the actual server-generated HTML uses exactly the shared SEO
// metadata React applies after hydration. No live website is modified.
function decode(s:string) {
  return s.replace(/&quot;/g,'"').replace(/&#(?:39|x27);/gi,"'")
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}
for(const slug of Object.keys(sectionMeta) as (keyof typeof sectionMeta)[]) {
  const file=path.join('dist',slug,'index.html');
  assert.ok(fs.existsSync(file),'Missing prerendered section: '+slug);
  const html=fs.readFileSync(file,'utf8');
  const title=decode(html.match(/<title[^>]*>([\\s\\S]*?)<\\/title>/i)?.[1]||'');
  const desc=decode(html.match(/<meta\\s+name="description"\\s+content="([^"]*)"/i)?.[1]||'');
  const canonical=html.match(/<link\\s+rel="canonical"\\s+href="([^"]*)"/i)?.[1]||'';
  const expected=sectionSeo(slug);
  assert.equal(title,expected.title,'SEO title differs from React source: '+slug);
  assert.equal(desc,expected.description,'SEO description differs from React source: '+slug);
  assert.equal(canonical,'https://seogroupbuy.in/'+slug,'Canonical mismatch: '+slug);
  console.log('PASS '+slug+': '+title);
}
console.log('PASS: All four formerly mismatched sections share identical Astro and React SEO metadata.');
