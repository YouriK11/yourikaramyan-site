# Vercel (Hobby) pour le site statique Astro 7, vérifié le 19/10/2026

## Summary

I re-checked the notes against Vercel's docs on 2026-10-19 (limits page updated 2026-09-16, Hobby page 2026-09-14, Deployment Protection 2026-09-15, vercel.json 2026-08-14), Vercel's own source code on GitHub, and the GitHub, Netlify and GoatCounter pages. Most claims hold. Vercel Hobby suits this site and handles "many deploys" much better than Netlify Free.

**Plan and limits (verified)**
- Hobby is free and for personal, non-commercial use only. A CV and internship portfolio with no ads, payments or paid offers fits that rule.
- Per day and hour: 100 deployments a day, 100 a hour and 60 per 5 minutes.
- Builds: 1 at a time, 45 minutes max each, no build-minute quota (Basic 2 vCPU / 8 GB machine).
- Account: 200 projects, 25 projects per Git repo, 50 domains per project, 2,048 routes per deployment.
- Per month: 100 GB Fast Data Transfer, 1M CDN Requests (renamed from Edge Requests, same limits), 50k Web Analytics events.
- Hobby can never buy extra usage. Over a limit, most features stop for 30 days; rate limits reset after 1 hour or 1 day. A paused site shows 503 DEPLOYMENT_PAUSED and must be resumed by hand.
- Netlify Free: 300 credits a month with 15 per production deploy, so at most 20 deploys. Bandwidth (20 credits/GB) and requests also use credits, so the real number is lower. When credits run out, every site is paused.

**Build**
- Static Astro needs no adapter. The Astro preset is detected automatically: output `dist`, build command `astro build`, but a `vercel-build`, `now-build` or `build` script runs first if present.
- The preset already sends `public, max-age=31536000, immutable` for `/_astro/*` and `/assets/*`.
- Node versions available: 24.x (default) and 22.x. Node 20 has been disabled for new deployments since 2026-10-01.
- Vercel ignores `.nvmrc`. The project's package.json currently says `"engines": {"node": ">=22.22.0"}`. Vercel resolves that to 24.x but warns it will auto-upgrade to the next major. Change it to `"24.x"`.

**Private repo on Hobby**
- The commit author must be the Hobby owner. Vercel matches the author to the account's GitHub Login Connection.
- The existing commits are authored `youri.karamyan@student.hepl.be`. Fix: add and verify that address on GitHub account YouriK11, or commit as `266993000+YouriK11@users.noreply.github.com` (account ID re-checked through the GitHub API).
- No official source says whether `Co-Authored-By: Claude` trailers trigger the block. This stays uncertain.
- One /docs/git sentence says the check "does not apply to collaborators on personal Git accounts". A KB article updated 2026-10-16 says only the owner can trigger deployments on Hobby, and community reports from 2026 show personal repos being blocked. Treat the rule as enforced.

**vercel.json**
- `"trailingSlash": true` sends a 308 redirect from /x to /x/. Paths with a file extension are not redirected, `/.well-known` is exempt, and `/file.ext/` redirects to `/file.ext`.
- Leave `cleanUrls` off (default `false`).
- `dist/404.html` is served for unknown paths.
- Header `source` uses path-to-regexp 6, matched strictly and case-sensitively.

**Noindex on company pages**
- Simplest: a meta robots tag in the company layout, plus a sitemap filter.
- New option the notes missed: `vercel.ts` (official, runs at build time) can build the X-Robots-Tag rules from a list of companies, so nobody edits vercel.json for each page. Only one of `vercel.json` or `vercel.ts` may exist.

**Deployment Protection**
- New projects use Standard Protection with Vercel Authentication. Previews, branch URLs and per-deployment URLs need a Vercel login.
- Production domains stay public.
- LinkedInBot is in Vercel's verified-bot list (category: preview).

**Domain**
- .com costs $11.25 a year to register, renew or transfer, before VAT. VAT applies only where Vercel is registered to collect it.
- WHOIS privacy and auto-renew are on by default. The renewal charge happens 30 days before expiry.
- Vercel sets nameservers, DNS and SSL itself. .be is not sold on Vercel.
- yourikaramyan.com was still unregistered (RDAP 404, re-checked).
- Vercel recommends www as the main address. Choose apex as primary to match Astro `site`.
- Vercel does not provide email for the domain.

**Analytics**
- Vercel Web Analytics on Hobby: 50k events a month and 1 month guaranteed history. It uses no third-party cookies; visitors are identified by a hash of the request, kept 24 hours.
- Two Vercel pages contradict each other on what happens past the limit (pause until next cycle, versus a 3-day grace period then a 7-day wait).
- Its storage region is not documented.
- GoatCounter still fits best: EU servers (Hetzner, Finland and Germany), no cookies or localStorage, works on any host.

**CLI**
- Every `vercel` or `vercel --prod` run counts as one deployment.
- New critical pitfall: the CLI ignores `.gitignore` and uploads everything not listed in `.vercelignore` or its built-in list. That includes `sources/` (unblurred screenshots of other users), so add a `.vercelignore` before any CLI deploy.

## Corrections
- ORIGINAL: Node 20 was discontinued on 2026-10-01.
  FIX: Vercel's changelog (Jul 14, 2026) calls it a deprecation: Node 20 is 'disabled in Project Settings' from Oct 1, 2026, and new deployments using it show an error. build-utils marks discontinueDate 2026-10-01. Existing deployments keep working.
  SRC: https://vercel.com/changelog/node-js-20-is-being-deprecated ; https://github.com/vercel/vercel/blob/main/packages/build-utils/src/fs/node-version.ts
- ORIGINAL: Vercel ignores `.nvmrc` ... so add `"engines": {"node": "24.x"}` (presented as adding a new field).
  FIX: The project's package.json already has `"engines": {"node": ">=22.22.0"}`. Vercel resolves it to 24.x but warns it will auto-upgrade to the next major. The field must be changed to "24.x", not added. The .nvmrc (24) that the commit message says pins Node has no effect on Vercel.
  SRC: C:/Users/youri/Projets/yourikaramyan-site/package.json ; https://github.com/vercel/vercel/blob/main/packages/build-utils/src/fs/run-user-scripts.ts ; https://vercel.com/docs/functions/runtimes/node-js/node-js-versions
