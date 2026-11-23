// Runs only inside GitHub Actions' disposable checkout: never touches live content.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const mode=process.argv[2];
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const files=dir=>fs.readdirSync(dir).filter(f=>f.endsWith('.json'));
const products=files('content/products').map(f=>read('content/products/'+f));
const pages=files('content/pages').map(f=>read('content/pages/'+f));
const home=read('content/homepage.json');
const pricing=read('content/plans.json');
const faq=read('content/faqs.json');
assert.equal(pricing.plans.length,6,'CMS pricing plans missing');
assert.equal(faq.faqs.length,5,'CMS FAQ items missing');
for(const p of pricing.plans){assert.ok(p.name&&p.price&&p.buyNowHref&&p.features.length===5)}
for(const item of faq.faqs)assert.ok(item.question&&item.answer);
assert.equal(products.length,52);
assert.equal(pages.length,20);
for(const product of products){
  assert.ok(product.slug&&product.name&&product.domain&&product.category);
  assert.ok(Number.isFinite(product.priceMonthly)&&Number.isFinite(product.priceYearly));
  assert.match(product.buyHref,/^https:\/\//);
}
for(const page of pages){
  assert.ok(page.slug&&page.heading&&['static','blog'].includes(page.kind));
  assert.ok(Array.isArray(page.paragraphs)&&page.paragraphs.length);
}
for(const k of ['badge','heading','headingAccent','description','primaryButton','secondaryButton']) assert.ok(home[k],k);
const cms=fs.readFileSync('.pages.yml','utf8');
for(const key of ['name: products','name: pages','name: homepage','name: paragraphs','name: priceMonthly','name: seoDescription'])assert.ok(cms.includes(key),'CMS config missing '+key);
if(mode==='prepare'){
 const pageFile='content/pages/about-us.json',productFile='content/products/ahrefs-group-buy.json';
 const p=read(productFile);
 p.priceMonthly=37;p.priceYearly=207;p.name='CMS Ahrefs Edited';
 write(productFile,p);
 const about=read(pageFile);
 about.heading='CMS About Edited';
 about.paragraphs[0]='CMS body content updated without editing HTML';
 about.title='CMS About Custom SEO Title';
 about.seoDescription='CMS About Custom Description';
 write(pageFile,about);
 pricing.plans[0].price='99';
 pricing.plans[0].name='CMS Edited Lite Plan';
 write('content/plans.json',pricing);
 faq.faqs[0].answer='CMS Edited FAQ Answer';
 write('content/faqs.json',faq);
 home.heading='CMS Homepage Changed';
 home.primaryButton='CMS Join Today';
 write('content/homepage.json',home);
 console.log('Prepared isolated CMS edits: homepage, SEO, article body and product prices.');
}else if(mode==='check'){
 const check=(file,needle)=>{const html=fs.readFileSync('dist/'+file,'utf8');assert.ok(html.includes(needle),file+' missing: '+needle);return html;};
 check('index.html','CMS Homepage Changed');
 check('index.html','CMS Join Today');
 const product=check('tool/ahrefs-group-buy/index.html','CMS Ahrefs Edited');
 assert.ok(product.includes('$37'), 'CMS product price change not visible');
 assert.ok(product.includes('37/mo'), 'CMS product title price stale');
 assert.ok(product.includes('207/year'), 'CMS product SEO description stale');
 check('pricing/index.html','CMS Edited Lite Plan');
 check('pricing/index.html','$99');
 check('faq/index.html','CMS Edited FAQ Answer');
 const about=check('about-us/index.html','CMS About Edited');
 for(const v of ['CMS body content updated without editing HTML','CMS About Custom SEO Title','CMS About Custom Description'])assert.ok(about.includes(v),'CMS page edit not present: '+v);
 console.log('PASS: CMS edits produce matching Astro HTML and SEO metadata.');
}else if(mode==='validate'){
 console.log('PASS: 52 products, 20 page/blog records, homepage, 6 plans and 5 FAQs.');
}else throw Error('Usage: node scripts/verify-cms-editing.mjs validate|prepare|check');
