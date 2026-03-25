# Celebrant Workflow Starter

This repository is the default starting point for new celebrant projects.

It is designed for a simple workflow:

1. Drop raw client files into `intake/raw-client-files/`.
2. Turn that material into canonical project docs in `docs/`.
3. Build the site in `site/`.
4. Produce brochure collateral from the approved docs and site copy.

## Start Here

- Open `guide.html` for the visual handoff guide.
- Read `AGENTS.md` for the repo-wide workflow instructions.
- Read `docs/celebrant-website-guidelines.md` for the non-negotiable celebrant rules.
- If you are using Gemini or a similar agent tool, also read `GEMINI.md`.

## Repository Structure

- `docs/` contains the canonical source of truth for the project.
- `intake/` stores raw client material and rough working notes.
- `site/` contains a lightweight React starter for the actual build.
- `brochure/` contains brochure workflow guidance and templates.
- `skills/` lists the key skills and workflows this starter expects.

## Core Rule

Messy folders are allowed in `intake/`.

They are not the final source of truth.

Once key information has been extracted, the canonical versions must live in `docs/`.

## First Use

1. Create a new project from this starter.
2. Place the client's files into `intake/raw-client-files/`.
3. Fill out the templates in `docs/templates/`.
4. Use `docs/celebrant-website-guidelines.md` as the default ruleset.
5. Build the site in `site/`.
6. Use the brochure workflow in `brochure/` once the site content is stable.
