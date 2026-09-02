---
name: brochure-generator
description: >-
  Generates celebrant tri-fold brochures from the approved website and canonical
  project docs—panel planning, copy extraction, print-safe HTML for Affinity/PDF.
  Use when creating brochure collateral, trifold layouts, extracting site copy for
  print, or when the user runs /brochure, says "brochure generator", "generate
  brochure", or "trifold brochure".
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

### 5. Print Size, Bleed, and DL C-Fold Layout

Build brochures as a flat DL C-fold print sheet with bleed, not as plain A4.

Mandatory page geometry:

- PDF/page size: **303mm x 216mm** landscape
- Finished trim size: **297mm x 210mm**
- Bleed: **3mm on every outside edge**
- Do not export the final brochure PDF at plain A4 (`297mm x 210mm` / `841.92 x 594.96 pt`)

Panel widths must follow the DL C-fold asymmetry:

- Side A / outside, left to right: inner flap **97mm**, back **99mm**, front **101mm**
- Side B / inside, left to right: left panel **101mm**, centre panel **99mm**, right panel **97mm**

When laying this out on the bleed sheet, add the left/right bleed to the outer edge panels only:

- Side A / outside CSS grid columns: **100mm 99mm 104mm**
- Side B / inside CSS grid columns: **104mm 99mm 100mm**

Critical cutter safety is mandatory:

- Keep all text, logos, QR codes, badges, faces, eyes, fine rules, and important decorative marks at least **12mm inside the finished trim**.
- Because the artwork includes 3mm bleed, this means critical content must be at least **15mm from the full artwork edge**.
- Keep the same **12mm clearance from both sides of each fold line**. A calmer edge is better than risking content near a cut or crease.
- Only background colour, texture, image bleed, or non-essential decoration should enter the outer bleed or sit near folds.

Use CSS variables so the intent is explicit:

```css
:root {
  --page-width: 303mm;
  --page-height: 216mm;
  --bleed: 3mm;
  --trim-width: 297mm;
  --trim-height: 210mm;
  --panel-left-narrow: 97mm;
  --panel-centre: 99mm;
  --panel-right-wide: 101mm;
  --panel-left-narrow-bleed: calc(var(--panel-left-narrow) + var(--bleed));
  --panel-right-wide-bleed: calc(var(--panel-right-wide) + var(--bleed));
}

@page {
  size: 303mm 216mm;
  margin: 0;
}

.brochure-page {
  width: var(--page-width);
  height: var(--page-height);
}

.brochure-page-outside {
  grid-template-columns:
    var(--panel-left-narrow-bleed)
    var(--panel-centre)
    var(--panel-right-wide-bleed);
}

.brochure-page-inside {
  grid-template-columns:
    var(--panel-right-wide-bleed)
    var(--panel-centre)
    var(--panel-left-narrow-bleed);
}
```

Before handing over the PDF, verify with `pdfinfo`:

- Expected page size: **858.898 x 612.283 pt** (`858.8976377952756 x 612.2834645669292 pt`)
- Expected physical size: **303mm x 216mm**
- Expected page count: **2**

If creating a flat raster PDF, render/export at **300 DPI**. A correct 300 DPI raster page is **3579 x 2551 px**. Do not use the old `3579 x 2550 px` assumption.

For image-generated brochure artwork, prefer `/Users/jack/tools/celebrant-print-generator`: it generates each brochure panel separately at the finished trim width, then stitches the three panels into the exact full-bleed sheet. This avoids asking the image model to divide a single canvas into unequal panels.

### 6. Crop-Mark Proof / Grey-Box Wrapper

When the user asks for the brochure to sit inside the grey box, crop marks, or print template, use the bundled reference PDF:

- `references/dl-cfold-bleed-crop-template.pdf`

This template is larger than the brochure and contains the crop marks plus a grey placement box. The brochure must be placed on top of the grey box at its native size. Do not scale, stretch, or resize the brochure.

