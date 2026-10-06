# Parco Solutions website

Static Next.js frontend for [parcosolutions.in](https://parcosolutions.in), an IT solutions company building custom software, management systems and websites. WordPress is the headless CMS. The build outputs plain HTML, CSS and JS in `out/`, which is uploaded to GoDaddy cPanel. No Node.js server is needed in production.

## What comes from where

| Content | Source |
| --- | --- |
| Blog posts (`/blog/`) | WordPress REST API, fetched at build time |
| Privacy and Terms pages | WordPress pages `privacy` and `terms`, fetched at build time |
| Contact form | Posts from the browser to Contact Form 7 (form `1253`) on WordPress |
| Services, solutions, client work, company details | `src/content/site.ts` |

The theme's `service` post type is not exposed to the REST API, so service content lives in `src/content/site.ts`.

Because the site is static, **WordPress changes go live after the next build**. Push to `main`, run the workflow manually, or trigger it from WordPress (see below).

## Requirements

- Node.js 20.9 or newer (`.nvmrc` pins 22). With nvm-windows: `nvm use 22.11.0`.

## Local development

```bash
cp .env.example .env.local   # optional, defaults point at parcosolutions.in
npm install
npm run dev                  # http://localhost:3000
```

## Build

```bash
npm run build                # writes ./out
npx serve out                # preview the exported site
```

`npm run build` also runs `scripts/flatten-rsc.mjs`. Next 16 writes prefetch files into nested folders, but the browser requests flat file names. The script writes flat copies so client-side navigation works on a plain Apache host.

## Hosting on GitHub Pages (current)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`, once a day (so new WordPress posts appear), and on demand from the Actions tab.

- Live URL until a custom domain is connected: https://farazuddin178.github.io/parcosolutions/
- The workflow sets `NEXT_PUBLIC_BASE_PATH=/parcosolutions` so links, images and icons work under that sub-path. Files from `public/` must be referenced through `asset()` in `src/lib/asset.ts`.

### Connecting parcosolutions.in later

1. GoDaddy DNS: four `A` records for `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` to `farazuddin178.github.io`.
2. Move WordPress to a subdomain (e.g. `cms.parcosolutions.in`) on GoDaddy hosting, and add a repository variable `WP_URL` with that address.
3. GitHub: Settings > Secrets and variables > Actions > Variables, add `CUSTOM_DOMAIN` = `parcosolutions.in`. Re-run the workflow. It drops the base path and writes the `CNAME` file.
4. Settings > Pages: confirm the custom domain and tick "Enforce HTTPS".

GitHub Pages ignores `.htaccess`, so the old-URL redirects in it only apply on Apache/cPanel.

## Deploying to GoDaddy cPanel (alternative)

1. **Move WordPress off the main domain first.** The static site replaces `public_html`, so WordPress needs its own home, e.g. a subdomain `cms.parcosolutions.in` (cPanel > Domains > Create subdomain, then move or clone the install with Installatron or WP Toolkit). Then set `WP_URL` and `NEXT_PUBLIC_WP_URL` to the new address and rebuild.
2. Run `npm run build`.
3. In cPanel **File Manager**, back up `public_html`, then upload the **contents** of `out/`, including the hidden `.htaccess` file. Turn on "Show hidden files" in File Manager settings to check it is there.

`.htaccess` handles HTTPS, trailing slashes, the custom 404 page, caching, and 301 redirects from retired WordPress URLs (pricing, our-team, shop, old service slugs).

To rebuild instantly when a post is published (instead of waiting for the daily build), send a `repository_dispatch` event of type `wordpress-update` from WordPress (for example with a webhook plugin) to `https://api.github.com/repos/Farazuddin178/parcosolutions/dispatches`, using a fine-grained token that has Contents read/write on this repo.

## Editing content

- **Client work:** `work` in `src/content/site.ts`. Add `url` to show a "Visit site" link, and swap `image` / `detailImage` for real screenshots in `public/images/`.
- **Services:** `services` in the same file. Each entry becomes `/service/<slug>/`.
- **Images:** `public/images/` as 1600px WebP. Stock photography is from Unsplash (free for commercial use under the Unsplash License).
