---
name: brochure-generator
description: Generates celebrant brochures from the approved website and canonical project docs. Use when creating brochure collateral, planning brochure panels, extracting site copy for print, or preparing print-safe exports.
---

# Brochure Generator

Use this skill after the website structure, design system, and copy are stable.

## Read First

Before generating brochure collateral, read:

1. `AGENTS.md`
2. `docs/celebrant-website-guidelines.md`
3. `brochure-plan.md` if it exists
4. the website pages or data files that contain the approved copy

## Workflow

### 1. Use Approved Inputs

The brochure should be based on:

- the canonical brief
- the reference analysis
- the design system
- the approved website copy
- the approved website imagery

Do not invent content that is not supported by the project docs or the website.

### 2. Extract Real Data

Look in these places:

- `src/data/` style repos
- `src/lib/constants.ts`
- inline page content such as `src/pages/Home.tsx`, `About.tsx`, `Services.tsx`, `Contact.tsx`
- layout files for contact details

### 3. Match The Website

- use the website's colour system
- use the website's font direction or the nearest practical equivalent
- use the real ceremony imagery and portraits where available

### 4. Fill The Panels Properly

- service descriptions should usually be 2 to 3 sentences each
- process steps should usually be 2 sentences each
- each service gets exactly one thumbnail image
- every panel should feel visually full

## Print-Safe Rules

These are mandatory for clean import into Affinity or similar tools:

- no `box-shadow` on non-image containers
- no decorative `::before` or `::after`
- no unnecessary wrapper backgrounds
- no clipping tricks on non-image wrappers that create ghost shapes

## Repo-Specific Rules

Always follow `docs/celebrant-website-guidelines.md`.

Especially:

- British English
- no accidental em dashes
- APC requirements
- safe imagery

## Output Standard

The brochure should feel like a natural extension of the website, not a separate generic template.
