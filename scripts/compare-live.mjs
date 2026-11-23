// Real browser DOM parity: the live React site uses client-side rendering.
import {chromium} from 'playwright';
import {writeFileSync} from 'node:fs';
const LIVE='https://seogroupbuy.in',PREVIEW='https://seo-in-test.bilalfadi11221333.workers.dev';
const xml=await fetch(LIVE+'/sitemap.xml').then(async r=>{if(!r.ok)throw Error('Live sitemap '+r.status);return r.text()});
const routes=[...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1].replaceAll('&amp;','&')).pathname))];
if(routes.length!==77)throw Error('Live sitemap count changed: '+routes.length);
const browser=await chromium.launch({headless:true});
async function capture(base,route){
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 try{
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:35000});
  await page.locator('h1').first().waitFor({state:'attached',timeout:15000});
  await page.evaluate(()=>document.fonts.ready);
  const data=await page.evaluate(()=>{
   const text=(el)=>el?.textContent?.replace(/\s+/g,' ').trim()||'';
   const normalizedUrl=(url)=>{try{const u=new URL(url,location.href);return u.hostname===location.hostname?u.pathname.replace(/\/$/,'')+u.search:u.origin+u.pathname+u.search}catch{return url}};
   const links=[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h&&!h.startsWith('#')&&!/^(mailto:|tel:|javascript:)/i.test(h)).map(normalizedUrl))].sort();
   return {
    title:document.title,description:document.querySelector('meta[name="description"]')?.content||'',
    canonical:document.querySelector('link[rel="canonical"]')?.href||'',
    h1:[...document.querySelectorAll('h1')].map(text),
    text:document.body.innerText.replace(/\s+/g,' ').trim(),
    links,images:[...document.images].map(img=>({src:normalizedUrl(img.currentSrc||img.src),alt:img.alt,loaded:img.complete&&img.naturalWidth>0})),
    jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>{try{return JSON.parse(x.textContent)}catch{return {invalid:true}}}),
    robots:document.querySelector('meta[name="robots"]')?.content||'',
    scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth
   };
  });
  return {status:response?.status(),...data,errors};
 }catch(e){return {error:String(e),errors}}finally{await page.close()}
}
const results=[];
for(let i=0;i<routes.length;i+=4){
 const chunk=await Promise.all(routes.slice(i,i+4).map(async route=>{
  const [a,b]=await Promise.all([capture(LIVE,route),capture(PREVIEW,route)]);
  const issues=[];
  if(a.error||b.error)issues.push('browser_load');
  if(a.status!==200||b.status!==200)issues.push('http_status');
  for(const key of ['title','description','canonical','h1'])if(JSON.stringify(a[key])!==JSON.stringify(b[key]))issues.push(key);
  const ratio=a.text&&b.text?Math.min(a.text.length,b.text.length)/Math.max(a.text.length,b.text.length):0;
  if(ratio<.98)issues.push('visible_text');
  const missing=(a.links||[]).filter(x=>!(b.links||[]).includes(x));
  const extra=(b.links||[]).filter(x=>!(a.links||[]).includes(x));
  if(missing.length||extra.length)issues.push('links');
  if(a.images?.length!==b.images?.length)issues.push('image_count');
  const previewOnlyBroken=(b.images||[]).filter((img,index)=>!img.loaded && a.images?.[index]?.loaded && !img.src.startsWith('https://www.google.com/s2/favicons'));
  // Google favicon proxy is an external, timing-dependent service. Keep the
  // broken assets in the report, but do not treat intermittent proxy failures
  // as evidence that the Astro layout or local images are missing.
  if(previewOnlyBroken.length)issues.push('preview_only_image_failure');
  if((b.jsonld||[]).some(x=>x.invalid))issues.push('invalid_schema');
  if(b.errors?.length)issues.push('browser_javascript');
  return {route,issues,textRatio:Math.round(ratio*1000)/10,links:{missing:missing.slice(0,8),extra:extra.slice(0,8)},images:{live:a.images?.length||0,preview:b.images?.length||0,previewOnlyBroken:previewOnlyBroken.map(x=>x.src).slice(0,8),liveBroken:(a.images||[]).filter(x=>!x.loaded).map(x=>x.src).slice(0,8),previewBroken:(b.images||[]).filter(x=>!x.loaded).map(x=>x.src).slice(0,8)},robots:{live:a.robots,preview:b.robots},errors:{live:a.error||null,preview:b.error||null}};
 }));
 results.push(...chunk);
}
await browser.close();
const summary={routes:routes.length,passed:results.filter(r=>!r.issues.length).length,failed:results.filter(r=>r.issues.length).length,issues:{}};
for(const row of results)for(const issue of row.issues)summary.issues[issue]=(summary.issues[issue]||0)+1;
writeFileSync('parity-report.json',JSON.stringify({summary,results},null,2));
console.log(JSON.stringify({summary,failures:results.filter(r=>r.issues.length).slice(0,15)},null,2));
if(summary.failed)process.exitCode=1;