- ORIGINAL: The commit author must be the Hobby owner (stated without caveat).
  FIX: Still the operative rule, but /docs/git also says the private-repo check 'only applies to commit authors on GitHub organizations ... It does not apply to collaborators on personal Git accounts.' The Oct 2026 KB ('On a Hobby account, only the account owner can trigger deployments', plus a 2026 fix that enforces the limit) and community reports confirm enforcement on personal repos. Treat it as enforced and note the contradiction.
  SRC: https://vercel.com/docs/git#deploying-private-git-repositories ; https://vercel.com/kb/guide/why-aren-t-commits-triggering-deployments-on-vercel
- ORIGINAL: A staff reply in another thread says CLI auth uses the Vercel account, but Git metadata from the local checkout is attached.
  FIX: The responder (Ryu, thread 37045) is not identified as Vercel staff on the page. 'Git metadata from the local checkout' comes from the official `vercel deploy` docs, not from that reply.
  SRC: https://community.vercel.com/t/vercel-github-deployment-blocked-by-committer-not-associated-error-on-hobby-plan/37045 ; https://vercel.com/docs/cli/deploy#associate-a-cli-deployment-with-a-git-branch
- ORIGINAL: In a March 2026 community thread ... A reply said the real cause was another GitHub user.
  FIX: The responder (Jacob Paris) is not shown as staff. Later posters (Mar 24 and Apr 8, 2026) still reported the issue, and no resolution was confirmed.
  SRC: https://community.vercel.com/t/vercel-hobby-plan-deployment-blocked-by-claude-code-ai-co-author-attribution/35972
- ORIGINAL: If X-Robots-Tag headers are wanted, generate vercel.json with a local script before committing (implied as the only automatic option).
  FIX: Vercel officially supports vercel.ts (with @vercel/config), which 'executes at build time' and can 'compute configuration values based on your project structure'. It can generate the noindex header rule from a company list with no manual edits. Only one of vercel.json or vercel.ts may exist.
  SRC: https://vercel.com/docs/project-configuration/vercel-ts
- ORIGINAL: Static files are cached on Vercel's CDN automatically for the life of the deployment after the first request, and new deployments invalidate them.
  FIX: Docs: static files are cached 'for the lifetime of the deployment after the first request', and an unchanged hashed file 'can persist across deployments'. Vercel's Astro page says they are stored 'for up to 31 days'. Neither page says new deployments invalidate them; cache entries are tied to the deployment.
  SRC: https://vercel.com/docs/caching/cdn-cache#static-files-caching ; https://vercel.com/docs/frameworks/frontend/astro#caching
- ORIGINAL: Vercel Web Analytics ... It uses no cookies (a request hash kept 24 hours).
  FIX: The docs say it works 'without using any third-party cookies'; visitors are identified by a hash of the incoming request, and the session is discarded after 24 hours. On the over-limit behavior, the docs contradict themselves: 'collection pauses until the next billing cycle' versus 'a three day grace period', then wait 7 days.
  SRC: https://vercel.com/docs/analytics/privacy-policy ; https://vercel.com/docs/analytics/limits-and-pricing
- ORIGINAL: CLI-specific deployment limits were removed on June 17, 2026.
  FIX: The changelog says this but names no specific limit. The limits page (2026-09-16) still lists 100 MB and 15,000 source files per CLI deployment on Hobby. Treat those as still applying.
  SRC: https://vercel.com/changelog/cli-deployment-limits-removed ; https://vercel.com/docs/limits#static-file-uploads
- ORIGINAL: Netlify Free ... about 20 production deploys.
  FIX: 20 is the maximum, only with zero traffic. Bandwidth (20 credits/GB) and web requests (2 credits per 10,000) use the same 300 credits, so real deploys are fewer.
  SRC: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- ORIGINAL: If package.json has a `vercel-build` or `build` script, Vercel runs that script instead (in that order).
  FIX: The order in the source is `vercel-build`, then `now-build`, then `build`.
  SRC: https://github.com/vercel/vercel/blob/main/packages/static-build/src/index.ts
- ORIGINAL: trailingSlash true ... Paths with a file extension are not redirected, and /.well-known is exempt.
  FIX: Also from the source: `/file.ext/` is 308-redirected to `/file.ext`, and only last segments without a '.' get the slash redirect, so slugs must not contain dots.
  SRC: https://github.com/vercel/vercel/blob/main/packages/routing-utils/src/superstatic.ts (convertTrailingSlash)
- ORIGINAL: dist/404.html is served automatically for unknown paths (verified-in-docs, implying a 404 status).
  FIX: The KB confirms 404.html is served when no static file matches, but does not state the HTTP status code. A 404 status is expected but not documented, so the confidence is downgraded to inferred.
  SRC: https://vercel.com/kb/guide/custom-404-page
- ORIGINAL: Vercel's own Astro page still shows old adapter imports.
  FIX: It also still shows `output: 'hybrid'`, which Astro 5 removed, and the Web Analytics quickstart still uses `@astrojs/vercel/serverless` for older versions.
  SRC: https://vercel.com/docs/frameworks/frontend/astro ; https://vercel.com/docs/analytics/quickstart
- ORIGINAL: (Missing) No pitfall on what the CLI uploads.
  FIX: Added: the Vercel CLI ignores .gitignore and uploads everything except its built-in list and .vercelignore entries. In this project that includes `sources/` (unblurred screenshots of other users). A .vercelignore is required before any CLI deploy.
  SRC: https://vercel.com/docs/deployments/vercel-ignore ; https://vercel.com/docs/builds/build-features#ignored-files-and-folders ; https://github.com/vercel/vercel/blob/main/packages/client/src/utils/index.ts
- ORIGINAL: (Missing) Hobby limit list omitted projects-per-repo and the Edge→CDN rename source.
  FIX: Added: 25 Vercel projects per Git repository on Hobby. 'CDN Requests' is confirmed by the changelog as a rename of 'Edge Requests', with no change to limits or pricing.
  SRC: https://vercel.com/docs/limits ; https://vercel.com/changelog/edge-requests-are-now-called-cdn-requests

