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

At this stage, the build should no longer depend on rummaging through the raw folder.

## Stage 3: Website Build

Use the `site/` app as the implementation base.

The site should be built from the canonical docs, not from guesswork and not by dumping all supplied copy straight onto the homepage.

## Stage 4: Brochure Build

Once the website content and design are stable, use the brochure workflow under `brochure/`.

The brochure should draw from the website's established copy hierarchy, imagery, and design system.

## Key Principle

The output should feel bespoke to the client, but the process should stay repeatable.
