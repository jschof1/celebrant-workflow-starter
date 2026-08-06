# Celebrant Workflow Starter Agent Guide

This repository is designed to be used by both humans and AI agents.

The workflow is docs-first.

Do not treat the website code as the source of truth until the docs layer is in place.

## Start Here

When entering this repo, read these files first:

1. `guide.html`
2. `docs/celebrant-website-guidelines.md`
3. `docs/workflow-overview.md`
4. `docs/intake-guide.md`
5. `.agents/skills/apc-new-website/SKILL.md` when this is a new project or a full delivery pass
6. the relevant template files in `docs/templates/`

If a project-specific brief and prompts already exist, read those before making build decisions.

## Core Workflow

1. Place or review raw client material in `intake/raw-client-files/`.
2. Extract the useful facts, copy, references, and imagery into canonical docs in `docs/`.
3. Use the canonical docs to define the design direction and implementation plan.
4. Build the site in `site/`.
5. Generate the brochure only after the site content and visual system are stable.

## Canonical Source Of Truth

The `docs/` folder is the source of truth.

The `intake/` folder can be messy, duplicated, incomplete, and contradictory.

Do not build directly from the mess if the canonical docs have already been prepared.

## Non-Negotiable Rules

Always follow `docs/celebrant-website-guidelines.md`.

In particular:

- use British English
- do not introduce em dashes unless the client already used them
- include the APC logo and Academy link rules
- include the required footer credit
- avoid priests in imagery
- avoid obvious copy duplication across pages
- keep native browser scroll
- keep brochure styling safe for vector editors such as Affinity

## Design Expectations

Celebrant sites built from this starter should feel bespoke and personality-led.

Do not flatten the design into a generic service-business template.

Use the design system and build prompt to shape the site around the client's voice, assets, references, and ceremony mix.

## Skill Usage

Use the project-local skills in `.agents/skills/` when working in this repository.

The core set is:

- `.agents/skills/apc-new-website/SKILL.md`
- `.agents/skills/celebrant-workflow/SKILL.md`
- `.cursor/skills/frontend-design/SKILL.md`
- `.cursor/skills/awwwwards-animations/SKILL.md`
- `.cursor/skills/brochure-generator/SKILL.md`

Use the celebrant workflow skill first, then the more specific design, animation, or brochure skill for the current phase.

## Working Preference

Prefer extracting and structuring the client's real material over rewriting it from scratch.

Use stronger composition, art direction, animation, and hierarchy to elevate the site, but preserve the supplied voice where possible.
