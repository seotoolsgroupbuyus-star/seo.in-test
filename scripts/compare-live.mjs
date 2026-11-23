// Strict text, SEO and link parity. Preview may intentionally be noindex.
import {writeFileSync} from 'node:fs';
const ORIGIN='https://seogroupbuy.in';
const PREVIEW='https://seo-in-test.bilalfadi11221333.workers.dev';
const timeout=30000;
async function get(url){
 const c=new AbortController(),t=setTimeout(()=>c.abort(),timeout);
 try{const r=await fetch(url,{headers:{'user-agent':'Mozilla/5.0 SiteMigrationAudit/2.0','cache-control':'no-cache'},redirect:'follow',signal:c.signal});return {status:r.status,url:r.url,html:await r.text()}}finally{clearTimeout(t)}
}
const unescape=s=>String(s||'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&nbsp;|&#160;/g,' ');
const clean=s=>unescape(String(s||'').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
function tags(html,tag){return [...html.matchAll(new RegExp('<'+tag+'\\b[^>]*>','gi'))].map(x=>x[0])}
function attr(tag,key){const m=tag.match(new RegExp('(?:^|\\s)'+key+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27)','i'));return m?.[1]??m?.[2]??''}
function meta(h,key,prop='name'){for(const t of tags(h,'meta'))if(attr(t,prop).toLowerCase()===key.toLowerCase())return unescape(attr(t,'content'));return ''}
function canonical(h){return tags(h,'link').find(t=>attr(t,'rel').toLowerCase()==='canonical')?attr(tags(h,'link').find(t=>attr(t,'rel').toLowerCase()==='canonical'),'href'):''}
function normUrl(value,base){
 try{const u=new URL(unescape(value),base);return u.hostname===new URL(base).hostname?u.pathname.replace(/\/+$/,'')+u.search+u.hash:u.origin+u.pathname+u.search+u.hash}catch{return value}
}
function links(h,base){return [...new Set(tags(h,'a').map(t=>attr(t,'href')).filter(Boolean).filter(x=>!x.startsWith('#')&&!/^(mailto:|tel:|javascript:)/i.test(x)).map(x=>normUrl(x,base)))].sort()}
function visible(h){return clean(h.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<svg\b[\s\S]*?<\/svg>/gi,' '))}
function data(r,base){
 const h=r.html;
 const title=clean(h.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
 const headings=[...h.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(x=>clean(x[1]));
 const t=visible(h);
 const images=tags(h,'img').map(x=>({src:normUrl(attr(x,'src'),base),alt:unescape(attr(x,'alt'))}));
 const jsonld=[...h.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(x=>{try{return JSON.parse(x[1])}catch{return {invalid:true}}});
 return {status:r.status,title,description:meta(h,'description'),canonical:canonical(h),h1:headings,text:t,links:links(h,base),images,jsonld,robots:meta(h,'robots')};
}
const sitemap=await get(ORIGIN+'/sitemap.xml');
if(sitemap.status!==200)throw Error('Original sitemap HTTP '+sitemap.status);
const paths=[...new Set([...sitemap.html.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map(m=>new URL(unescape(m[1])).pathname))];
if(paths.length!==77)throw Error('Expected 77 original sitemap routes, got '+paths.length);
const results=[];
for(let i=0;i<paths.length;i+=6){
 const chunk=await Promise.all(paths.slice(i,i+6).map(async route=>{
  try{
   const [l,p]=await Promise.all([get(ORIGIN+route),get(PREVIEW+route)]);
   const a=data(l,ORIGIN),b=data(p,PREVIEW);
   const problems=[];
   if(a.status!==200||b.status!==200)problems.push('http_status');
   for(const key of ['title','description','canonical','h1']){
    const left=JSON.stringify(a[key]),right=JSON.stringify(b[key]);
    if(left!==right)problems.push(key);
   }
   const ratio=Math.max(a.text.length,b.text.length)?Math.min(a.text.length,b.text.length)/Math.max(a.text.length,b.text.length):1;
   if(ratio<0.98)problems.push('text_ratio');
   const missing=a.links.filter(x=>!b.links.includes(x)),extra=b.links.filter(x=>!a.links.includes(x));
   if(missing.length||extra.length)problems.push('links');
   if(a.images.length!==b.images.length)problems.push('image_count');
   if(b.images.some(x=>!x.alt))problems.push('missing_image_alt');
   if(b.jsonld.some(x=>x.invalid))problems.push('invalid_jsonld');
   return {route,issues:problems,meta:{title:a.title,description:a.description,canonical:a.canonical},textRatio:Math.round(ratio*1000)/10,linkDelta:{missing:missing.slice(0,6),extra:extra.slice(0,6)},images:{live:a.images.length,preview:b.images.length},schemaCount:{live:a.jsonld.length,preview:b.jsonld.length},robots:{live:a.robots,preview:b.robots}};
  }catch(e){return {route,issues:['request_error'],error:String(e)}}
 }));
 results.push(...chunk);
}
const summary={origin:ORIGIN,preview:PREVIEW,checked:results.length,passed:results.filter(x=>!x.issues.length).length,failed:results.filter(x=>x.issues.length).length,issueCounts:{}};
for(const row of results)for(const issue of row.issues)summary.issueCounts[issue]=(summary.issueCounts[issue]||0)+1;
writeFileSync('parity-report.json',JSON.stringify({summary,results},null,2));
console.log(JSON.stringify({summary,failures:results.filter(x=>x.issues.length).slice(0,12)},null,2));
if(summary.failed)process.exitCode=1;
