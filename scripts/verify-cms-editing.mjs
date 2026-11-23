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
const sections=read('content/home-sections.json');
const extras=read('content/home-extras.json');
const labels=read('content/ui-labels.json');
const details=read('content/product-details.json');
assert.equal(details.products.length,52,'Each product needs independent benefit content');
assert.equal(extras.whyChoose.items.length,4);
assert.equal(extras.priceComparison.tools.length,7);
assert.equal(sections.testimonials.items.length,5);
assert.equal(sections.features.items.length,6);
assert.equal(sections.process.steps.length,4);
const pricing=read('content/plans.json');
const faq=read('content/faqs.json');
const chrome=read('content/site.json');
assert.equal(chrome.header.links.length,6,'Global menu missing');
assert.equal(chrome.footer.quickLinks.length,7,'Footer links missing');
assert.equal(chrome.footer.legalLinks.length,4,'Legal links missing');
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
 chrome.header.brand='CMS Header Brand';
 chrome.header.links[2].label='CMS Tools Menu Link';
 chrome.footer.tagline='CMS Footer Tagline';
 write('content/site.json',chrome);
 pricing.plans[0].price='99';
 pricing.plans[0].name='CMS Edited Lite Plan';
 write('content/plans.json',pricing);
 faq.faqs[0].answer='CMS Edited FAQ Answer';
 write('content/faqs.json',faq);
 sections.testimonials.items[0].content='CMS Editable Testimonial';
 extras.whyChoose.items[0].description='CMS Editable Benefit';
 extras.priceComparison.heading='CMS Editable Savings Heading';
 extras.status.averageUptime='98.88%';
 write('content/home-extras.json',extras);
 sections.process.steps[0].description='CMS Editable Step';
 sections.logoCloud.heading='CMS Editable Tool Logos';
 write('content/home-sections.json',sections);
 details.products.find(p=>p.slug==='ahrefs-group-buy').benefitRows[0].benefit='CMS Ahrefs Benefit';
 details.products.find(p=>p.slug==='ahrefs-group-buy').keyBenefits[0].title='CMS Ahrefs Key Benefit';
 write('content/product-details.json',details);
 labels.allTools.heading='CMS All Tools Heading';
 labels.chat.heading='CMS Edited Chat Heading';
 labels.pricing.heading='CMS Pricing Heading';
 labels.hero.tools[0].name='CMS Preview Tool';
 labels.hero.portalTitle='CMS Portal Preview Title';
 labels.comparison.cta='CMS Savings CTA';
 labels.status.cards[0].heading='CMS Server Status Card';
 labels.tools.requestHeading='CMS Tool Request Title';
 write('content/ui-labels.json',labels);
 home.primaryUrl='https://example.com/cms-signup';
 home.secondaryUrl='/contact-us';
 home.heading='CMS Homepage Changed';
 home.primaryButton='CMS Join Today';
 write('content/homepage.json',home);
 console.log('Prepared isolated CMS edits: homepage, SEO, article body and product prices.');
}else if(mode==='check'){
 const check=(file,needle)=>{const html=fs.readFileSync('dist/'+file,'utf8');assert.ok(html.includes(needle),file+' missing: '+needle);return html;};
 check('index.html','CMS Editable Testimonial');
 check('index.html','CMS Editable Benefit');
 check('index.html','CMS Editable Savings Heading');
 check('index.html','98.88%');
 check('index.html','CMS Editable Step');
 check('index.html','CMS Editable Tool Logos');
 check('index.html','CMS Portal Preview Title');
 // The collapsed chat panel is hydrated only in the client bundle, not SSR HTML.
 const chatJs=fs.readdirSync('dist/_astro').filter(n=>n.endsWith('.js')).map(n=>fs.readFileSync('dist/_astro/'+n,'utf8')).join('');
 assert.ok(chatJs.includes('CMS Edited Chat Heading'),'Edited chat text missing in hydrated JS bundle');
 check('index.html','CMS Preview Tool');
 check('index.html','CMS Pricing Heading');
 check('all-tools/index.html','CMS All Tools Heading');
 check('index.html','CMS Savings CTA');
 check('index.html','CMS Server Status Card');
 check('index.html','CMS Tool Request Title');
 check('index.html','https://example.com/cms-signup');
 check('index.html','CMS Homepage Changed');
 check('index.html','CMS Join Today');
 const product=check('tool/ahrefs-group-buy/index.html','CMS Ahrefs Edited');
 assert.ok(product.includes('CMS Ahrefs Benefit')&&product.includes('CMS Ahrefs Key Benefit'),'Product-specific CMS details did not render');
 assert.ok(product.includes('$37'), 'CMS product price change not visible');
 assert.ok(product.includes('37/mo'), 'CMS product title price stale');
 assert.ok(product.includes('207/year'), 'CMS product SEO description stale');
 check('index.html','CMS Header Brand');
 check('index.html','CMS Tools Menu Link');
 check('index.html','CMS Footer Tagline');
 check('pricing/index.html','CMS Edited Lite Plan');
 check('pricing/index.html','99'); // Astro SSR may insert a hydration boundary between $ and number
 // Accordion answers are lazy-mounted by Base UI and therefore packaged in the
 // hydrated JS rather than present in the static HTML while closed.
 const builtJs=fs.readdirSync('dist/_astro').filter(name=>name.endsWith('.js')).map(name=>fs.readFileSync('dist/_astro/'+name,'utf8')).join('');
 assert.ok(builtJs.includes('CMS Edited FAQ Answer'),'CMS FAQ answer missing from client-side bundle');
 const about=check('about-us/index.html','CMS About Edited');
 for(const v of ['CMS body content updated without editing HTML','CMS About Custom SEO Title','CMS About Custom Description'])assert.ok(about.includes(v),'CMS page edit not present: '+v);
 console.log('PASS: CMS edits produce matching Astro HTML and SEO metadata.');
}else if(mode==='validate'){
 console.log('PASS: 52 products, 20 page/blog records, homepage, 6 plans and 5 FAQs.');
}else throw Error('Usage: node scripts/verify-cms-editing.mjs validate|prepare|check');
