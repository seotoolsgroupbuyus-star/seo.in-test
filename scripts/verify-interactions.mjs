import {chromium} from 'playwright';
import {writeFileSync} from 'node:fs';
const sites={live:'https://seogroupbuy.in',preview:'https://seo-in-test.bilalfadi11221333.workers.dev'};
const browser=await chromium.launch({headless:true});
const results=[];
async function run(site,base){
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const failures=[];
 try{
  const res=await page.goto(base+'/',{waitUntil:'domcontentloaded',timeout:35000});
  await page.locator('h1').first().waitFor({timeout:15000});
  const nav=page.getByRole('button',{name:'Open menu'}).first();
  await nav.click({timeout:8000});
  await page.getByRole('link',{name:'Pricing'}).last().waitFor({state:'visible',timeout:5000});
  results.push({site,test:'mobile_navigation_open',passed:true,status:res.status()});
  await page.keyboard.press('Escape');
  const chat=page.getByRole('button',{name:'Open chat widget'});
  await chat.click();
  await page.getByText('Chat with us').waitFor({state:'visible'});
  results.push({site,test:'chat_widget_open',passed:true});
  await page.getByRole('button',{name:'Close chat widget'}).first().click();
  results.push({site,test:'chat_widget_close',passed:true});
  await page.goto(base+'/all-tools',{waitUntil:'domcontentloaded',timeout:35000});
  const search=page.getByPlaceholder('Search tools...');
  await search.waitFor({state:'visible'});
  await search.fill('Ahrefs');
  await page.getByRole('link',{name:/Ahrefs/i}).first().waitFor({state:'visible'});
  const count=await page.locator('main a[href*="tool/"]').count();
  if(count!==1)failures.push('Search Ahrefs should filter to one product, found '+count);
  results.push({site,test:'tool_search_filter',passed:count===1,count});
  await page.goto(base+'/faq',{waitUntil:'domcontentloaded',timeout:35000});
  const question=page.getByText('How does the group buy system actually work?',{exact:true}).first();
  await question.waitFor({state:'visible'});
  await question.click();
  const expanded=await page.locator('[data-state="open"]').count();
  if(!expanded)failures.push('FAQ accordion did not expand');
  results.push({site,test:'faq_expand',passed:expanded>0});
 }catch(e){failures.push(String(e));results.push({site,test:'interaction_error',passed:false,error:String(e)})}
 finally{await page.close()}
 return failures;
}
const issues={};
for(const [site,base] of Object.entries(sites))issues[site]=await run(site,base);
await browser.close();
const onlyPreview=results.filter(x=>x.site==='preview'&&!x.passed&&!results.some(y=>y.site==='live'&&y.test===x.test&&!y.passed));
const summary={checks:results.length,liveFailures:issues.live.length,previewFailures:issues.preview.length,previewRegressions:onlyPreview.length};
writeFileSync('interaction-report.json',JSON.stringify({summary,results,issues},null,2));
console.log(JSON.stringify({summary,results,issues},null,2));
if(onlyPreview.length)process.exitCode=1;
