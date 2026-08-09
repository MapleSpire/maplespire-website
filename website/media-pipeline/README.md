# Story media gates

The host machine does not need `ffmpeg` or VMAF. Build the reproducible verifier once.
The image pins Netflix VMAF `v3.1.0`, builds its real native CLI, and installs
FFmpeg's real `ssim` filter:

```powershell
docker build -t maplespire-story-media -f website/media-pipeline/Dockerfile .
```

## Excellent source-to-served image gate

The landing page serves high-quality WebP derivatives while preserving the
team-supplied PNG references. The gate decodes the built `dist/` asset and its
source at their unchanged native resolution over 24 identical frames, then runs two independent full-reference
metrics:

- overall SSIM must be at least `0.990`;
- luma SSIM must be at least `0.990`;
- VMAF (`vmaf_v0.6.1`) must be at least `95.0`.

The project names that joint threshold **Excellent**. These are computed scores,
not fixture values or mocked test data. Run the gate from the repository root:

```powershell
docker run --rm -e PUBLIC_BASE_URL=http://host.docker.internal:5197/ -v "${PWD}:/work" maplespire-story-media scripts/verify-image-quality.mjs media.quality.json artifacts/quality
```

Run `pnpm build` first. When `PUBLIC_BASE_URL` is provided, the gate also fetches
each image over HTTP and requires its SHA-256 hash to match the evaluated `dist/`
file. The command exits non-zero when any metric or hash misses its threshold. It writes the
raw VMAF JSON plus per-asset and aggregate reports under
`website/artifacts/quality/`. VMAF is a full-reference video metric, so this gate
measures raster fidelity of the served still images; it does not claim to judge
the semantic quality of the CSS scroll choreography.

## Legacy pre-rendered clip pipeline

The current landing page does **not** load the older `public/story/*.webm`
masters or their seven clips. They are retained only as historical pipeline
fixtures. The live experience now animates crisp image layers in the browser,
so there is no encoded clip boundary to certify as a production seam.

For archival reproduction of that legacy media, capture the geometry-identical
light/dark masters from `website/`:

```powershell
pnpm media:render-frames
```

Then select source frames whose two incoming and two outgoing motion intervals
stay within the authoring threshold, encode both clip sets in the media container,
and run the metadata and seam gates from the repository root:

```powershell
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/select-story-boundaries.mjs
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/encode-story-clips.mjs light
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/encode-story-clips.mjs dark
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/verify-media.mjs story.clips.light.json
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/verify-seams.mjs story.clips.light.json artifacts/seams/light
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/verify-media.mjs story.clips.dark.json
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/verify-seams.mjs story.clips.dark.json artifacts/seams/dark
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/concat-clips.mjs story.clips.light.json public/story/master-light.webm
docker run --rm -v "${PWD}:/work" maplespire-story-media scripts/concat-clips.mjs story.clips.dark.json public/story/master-dark.webm
```

The seam check decodes the last three frames of each clip and the first three
of the next. It checks the shared boundary frame and compares motion magnitude
on both sides. Artifacts include the decoded frames, a high-contrast difference
image, a per-seam JSON report, and a summary suitable for CI upload.

Run the parser and threshold unit tests without Docker or media files:

```powershell
node --test website/scripts/media-gates.test.mjs
```

The gate complements visual review. SSIM cannot determine semantic continuity
or fully detect a reversal in camera direction, so every seam must also be
reviewed forward and backward at 0.25x, 1x, and 2x.
