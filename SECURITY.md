# Security policy

## Scope

This repository covers the public MapleSpire landing page (`maplespire.ca`) and
the dedicated AWS infrastructure that serves it, including the contact endpoint
at `POST /api/contact`. The MapleSpire application at `app.maplespire.ca` is a
separate deployment and is **not** part of this repository; report issues found
there through the same address and say which surface is affected.

## Reporting a vulnerability

Email **support@maplespire.ca** with:

- the affected surface (marketing site, contact endpoint, infrastructure);
- what you observed, and the minimum steps to reproduce it;
- the impact you believe it has.

Please report privately first and give a reasonable window before any public
disclosure. Do not open a public issue for a suspected vulnerability.

We aim to acknowledge a report within five business days. MapleSpire is operated
by a single individual and does not run a paid bug bounty.

## Testing boundaries

Passive testing of the public site is fine. Please do **not**:

- run automated scanners or load generators against `maplespire.ca` or the
  contact endpoint — it is rate-limited and every submission emails a human;
- submit real personal information belonging to anyone else through the form;
- attempt denial of service, or access data that is not yours.

The contact form is the only write path in this repository. It accepts bounded,
validated JSON and stores nothing beyond the queued message and the emails it
generates; see `infra/marketing-cdk/README.md` for the contract.

## Supported versions

Only the currently deployed `main` branch is supported. There are no maintained
release branches.
