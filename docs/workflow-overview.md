# Workflow Overview

This starter is built around a docs-first celebrant workflow.

## Stage 1: Intake

Place the client's raw material in `intake/raw-client-files/`.

This can include:

- PDFs
- Word exports
- copied emails
- image folders
- logos
- website inspiration links
- price lists
- social media notes

Do not waste time trying to make the intake folder neat.

The goal is to extract the useful information, not to make the source material pretty.

## Stage 2: Canonical Project Docs

Use the templates in `docs/templates/` to create the project documents for the actual build.

These docs should answer:

- who the client is
- what copy must be preserved
- what design direction fits them
- what site pages need to exist
- what brochure content and imagery should be used
- which logo, still-background, video-background, and form-email decisions are ready

At this stage, the build should no longer depend on rummaging through the raw folder.

## Stage 3: Website Build

Use the `site/` app as the implementation base.

The site should be built from the canonical docs, not from guesswork and not by dumping all supplied copy straight onto the homepage.

Use `docs/assets/asset-manifest.md` to drive logo, Codex Imagen background, and approved Pixabay video work. Backgrounds should create a deliberate high-contrast visual rhythm while retaining readable text, a poster, and a reduced-motion fallback for video.

Prepare mailbox and FormSubmit work only after the domain and final form locations are known; it remains a separately approved provider action.

## Stage 3.5: Quality Loop

After the first coherent build, use `docs/qa/quality-loop.md` to run a bounded builder-critic loop. The lead agent makes one high-impact improvement at a time; fresh visual and technical critics inspect the rendered artifact and verification evidence, rather than the builder's summary.

Keep the loop local and approval-gated. Stop when the recorded success criteria pass, a boundary fires, or a client decision is needed.

## Stage 4: Brochure Build

Once the website content and design are stable, use the brochure workflow under `brochure/`.

The brochure should draw from the website's established copy hierarchy, imagery, and design system.

## Key Principle

The output should feel bespoke to the client, but the process should stay repeatable.
