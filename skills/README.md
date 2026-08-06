# Skills Reference

## One-shot entry point

For a complete new APC celebrant website, start with:

`.agents/skills/apc-new-website/SKILL.md`

It coordinates intake, canonical docs, bespoke website build, rendered QA, website lock, collateral, final sign-off, and provider handover. It does not bypass approval gates for deployment, DNS, email, uploads, publishing, or external messages.

This starter assumes a workflow where the agent uses the right skill for the right phase rather than improvising from scratch each time.

## Project-Local Skills

These are installed directly in this repo under `.agents/skills/`:

- `apc-new-website`
- `celebrant-workflow`
- `frontend-design`
- `awwwwards-animations`
- `brochure-generator`

## What Each Skill Does

- `apc-new-website`: one-shot orchestration and acceptance gates for a complete project
- `celebrant-workflow`: intake-first repo workflow, canonical docs, build order
- `frontend-design`: page and component art direction for the website build
- `awwwwards-animations`: premium React motion patterns with native-scroll defaults
- `brochure-generator`: brochure extraction, panel planning, and print-safe output

## Working Expectation

The agent should read the project docs first, then use the relevant skill for the current phase:

- intake
- design direction
- implementation
- animation
- brochure generation
- verification

The docs define the project.

The skills define the workflow.

The full cross-repo sequence is documented in:

`/Users/jack/Documents/GitHub/project-hub/docs/workflows/apc-new-website-runbook.md`