## Pitfalls
- Until step 7, Astro `site` is https://yourikaramyan.com, a domain that does not exist yet (RDAP 404). og:image, og:url, canonical and the sitemap all point to a host that does not resolve, so LinkedIn previews will have no image. Do not share company links before the domain is live, or temporarily build with site set to the production <project>.vercel.app URL. LinkedIn caches previews: refresh them with LinkedIn Post Inspector after fixing.
- Never share preview or deployment URLs (<project>-git-<branch>-<scope>.vercel.app, <project>-<hash>-<scope>.vercel.app) with recruiters or on LinkedIn. Standard Protection puts them behind a Vercel login, so LinkedInBot gets a login page. Share only the custom domain, or <project>.vercel.app before the domain exists.
- Commit identity: existing commits are authored as youri.karamyan@student.hepl.be. Verify that address on GitHub YouriK11, or switch to 266993000+YouriK11@users.noreply.github.com before the first push to Vercel. Sign up to Vercel with 'Continue with GitHub' as YouriK11, and check Account Settings > Authentication shows the GitHub connection. Linking the same GitHub account to a second Vercel account silently unlinks the first.
- If GitHub 'Keep my email addresses private' and 'Block command line pushes that expose my email' are both on, pushing commits authored with the real email is rejected (commonly shown as GH007). Use the noreply address.
- When importing the repo, the Vercel GitHub app must be given access to the private repo (for example 'Only select repositories' including it). Otherwise it will not appear in the import list.
- package.json currently says "engines": {"node": ">=22.22.0"}. Vercel ignores .nvmrc (24), resolves this range to 24.x and warns it will auto-upgrade to the next major (Node 26) when Vercel adds it. Replace it with "24.x". Keep .nvmrc for local use only.
- Vercel CLI uploads every file not listed in .vercelignore. It ignores .gitignore, so `sources/` (unblurred screenshots with other users' names and photos) would be uploaded. Create a .vercelignore before any CLI deploy, prefer Git deploys, and never run `vercel --public` (it exposes the source at /_src).
- Do not mix CLI deploys and Git pushes for the same change. The CLI deploys the files on disk, including uncommitted ones, so the site can drift from GitHub, and each path uses one of the 100 daily deployments.
- vercel.json header `source` is strict and case-sensitive: `/col-macarthur/` and `/col-macarthur` are different patterns. With trailingSlash: true the HTML is served only at the slash version, so rules must end with '/'. Company slugs must not contain a dot, or the trailing-slash redirect will not apply.
- Each new company page needs a vercel.json edit if X-Robots-Tag headers are listed by hand. The meta robots tag in the shared layout avoids that; vercel.ts can generate the rule at build time. Never block company pages in robots.txt: Google would not see the noindex and LinkedInBot may skip the page. Also filter company pages out of @astrojs/sitemap, which includes every page by default.
- Use either vercel.json or vercel.ts, never both. Do not put the removed `public` property in vercel.json: it now makes deployments fail. Do not use vercel.json rewrites with Astro: Vercel says the behavior is inconsistent and unsupported.
- When adding the domain, Vercel suggests www as primary. Choose the apex yourikaramyan.com as Production and set www to 'Redirect to' the apex, to match Astro `site`, canonical tags and the sitemap. After that, the production <project>.vercel.app URL can still be indexed: canonical tags handle it, or it can be set to redirect to the custom domain.
- Domain purchase is charged in USD, so a Belgian card may add a currency-conversion fee, and VAT may be added. Auto-renew charges 30 days before expiry and the toggle locks after that; turn it off earlier if unwanted. Use the same email as the Vercel account for the ICANN registrant, or confirm the verification email, or the domain can be suspended (clientHold). Vercel gives no mailbox for the domain.
- Hobby builds one deployment at a time. Every push to any branch, plus every CLI run, counts toward 100 a day, 100 an hour and 60 per 5 minutes. Batch several company pages into one push. Over a limit, Hobby waits rather than paying; a paused project must be resumed by hand from its overview.
- Web Analytics collects only after it is enabled in the dashboard AND the site is redeployed. On Hobby only about 1 month of history is guaranteed. Ad blockers can block Vercel WA and GoatCounter. With trailingSlash: true, check in the Network tab that the /<unique-path>/view request returns 2xx, not a 308.
- Vercel's Astro docs still use outdated adapter imports and `output: 'hybrid'`. Do not add @astrojs/vercel for a purely static site.
- Keep the site non-commercial: no paid freelance offer, prices, ads or affiliate links. 'Advertising the sale of a product or service' counts as commercial use on Hobby.

## Open questions
- Does Vercel's Hobby check look at `Co-Authored-By:` trailers (Claude <noreply@anthropic.com>, already on this repo's commits) or only at the deployed commit's author? No official statement exists. Watch the first deployment after connecting the repo; if it is blocked while the author email is correct, test a commit without the trailer.
- Is the '/docs/git' sentence that the private-repo check 'does not apply to collaborators on personal Git accounts' an outdated leftover? The Oct 2026 KB and community reports say Hobby enforces owner-only commits on personal repos too.
- Default status code for the dashboard 'Redirect to' (www to apex) in Oct 2026: the docs show the dropdown but not the code (307 vs 308).
- When a domain is bought from the project's Buy or + button, is it auto-assigned to the project as Production, and is www added and set as primary automatically? The changelog only says nameservers are configured for the project.
- Does the Vercel WA /<unique-path>/view endpoint ever get a 308 under trailingSlash: true? Not documented; verify after the first deploy.
- Where is Vercel Web Analytics data stored (US or EU)? Not documented; GoatCounter is EU-hosted.
- Will Belgian VAT (21%) appear on a Hobby domain invoice? Vercel collects VAT only where it is registered; the docs do not list countries.
- Which 'CLI-specific deployment limits' did the June 17, 2026 changelog remove? The limits page still lists 100 MB and 15,000 files for Hobby CLI uploads.
- Does the student want Vercel WA, GoatCounter, or both? GoatCounter needs an account and a site code before the script can be added.
- Where will company pages live (one .astro file each at src/pages/<slug>.astro, or a data file plus [slug].astro)? This decides whether the meta tag alone is enough or a vercel.ts header generator is worth adding.

## Facts

