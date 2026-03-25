# Brochure Generator Skill: Improvement Notes

From the Melanie Robinson-White brochure build (March 2026). These are issues that came up during generation and required manual correction. Each section maps to a specific part of the skill (SKILL.md or design-standards.md) that should be updated.

---

## 1. Panels must feel full, not sparse

**Problem:** The first draft had short, one-sentence service descriptions and process steps, leaving the Services and Process panels visibly empty with large blank areas at the bottom. The user had to ask for "more text to fill it out."

**What the skill says now:** Step 6 (Adaptive Text Sizing) tells you to increase font size when content is light, but it doesn't tell you to write fuller descriptions in the first place.

**Fix for the skill:** Add a rule in Step 5 or Step 6:

> When writing service descriptions, aim for 2-3 sentences per service drawn from the website's detailed service pages (not just the homepage summary cards). For process steps, write 2 sentences per step: what happens and why it matters to the client. The goal is that every panel feels comfortably full at the chosen font size. If a panel still has visible empty space after placing all content, increase body text to 12-14pt rather than leaving dead space. Never let a panel look like it ran out of things to say.

Also add to the checklist:

> - [ ] Every panel is visually full (no large blank areas at bottom)
> - [ ] Service descriptions are 2-3 sentences each (not one-liners)
> - [ ] Process steps are 2 sentences each

---

## 2. Use more ceremony images from the repo

**Problem:** The first draft only embedded 3 images (portrait, about photo, APC seal). The repo had 40+ images (wedding couples, floral arrangements, baby naming, pets, sparklers) that could have been used. The user asked "use more of the images she suggested."

**What the skill says now:** Step 3 tells you to collect images but focuses on portraits and logos. It mentions "service imagery" in passing but doesn't push you to actually use ceremony photos on the inside panels.

**Fix for the skill:** Strengthen Step 3 and Step 5:

> Each service card in the Services panel (Panel 5) should include a thumbnail image from the repo's ceremony/service photos. Look for wedding, funeral, naming, vow renewal, and pet images in `public/images/` or `src/assets/`. One image per service, displayed as a small rounded thumbnail (16-20mm) beside the description. This makes the panel visual and varied rather than text-only.
>
> Use at least 5-8 images total across the brochure (not counting the logo and APC seal). The About panel should ideally use 2 portrait photos if available.

---

## 3. One image per service, not multiples

**Problem:** When told to add more images, the agent over-corrected and put 2 images per service card (e.g. two thumbnails for "Naming & vow renewals"). The user said "don't have two, just have one per service offer."

**Fix for the skill:** Add to design standards:

> In the Services panel, each service gets exactly one thumbnail image. Do not stack or combine multiple images per card. If two services are related (e.g. naming and vow renewals), either give them separate cards with separate images, or pick one image that represents both.

---

## 4. Avoid decorative CSS that doesn't work in print/vector editors

**Problem:** The agent added pink gradient underlines (`::after` pseudo-elements), overlapping circle images on the front cover, a decorative blob (`::before` on the page), and a sparklers image in a `::after` on the process panel. The user called the underlines "silly and ugly", the circle images "pointless", and later found that `box-shadow`, `background`, and `border-radius` on the QR container and APC seal created visible ghost rectangles when the PDF was imported into Affinity (vector editor).

**What the skill says now:** Step 7 encourages "blurred accent blobs, wavy dividers, border accents" and image shapes like "organic blobs, pill shapes."

**Fix for the skill:** Replace or heavily qualify the decorative elements guidance:

> **Print-safe styling rule:** The PDF will often be opened in vector editors (Affinity Designer/Publisher, Illustrator, InDesign) for final layout. Every CSS property you add creates a vector object in the PDF. This means:
>
> - **No `box-shadow` on containers** (QR wrappers, badge containers, contact blocks). Shadows render as separate translucent shapes that appear as visible grey boxes in vector editors.
> - **No `background` fills on transparent wrapper divs.** If a div only exists for layout (not visual), its background must be `transparent` or omitted entirely.
> - **No `border-radius: 50%` on non-image elements.** Clipping masks on containers create phantom circles in vector editors. Only use `border-radius` on actual `<img>` elements or elements with visible, intentional fills.
> - **No `border-bottom` on inline links.** These become stray vector paths. Use colour and weight to distinguish links instead.
> - **No decorative `::before` / `::after` pseudo-elements** for blurred blobs, gradient washes, or floating shapes. These look fine in browsers but become unmovable objects in vector editors and often print incorrectly.
> - **`box-shadow` on images is acceptable** (portraits, service thumbnails) because those are content elements the designer expects to see. But keep them simple (no spread, no inset).
>
> Stick to: gradient panel backgrounds, font styling, padding/spacing, and image `border-radius` for visual interest. These are print-safe and vector-editor-safe.

Add to the verification checklist:

> - [ ] No `box-shadow` on non-image container elements (QR, APC, contact blocks)
> - [ ] No `background` on wrapper/layout-only divs
> - [ ] No decorative `::before` / `::after` pseudo-elements
> - [ ] PDF opens cleanly in a vector editor with no ghost shapes

---

## 5. No em dashes

**Problem:** The generated copy used em dashes throughout. The user's preference (already documented in AGENTS.md) is to avoid em dashes for celebrant marketing copy. Use commas, colons, parentheses, or shorter sentences instead.

**Fix for the skill:** Add to Content Rules:

