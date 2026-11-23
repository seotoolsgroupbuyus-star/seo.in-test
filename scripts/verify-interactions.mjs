import {chromium} from 'playwright';
import {writeFileSync} from 'node:fs';
const sites={live:'https://seogroupbuy.in',preview:'https://seo-in-test.bilalfadi11221333.workers.dev'};
const browser=await chromium.launch({headless:true});
const results=[];
async function test(site,base,name,route,fn){
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 try{
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:35000});
  await page.locator('h1').first().waitFor({state:'visible',timeout:15000});
  await page.waitForTimeout(500);
  const details=await fn(page);
  results.push({site,name,passed:true,httpStatus:response?.status(),details});
 }catch(e){results.push({site,name,passed:false,error:String(e)})}
 finally{await page.close()}
}
for(const [site,base] of Object.entries(sites)){
 await test(site,base,'mobile-menu','/',async page=>{
  await page.getByRole('button',{name:'Open menu'}).first().click({timeout:8000});
  await page.getByRole('link',{name:'Pricing'}).last().waitFor({state:'visible',timeout:5000});
  return 'Pricing link visible after opening mobile menu';
 });
 await test(site,base,'chat-widget','/',async page=>{
  const button=page.getByRole('button',{name:'Open chat widget'});
  await button.click({timeout:8000});
  await page.getByText('Chat with us').waitFor({state:'visible',timeout:7000});
  await page.getByRole('button',{name:'Close chat widget'}).first().click({timeout:7000});
  await page.getByText('Chat with us').waitFor({state:'hidden',timeout:7000});
  return 'Chat opens and closes';
 });
 await test(site,base,'tool-search','/all-tools',async page=>{
  await page.getByPlaceholder('Search tools...').fill('Ahrefs');
  await page.getByRole('link',{name:/Ahrefs/i}).first().waitFor({state:'visible',timeout:7000});
  const count=await page.locator('main a[href*="tool/"]').count();
  if(count!==1)throw Error('Filtered product count expected 1, got '+count);
  return 'Ahrefs search result count 1';
 });
 await test(site,base,'faq-accordion','/faq',async page=>{
  const question=page.getByText('How does the group buy system actually work?',{exact:true}).first();
  await question.click({timeout:8000});
  await page.getByText(/proprietary cloud-bridge technology/i).first().waitFor({state:'visible',timeout:7000});
  return 'FAQ answer visible after click';
 });
}
await browser.close();
const previewFailures=results.filter(x=>x.site==='preview'&&!x.passed);
const liveFailures=results.filter(x=>x.site==='live'&&!x.passed);
const regressions=previewFailures.filter(x=>!liveFailures.some(y=>y.name===x.name));
const summary={checks:results.length,liveFailures:liveFailures.length,previewFailures:previewFailures.length,previewOnlyRegressions:regressions.length};
writeFileSync('interaction-report.json',JSON.stringify({summary,results},null,2));
console.log(JSON.stringify({summary,results},null,2));
if(regressions.length)process.exitCode=1;
