# MapleSpire marketing website

Standalone, static Astro site for `maplespire.ca`. It does not import or bundle any code from the MapleSpire application.

## Local development

```sh
npm install
npm run dev
```

`npm run build` writes the deployable site to `dist/`. It generates an indexable
language selector at `/`, localized documents for French, English, Simplified
Chinese, Japanese, Korean and Hindi, plus `sitemap-index.xml`. The sitemap lists
only the six substantive localized landing pages.

The apex is the public website only. Every editor CTA targets
`https://app.maplespire.ca`; technical application paths are redirected at the
marketing CloudFront boundary and are excluded from `robots.txt`.

After starting a local preview, `npm run qa:visual` uses the installed Chrome
executable to check both languages, both themes, mobile, reduced motion, image
loading, overflow, and the contact interaction. Override `QA_BASE_URL` or
`QA_CHROME_PATH` when needed.

## Runtime configuration

Copy `.env.example` to `.env` when an environment needs different URLs:

- `PUBLIC_APP_URL` is the hosted MapleSpire application CTA.
- `PUBLIC_CONTACT_ENDPOINT` receives the contact form JSON. Keep it same-origin in production unless the API explicitly enables CORS.

The contact API contract is:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "company": "Analytical Engines",
  "subject": "Self-hosting MapleSpire",
  "message": "…",
  "locale": "en",
  "consent": true,
  "startedAt": 1785628800000,
  "website": ""
}
```

`website` is a honeypot and must remain empty. A successful response means the
request is durably queued; the UI says that the asynchronous email acknowledgement
is on its way rather than claiming that SES has already delivered it.

## Media

Brand artwork lives in `public/brand/`, social cards in `public/social/`, and
verified product captures in `public/media/`. The scroll scenes use CSS/DOM
artwork around these real captures; they do not reproduce or invent product
controls. Desktop browsers scrub pre-rendered light/dark VP9 masters generated
from that deterministic scene; the live DOM scene remains the fallback.

Animation uses native scrolling with GSAP scrubbing on larger screens. Mobile devices and visitors who prefer reduced motion receive static chapter illustrations and the complete narrative without pinned or scrubbed motion.

The two hero comparison images are explicitly preloaded. The landing remains
fully present in the server-rendered HTML, while the React interaction layer is
deferred until browser idle time instead of hydrating on the critical load path.
