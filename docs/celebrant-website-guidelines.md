# Celebrant Website Guidelines

This document captures the default rules for celebrant websites built from this starter.

If a client brief clearly overrides something, use judgement, but treat this as the base ruleset.

## Default Site Architecture

Most celebrant sites should include these pages:

1. Home
2. About
3. Process
4. Services
5. FAQ
6. Links
7. Contact

## Required APC Rules

- Include the APC certified logo somewhere on the site.
- Mention the Academy of Professional Celebrants where relevant.
- Link Academy mentions to `https://www.funeralcelebrantacademy.co.uk`.
- Include the footer text `website made by the Academy of Professional Celebrants`.

## Writing Rules

- Use British English throughout.
- Avoid accidental American spellings.
- Do not introduce em dashes unless the client explicitly supplied them in their own copy.
- Avoid duplicating large blocks of copy across pages.
- Keep the tone warm, human, and ceremonial.

## Content Strategy Rules

- Do not blindly place all client copy on the homepage.
- Preserve the strongest version of each message in the page where it belongs most naturally.
- If content overlaps between Home, About, and Services, reduce repetition.

## Image Rules

- Avoid priests on celebrant websites.
- Avoid risky licensed stock.
- Prefer client-supplied assets when they are usable.
- Use thoughtful fallback imagery where needed, such as florals, skies, landscapes, candlelight, water, pathways, textures, and symbolic ceremony details.
- Avoid generic stock-photo clichés and avoid AI people unless they are clearly acceptable.
- Unless a final client logo is supplied, use Codex Imagen for logo concepts and obtain reviewer approval before treating one as final.
- Use Codex Imagen for generated background artwork and record every non-client asset in `docs/assets/asset-manifest.md`.
- Use Pixabay video only after recording the source and rights check, then optimise it for web with a poster and reduced-motion fallback.

## Design Direction

- Favour personality over sterile corporate restraint.
- The site should feel bespoke, not template-led.
- Use bold, high-contrast section backgrounds, varied but coherent colour fields, layered composition, asymmetry, overlap, and decorative details where appropriate.
- Keep text readable with a deliberate scrim, gradient, crop, or solid fallback; do not flatten the design into something generic.
- Define two or three client-appropriate signature moments that make the rendered site memorable; they must strengthen the client's story rather than act as visual tricks.

## Motion Direction

- Use animation intentionally and visibly.
- GSAP and Motion are good defaults.
- Keep browser-native scrolling.
- Avoid smooth-scroll systems unless there is a strong reason.
- Reduce heavier effects on mobile.
- For video backgrounds, use `muted` and `playsinline`, ship a poster, and show a static fallback for reduced motion or failed playback.

## Brochure Rules

- Each service panel should feel visually full.
- Service descriptions should usually be 2 to 3 sentences, not one-liners.
- Process steps should usually be 2 sentences each.
- Use multiple ceremony images across the brochure where possible.
- Use exactly one image per service card.
- Keep brochure styling print-safe for vector editors such as Affinity.

## Print-Safe Styling Rules

- Do not use `box-shadow` on non-image containers.
- Do not use decorative `::before` or `::after` pseudo-elements.
- Do not use wrapper backgrounds unless they are intentional visible design surfaces.
- Do not add stray link underlines or decorative border treatments that may import badly into vector tools.

## Final Review Checklist

Before delivery, verify:

- the site follows the brief closely enough
- APC requirements are satisfied
- British English is used
- no accidental em dashes were introduced
- no priest imagery is present
- imagery is safe to use
- logo, background, and video entries are traceable in the asset manifest
- text remains readable over every background at mobile and desktop widths
- video poster, loading behaviour, and reduced-motion fallback work
- real screenshots show distinctive signature moments and no large generic or visually flat sections
- page copy is not obviously repetitive
- the site feels bespoke
- brochure layouts feel full and clean
- brochure exports do not create ghost shapes in vector editors