### F1 [verified-in-docs]
Hobby is free and restricted to personal, non-commercial use. Commercial use means financial gain for anyone involved in producing the project, including:
- payments from visitors;
- advertising the sale of a product or service;
- being paid to build or host the site;
- sites whose main purpose is affiliate links;
- ads such as AdSense.
Donations are explicitly allowed. Terms section 4: "You shall only use the Services under a Hobby plan for your personal or non-commercial use."
SRC: https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage (last_updated 2026-09-14) ; https://vercel.com/legal/terms (Last Updated June 1, 2026, section 4) ; https://vercel.com/pricing (FAQ: "Our Hobby plan is for personal, non-commercial use.")

### F2 [inferred]
A personal CV and portfolio used to find an internship fits Hobby. It sells nothing and shows no ads. The App Store listing for MonArc says "Gratuit" and shows no "Achats intégrés" section.

Staying within the rule:
- Do not add paid freelance offers, prices or affiliate links. "Advertising the sale of a product or service" is listed as commercial.
- If unsure, Vercel recommends contacting Support before deploying.
SRC: https://vercel.com/docs/limits/fair-use-guidelines ; https://vercel.com/kb/guide/why-is-my-account-deployment-blocked ; https://apps.apple.com/be/app/monarc/id6816906304?l=fr-FR (checked 2026-10-19)

### F3 [verified-in-docs]
Hobby general limits (limits page, last_updated 2026-09-16):
- Projects: 200.
- Deployments: 100 per day (api-deployments-free-per-day), 100 per hour (api-deployments-free-per-hour, called "Builds per hour" in the prose), 60 per 5 minutes (api-deployments-flood).
- Builds: 1 concurrent deployment, 45 minutes max per build.
- CLI uploads: 100 MB of source files and 15,000 source files per deployment.
- 2,048 routes per deployment; each vercel.json header, redirect or rewrite counts as one.
- 50 domains per project; 25 Vercel projects per Git repository.
- Build machine: 32 GB disk, 2 vCPU, 8 GB memory. Pricing lists Basic machines as included, with no build-minute quota.
- 5 deploy hooks per project.
- Pricing page: "Unlimited Deployments", still subject to the rate limits above.
- Note from the docs: "Hosting static files such as an index.html file is not classed as a build". An Astro build is a build.
SRC: https://vercel.com/docs/limits ; https://vercel.com/docs/plans/hobby ; https://vercel.com/pricing

### F4 [verified-in-docs]
Hobby monthly included usage (Hobby page, last_updated 2026-09-14):
- Fast Data Transfer: first 100 GB.
- Fast Origin Transfer: first 10 GB.
- CDN Requests: first 1,000,000. This is the new name for Edge Requests; pricing, limits and measurement are unchanged.
- Function Invocations: first 1M.
- Active CPU: 4 h.
- Image Transformations: first 5,000.
- Web Analytics: 50,000 events/month, shared across all projects.
- Speed Insights: 10,000 events over the last 30 days.
SRC: https://vercel.com/docs/plans/hobby ; https://vercel.com/pricing ; https://vercel.com/changelog/edge-requests-are-now-called-cdn-requests

### F5 [verified-in-docs]
What happens when a Hobby limit is exceeded:
- Docs: "In most cases, if you exceed your usage limits on the Hobby plan, you will have to wait until 30 days have passed before you can use the feature again." Web Analytics is the exception (see below).
- Hobby cannot buy extra usage, so there is no overage bill. The fix is upgrading to Pro.
- Rate limits: once hit, they reset after their Duration (1 hour or 1 day).
- Sustained over-use can pause a deployment. Visitors then see "503 DEPLOYMENT_PAUSED".
- "Paused projects resume one at a time, never automatically": from each project's overview or through the unpause API.
- Vercel says it reaches out before acting on unreasonable usage.
SRC: https://vercel.com/docs/plans/hobby#hobby-billing-cycle ; https://vercel.com/docs/limits#rate-limits ; https://vercel.com/kb/guide/why-is-my-account-deployment-blocked (updated 2026-10-02)

### F6 [verified-in-docs]
Netlify Free (credit-based plan, doc updated Aug 12, 2026):
- 300 credits a month, hard limit, no top-ups.
- Each successful production deploy costs 15 credits. Failed deploys and rollbacks cost 0.
- Deploy Previews and branch deploys cost 0.
- Bandwidth costs 20 credits per GB; web requests cost 2 credits per 10,000.
- So at most 20 production deploys a month, fewer once traffic is counted.
- When credits run out, "all of your web projects (sites/apps) are paused" and visitors see "Site not available".

Vercel Hobby has no per-deploy cost: up to 100 deployments a day. It suits creating many company pages.
SRC: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ ; https://vercel.com/docs/limits

### F7 [verified-in-docs]
Static Astro deploys with zero configuration and no adapter. Docs: "Statically rendered, or pre-rendered, Astro apps can be deployed to Vercel with zero configuration." The adapter is only needed for SSR, or to turn on Vercel features through astro.config.

Astro preset (source code):
- Detected when package.json depends on `astro`.
- Output directory: `dist`. Build command: `astro build`.
- If package.json has a `vercel-build`, `now-build` or `build` script, the first one found runs instead.
- The project's `build` script is `astro build`, so the result is the same.
- The install command is detected from the lockfile (package-lock.json → npm).
SRC: https://vercel.com/docs/frameworks/frontend/astro (last_updated 2026-08-26) ; https://github.com/vercel/vercel/blob/main/packages/frameworks/src/frameworks.ts ; https://github.com/vercel/vercel/blob/main/packages/static-build/src/index.ts (getCommand / runPackageJsonScript ['vercel-build','now-build','build'])

### F8 [verified-in-docs]
The Astro preset already adds an immutable Cache-Control header for hashed assets. This covers Astro 7 fonts and images emitted under /_astro/. It is applied as framework defaultRoutes for static output (not when an adapter writes Build Output API v3). An explicit vercel.json header for /_astro/(.*) is redundant but harmless.
SRC: https://github.com/vercel/vercel/blob/main/packages/frameworks/src/frameworks.ts (Astro entry, read 2026-10-19)
```
defaultRoutes: [
  { src: '^/assets/(.*)$', headers: { 'cache-control': 'public, max-age=31536000, immutable' }, continue: true },
  { src: '^/_astro/(.*)$', headers: { 'cache-control': 'public, max-age=31536000, immutable' }, continue: true },
]
```

