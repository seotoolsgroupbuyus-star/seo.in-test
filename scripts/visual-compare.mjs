import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const origin='https://seogroupbuy.in', preview='https://seo-in-test.bilalfadi11221333.workers.dev';
const browser=await chromium.launch({headless:true});
const sitemap=await fetch(origin+'/sitemap.xml').then(async r=>{if(!r.ok)throw new Error('Original sitemap HTTP '+r.status);return r.text()});
const pages=[...new Set([...sitemap.matchAll(new RegExp('<loc>(.*?)</loc>','g'))].map(m=>new URL(m[1].replaceAll('&amp;','&')).pathname))];
const screenshotPaths=new Set(['/','/all-tools','/pricing','/faq','/blog','/tool/ahrefs-group-buy','/tool/semrush-group-buy']);
const report=[];
mkdirSync('visual-audit',{recursive:true});
function normalizedLinks(links,base){return [...new Set(links.map(value=>{try{const u=new URL(value);if(u.hostname===new URL(base).hostname)return u.pathname+u.search+u.hash;return u.origin+u.pathname+u.search+u.hash}catch{return value}}))].sort()}
for(let index=0;index<pages.length;index++){
 const path=pages[index],pair={path};
 for(const [name,base] of [['origin',origin],['preview',preview]]){
  const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  try{
   let response=await page.goto(base+path,{waitUntil:'networkidle',timeout:60000}).catch(()=>null);
   if(!response)response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForTimeout(900);
   const data=await page.evaluate(()=>({
    title:document.title,
    description:document.querySelector('meta[name="description"]')?.content||'',
    canonical:document.querySelector('link[rel="canonical"]')?.href||'',
    h1:[...document.querySelectorAll('h1')].map(x=>x.innerText.trim()),
    headings:[...document.querySelectorAll('h1,h2,h3')].map(x=>x.tagName+':'+x.innerText.trim().replace(/\\s+/g,' ')),
    text:document.body.innerText.replace(/\\s+/g,' ').trim(),
    links:[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.href))].sort(),
    images:[...document.images].map(i=>({src:i.currentSrc||i.src,alt:i.alt,loaded:i.complete&&i.naturalWidth>0})),
    viewport:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight},
    fonts:getComputedStyle(document.body).fontFamily,
    background:getComputedStyle(document.body).backgroundColor,
    styles:Object.fromEntries(['body','header','h1','main','footer','button','.container'].flatMap(selector=>{
      const el=document.querySelector(selector);
      if(!el)return [];
      const cs=getComputedStyle(el),rc=el.getBoundingClientRect();
      return [[selector,{fontFamily:cs.fontFamily,fontSize:cs.fontSize,fontWeight:cs.fontWeight,lineHeight:cs.lineHeight,color:cs.color,background:cs.backgroundColor,padding:cs.padding,display:cs.display,width:Math.round(rc.width),height:Math.round(rc.height)}]];
    }))
   }));
   pair[name]={status:response?.status()||0,...data};
   if(screenshotPaths.has(path))await page.screenshot({path:'visual-audit/'+(path.replaceAll('/','_')||'home')+'-'+name+'.png',fullPage:true});
  }catch(e){pair[name]={error:String(e.message||e)}}finally{await page.close()}
 }
 const a=pair.origin||{},b=pair.preview||{};
 const al=normalizedLinks(a.links||[],origin),bl=normalizedLinks(b.links||[],preview);
 pair.compare={
  statusMatch:a.status===b.status,titleMatch:a.title===b.title,descriptionMatch:a.description===b.description,
  canonicalMatch:a.canonical===b.canonical,h1Match:JSON.stringify(a.h1)===JSON.stringify(b.h1),
  headingsMatch:JSON.stringify(a.headings)===JSON.stringify(b.headings),
  textLength:{origin:a.text?.length||0,preview:b.text?.length||0},
  textRatio:a.text?.length&&b.text?.length?Math.round(Math.min(a.text.length,b.text.length)/Math.max(a.text.length,b.text.length)*100):0,
  missingInternalLinks:al.filter(x=>!bl.includes(x)).slice(0,50),
  extraInternalLinks:bl.filter(x=>!al.includes(x)).slice(0,50),
  brokenPreviewImages:(b.images||[]).filter(x=>!x.loaded).map(x=>x.src),
  imageCounts:{origin:a.images?.length||0,preview:b.images?.length||0},
  fontsMatch:a.fonts===b.fonts,
  designDifferences:Object.keys(a.styles||{}).flatMap(selector=>{
    const live=a.styles?.[selector],astro=b.styles?.[selector];
    if(!astro)return [{selector,field:'missing'}];
    return Object.entries(live).filter(([key,value])=>key==='width'||key==='height'?Math.abs(Number(value)-Number(astro[key]))>6:value!==astro[key]).map(([field,value])=>({selector,field,live:value,astro:astro[field]}));
  }),
  viewport:{origin:a.viewport,preview:b.viewport}
 };
 report.push(pair);
 console.log(path,JSON.stringify(pair.compare));
}
await browser.close();
const failures=report.filter(p=>p.error||p.origin?.status!==200||p.preview?.status!==200||!p.compare.titleMatch||!p.compare.descriptionMatch||!p.compare.canonicalMatch||!p.compare.h1Match||!p.compare.headingsMatch||p.compare.textRatio<98||p.compare.missingInternalLinks.length||p.compare.brokenPreviewImages.length);
const summary={origin,preview,checked:new Date().toISOString(),sitemapCount:pages.length,passed:report.length-failures.length,failed:failures.length,failures:failures.map(p=>({path:p.path,compare:p.compare,originError:p.origin?.error,previewError:p.preview?.error})),pages:report};
writeFileSync('visual-audit/report.json',JSON.stringify(summary,null,2));
if(failures.length)process.exitCode=1;
