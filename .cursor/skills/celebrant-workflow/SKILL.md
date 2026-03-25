---
name: celebrant-workflow
description: Guides the intake-first workflow for celebrant projects. Use when starting a new celebrant repo from this starter, turning messy client folders into canonical docs, building the website from those docs, or preparing brochure collateral.
---

# Celebrant Workflow

Use this skill when working inside the celebrant workflow starter or any repo cloned from it.

## Read This First

Before doing implementation work, read:

1. `AGENTS.md`
2. `docs/celebrant-website-guidelines.md`
3. `docs/workflow-overview.md`
4. `docs/intake-guide.md`

If project-specific docs already exist, read those next:

- `client-brief.md`
- `reference-analysis.md`
- `design-system.md`
- `master-prompt.md`
- `build-prompt.md`
- `brochure-plan.md`

## Workflow

### 1. Intake

Treat `intake/raw-client-files/` as a raw holding area.

It may contain:

- repeated facts
- ugly folder names
- mixed file types
- low-quality images
- partial briefs

Do not spend effort cleaning the folder for its own sake.

Extract what matters.

### 2. Canonical Docs

Use the templates in `docs/templates/` to create the working project documents.

The `docs/` layer becomes the source of truth.

### 3. Website Build

Only move into `site/` once the brief, design direction, and build prompt are clear enough.

Build from the docs.

Do not dump all client copy onto the homepage.

### 4. Brochure Build

Do brochure work after the site copy and design system are stable.

Use the brochure plan and the website hierarchy as the basis for the collateral.

## Non-Negotiables

Always follow `docs/celebrant-website-guidelines.md`.

Especially:

- British English
- no accidental em dashes
- APC logo and Academy link rules
- required footer credit
- no priests in imagery
- reduced copy duplication across pages
- native scroll
- print-safe brochure styling

## Quality Bar

The final output should feel bespoke to the celebrant, not like a generic service template.

Preserve the client's voice where possible.

Use stronger composition, background treatment, animation, and hierarchy to elevate the design.

## Additional Resources

- For repo structure and file roles, see [reference.md](reference.md)
