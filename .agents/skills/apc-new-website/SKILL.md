---
name: apc-new-website
description: Coordinates a complete new APC celebrant website project from locked intake through website QA, collateral, sign-off, and gated provider handover.
---

# APC New Website

Use this skill for a new Academy of Professional Celebrants website or a full rebuild that must be delivered properly in one controlled pass.

Read the complete runbook first:

`/Users/jack/Documents/GitHub/project-hub/docs/workflows/apc-new-website-runbook.md`

## Required sequence

1. If this project does not exist yet, run the global bootstrap script from any directory using the client name and intake path. The generic starter, not another client repository, is the default starting asset.
2. Read `AGENTS.md`, `docs/celebrant-website-guidelines.md`, `docs/workflow-overview.md`, and `docs/intake-guide.md`.
3. Use past celebrant projects as references for quality and isolated reusable patterns only. Never clone an existing client's repository or carry over client-specific content, assets, provider state, credentials, approvals, archive links, or invoices.
4. Inspect the raw client material and create the core canonical docs and `docs/assets/asset-manifest.md` from `docs/templates/`.
5. Stop at the brief quality gate until copy, pages, services, fees, assets, design direction, domain, reviewer, and collateral inputs are sufficiently complete.
6. Read `/Users/jack/.agents/skills/apc-new-website/references/brand-media-and-email.md`, plan logo/background/video/form-email work in the asset manifest, and apply its approval and credential boundaries.
7. Use the canonical docs to build the website in `site/` or the client repo.
8. Invoke the specialist design, motion, logo/background, video, SEO, performance, and QA skills as needed.
9. Run a bounded builder-critic visual-escalation loop using `docs/qa/quality-loop.md`: fresh visual and technical critics inspect the real render, name the strongest signature moment and largest evidenced gap, and the lead agent integrates one coherent fix per round.
10. Run code checks and rendered route/mobile/form/accessibility checks. Capture evidence.
11. Stop for website approval/lock before generating collateral.
12. Use `celebrant-collateral` and `brochure-generator` from the approved website state.
13. Run print preflight, layout, PDF geometry, QR, APC accreditation, and visual checks.
14. Prepare final sign-off and handover evidence.
15. Use `cpanel-cloudflare-formsubmit-email-setup`, `celebrant-cloudflare`, or the Drive archive skill only after the exact provider action is approved; reread the provider afterwards.

## Specialist skill paths

- Local workflow: `.agents/skills/celebrant-workflow/SKILL.md`
- Local frontend: `.agents/skills/frontend-design/SKILL.md`
- Local motion: `.agents/skills/awwwards-animations/SKILL.md`
- Local brochure: `.agents/skills/brochure-generator/SKILL.md`
- Logo and generated backgrounds: `/Users/jack/Documents/GitHub/codex-imagen/SKILL.md`
- Stock-video optimisation: `/Users/jack/.agents/skills/compress-video/SKILL.md`
- QA screenshots: `/Users/jack/.agents/skills/design-qa-screenshots/SKILL.md`
- QA review: `/Users/jack/.agents/skills/qa-reviewer/SKILL.md`
- Performance: `/Users/jack/.agents/skills/performance-lighthouse-runner/SKILL.md`
- SEO: `/Users/jack/.agents/skills/seo/SKILL.md`
- Collateral: `/Users/jack/.agents/skills/celebrant-collateral/SKILL.md`
- Cloudflare: `/Users/jack/.agents/skills/celebrant-cloudflare/SKILL.md`
- Form email and mailbox: `/Users/jack/.agents/skills/cpanel-cloudflare-formsubmit-email-setup/SKILL.md`
- Drive archive: `/Users/jack/.agents/skills/apc-drive-pdf-upload-archive/SKILL.md`

## Hard stops

- Do not build from raw material when canonical docs are available but stale or contradictory.
- Do not invent facts, prices, services, testimonials, imagery rights, or domain state.
- Do not create collateral before website lock.
- Do not treat email, WhatsApp, or a late transfer link as an approved change.
- Do not put mailbox passwords or other credentials in `.env`, docs, source, shell history, logs, or chat. Use a unique Keychain-held secret only during the approved provider action.
- Do not deploy, change DNS/email, upload, publish, or send an external message without the relevant exact approval.
- Do not let the quality loop run past its recorded time, attempt, safety, or approval boundaries.

## Completion standard

Report the project only as complete when the canonical docs, implementation checks, rendered QA, approval state, collateral proofs, and provider rereads are reviewable.
