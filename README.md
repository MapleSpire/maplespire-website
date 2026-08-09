# MapleSpire website

This repository contains only the public MapleSpire landing page and its dedicated AWS infrastructure. The MapleSpire application, editor, sync server, and product source code are intentionally not part of this repository.

## Structure

- `website/`: multilingual Astro landing page (`fr`, `en`, `zh`, `ja`, `ko`, `hi`)
- `infra/marketing-cdk/`: S3, CloudFront, contact API, SQS, Lambda, SES, alarms, and deployment infrastructure
- `docs/`: operational and architectural notes for the public website

## Local verification

```sh
corepack enable
pnpm --dir website install --frozen-lockfile
pnpm --dir website test
pnpm --dir infra/marketing-cdk install --frozen-lockfile
pnpm --dir infra/marketing-cdk test
```

## Production deployment

Pushes to `main` run the complete test suite, build the static website, assume the repository-scoped AWS role through GitHub OIDC, deploy the CDK stack, and smoke-test the CloudFront origin. No long-lived AWS access key is stored in GitHub.

The production workflow expects these repository secrets:

- `AWS_ACCOUNT_ID`
- `AWS_DEPLOY_ROLE_ARN`
- `ACM_CERTIFICATE_ARN`
- `WAF_WEB_ACL_ARN`
- `ALARM_TOPIC_ARN`

None of these values is confidential on its own, but the run logs of a public
repository are world-readable and the runner redacts secrets only. A variable is
echoed verbatim in the `env:` header a step prints before it runs, which would
publish the certificate id and the webacl and topic names even with the account
id masked. Storing all five as secrets keeps the whole set out of the logs; they
remain readable in the settings UI to whoever administers the repository.

No account identifier, ARN, or other deployment coordinate is committed here.
The deploy role is assumed through OIDC and its trust policy is scoped to this
repository and to the `production` environment, so a fork cannot assume it.
Third-party actions are pinned to a commit SHA rather than a moving tag.

The public landing lives at `https://maplespire.ca`; the separate application lives at `https://app.maplespire.ca`.

## Security

Report a suspected vulnerability privately to `support@maplespire.ca`. See
[SECURITY.md](SECURITY.md) for scope and testing boundaries.

## License

Source code in this repository is licensed under the Apache License 2.0 — see
[LICENSE](LICENSE).

The MapleSpire name, logo, and the brand and social artwork under
`website/public/brand/` and `website/public/social/` are trademarks and are not
covered by that grant: section 6 of the license reserves them. Fork the code
freely; publish it under your own name and marks.