### F9 [verified-in-docs]
Node.js on Vercel:
- Available versions: 24.x (default) and 22.x. Only the major version can be chosen.
- Node 20: the changelog (Jul 14, 2026) calls it deprecated and "disabled in Project Settings" from Oct 1, 2026. build-utils sets discontinueDate 2026-10-01, and new deployments using it error.
- `engines.node` in package.json overrides Project Settings.
- `.nvmrc` is not read. The docs mention only Project Settings and engines, and the vercel/vercel build-utils source has no nvmrc handling.

This project:
- package.json has `"engines": {"node": ">=22.22.0"}`. Vercel selects 24.x but logs "Warning: Detected \"engines\": { \"node\": \">=22.22.0\" } ... that will automatically upgrade when a new major Node.js Version is released."
- A full version like 24.11.0 would warn that only the major is used.
- Use `24.x`.
SRC: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions (last_updated 2026-02-27) ; https://vercel.com/changelog/node-js-20-is-being-deprecated ; https://github.com/vercel/vercel/blob/main/packages/build-utils/src/fs/node-version.ts ; https://github.com/vercel/vercel/blob/main/packages/build-utils/src/fs/run-user-scripts.ts ; C:/Users/youri/Projets/yourikaramyan-site/package.json
```
// package.json
{
  "engines": { "node": "24.x" }
}
```

### F10 [verified-in-docs]
Private repos on Hobby:
- Hobby cannot deploy private repos owned by a GitHub organization. A personal repo like YouriK11/... is fine.
- "To deploy commits under a Hobby team, the commit author must be the owner of the Hobby team". Vercel checks this by comparing the owner's Login Connections with the commit author.
- Fix 1: commits are authored by the Git user linked to the account.
- Fix 2: the Git provider is linked in Account Settings > Authentication.
- Without a Git login connection, the Vercel account email (extra emails can be added and verified) must match the commit email.
- Two Vercel accounts cannot link the same Git account. "Setting up the link on a second account silently removes it from the first."
- `dev+work@example.com` and `dev@example.com` count as separate identities.
- The login connection can drift out of sync. Without it, "commits never create deployments".

Docs contradiction: /docs/git also says the private-repo author check "only applies to commit authors on GitHub organizations... It does not apply to collaborators on personal Git accounts." The KB updated 2026-10-16 says "On a Hobby account, only the account owner can trigger deployments" and mentions a 2026 fix that "now enforces the collaboration limit in GitHub". Treat the rule as enforced.
SRC: https://vercel.com/docs/git#using-hobby-teams (last_updated 2026-09-18) ; https://vercel.com/docs/deployments/troubleshoot-project-collaboration (2026-03-13) ; https://vercel.com/kb/guide/why-aren-t-commits-triggering-deployments-on-vercel (2026-10-16) ; https://vercel.com/docs/limits#connecting-a-project-to-a-git-repository

### F11 [inferred]
Block messages reported by users in 2026 (Vercel Community, not official docs):
- "The deployment was blocked because the commit author did not have contributing access to the project on Vercel." plus "The Hobby Plan does not support collaboration for private repositories."
- "The deployment was blocked because GitHub could not associate the committer with a GitHub user." plus "Hobby teams do not support collaboration."

Official wording:
- "If you see an error saying the provider could not associate the committer with a user, the local git configuration email address likely does not match an email registered on their git provider account."
- On a blocked commit, a recommendation to transfer the project to Pro is shown on the Git provider, and the Vercel Bot may comment with a request-access link.

Fixes community members report:
- Set git user.email to a verified GitHub email or the exact noreply address.
- Push a new commit (an empty commit works).
- Reconnect GitHub under Vercel Account Settings > Authentication.
SRC: https://community.vercel.com/t/vercel-hobby-plan-deployment-blocked-because-commit-author-lacks-access/35446 ; https://community.vercel.com/t/vercel-github-deployment-blocked-by-committer-not-associated-error-on-hobby-plan/37045 ; https://community.vercel.com/t/title-deployment-blocked-on-hobby-plan-private-repo-from-cli/42775 ; https://vercel.com/docs/deployments/troubleshoot-project-collaboration ; https://vercel.com/docs/git#using-hobby-teams ; https://vercel.com/kb/guide/why-aren-t-commits-triggering-deployments-on-vercel

### F12 [verified-in-docs]
Fix for this repo's identity. Existing commits are authored and committed as YouriK11 <youri.karamyan@student.hepl.be>.

Option A: add and verify youri.karamyan@student.hepl.be under GitHub > Settings > Emails for YouriK11, then sign up to Vercel with "Continue with GitHub" as YouriK11.

Option B (lasts beyond school): use the GitHub noreply address.
- Accounts created after July 18, 2017 use the format ID+USERNAME@users.noreply.github.com.
- YouriK11 was created 2026-03-10 and has id 266993000.
- Address: 266993000+YouriK11@users.noreply.github.com.

Only the deployed commit's author is documented as checked, so changing the config for new commits should be enough. No history rewrite is documented as necessary.
SRC: https://api.github.com/users/YouriK11 (id 266993000, created_at 2026-03-10, checked 2026-10-19) ; https://docs.github.com/en/account-and-profile/reference/email-addresses-reference ; https://vercel.com/docs/deployments/troubleshoot-project-collaboration
```
git config user.name "YouriK11"
git config user.email "266993000+YouriK11@users.noreply.github.com"
git log -5 --format="%h | author: %an <%ae> | committer: %cn <%ce>"
git commit --allow-empty -m "Redeploy" && git push
```

