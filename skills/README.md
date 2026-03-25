# Skills Reference

This starter assumes a workflow where the agent uses the right skill for the right phase rather than improvising from scratch each time.

## Project-Local Skills

These are installed directly in this repo under `.agents/skills/`:

- `celebrant-workflow`
- `frontend-design`
- `awwwwards-animations`
- `brochure-generator`

## What Each Skill Does

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
