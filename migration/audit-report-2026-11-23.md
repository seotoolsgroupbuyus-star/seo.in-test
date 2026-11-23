# Migration verification — seogroupbuy.in → seo.in-test (2026-11-23)

Original live: https://seogroupbuy.in/  
Astro preview: https://seo-in-test.bilalfadi11221333.workers.dev/  
Source repository: https://github.com/seotoolsgroupbuyus-star/seo.in-test

## Verified checks

- Source sitemap: **77 routes**; Astro build: **77 pre-rendered pages**, with **52 products** and **20 pages/articles**.
- GitHub Actions Astro build verification succeeded (including canonical URL, description, H1, sitemap and 52 product JSON-LD entries).
- Browser visual comparison workflow succeeded on the original 77-route test set (screenshots for key routes).
- Separate computed CSS comparison of 8 representative URLs at 1440px and 390px: **16/16 views matched, zero CSS/geometry differences**, run 45095084725.
- Real mobile menu/chat/search/FAQ interaction parity: latest test passed, run 45094738366.
- Cloudflare edge checks: robots/sitemap/favicon available, **77 sitemap URLs** and unknown paths return HTTP 404; run 45095564804.
- Pages CMS simulated edits render correctly in the Astro build. Six collections now exist: Homepage, Products, Pages & Blog, Pricing Plans, FAQs, and Header/Footer settings. The current test also checks product SEO pricing, home content, FAQ answer in client bundle, site menus, footer text and SEO overrides.
- All pre-existing checkout destinations were retained. New custom product images and brand logo fields are optional, and preserve current icon design when empty.

## Deployment-dependent work

- Latest strict rendered-browser parity check: **73/77 live-preview route comparisons passed**. The only remaining flagged differences were title/description on `/all-tools`, `/pricing`, `/faq`, `/blog` (run 45095401574). Their Astro server-rendered metadata defaults were corrected in source commit `accc5f9e`, but the Cloudflare preview still showed the previous metadata at that audit. **Redeploy and re-run** before declaring 77/77.
- Google external favicon proxy sometimes fails for the same tool icons on either website; failures are logged separately. Optional CMS uploads now offer a replacement for individual tool images.
- CMS GitHub edit-build tests pass; **actual Pages CMS browser authorization/login/publish** was not tested.
- A successful browser/CSS test is not a pixel-by-pixel visual screenshot equality guarantee.
- Payment checkout transactions, support inbox, and newsletter backend were not transaction-tested; never infer payment or newsletter success from static HTML.

## Protection

- Original Next.js website, DNS, Cloudflare production settings and checkout endpoints were not modified.
- Astro preview remains intentionally `noindex,nofollow`; an approved production cutover must explicitly set `PUBLIC_PRODUCTION_INDEXABLE=true` and verify crawl/indexing afterward.
- Do not silently index preview or switch the live domain.

## Workflow links

- [77-route build verification](https://github.com/seotoolsgroupbuyus-star/seo.in-test/actions/workflows/verify-build.yml)
- [Pages CMS editing verification](https://github.com/seotoolsgroupbuyus-star/seo.in-test/actions/workflows/verify-cms.yml)
- [Strict live versus preview parity](https://github.com/seotoolsgroupbuyus-star/seo.in-test/actions/workflows/compare-live.yml)
- [Live design parity](https://github.com/seotoolsgroupbuyus-star/seo.in-test/actions/runs/45095084725)
- [Mobile interactions parity](https://github.com/seotoolsgroupbuyus-star/seo.in-test/actions/runs/45094738366)
- [Cloudflare edge verification](https://github.com/seotoolsgroupbuyus-star/seo.in-test/actions/runs/45095564804)