> - **No em dashes** in any copy. Use commas, colons, semicolons, or parentheses to break up sentences. This is a client preference for celebrant-style marketing copy and applies to all generated text.

---

## 6. Back cover contact info must be explicitly centered

**Problem:** Despite the panel having `text-align: center` and `align-items: center`, the contact block, QR code, and heading drifted left in the PDF render. Explicit centering rules were needed on the `.contact-block`, its children, and the `#qrcode` container.

**Fix for the skill:** Add to design-standards.md, Panel 2 (Back Cover):

> The back cover (Panel 2) content must be explicitly centered. Do not rely on the panel's `text-align: center` alone. Set:
> - `.contact-block`: `display: flex; flex-direction: column; align-items: center; width: 100%;`
> - `.contact-block p`: `width: 100%; text-align: center;`
> - `.contact-block a`: `display: inline-block; text-align: center;`
> - `#qrcode`: `margin: auto; display: flex; justify-content: center; width: fit-content;`
> - Panel heading (`h2`): `width: 100%; text-align: center;`

---

## 7. Pattern C: Data lives in page components, not data files

**Problem:** The skill describes two data patterns (separate data files, single constants file) but this repo had neither. All copy, services, fees, and process steps were inline in `Home.tsx`, `About.tsx`, `Services.tsx`, and `Contact.tsx`. The agent had to grep through page components to find everything.

**Fix for the skill:** Add a Pattern C to Step 1:

> **Pattern C: Inline in page components (custom-built sites):**
>
> If no `src/data/` files or `src/lib/constants.ts` exist, the data lives directly in the page components. Search these files:
>
> | File | What to extract |
> |------|----------------|
> | `src/pages/Home.tsx` | Services array (title, description), process steps, strapline, hero copy |
> | `src/pages/About.tsx` | Full biography text, training credentials, personal story |
> | `src/pages/Services.tsx` | Detailed service descriptions, fees, package inclusions |
> | `src/pages/Contact.tsx` | Phone, email, website, social media handles |
> | `src/components/layout/Footer.tsx` | Phone, email, social, summary text |
> | `src/components/layout/Header.tsx` | Business name, contact info |
>
> Use `grep` to find phone numbers, email addresses, and "From £" fee patterns across all `.tsx` files.

---

## 8. Font matching when Google Fonts doesn't have the exact typeface

**Problem:** The website uses "Mont" (a commercial typeface loaded from local OTF files). Google Fonts doesn't have Mont. The skill says "use the exact same fonts" but doesn't explain what to do when the font isn't on Google Fonts CDN.

**Fix for the skill:** Add to Step 2 or Step 5:

> If the website's heading or body font is a commercial/local typeface not available on Google Fonts (e.g. Mont, Proxima Nova, Avenir), find the closest Google Fonts equivalent. Common substitutions:
> - Mont → DM Sans (geometric sans, similar weight range)
> - Proxima Nova → Montserrat or Inter
> - Avenir → Nunito
>
> Also check `tailwind.config.ts` for fallback font stacks, which often list a Google Font as the second option (e.g. `['Mont', '"DM Sans"', 'system-ui']`). Use that fallback.

---

## Prompt for the skill editor

Copy this into your code editor when updating the brochure-generator skill:

```
Update the brochure-generator skill (SKILL.md and references/design-standards.md) with these improvements based on real build feedback. Apply each fix to the appropriate section:

1. SKILL.md Step 1: Add "Pattern C" for repos where data is inline in page components (Home.tsx, About.tsx, Services.tsx, Contact.tsx, Footer.tsx) rather than in data/ files or constants.ts.

2. SKILL.md Step 2/Step 5: Add guidance for when the website's font isn't on Google Fonts. Check tailwind.config.ts fallback stacks and use the closest Google Fonts equivalent (e.g. Mont → DM Sans).

3. SKILL.md Step 3: Strengthen image collection to require using ceremony photos as service thumbnails. Target 5-8 images minimum across the brochure. Each service in Panel 5 gets exactly one thumbnail.

4. SKILL.md Step 5/Step 6: Add a "panel fullness" rule. Service descriptions should be 2-3 sentences (from the detailed service pages, not homepage summary cards). Process steps should be 2 sentences each. Every panel must look visually full at the chosen font size.

5. SKILL.md Step 7 / design-standards.md Section 10: Replace the decorative elements guidance with a "print-safe styling" rule. No box-shadow on non-image containers. No background fills on wrapper divs. No border-radius on non-image elements. No border-bottom on links. No decorative ::before/::after pseudo-elements. These all create ghost shapes in vector editors (Affinity, Illustrator). Only use: gradient panel backgrounds, font styling, spacing, and border-radius on actual <img> elements.

6. design-standards.md Panel 2: Add explicit centering rules for the back cover contact block, QR code, and heading (flex column, align-items center, width 100%, margin auto on QR).

7. SKILL.md Content Rules: Add "No em dashes" rule. Use commas, colons, semicolons, or parentheses instead.

8. SKILL.md Verification Checklist: Add these items:
   - Every panel visually full (no large blank areas)
   - Service descriptions 2-3 sentences each
   - Process steps 2 sentences each
   - No box-shadow on non-image containers
   - No background on wrapper/layout divs
   - No decorative ::before/::after pseudo-elements
   - PDF opens cleanly in vector editor with no ghost shapes
   - No em dashes in copy
```
