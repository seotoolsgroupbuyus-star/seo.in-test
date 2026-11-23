# Editing seo.in-test with Pages CMS

Open **https://app.pagescms.org/**, sign in with the GitHub account that owns this repository, install/authorize the Pages CMS GitHub App for **seotoolsgroupbuyus-star**, then select **seo.in-test** and the **main** branch. Pages CMS reads the root `.pages.yml` and writes edits directly to the repository.

## Friendly editor sections

- Homepage Hero
- Homepage Sections
- More Homepage Sections
- Products
- Pages/Blog
- Plans
- FAQs
- Header/Footer

Choose an item, change its plain text, picture, price, button label or URL, and click **Save**. Repeated cards/sections are grouped in collapsible lists. Blog/article bodies use a visual editor, where supported. **Do not edit hidden `originalText`, `source` or `offset` fields**; these preserve matching with the original live design.

Changes are Git commits. **They are not live automatically unless Cloudflare is connected to the repository and successful builds deploy.** Check the repository's Actions tab and the Cloudflare preview after saving.

You can change all mapped fields. Avoid editing slugs until URL and redirect changes are coordinated.

## Important boundaries

Pages CMS is a Git-backed content editor, not a visual CSS/theme builder. Responsive layout code, application logic, server endpoints, database integrations and checkout processing may still require developer/code changes. An original site may use external images that are unavailable; an image field alone does not guarantee images load. Actual CMS sign-in, write permission, media upload and Cloudflare deployment must be tested in the connected account to confirm end-to-end publishing.

Official guides:
- https://pagescms.org/docs/quick-start/
- https://pagescms.org/docs/configuration/content/fields/
- https://pagescms.org/docs/configuration/content/list/
- https://pagescms.org/docs/configuration/fields/rich-text/
