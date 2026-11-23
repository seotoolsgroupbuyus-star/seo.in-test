import {chromium} from 'playwright';
import {writeFileSync} from 'node:fs';
const sites={live:'https://seogroupbuy.in',preview:'https://seo-in-test.bilalfadi11221333.workers.dev'};
const routes=['/','/all-tools','/pricing','/faq','/blog','/tool/ahrefs-group-buy','/tool/semrush-group-buy','/about-us'];
const sizes=[{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}];
const browser=await chromium.launch({headless:true});
async function capture(site,route,size){
 const page=await browser.newPage({viewport:{width:size.width,height:size.height},reducedMotion:'reduce'});
 try{
  await page.goto(site+route,{waitUntil:'domcontentloaded',timeout:35000});
  await page.locator('h1').first().waitFor({state:'visible',timeout:12000});
  await page.evaluate(()=>document.fonts.ready);
  return await page.evaluate(()=>{
   const selectors=['body','header','main','h1','footer','button','.container'];
   return Object.fromEntries(selectors.flatMap(selector=>{
    const el=document.querySelector(selector);
    if(!el)return [];
    const style=getComputedStyle(el),rect=el.getBoundingClientRect();
    return [[selector,{fontFamily:style.fontFamily,fontSize:style.fontSize,fontWeight:style.fontWeight,lineHeight:style.lineHeight,color:style.color,backgroundColor:style.backgroundColor,paddingLeft:style.paddingLeft,paddingRight:style.paddingRight,borderRadius:style.borderRadius,display:style.display,width:Math.round(rect.width)}]];
   }));
  });
 }catch(e){return {error:String(e)}}finally{await page.close()}
}
const results=[];
for(const size of sizes){
 for(const route of routes){
  const [a,b]=await Promise.all([capture(sites.live,route,size),capture(sites.preview,route,size)]);
  const differences=[];
  if(a.error||b.error)differences.push({problem:'browser',live:a.error,preview:b.error});
  else for(const selector of new Set([...Object.keys(a),...Object.keys(b)])){
   const left=a[selector],right=b[selector];
   if(!left||!right){differences.push({selector,problem:'component_presence'});continue}
   for(const field of Object.keys(left)){
    const mismatch=field==='width'?Math.abs(left[field]-right[field])>6:left[field]!==right[field];
    if(mismatch)differences.push({selector,field,live:left[field],preview:right[field]});
   }
  }
  results.push({viewport:size.name,route,differences});
 }
}
await browser.close();
const summary={comparedViews:results.length,comparedRoutes:routes.length,differentViews:results.filter(r=>r.differences.length).length,differenceCount:results.reduce((a,b)=>a+b.differences.length,0)};
writeFileSync('design-report.json',JSON.stringify({summary,results},null,2));
console.log(JSON.stringify({summary,examples:results.filter(r=>r.differences.length).slice(0,8)},null,2));
if(summary.differentViews)process.exitCode=1;
