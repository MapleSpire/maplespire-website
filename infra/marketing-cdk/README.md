# MapleSpire marketing contact infrastructure

This standalone CDK package deploys the static marketing origin and its public
contact path. It deliberately has no dependency on the MapleSpire SPA or sync
server. The optional `websiteAssetPath` publishes an already-built static site;
the infrastructure never builds or imports website source code.

The request path is:

```text
CloudFront /api/contact -> HTTP API -> submit Lambda -> encrypted SQS
  -> delivery Lambda -> Amazon SES (support notification + localized receipt)
```

CloudFront serves a private S3 origin by default and forwards only the exact
`/api/contact` behavior to API Gateway with caching disabled. This keeps the
browser request same-origin. A generated Secrets Manager value is injected as
a CloudFront origin header and verified by the submit Lambda, so the public
`execute-api` hostname cannot bypass the CloudFront WAF. Legacy application
paths such as `/app`, `/login`, `/invite`, and `/share` redirect to the configured
`applicationBaseUrl` while preserving their path and query string.

Cloudflare remains the DNS authority: point its DNS-only apex record and the
`www` CNAME at the `DistributionDomain` output after certificate and application
validation. The ACM certificate must cover every `domainName` and
`domainAliases` entry. CloudFront permanently redirects aliases such as `www`
to the canonical `domainName`, so search engines never index two copies.

The support destination is fixed in code to `support@maplespire.ca`. The sender
defaults to `MapleSpire <no-reply@maplespire.ca>` and can be changed through the
non-secret `emailFrom` deployment setting. SES permission remains restricted to
that exact envelope sender.

## Local validation

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm synth --context config=config/dev.json
```

Tests inject queue and email adapters; they never call AWS. For production, copy
`config/production.example.json` to a gitignored environment file, replace the
account, and deploy with GitHub OIDC or another short-lived AWS identity.
Production validation requires a CloudFront-scope WebACL ARN with a rate-based
contact rule and an SNS topic ARN with a real operator subscription. The WebACL
and ACM certificate live in `us-east-1`; contact Lambdas, queues, SES, logs and
the SNS topic live in `ca-central-1`.

Before enabling the form for arbitrary visitors, verify `maplespire.ca` in SES,
publish DKIM/SPF/DMARC records, confirm the `support@maplespire.ca` mailbox, and
move the SES account out of the sandbox in the selected region.

## Contact contract

`POST /api/contact` accepts only JSON and rejects unknown fields. The website
sends the following payload; `company` is the sole optional field:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "company": "Analytical Engines Inc.",
  "subject": "Self-hosting MapleSpire",
  "message": "Could you help our team evaluate MapleSpire?",
  "locale": "en",
  "consent": true,
  "startedAt": 1785628800000,
  "website": ""
}
```

`startedAt` is captured when the form mounts. Submissions with a non-empty
`website` honeypot receive the same generic `202` response as valid traffic but
are not queued. Legitimate submissions are never discarded merely because a
visitor completed the form quickly. Bodies are
limited to 16 KiB; names, addresses, subjects and messages are length-bounded
and control characters are rejected.

SQS/Lambda delivery is intentionally durable and at-least-once. A rare worker
failure after SES accepts one message can therefore produce a recognizable
duplicate carrying the same short request reference. The receipt never echoes
the visitor's submitted message, and contact PII is excluded from operational
logs.