### F13 [uncertain]
Co-Authored-By trailers:
- No Vercel doc or KB says whether trailers such as "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" (already on this repo's commits) count as collaborators on Hobby private repos.
- In the March 2026 thread, a responder (Jacob Paris, staff role not shown on the page) said the block "was not blocked on claude" and blamed another GitHub user. Other posters still reported the problem, and no fix was confirmed.
- A Sep 2026 GitHub PR (netteran/locreport #16) records the same error but does not tie it to a trailer.
- The documented check is on the commit author.
SRC: https://community.vercel.com/t/vercel-hobby-plan-deployment-blocked-by-claude-code-ai-co-author-attribution/35972 ; https://github.com/netteran/locreport/pull/16 ; https://community.vercel.com/t/production-deploys-blocked-with-does-not-support-collaboration/43227 ; https://vercel.com/docs/git#using-hobby-teams

### F14 [verified-in-docs]
trailingSlash in vercel.json (type Boolean, default undefined):
- undefined: /about and /about/ both serve the same content with no redirect. Vercel says this is not recommended because of duplicate content.
- true: /about returns a 308 redirect to /about/. Paths with a file extension are not redirected (/robots.txt, /sitemap-index.xml, /Youri-Karamyan-CV.pdf).
- Vercel source adds two more rules: /.well-known is exempt, and /file.ext/ redirects (308) to /file.ext. The redirect regex only matches a last segment without a dot, so a slug containing '.' would not be redirected.
- Use true to match Astro trailingSlash 'always' with build.format 'directory'.

cleanUrls (default false):
- When true, it strips .html and 308-redirects /x.html to /x.
- Not needed with directory output. Leave it off.
SRC: https://vercel.com/docs/project-configuration/vercel-json#trailingslash ; https://vercel.com/docs/project-configuration/vercel-json#cleanurls ; https://github.com/vercel/vercel/blob/main/packages/routing-utils/src/superstatic.ts (convertTrailingSlash)
```
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "trailingSlash": true
}
```

### F15 [inferred]
404 page:
- KB: "Emit a 404.html file to your Output Directory". It "will be served as the 404 page when a route does not match any other static file". Astro's src/pages/404.astro produces dist/404.html.
- The KB does not state the HTTP status; a 404 status is expected.
- With trailingSlash: true, an unknown path without a slash should first get a 308 to its slash version, then the 404 page (inferred from route order).
SRC: https://vercel.com/kb/guide/custom-404-page (updated 2026-07-16)

### F16 [verified-in-docs]
vercel.json headers:
- Each rule is { source, headers:[{key,value}], has?, missing? }.
- `source` matches the pathname without the query string.
- It is compiled with path-to-regexp 6 (strict: true, sensitive: true), so it is case-sensitive and the trailing slash must match exactly.
- An unnamed regex group covers several slugs in one rule.
- Each rule counts toward the 2,048 routes per deployment.
- Vercel's Astro page warns not to use vercel.json rewrites for Astro, but headers and redirects are fine.
- The /_astro rule below duplicates what the preset already sends.
SRC: https://vercel.com/docs/project-configuration/vercel-json#headers ; https://vercel.com/docs/project-configuration/vercel-json#case-sensitivity ; https://github.com/vercel/vercel/blob/main/packages/routing-utils/src/superstatic.ts (sourceToRegex strict:true, sensitive:true; path-to-regexp 6.1.0 / 6.3.0) ; https://vercel.com/docs/limits#routes-created-per-deployment ; https://vercel.com/docs/frameworks/frontend/astro#rewrites
```
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "trailingSlash": true,
  "headers": [
    {
      "source": "/(col-macarthur|autre-entreprise)/",
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### F17 [inferred]
Three ways to noindex company pages without listing each one by hand:

(1) Simplest: a meta robots tag in the shared company-page layout, plus a sitemap filter. Google honors it as long as the page is crawlable. The project's robots.txt already allows everything.

(2) Official build-time option: vercel.ts (replaces vercel.json; only one may exist). Docs: it "executes at build time" and can "compute configuration values based on your project structure". It can read a company list and generate one X-Robots-Tag rule. Needs `npm i @vercel/config`. The snippet below is an untested sketch that assumes a src/data/entreprises.json list.

(3) A local script that rewrites vercel.json before each commit.

The meta tag is enough for Google, so (2) and (3) are optional.
SRC: https://vercel.com/docs/project-configuration/vercel-ts (last_updated 2026-08-25) ; https://vercel.com/docs/project-configuration/vercel-json#headers ; C:/Users/youri/Projets/yourikaramyan-site/src/pages/robots.txt.ts
```
<!-- company layout <head> -->
<meta name="robots" content="noindex" />

// astro.config.mjs (Astro side)
sitemap({ filter: (page) => !companyUrls.includes(page) })

// vercel.ts (instead of vercel.json)
import { readFileSync } from 'node:fs';
import { routes, type VercelConfig } from '@vercel/config/v1';
const slugs: string[] = JSON.parse(readFileSync('src/data/entreprises.json', 'utf8')).map((e: { slug: string }) => e.slug);
export const config: VercelConfig = {
  trailingSlash: true,
  headers: slugs.length
    ? [routes.header(`/(${slugs.join('|')})/`, [{ key: 'X-Robots-Tag', value: 'noindex' }])]
    : [],
};
```

### F18 [verified-in-docs]
Default caching:
- Default response header: `cache-control: public, max-age=0, must-revalidate`. Browsers revalidate HTML, the CV PDF and favicons.
- Static files are cached on Vercel's CDN "for the lifetime of the deployment after the first request". An unchanged hashed file can stay cached across deployments.
- Vercel's Astro page says static files are stored "for up to 31 days" on the CDN.
- Vercel "doesn't allow bypassing the cache for static files".
- Recommended for content-hashed assets: `max-age=31536000, immutable`.
SRC: https://vercel.com/docs/caching/cache-control-headers#default-cache-control-value (2026-09-14) ; https://vercel.com/docs/caching/cdn-cache#static-files-caching (2026-09-14) ; https://vercel.com/docs/frameworks/frontend/astro#caching

### F19 [verified-in-docs]
Automatic noindex:
- Vercel adds `X-Robots-Tag: noindex` to every Preview Deployment.
- It also adds it to the previous production deployment once a new one is promoted.
- It is not added when a custom domain is assigned to a non-production branch.
- The current production deployment stays indexable.
- The KB advises consolidating to one canonical address if a production .vercel.app URL gets indexed alongside the custom domain.
SRC: https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines (updated 2026-10-02)

### F20 [verified-in-docs]
Deployment Protection in 2026:
- New projects start with Standard Protection (changelog Jan 13, 2026).
- KB: "Vercel Authentication is automatically enabled for all deployments" except the most recent production deployment.
- Standard Protection "protects all domains except production domains". Preview URLs, branch URLs and the production per-deployment generated URL need a Vercel login. The production custom domain stays public.
- The project's production <project>.vercel.app domain is listed among the project's domains, so it should stay public (inferred).
- Hobby gets Vercel Authentication for preview and production, Protection Exceptions and Shareable Links. Password Protection is not available on Hobby.
- "All Deployments" became free on every plan on Sep 9, 2026. It is opt-in and would lock the production domain too.
- Setting: Project > Settings > Deployment Protection.
SRC: https://vercel.com/docs/deployment-protection (2026-09-15) ; https://vercel.com/changelog/set-team-wide-defaults-for-deployment-protection ; https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan ; https://vercel.com/kb/guide/locking-down-deployments (2026-10-16) ; https://vercel.com/docs/plans/hobby

### F21 [inferred]
LinkedInBot can read OG tags on the public production domain:
- It is in Vercel's verified-bots directory (category: preview).
- The Bot Protection managed ruleset is Off by default and automatically excludes verified bots.
- Attack Mode lets verified bots through.
- The AI-bots ruleset is inactive by default.

What would block it:
- Sharing a preview or deployment URL, which redirects to a Vercel login.
- Protection set to All Deployments.
- A WAF custom rule matching its user agent.
- robots.txt Disallow on the page.
- A paused deployment (503).
- og:image or og:url pointing to a host that does not resolve.

X-Robots-Tag noindex does not stop previews.
SRC: https://vercel.com/docs/bot-management#verified-bots (2026-09-10) ; https://vercel.com/docs/vercel-firewall/attack-mode (2026-08-11) ; https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication

### F22 [inferred]
Buying a .com on Vercel:
- Price: $11.25 USD per year for registration, renewal and transfer. Vercel "sells domains at the wholesale price set by each registry" with no added margin.
- WHOIS privacy: included and on by default for TLDs that support it, including .com.
- .be is not in the supported-TLD list.
- Prices exclude VAT. Vercel began collecting VAT for international invoices issued on or after April 1, 2026, only where it is registered to collect. With a Belgian billing address, 21% would bring it to about $13.61 if VAT applies.
- The charge is in USD.
SRC: https://vercel.com/domains/pricing (checked 2026-10-19) ; https://vercel.com/docs/domains/supported-domains (2026-08-26) ; https://vercel.com/docs/domains/working-with-domains#managing-whois-privacy ; https://vercel.com/docs/pricing/taxes (2026-09-19)

### F23 [verified-in-docs]
Domains bought through Vercel auto-renew by default:
- 60 days before expiry: warning email.
- 30 days before: renewal attempt and charge.
- From 29 days before: retries if the charge failed.
- The toggle locks once the 30-day window starts. To stop renewal, turn auto-renew off more than 30 days before expiry: Domains list > menu > Auto Renewal, or the CLI.
- With auto-renew off, Vercel sends emails 24 and 14 days before expiry and when it expires.
- An invalid card can make the domain expire. Redemption (typically 30 days) has a registry fee.
SRC: https://vercel.com/docs/domains/working-with-domains/renew-a-domain (2026-09-18)
```
vercel domains auto-renew yourikaramyan.com on
vercel domains auto-renew yourikaramyan.com off
```

### F24 [inferred]
Buying flow:
1. Open the domain search panel from the Buy button in domain settings, or the + button on the project overview (changelog Aug 5, 2026). The vercel.com/domains search page also works.
2. Search and purchase.
3. Enter the ICANN registrant details. Using the Vercel account email confirms them automatically. Another email needs the confirmation link, otherwise the domain can be suspended (clientHold).
4. Vercel sets the nameservers and DNS ("there are no DNS records to set"). Domain and SSL renewals are automatic.

No card is documented for a Hobby sign-up, but the purchase and auto-renewal need a valid payment method. Vercel provides no mailbox for the domain (use ImprovMX, Forward Email, etc.).
SRC: https://vercel.com/changelog/search-and-buy-domains-in-the-dashboard ; https://vercel.com/docs/domains/working-with-domains (2026-09-16) ; https://vercel.com/docs/domains/working-with-domains/renew-a-domain

### F25 [verified-in-docs]
Apex vs www:
- Adding an apex domain makes Vercel prompt to add www.
- Vercel recommends www as primary with apex redirecting to it. Redirecting www to the apex "also works but provides Vercel less control".
- Vercel also "will attempt to redirect automatically" between www and non-www, but recommends an explicit redirect.
- Astro `site` is https://yourikaramyan.com, so keep the apex as the Production domain.
- Setup: Project > Settings > Domains > Edit www.yourikaramyan.com > "Redirect to" yourikaramyan.com.
- The docs do not state the redirect status code.
SRC: https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting#redirecting-www-domains (2026-08-11) ; https://vercel.com/docs/domains/working-with-domains/add-a-domain (2026-09-16)

### F26 [verified-in-docs]
yourikaramyan.com is still unregistered as of 2026-10-19: Verisign RDAP returned HTTP 404 (re-checked).
SRC: https://rdap.verisign.com/com/v1/domain/yourikaramyan.com (checked 2026-10-19)
```
curl -s -o /dev/null -w "%{http_code}" https://rdap.verisign.com/com/v1/domain/yourikaramyan.com   # 404 = not registered
```

### F27 [verified-in-docs]
Vercel Web Analytics on Hobby:
- 50,000 events/month, shared across all projects. An event is a page view or a custom event.
- Reporting window: 1 month guaranteed.
- No custom events and no UTM panel (UTM needs Web Analytics Plus or Enterprise).
- Over the limit, the docs contradict each other. One section says collection pauses "until the next billing cycle"; another says a 3-day grace period, then wait 7 days. The Hobby page also says resume after 7 days.
- Privacy: "without using any third-party cookies". Visitors are identified by a hash of the incoming request, and the session is discarded after 24 hours.
- Panels: Pages, Routes, Hostname, Referrers, Country, Browsers, Devices, OS. Clicking a Pages row (e.g. /col-macarthur/) filters every panel, including Referrers.
- Timeframe: preset or custom ranges. Production is selected by default. CSV export is available.
- The docs do not state per-day chart granularity or the storage region.
SRC: https://vercel.com/docs/analytics/limits-and-pricing (2026-08-25) ; https://vercel.com/docs/plans/hobby ; https://vercel.com/docs/analytics/privacy-policy (2026-06-26) ; https://vercel.com/docs/analytics/filtering ; https://vercel.com/docs/analytics/using-web-analytics (2026-09-16)

### F28 [verified-in-docs]
Enabling Vercel Web Analytics on static Astro, with no adapter:
1. Dashboard > project > Analytics > Enable. Routes under /_vercel/insights/* and /<unique-path>/* are added after the next deployment.
2. `npm i @vercel/analytics`. The Astro component needs version 1.4.0 or later; version 2 uses Resilient Intake with a build-time seed.
3. Add the component to the base layout and deploy.
4. Check that the browser's Network tab shows a request to /<unique-path>/view.
SRC: https://vercel.com/docs/analytics/quickstart (2026-06-08) ; https://vercel.com/docs/analytics/package (2026-06-26)
```
---
import Analytics from '@vercel/analytics/astro';
---
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <Analytics />
  </head>
  <body><slot /></body>
</html>
```

### F29 [inferred]
GoatCounter:
- "Free for reasonable public usage"; a personal site is explicitly fine.
- Stores nothing in the browser (no cookies or localStorage).
- Never stores IP addresses or the full User-Agent. Session matching keeps site + IP + UA in memory for up to 8 hours.
- Data is on Hetzner servers in Finland and Germany. The operator is in Ireland.
- GDPR page: it "probably doesn't require a GDPR consent notice".
- Tracks referrers and can filter paths. Installs with one script tag and works on any host.
- Retention is not stated; history is not capped like Vercel's 1 month (inferred).

Recommendation: GoatCounter. EU-hosted, longer history to see whether a company opened its page weeks later, and it survives a host change. Neither tool counts LinkedInBot preview fetches, because those do not run JavaScript.
SRC: https://www.goatcounter.com/ ; https://www.goatcounter.com/help/privacy (8 June 2025) ; https://www.goatcounter.com/help/gdpr
```
<script data-goatcounter="https://CODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
```

### F30 [verified-in-docs]
Vercel CLI:
- Install: `npm i -g vercel`, or run once with `npx vercel`. Then `vercel login`.
- `vercel` from the project root creates a preview deployment. The first deployment of a new project is always production.
- `vercel --prod` creates a production deployment.
- Each command creates one deployment that counts toward the Hobby limits (100/day, 100/hour, 60 per 5 min).
- `vercel build` then `vercel deploy --prebuilt` builds locally and uploads `.vercel/output`; that is still one deployment.
- The CLI reads Git metadata from the local checkout.
- A Jun 17, 2026 changelog says "CLI-specific deployment limits" were removed but does not name them. The limits page (2026-09-16) still lists 100 MB and 15,000 source files per CLI deployment on Hobby.
- Never use `vercel --public`: it publishes the source at /_src.
SRC: https://vercel.com/docs/cli/deploying-from-cli (2026-09-08) ; https://vercel.com/docs/cli/deploy (2026-09-18) ; https://vercel.com/docs/limits ; https://vercel.com/changelog/cli-deployment-limits-removed
```
npm i -g vercel
vercel login
vercel          # preview (first one = production)
vercel --prod   # production
```

### F31 [verified-in-docs]
The CLI does NOT honor .gitignore:
- It uploads every file in the folder except a built-in list (.git, node_modules, .vercel, .env.local, etc.) and whatever `.vercelignore` lists.
- In this project that would upload `sources/` (unblurred screenshots showing other users), `dist/` and `.astro/`.
- They would not be served, but they would sit on Vercel.
- Git deploys only contain committed files, so this risk is CLI-only.
SRC: https://vercel.com/docs/deployments/vercel-ignore ; https://vercel.com/docs/builds/build-features#ignored-files-and-folders ; https://github.com/vercel/vercel/blob/main/packages/client/src/utils/index.ts (getVercelIgnore reads only .vercelignore/.nowignore) ; C:/Users/youri/Projets/yourikaramyan-site/.gitignore
```
# .vercelignore (only needed if the CLI is ever used)
sources
captures
dist
.astro
```

### F32 [uncertain]
CLI deploys may not avoid the Hobby commit-author check:
- A May 28, 2026 community post shows `vercel --prod` blocked with "The deployment was blocked because the commit author did not have contributing access to the project on Vercel."
- A reply blamed a "metadata mismatch" and suggested matching the commit email.
- In another thread, a responder (not shown as staff) said CLI deploys are authenticated as the Vercel account directly.
- Officially, the CLI attaches Git metadata from the local checkout.
SRC: https://community.vercel.com/t/title-deployment-blocked-on-hobby-plan-private-repo-from-cli/42775 ; https://community.vercel.com/t/vercel-github-deployment-blocked-by-committer-not-associated-error-on-hobby-plan/37045 ; https://vercel.com/docs/cli/deploy#associate-a-cli-deployment-with-a-git-branch

### F33 [inferred]
Vercel's Astro page (updated 2026-08-26) still shows outdated snippets:
- adapter imports `@astrojs/vercel/serverless` and `@astrojs/vercel/static`;
- `output: 'hybrid'`, which Astro 5 removed;
- an old `astro.config` webAnalytics option.

Current @astrojs/vercel uses `import vercel from '@astrojs/vercel'`. For this static site, skip the adapter. The adapter's `imageService` would use the Hobby quota of 5,000 Image Transformations a month; Astro's build-time sharp optimization does not.
SRC: https://vercel.com/docs/frameworks/frontend/astro ; https://docs.astro.build/en/guides/integrations-guide/vercel/

### F34 [verified-in-docs]
Optional way to save deployments: `git.deploymentEnabled` in vercel.json turns off automatic deploys for chosen branches (minimatch patterns). By default, GitHub builds superseded by a newer commit are cancelled (`github.autoJobCancelation`).
SRC: https://vercel.com/docs/project-configuration/git-configuration (2026-08-25)
```
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "trailingSlash": true,
  "git": { "deploymentEnabled": { "brouillon-*": false } }
}
```