Expected template geometry:

- Template page size: about **902.898 x 656.283 pt**
- Template page count: **2**
- At 300 DPI, template raster size: about **3763 x 2735 px**
- At 300 DPI, grey box: about **3583 x 2551 px**
- At 300 DPI, brochure page: **3579 x 2551 px**

The small difference between grey box and brochure is intentional. Centre the native-size brochure inside the detected grey box.

Recommended output name when wrapping a generated brochure:

- `catherine-brochure-on-test.pdf` for ad hoc client work, or `<client>-brochure-crop-proof.pdf` for reusable outputs

Reference workflow:

```bash
# Render template and already-correct brochure at 300 DPI.
pdftoppm -r 300 -png -f 1 -singlefile references/dl-cfold-bleed-crop-template.pdf /tmp/brochure-template-p1
pdftoppm -r 300 -png -f 2 -singlefile references/dl-cfold-bleed-crop-template.pdf /tmp/brochure-template-p2
pdftoppm -r 300 -png -f 1 -singlefile brochure.pdf /tmp/brochure-native-p1
pdftoppm -r 300 -png -f 2 -singlefile brochure.pdf /tmp/brochure-native-p2
```

Then paste each brochure page over the grey box without resizing. Detect the grey box from pixels near neutral grey (`215..245` RGB with low channel variance), centre the brochure image within that box, and save each composed page at 300 DPI. A correct placement should look like:

- Template: `3763 x 2735 px`
- Grey box: approximately `3583 x 2551 px`
- Brochure: `3579 x 2551 px`
- Placement: approximately `(94, 92)` for the current bundled template

After composing the pages, rebuild the flat PDF:

```bash
magick -density 300 -units PixelsPerInch \
  /tmp/brochure-on-template-p1.jpg \
  /tmp/brochure-on-template-p2.jpg \
  -compress JPEG -quality 95 \
  brochure-crop-proof.pdf
```

Before handing over the crop-proof PDF, verify:

- `pdfinfo brochure-crop-proof.pdf` shows **2 pages**
- `pdfimages -list brochure-crop-proof.pdf` shows one 300 DPI full-page image per page
- the brochure image has not been resized from **3579 x 2551 px**

### 7. Required Elements (Must Include)

Every brochure must include these — usually on the back cover / contact panel:

- **QR code** linking to the live website. Generate with `qrencode -t SVG -o <path> -l M --svg-path -m 0 '<url>'` and inline the resulting SVG in the HTML so it travels cleanly into Affinity / PDF. Pair with a small "Scan to visit" label.
- **Accreditation badge** (the Academy of Professional Celebrants logo / equivalent) rendered at a legible size with a "Fully accredited · Fully insured" line.

### 8. Cover Imagery Rules

- **Never** use a portrait of the celebrant as the front cover hero. The front-cover-to-flap fold runs right through the image, so any face gets split by the fold. Put portraits on the inner flap instead.
- Prefer a branded abstract / editorial image (florals, colour flat-lay, ceremony moment from behind, hands, rings, setting) that survives the fold.
- The front cover should feel like the site's hero mood — lean on the site's mood / parallax imagery (e.g. `/mood-floral-*`, `/bg-parallax-*`) rather than a posed portrait.

### 9. Use More Colour & Graphic Accents

A brochure should not read as a white document with one tint. Pull in:

- cream (`--lilac-50`) and lilac tinted backgrounds on at least one inner panel
- real lilac / sage / cream imagery as decorative thumbnails or full-bleed panels
- small inline SVG botanical accents (lilac sprig, eucalyptus, rule ornaments) where a divider or a cold white gap would otherwise appear
- a tinted "card" treatment for the fees block and/or the pull quote

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

## Global install

A personal copy for Cursor lives at `~/.cursor/skills/brochure-generator/SKILL.md`. This repo copy should be kept in sync when the workflow changes.
