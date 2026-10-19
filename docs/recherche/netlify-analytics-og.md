# deploy-analytics-og (reviewed 2026-10-19): Netlify Free (credits) + custom domain (OVH/Combell) + cookieless analytics + build-time OG images (satori) + LinkedIn/email link previews, for a static Astro 7.4.1 site (Belgium)

## Summary

I re-checked almost every claim against official pages or with a local test today, and most of the notes hold. The netlify.toml (command "npm run build", publish "dist", NODE_VERSION "24", a one-year immutable cache on /_astro/*, X-Robots-Tag on /col-macarthur and /col-macarthur/*) is valid, and a static Astro site needs no adapter. Netlify Free has been credit-based for every account created since 2025-09-04: 300 credits a month as a hard limit, 15 credits per production deploy, 20 credits per GB of bandwidth, and every project pauses when the credits run out. New teams get private projects by default (changelog 2026-07-28), so Project visibility must be switched to public before LinkedIn or a recruiter can open the site. Both '[skip netlify]' and '[skip ci]' are documented officially, and deploy previews and branch deploys cost 0 credits. For DNS on OVH, which has no ALIAS record: A @ -> 75.2.60.5, CNAME www -> <site>.netlify.app, www as the primary domain, automatic Let's Encrypt. OVH charges 7.99 € HT for year 1 and 14.29 € HT to renew (confirmed again today in the API for both FR and IE). Combell charges 9.99 € HTVA, then 46.99 € HTVA to renew. GoatCounter is still the best free choice: no cookies, free for personal sites, hosted by Hetzner in Finland and Germany, with a path filter, a day view and referrers. One correction: Cloudflare Web Analytics does have Path and referrer filters and keeps unsampled data for 7 days, but it reduces data to about 10% after that, so it stays second choice for a low-traffic page. I rebuilt the satori 0.63.0 + sharp 0.35.5 endpoint today and it gives 1200x630 PNGs. The box-sizing change (content-box from 0.54+) and the import.meta.url ENOENT failure also happened again in today's tests. One fix: 56 satori versions came out between Oct 2 and Oct 19, not about 30, and HarfBuzz shaping (0.33.0) came out on 2026-08-20. The notes were missing some Astro settings: set site (Astro.site is needed for absolute og:image URLs) and trailingSlash:'always' (Astro.url.pathname ends with '/' in directory builds, and Netlify serves /col-macarthur/). Also add a <meta name="robots" content="noindex"> on the page as a second safeguard, because Netlify does not document how header paths match a trailing slash.

## Corrections
- ORIGINAL: satori: about 30 releases between 2026-10-02 and 2026-10-19, including HarfBuzz shaping (0.33.0); summary: '30 versions came out in October 2026 alone'
  FIX: 56 npm versions (0.34.0 to 0.63.0, i.e. 30 minor bumps plus patches) came out between 2026-10-02 and 2026-10-19. HarfBuzz shaping (0.33.0) came out earlier, on 2026-08-20. WOFF2 support is 0.55.0 (2026-10-13), as stated.
  SRC: npm view satori time ; https://github.com/vercel/satori/releases
- ORIGINAL: Plausible Starter: about 3 years of retention per third parties
  FIX: Plausible's own site states that Starter ($9/month, up to 10k monthly pageviews) includes 3 years of data retention.
  SRC: https://plausible.io/
- ORIGINAL: Cloudflare Web Analytics samples its data, which makes counts as small as three views unreliable... Not suited to this exact need.
  FIX: The dashboard has 'Add filter' with Path and referrer dimensions, and beacon data is unsampled for the last 7 days. After 7 days it is reduced to about 10%, and dashboard queries use dynamic sampling (0.0001%-100%). It works for checking recent visits to /col-macarthur, but history for low-traffic paths is unreliable. It remains second choice behind GoatCounter. The 10-site cap for non-proxied sites is a soft limit that support can raise.
  SRC: https://developers.cloudflare.com/web-analytics/faq/ ; https://developers.cloudflare.com/web-analytics/configuration-options/filters/ ; https://developers.cloudflare.com/web-analytics/limits/
- ORIGINAL: Private repos: personal private repo free on Free plan — confidence verified-in-docs
  FIX: Downgraded to inferred. The 'personal repository, public or private, remains free' statement is from Netlify's 2022-10-03 announcement about the legacy Starter plan. The current credit-based docs only mark 'Organization-owned private repos' as N/A on Free, which implies personal private repos work, but no current page says it directly.
  SRC: https://answers.netlify.com/t/connecting-to-organization-owned-private-github-repositories/76747 ; https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- ORIGINAL: Credit-based plans apply to new accounts (no date given)
  FIX: Credit-based plans apply to every account created on or after 2025-09-04. Accounts created before that are 'Legacy', can stay as they are, and switching to credits cannot be undone.
  SRC: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- ORIGINAL: '[skip ci]' or '[skip netlify]' in the last pushed commit message prevents a build — confidence uncertain (blog/forum sources)
  FIX: This is in Netlify's official docs: either marker anywhere in the commit message skips a branch or production deploy, a marker on the most recent commit covers the whole push, and for Deploy Previews the marker goes in the PR title. Upgraded to verified-in-docs.
  SRC: https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview
- ORIGINAL: LinkedIn cache/Post Inspector facts sourced only from third-party blogs (confidence uncertain)
  FIX: LinkedIn's own help page confirms that Post Inspector refreshes the URL and that 'The preview for any existing posts with this URL will remain the same'. Only the figure of about 7 days of caching remains third-party and unverified.
  SRC: https://www.linkedin.com/help/linkedin/answer/a6233775
- ORIGINAL: Netlify Web Analytics: cannot filter the daily charts to one path; data kept 1 day on Free — confidence verified-in-docs
  FIX: The 1-day retention is documented (Free: 'Available for current/past day'). That no per-path filter exists is only inferred: the overview page documents daily Pageviews/Unique visitors charts and a Top pages ranking, but no path filter. Downgraded to inferred.
  SRC: https://docs.netlify.com/manage/monitoring/web-analytics/overview/ ; https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- ORIGINAL: Node version: env var or files override the UI (no precedence among them)
  FIX: Netlify's available-software page lists precedence as .nvmrc, then .node-version, then NODE_VERSION, then the UI. The manage-dependencies page gives no order between them. Use only one mechanism. A new site is also pinned to the build image default (Node 24) when it is created.
  SRC: https://docs.netlify.com/build/configure-builds/available-software-at-build-time/ ; https://docs.netlify.com/build/configure-builds/manage-dependencies/
- ORIGINAL: OG/LinkedIn snippet uses Astro.site and Astro.url.pathname with no config guidance
  FIX: Added: 'site' must be set in astro.config or Astro.site is undefined and new URL() throws. With build.format 'directory', Astro.url.pathname ends with a trailing slash, and the docs recommend trailingSlash:'always'. Since Astro 6, endpoints with a file extension (such as /og/x.png) are only reachable without a trailing slash, so the OG route is unaffected.
  SRC: https://docs.astro.build/en/reference/configuration-reference/ ; https://docs.astro.build/en/guides/upgrade-to/v6/
- ORIGINAL: OVH: delegate nameservers to Netlify DNS after recreating MX (no DNSSEC mention)
  FIX: Added: OVH enables DNSSEC by default, and its guide says to disable DNSSEC before changing nameservers; the change only takes effect afterwards (about 24h, plus 24-48h of propagation). OVH also says the old zone's contents are not copied to the new DNS.
  SRC: https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-server-edit ; https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-dnssec

## Pitfalls
- Netlify Free has a hard limit of 300 credits, and each successful production deploy costs 15. Twenty pushes to main in a month, or fewer pushes plus a few GB of bandwidth (20 credits/GB), pause every project ('Site not available') until the next cycle. Develop locally, push to main in batches, use '[skip netlify]' on the last commit of WIP pushes, or work on a branch (deploy previews and branch deploys cost 0 credits).
- A Netlify team created after 2026-07-28 makes projects private by default (Netlify login required). Set Project visibility to public before sharing any link, or LinkedIn's crawler and recruiters hit a login wall and the OG preview fails.
- Only an organization-owned private repo needs Pro. Create the private repo under Youri's personal GitHub account.
- OVH has no ALIAS/ANAME at the apex. Use A @ -> 75.2.60.5 plus CNAME www -> <site>.netlify.app and make www primary. Delete OVH's default parking A/AAAA/CNAME/TXT records for @ and www first (inferred, not in Netlify's docs). A leftover AAAA record sends IPv6 visitors to OVH's parking page.
- If you delegate nameservers to Netlify DNS instead, disable DNSSEC at OVH first: OVH enables it by default and its guide says the nameserver change only takes effect after DNSSEC is off. Recreate any MX/TXT records in Netlify DNS beforehand, because the old zone is not copied.
- Combell's .com is 9.99 € HTVA in year 1 but 46.99 € HTVA (about 57 € TVAC) per year after. OVH renews at 14.29 € HT (about 17.29 € TVAC). Compare renewal prices, not the promo.
- Do not block /col-macarthur in robots.txt. Crawlers, including LinkedInBot, then can't fetch the page, the preview breaks, and the noindex is never seen. Use the X-Robots-Tag header and also <meta name="robots" content="noindex"> in the page, and leave it out of the sitemap.
- Netlify doesn't document how header 'for' paths match a trailing slash. Keep both '/col-macarthur' and '/col-macarthur/*', add the noindex meta tag, and check with: curl -sI https://www.yourikaramyan.com/col-macarthur/ | grep -i x-robots. Header rules can't be scoped per deploy context.
- Set site: 'https://www.yourikaramyan.com' in astro.config. Without it, Astro.site is undefined and new URL('/og/...', Astro.site) throws, so og:image and canonical break. Also set trailingSlash: 'always' so canonical and og:url (/col-macarthur/) match the URL Netlify serves, avoiding a 301 hop.
- Use only one Node version mechanism, NODE_VERSION in netlify.toml or .nvmrc, not both. Netlify's pages describe precedence inconsistently.
- satori is changing very fast: 56 releases from 0.34.0 to 0.63.0 in 17 days, including box-model and text-layout changes. Pin the exact version ("satori": "0.63.0", no caret) and set boxSizing:'border-box' on the padded root. WOFF2 needs satori >= 0.55.0; WOFF and TTF work on every version.
- satori needs explicit font buffers (no system fonts). Load every weight you use, give wrapping text a width constraint, and put display:flex on every div with more than one child. Use a font subset that covers French accents and '×' (Fontsource 'latin' does).
- Inside an Astro endpoint, new URL('./font.woff', import.meta.url) resolves into the bundled dist/ and fails with ENOENT (reproduced today). Use paths relative to the project root, the cwd of 'astro build'.
- sharp is only an optionalDependency of astro. If the OG endpoint imports sharp, add it to dependencies. If Netlify's Linux build then fails to load sharp (npm bug #4828 with cross-platform lockfiles), delete node_modules and package-lock.json and reinstall, so the lockfile records @img/sharp-linux-x64.
- Cloudflare Web Analytics keeps unsampled data for only 7 days, then reduces it to about 10%, and dashboard queries are sampled dynamically. 'Three views on a Tuesday' a month ago can vanish or be extrapolated. It is also a US provider. It is usable for last-week checks, not history.
- Netlify Analytics on Free keeps only the current and previous day, so it can't answer per-day questions about a given page.
- GoatCounter, Umami, Cloudflare and Plausible beacons are blocked by many ad blockers (uBlock Origin, Brave). Treat the counts as a minimum. If a CSP is added later, allow gc.zgo.at and yourikaramyan.goatcounter.com.
- Your own visits pollute the counts. Open the live site once with #toggle-goatcounter in each browser you use, or add your IP under Settings > Tracking > Ignore IPs. localhost is already ignored.
- 'No consent banner' for cookieless analytics is the common reading, not settled law in Belgium: the APD requires consent for analytics cookies, and EDPB 2/2023 reads Art. 5(3) broadly. Keep a short privacy note on the site that names GoatCounter.
- LinkedIn caches previews. Run Post Inspector after every OG change. Existing posts keep their old preview (LinkedIn says so), so version the image file name if it looks stale.
- Gmail shows no native OG card. Don't count on the image appearing in emails to recruiters. Outlook.com and Outlook on the web show a preview by default.

## Open questions
- Has yourikaramyan.com been bought, and at which registrar? The user's reply still had the placeholder '[pas encore acheté, guide-moi / acheté chez ...]'. That decides between A + CNAME at the registrar and delegating to Netlify DNS (plus disabling DNSSEC at OVH), and whether MX records must be kept.
- Does Youri already have a GitHub account, and will the repo be private under his personal account? The user's reply still had the placeholder.
- Is the Netlify account new (credit-based Free since 2025-09-04, private-by-default projects for teams created after 2026-07-28) or a legacy account with the old Starter limits?
- Should company-specific pages such as /col-macarthur be noindex? I assumed yes. If they should be findable on Google, drop the X-Robots-Tag rules and the robots meta tag.
- Should the OG images use the site's real display font? If it only exists as woff2, use satori >= 0.55.0 (pinned) or convert it to woff/ttf.
- Should the GoatCounter dashboard stay private (the default), or should a public visitor counter or JSON endpoint be turned on? I recommend keeping it private.
- Does Netlify's header 'for' matching treat '/col-macarthur' and '/col-macarthur/' the same? Its docs don't say. Check with curl after the first deploy.

## Facts

### F1 [verified-in-docs]
Netlify Free (credit-based): $0, 300 credits/month as a hard limit with no recharge option, and 1 concurrent build. Credit costs: production deploy 15 credits; bandwidth 20 credits/GB; web requests 2 credits per 10,000; compute 10 credits/GB-hour; Forms free; AI inference 180 credits per USD. Deploy previews and branch deploys cost 0 credits, as do failed deploys and rollbacks. Monthly credits reset each cycle and do not roll over on Free. When the balance is used up, all projects are paused and show 'Site not available' until the next cycle. 300 credits = at most 20 production deploys if nothing else is consumed.
SRC: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ ; https://www.netlify.com/pricing/pro-vs-free.md

### F2 [verified-in-docs]
Credit-based plans apply to every Netlify account created on or after 2025-09-04. Older Free/Starter/Pro accounts are 'Legacy' and can stay as they are; switching to credits cannot be undone. Personal costs $9/month for 1,000 credits, with 7-day web analytics/RUM retention and 1-day observability. Free has 1-day retention: per the plan table, Web analytics is 'Available for current/past day'. Pro costs $20/month for 3,000 credits with 30-day retention. The Free table also lists: custom domains with SSL ✓, password protection N/A, private projects '✓ Owner only', 500 projects.
SRC: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ ; https://www.netlify.com/pricing/personal-vs-free.md ; https://www.netlify.com/pricing/pro-vs-free.md

### F3 [inferred]
Private repos: the credit-based plan table marks only 'Organization-owned private repos' as N/A on Free, and the pricing page lists 'Private organization repos' as Pro. Netlify's 2022-10-03 announcement, written for the legacy Starter plan, said 'Connecting to a personal repository — public or private — remains free'. So a private repo under Youri's personal GitHub account should work on Free. That is inferred: no current page says it directly.
SRC: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ ; https://answers.netlify.com/t/connecting-to-organization-owned-private-github-repositories/76747

### F4 [verified-in-docs]
Project visibility (changelog dated 2026-07-28): on credit-based Free, Personal and Pro, only NEW teams start with private projects by default. A private project builds and deploys, but its live URL needs a Netlify login. Existing teams keep the public default. To change it for one project: Project configuration > General > Visitor access > Project visibility. For the whole team: Team settings > General > Visitor access > Default project visibility.
SRC: https://www.netlify.com/changelog/2026-07-28-start-with-private-project-urls/

### F5 [verified-in-docs]
Netlify detects Astro automatically and suggests 'astro build' with publish directory 'dist'. A static site needs no adapter (Netlify docs and Astro's deploy guide both say so). Astro's guide gives an optional netlify.toml with command 'npm run build' and publish 'dist'.
SRC: https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/ ; https://docs.astro.build/en/guides/deploy/netlify/
```
[build]
  command = "npm run build"
  publish = "dist"
```

### F6 [verified-in-docs]
Node on Netlify: the build image is Ubuntu 24.04 and the default Node is 24. A new site is pinned to the image default when it is created. You can set the version with NODE_VERSION (a major such as '24' is accepted), with .nvmrc or .node-version, or in the UI (Dependency management). The env var and the files override the UI. The available-software page lists precedence as .nvmrc, then .node-version, then NODE_VERSION, then the UI, so use only one mechanism. npm follows the Node version unless NPM_VERSION is set. Astro needs Node >= 22.22.0 and does not support odd versions; astro@7.4.1 engines: node >=22.22.0, npm >=9.6.5.
SRC: https://docs.netlify.com/build/configure-builds/manage-dependencies/ ; https://docs.netlify.com/build/configure-builds/available-software-at-build-time/ ; https://docs.astro.build/en/install-and-setup/ ; npm view astro@7.4.1 engines
```
[build.environment]
  NODE_VERSION = "24"
```

### F7 [inferred]
Recommended netlify.toml. The [[headers]] syntax ('for' plus [headers.values]) is documented, and '*' can appear anywhere in a path segment. Custom headers apply only to files Netlify serves from its store, which covers everything on a static site. Header rules apply to every deploy context and cannot be scoped to one context. Astro writes hashed assets to /_astro/ (build.assets default) and pages to <route>/index.html (build.format default 'directory'). Netlify answers /col-macarthur with a 301 to /col-macarthur/. Netlify does not document how header 'for' paths match a trailing slash, so the file keeps both patterns, and you should verify with curl after deploying. The one-year immutable value is common practice and is not in Netlify's docs.
SRC: https://docs.netlify.com/manage/routing/headers/ ; https://answers.netlify.com/t/support-guide-how-can-i-alter-trailing-slash-behaviour-in-my-urls-will-enabling-pretty-urls-help/31191 ; https://docs.astro.build/en/reference/configuration-reference/
```
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "24"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/col-macarthur"
  [headers.values]
    X-Robots-Tag = "noindex"

[[headers]]
  for = "/col-macarthur/*"
  [headers.values]
    X-Robots-Tag = "noindex"
```

### F8 [verified-in-docs]
Astro config. Astro.site is only defined when 'site' is set. In a 'directory' build, Astro.url.pathname ends with a slash (/col-macarthur/), and the Astro docs recommend trailingSlash:'always' with that format to keep dev and build consistent. Since Astro 6, an endpoint with a file extension (such as /og/col-macarthur.png) can only be reached without a trailing slash, whatever trailingSlash is set to, so the OG endpoint is unaffected.
SRC: https://docs.astro.build/en/reference/configuration-reference/ (build.format > Effect on Astro.url ; trailingSlash) ; https://docs.astro.build/en/guides/endpoints/ ; https://docs.astro.build/en/guides/upgrade-to/v6/
```
// astro.config.mjs
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://www.yourikaramyan.com',
  trailingSlash: 'always',
});
```

### F9 [uncertain]
Netlify adds X-Robots-Tag: noindex to deploy previews and deploy-ID URLs, and this can't be overridden. Branch deploy URLs do not get it. The published production deploy is indexable. This comes from forum answers only; the official docs don't say it.
SRC: https://answers.netlify.com/t/override-x-robots-tag-noindex-header-in-deploy-preview/38980

### F10 [verified-in-docs]
Skipping a deploy (official docs): put '[skip ci]' or '[skip netlify]' anywhere in the commit message to block a branch or production deploy. For a push of several commits, put it in the most recent commit and it covers the whole push. For a PR's Deploy Preview, put it in the PR title. The next push without the marker deploys all the skipped changes. 'Lock to stop auto publishing' on the Deploys page keeps building without publishing.
SRC: https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview
```
git commit -m "wip: draft texts [skip netlify]"
```

### F11 [verified-in-docs]
External DNS for Netlify. Apex: the recommended record is an ALIAS, ANAME or flattened CNAME to apex-loadbalancer.netlify.com; the fallback is an A record to 75.2.60.5. www: CNAME to <yoursite>.netlify.app. With external DNS, Netlify 'strongly recommend[s]' www (a subdomain) as the primary domain. Adding the apex or www adds both entries, and the other one redirects automatically to the primary. Propagation can take up to a day.
SRC: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/ ; https://docs.netlify.com/manage/domains/manage-domains/manage-multiple-domains/
```
@    A      75.2.60.5
www  CNAME  <yoursite>.netlify.app.
```

### F12 [inferred]
OVH's DNS zone has no ALIAS/ANAME record at the apex (community answers; Northflank's OVH guide says the same). So on OVH, use A @ -> 75.2.60.5 plus CNAME www, with www as primary. The other route is to delegate nameservers to Netlify DNS: copy existing records such as MX into Netlify DNS first. OVH's own guide says the old zone is not copied over. OVH enables DNSSEC by default, and its guide says to disable DNSSEC before changing nameservers; the change only takes effect afterwards (allow 24h, then 24-48h of propagation).
SRC: https://community.ovhcloud.com/t/creer-un-cname-pour-un-domaine-racine/30321 ; https://docs.netlify.com/manage/domains/set-up-netlify-dns/ ; https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-server-edit ; https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-dnssec

### F13 [verified-in-docs]
HTTPS: Netlify provisions and renews a Let's Encrypt certificate automatically for custom domains. DNS has to be set up in advance for every alias that should be on the certificate. An optional CAA record restricts issuance to Netlify's Let's Encrypt account.
SRC: https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/
```
yourikaramyan.com. 300 IN CAA 0 issue "letsencrypt.org;accounturi=https://acme-v02.api.letsencrypt.org/acme/acct/54403714"
```

### F14 [verified-in-docs]
OVHcloud .com, from the public catalog API queried again on 2026-10-19: FR subsidiary (taxRate 20) charges 7.99 € HT for creation (year 1), 14.29 € HT/year to renew, and 7.99 € HT for a transfer. The IE subsidiary shows the same 7.99/14.29 € HT. A Belgian consumer pays Belgian VAT (21%) on e-services, so about 9.67 € TVAC in year 1 and about 17.29 € TVAC per year after (my calculation). Check the cart, because one cached ovhcloud.com/fr snippet showed 13.49 € HT for renewal.
SRC: https://eu.api.ovh.com/v1/order/catalog/public/domain?ovhSubsidiary=FR ; https://www.ovhcloud.com/fr/domains/tld/com/
```
curl -s "https://eu.api.ovh.com/v1/order/catalog/public/domain?ovhSubsidiary=FR"  # plans[planCode=com].pricings: create-default phase0 7.99 / phase1 (renew) 14.29
```

### F15 [verified-in-docs]
Combell .com: 'Enregistrer' 9.99 € and renewal 46.99 €/year, both HTVA ('Tous les prix mentionnés s'entendent HTVA'). Activation is free and transfer is included. With 21% VAT that is about 12.09 € and about 56.86 € TVAC (my calculation). The 9.99 € also appears in the 'Promotions' bar.
SRC: https://www.combell.com/fr/noms-de-domaine/com ; https://www.combell.com/fr/noms-de-domaine/prix

### F16 [verified-in-docs]
GoatCounter (hosted) is 'offered for free for reasonable public usage'. A personal site or small-to-medium business is fine, 'millions of pageviews/day' is not, and there is no numeric cap. It sets no cookies. The session key is concat(siteID, User-Agent, IP), kept in memory for 8 hours and mapped to a random UUIDv4; IP and UA are never written to disk. Data is stored at Hetzner in Finland and Germany, the operator is in Ireland, and backups are kept up to 30 days. GoatCounter's GDPR page says it 'probably doesn't require a GDPR consent notice'. It is open source and lets you export data.
SRC: https://www.goatcounter.com/help/terms ; https://www.goatcounter.com/help/sessions ; https://www.goatcounter.com/help/privacy ; https://www.goatcounter.com/help/gdpr

### F17 [verified-in-docs]
GoatCounter setup. The official snippet uses src="//gc.zgo.at/count.js"; the https:// form is equivalent. In Astro, a <script> with any attribute other than src is left unprocessed, and is:inline makes that explicit. count.js sends the canonical link's path when one exists. localhost and common private networks are ignored unless allow_local is set. To exclude yourself, visit the site once with #toggle-goatcounter (count.js sets localStorage 'skipgc') or use Settings > Tracking > Ignore IPs.
SRC: https://www.goatcounter.com/help/start ; https://www.goatcounter.com/help/skip-dev ; https://gc.zgo.at/count.js ; https://docs.astro.build/en/guides/client-side-scripts/
```
<script is:inline data-goatcounter="https://yourikaramyan.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
<!-- per page, so the counted path is stable: -->
<link rel="canonical" href="https://www.yourikaramyan.com/col-macarthur/" />
```

### F18 [inferred]
GoatCounter dashboard (public demo): a path filter 'matched case-insensitive on path and title', periods from 'Last day' to 'year', a 'View by: hour · day' toggle, a Pages list with a chart per path, and a 'Top referrers' widget. Together they show /col-macarthur/ views per day. An optional public JSON counter is off by default.
SRC: https://stats.arp242.net/ ; https://www.goatcounter.com/help/visitor-counter

### F19 [verified-in-docs]
count.js (9.2 KB, downloaded today) sends path, title, referrer and screen.width, skips bots (including navigator.webdriver), sets no cookie, and only reads and writes localStorage for the 'skipgc' self-exclusion flag.
SRC: https://gc.zgo.at/count.js

### F20 [verified-in-docs]
Cloudflare Web Analytics: free, and works on sites not proxied by Cloudflare through a manual JS snippet copied from 'Manage site' and placed before </body>. The limit is 10 non-proxied sites per account, described as a soft limit that support can raise. Its product page says it uses no cookies or localStorage and no fingerprinting. The FAQ says manual embeds should add type="module", which keeps IE and other very old browsers from loading the script, and that the dashboard snippet now includes it. Data is unsampled for 7 days, then reduced to about 10% for long-term storage, with 6 months available. Dashboard queries use dynamic sampling. The dashboard has 'Add filter' with Path and referrer dimensions. Ad blockers block the beacon. Cloudflare is a US company and no EU-only hosting is stated.
SRC: https://developers.cloudflare.com/web-analytics/get-started/ ; https://developers.cloudflare.com/web-analytics/faq/ ; https://developers.cloudflare.com/web-analytics/limits/ ; https://developers.cloudflare.com/web-analytics/configuration-options/filters/ ; https://www.cloudflare.com/web-analytics/
```
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "$SITE_TOKEN"}'></script>
```

### F21 [verified-in-docs]
Umami Cloud Hobby: $0, up to 100K events/month, 1 website, 6-month retention. It includes custom events, UTM and realtime. It has no API/MCP access, no email reports and no teams. Data export is probably included (the FAQ says all data can be exported). The pricing table lists 'No cookie banners required' and the FAQ says Umami uses no cookies. Servers are in the US and EU, and choosing a region is not documented. Pro costs $20/month. The snippet goes in <head>; data-domains limits tracking to the production hostnames.
SRC: https://umami.is/pricing ; https://docs.umami.is/docs/tracker-configuration ; https://docs.umami.is/docs/collect-data
```
<script defer src="https://cloud.umami.is/script.js" data-website-id="YOUR-WEBSITE-UUID" data-domains="www.yourikaramyan.com"></script>
```

### F22 [verified-in-docs]
Plausible has no free hosted plan, only a 30-day trial with no card. Starter is $9/month for up to 10k monthly pageviews with 3 years of retention (from Plausible's own site). It sets no cookies and is 'Made and hosted in the EU'. The self-hosted Community Edition is free.
SRC: https://plausible.io/ ; https://plausible.io/docs/plausible-script

### F23 [inferred]
Netlify Web Analytics is collected on the server, is not stopped by ad blockers, and is described as GDPR-compliant. It shows daily Pageviews and Unique visitors (distinct IPs), Top pages, Top sources, Top locations and 404s, with 30d/7d/24h ranges. The overview page documents no per-path filter for the daily charts. On credit-based Free, data is 'Available for current/past day' only, so on Free it can't answer 'how many views did /col-macarthur get last Tuesday'.
SRC: https://docs.netlify.com/manage/monitoring/web-analytics/overview/ ; https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/

### F24 [inferred]
Legal context. Belgium's APD treats analytics/audience-measurement cookies as non-essential, so they need consent, and Belgium has no analytics exemption. EDPB Guidelines 2/2023 v2.0 (adopted 2024-10-07) read ePrivacy Art. 5(3) broadly, with URL/pixel tracking and IP-only tracking as worked use cases. So 'no banner needed' for cookieless tools is the common reading, not a guarantee. Mitigation: a short privacy note that names GoatCounter.
SRC: https://www.loyensloeff.com/insights/news--events/news/belgian-data-protection-authority-releases-recipe-for-compliant-cookies/ ; https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en

### F25 [verified-in-docs]
satori latest is 0.63.0, published 2026-10-19 12:41 UTC, engines node>=16. It is changing very fast: 56 npm versions (0.34.0 to 0.63.0) came out between 2026-10-02 and 2026-10-19. HarfBuzz shaping arrived in 0.33.0 on 2026-08-20 and WOFF2 in 0.55.0 on 2026-10-13. The README says 'Satori supports four font formats: TTF, OTF, WOFF and WOFF2'. Font data (Buffer in Node, ArrayBuffer in browsers) is required whenever text is rendered. Variable fonts render as their default instance. 'Supported' CSS properties 'behave as in browsers', and boxSizing is supported. Fontsource Inter 5.3.0 ships both .woff and .woff2 files for latin-400/700.
SRC: https://github.com/vercel/satori (README + releases) ; npm view satori time
```
fonts: [{ name: 'Inter', data: buffer, weight: 400, style: 'normal' }]
```

### F26 [verified-in-docs]
Layout change, run again today on satori 0.63.0. A 1200x630 root with padding:80 and no boxSizing places the child at x=80, y=371, width=1200: the padding is added on top of the size, like CSS content-box. With boxSizing:'border-box', the child is at y=291, width=1040, the same as 0.33.5. Always set border-box on the padded root, and give wrapping titles a width constraint.
SRC: Local test: scratchpad ogtest/t5.mjs, run again 2026-10-19 with satori 0.63.0
```
style: { boxSizing: 'border-box', width: 1200, height: 630, padding: 80, display: 'flex', flexDirection: 'column' }
```

### F27 [verified-in-docs]
SVG to PNG on Windows. @resvg/resvg-js 2.6.2 is the latest stable (2024-03-26); 2.7.0-alpha.2 is from 2026-01. It ships prebuilt win32-x64/arm64/ia32 and linux-x64 gnu/musl binaries as optionalDependencies. sharp 0.35.5 (Node >= 20.9.0) ships Windows x64 and Linux x64 (glibc >= 2.28) binaries and is an optionalDependency of astro@7.4.1 (^0.35.4). A lockfile made on Windows with npm 11.13 from a fresh install records @img/sharp-linux-x64 (checked). Add sharp to dependencies explicitly if the code imports it.
SRC: npm view @resvg/resvg-js ; npm view sharp ; npm view astro@7.4.1 optionalDependencies ; https://sharp.pixelplumbing.com/install
```
const png = await sharp(Buffer.from(svg)).png().toBuffer();
// or: new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
```

### F28 [verified-in-docs]
Minimal static OG endpoint, rebuilt today with astro 7.4.1 + satori 0.63.0 + sharp 0.35.5: 'astro build' produced dist/og/col-macarthur.png at 1200x630 PNG. Static endpoints use getStaticPaths with params and props (context.props), a binary Response is enough, and the .png extension is kept in the output file name. Read fonts with paths relative to the project root (the cwd of astro build). new URL('../../assets/fonts/x.woff', import.meta.url) failed again today with ENOENT ...\dist\assets\fonts\inter-latin-400-normal.woff.
SRC: https://docs.astro.build/en/guides/endpoints/ ; context7 /withastro/docs (static file endpoints, context.props) ; local rebuild scratchpad/astrotest 2026-10-19
```
// src/pages/og/[slug].png.ts
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';

const pages = {
  'col-macarthur': { title: 'Youri Karamyan × Col&McArthur', subtitle: 'Candidature' },
  'accueil': { title: 'Youri Karamyan', subtitle: 'CV et portfolio' },
};

export const getStaticPaths = (() =>
  Object.entries(pages).map(([slug, page]) => ({ params: { slug }, props: page }))
) satisfies GetStaticPaths;

// relative to project root; import.meta.url would point into dist/
const fontDir = 'src/assets/fonts/';
const [regular, bold] = await Promise.all([
  readFile(fontDir + 'inter-latin-400-normal.woff'),
  readFile(fontDir + 'inter-latin-700-normal.woff'),
]);

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle } = props as { title: string; subtitle: string };
  const svg = await satori(
    { type: 'div', props: {
        style: { boxSizing: 'border-box', width: 1200, height: 630, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0f172a', color: '#f8fafc', fontFamily: 'Inter' },
        children: [
          { type: 'div', props: { style: { display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }, children: title } },
          { type: 'div', props: { style: { display: 'flex', fontSize: 36, marginTop: 24, opacity: 0.8 }, children: subtitle } },
        ] } },
    { width: 1200, height: 630, fonts: [
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: bold, weight: 700, style: 'normal' },
    ] },
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
```

### F29 [verified-in-docs]
Alternative: astro-og-canvas 0.13.2 (2026-09-15), with peer astro ^5 || ^6 || ^7 and dependency canvaskit-wasm ^0.42.0 (WASM, so no native binaries). Usage: export const { getStaticPaths, GET } = await OGImageRoute({ param, pages, getImageOptions: (path, page) => ({...}) }) in, for example, src/pages/open-graph/[...route].ts. 'fonts' takes URLs or paths relative to the project root, and the examples use .ttf. pnpm users must install canvaskit-wasm directly.
SRC: https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas ; npm view astro-og-canvas peerDependencies dependencies

### F30 [verified-in-docs]
LinkedIn requires og:title, og:image, og:description and og:url. Image: at least 1200 (w) x 627 (h), recommended ratio 1.91:1, max 5 MB; images under 401px wide show as a thumbnail. 1200x630 is above the minimum. Use an absolute https URL built from Astro.site (which needs 'site' in astro.config), even though LinkedIn's example is protocol-relative. If the image meets the specs but doesn't show, LinkedIn says the site may be blocking its crawler (for example a Netlify private project or a robots.txt Disallow).
SRC: https://www.linkedin.com/help/linkedin/answer/a521928 ; https://ogp.me/ ; https://docs.astro.build/en/reference/configuration-reference/
```
---
const canonical = new URL(Astro.url.pathname, Astro.site); // pathname ends with '/' in directory builds
const image = new URL('/og/col-macarthur.png', Astro.site);
---
<link rel="canonical" href={canonical.href} />
<meta name="robots" content="noindex" /> <!-- company pages only -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonical.href} />
<meta property="og:title" content="Youri Karamyan × Col&McArthur" />
<meta property="og:description" content="..." />
<meta property="og:image" content={image.href} />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### F31 [inferred]
LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) refreshes the URL. LinkedIn's help says the preview 'may show an old image that is cached' and that 'The preview for any existing posts with this URL will remain the same'. The figure of about 7 days of caching comes only from third-party guides. LinkedIn gives no official og:title length limit; about 60-70 characters avoids truncation. If an image stays stale, version its URL (col-macarthur-v2.png) or add a query string.
SRC: https://www.linkedin.com/help/linkedin/answer/a6233775 ; https://www.linkedin.com/post-inspector/ ; https://blog.flowpoint.ai/post/v2/this-is-what-causes-your-screenshot-to-be-cached-too-soon-on-linkedin-and-how-to-fix-it/

### F32 [inferred]
Outlook: Link Preview is on by default in Outlook.com and Outlook on the web. When a URL is added or received, it shows a rich preview with title, thumbnail and description. It can be turned off in Settings > Mail > Compose and reply > Link preview. Microsoft's article covers Outlook.com, Outlook on the web, Office 365 Small Business and OWA for Exchange 2016/2019, not classic desktop Outlook. Gmail: I found no official Google feature that builds Open Graph cards for ordinary links in a message body; only third-party Chrome extensions do. In emails, the link text and the message itself must do the work.
SRC: https://support.microsoft.com/en-us/outlook/use-link-preview-in-outlook-com-and-outlook-on-the-web ; https://chromewebstore.google.com/detail/ijghljlojmdcmndohiogfagdgegdpkfb