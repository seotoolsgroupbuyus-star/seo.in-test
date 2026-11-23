import {writeFileSync} from 'node:fs';
const sites={live:'https://seogroupbuy.in',preview:'https://seo-in-test.bilalfadi11221333.workers.dev'};
const endpoints=['/robots.txt','/sitemap.xml','/favicon.svg','/404.html','/this-url-should-not-exist-migration-test'];
const results={},failures=[];
for(const [site,base] of Object.entries(sites)){
 results[site]={};
 for(const path of endpoints){
  try{
   const resp=await fetch(base+path,{redirect:'manual',headers:{'cache-control':'no-cache'}});
   const text=await resp.text();
   results[site][path]={status:resp.status,bytes:text.length,contentType:resp.headers.get('content-type')};
   if(site==='preview'&&['/robots.txt','/sitemap.xml','/favicon.svg'].includes(path)&&resp.status!==200)failures.push(path+' preview asset HTTP '+resp.status);
   if(site==='preview'&&path==='/sitemap.xml'&&[...text.matchAll(/<loc>/g)].length!==77)failures.push('Preview sitemap expected 77 URLs');
  }catch(e){results[site][path]={error:String(e)};if(site==='preview')failures.push(path+': '+e)}
 }
}
const missing=results.preview['/this-url-should-not-exist-migration-test'];
if(missing?.status!==404)failures.push('Preview should return HTTP 404 for unknown URLs, received '+missing?.status);
const summary={sites:2,paths:endpoints.length,issues:failures.length};
writeFileSync('edge-report.json',JSON.stringify({summary,results,failures},null,2));
console.log(JSON.stringify({summary,results,failures},null,2));
if(failures.length)process.exitCode=1;
