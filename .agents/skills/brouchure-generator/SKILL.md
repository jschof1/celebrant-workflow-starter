---
name: brochure-generator
description: "Generate professional, print-ready trifold A4 celebrant brochures as self-contained HTML and convert to PDF. The primary workflow is running from inside an existing celebrant website repo — the skill extracts all copy, images, colours, and fonts from the codebase rather than needing separate input. Use when the user says 'generate brochure', 'create brochure', 'make a brochure', 'brochure for [name]', 'collateral', 'trifold', 'run the brochure', or anything about celebrant print materials. Also trigger on vague requests like 'make the brochure' or 'do the brochure for this one' when working inside a celebrant project."
---

# Celebrant Trifold Brochure Generator

Generate a professional, print-ready trifold brochure as a single self-contained HTML file, then convert it to PDF. The skill extracts everything it needs — copy, images, colours, fonts — directly from the celebrant's existing website repo, so nothing is made up and the brochure matches their website brand exactly.

## Primary Workflow: From a Website Repo

You're typically inside a celebrant website repo (e.g. `celebrant-catharine-dawson/`, `fiona-armfield-celebrant/`). The skill reads the existing codebase to build the brochure.

### Step 1: Find and Read Client Data

Scan the repo for data files. There are three patterns — check in order:

**Pattern A — Separate data files (celebrant-base template repos):**

| File | What to extract |
|------|----------------|
| `src/data/siteSettings.ts` | `businessName`, `title`, `strapline`, `phone`, `email`, `locations`, `footerStatement`, `quote` |
| `src/data/services.ts` | Array of `{ title, description }` |
| `src/data/fees.ts` | Array of `{ title, price, details[] }` |
| `src/data/testimonials.ts` | Array of `{ name, location, quote }` — only use if real content (skip placeholder `[CLIENT_NAME]` entries) |
| `src/data/process.ts` | Array of `{ title, description }` — use for "How I Work" panel |
| `src/data/faqs.ts` | Array of `{ question, answer }` — optional, may inform panel content |

**Pattern B — Single constants file (older repos like fiona-armfield):**

| File | What to extract |
|------|----------------|
| `src/lib/constants.ts` | `SITE_CONFIG` (name, title, contact), `SERVICES`, `FEES`, `FAQS`, `PROCESS_STEPS`, plus asset URL exports |

**Pattern C — Inline in page components (custom-built sites):**

If no `src/data/` files or `src/lib/constants.ts` exist, the data lives directly in the page components. Search these files:

| File | What to extract |
|------|----------------|
| `src/pages/Home.tsx` | Services array (title, description), process steps, strapline, hero copy |
| `src/pages/About.tsx` | Full biography text, training credentials, personal story |
| `src/pages/Services.tsx` | Detailed service descriptions, fees, package inclusions |
| `src/pages/Contact.tsx` | Phone, email, website, social media handles |
| `src/components/layout/Footer.tsx` | Phone, email, social, summary text |
| `src/components/layout/Header.tsx` | Business name, contact info |

Use `grep` to find phone numbers (`07\d`), email addresses (`@`), and fee patterns (`From £`, `£\d`) across all `.tsx` files if the data isn't immediately obvious.

### Step 2: Extract Brand Identity (Colours & Fonts)

Read `src/index.css` to extract the design system. Look for:

**CSS custom properties:**
```css
--primary: ...;       /* or --primary-hsl, converted to hex */
--accent: ...;
--background: ...;
--foreground: ...;
```

**Font families:**
```css
--font-display: ...;  /* Heading font (serif) */
--font-body: ...;     /* Body font (sans-serif) */
--font-quote: ...;    /* Script/accent font (optional) */
```

Also check for Tailwind config or theme tokens. If the repo uses HSL values like `210 40% 98%`, convert them to hex for the brochure CSS variables.

Map what you find to the brochure's colour system:
- `--primary` → the celebrant's main brand colour
- `--accent` → their accent/highlight colour
- `--text` → dark text colour (from foreground)
- `--bg-soft` → light background colour

Use the same font families from the website. If they use Cormorant Garamond for headings on the site, use it for brochure headings too. Load the exact same fonts via Google Fonts CDN.

If the website uses a commercial or locally-loaded typeface that isn't on Google Fonts (e.g. Mont, Proxima Nova, Avenir), find the closest Google Fonts equivalent. Check `tailwind.config.ts` for fallback font stacks — they often list a Google Font as the second option (e.g. `['Mont', '"DM Sans"', 'system-ui']`). Use that fallback. Common substitutions:
- Mont → DM Sans
- Proxima Nova → Montserrat or Inter
- Avenir → Nunito

### Step 3: Collect Images

Search the repo for images to embed in the brochure. Check these locations:

| Location | What to look for |
|----------|-----------------|
| `src/assets/` | Logo files (`.png`, `.svg`, `.jpeg`), personal photos, branding icons |
| `src/assets/personal/` or `src/assets/personal-images/` | Portrait photos |
| `src/assets/apc-logo/` | APC seal (use if present; otherwise use the one bundled with this skill) |
| `src/assets/branding/` | Icons, decorative elements |
| `src/assets/generated/` or `src/assets/service-images/` | Service imagery |
| `public/` | Additional images, favicons |
| `dist/assets/` | Built/optimised versions of the above |

**Priority for portraits:** Look for the celebrant's actual photos. These are the most important images — they personalise the brochure. Typically there are 1-2 portrait photos.

**Logo:** There's almost always a `logo.png` or `logo.svg` somewhere in assets.

**APC seal:** If not found in the repo, use the one bundled with this skill at `assets/apc-logo/APC-seal.png`.

**Ceremony/service images:** The repo will usually have wedding, funeral, naming, and other ceremony photos. Use these as thumbnails in the Services panel (Panel 5) — one image per service card. Also look in `public/images/` for additional imagery. Aim for **5–8 images total** across the brochure (not counting the logo and APC seal). A text-only brochure looks flat; the images bring it to life.

### Step 4: Read Any Existing "About" Copy

Look for additional copy sources:
- `src/assets/personal/*.md` or `src/assets/*.md` — raw questionnaire answers, biography text
- Component files like `src/components/sections/About.tsx` or `src/pages/About.tsx` — may contain inline copy
- The `siteSettings.ts` `footerStatement` or `quote` fields

Use this real copy for the "About Me" panel. Never fabricate biography content — use exactly what the celebrant wrote about themselves. If the about text is thin, use larger font sizes and more whitespace rather than inventing content.

### Step 5: Generate the HTML

Read `references/design-standards.md` for the full specification. Here's the condensed version:

**Page:** A4 landscape, 297mm × 210mm. Two `.brochure-page` divs (Side A outside, Side B inside). Each is a 3-column CSS grid.

**Panel mapping — this is how a trifold works when printed and folded:**

#### Side A: Outside (first `.brochure-page`)
| Column | Panel | Content |
|--------|-------|---------|
| Left | Panel 3 — Inside Flap | Fees/pricing, "My Promise", or a "Meet [Name]" mini-intro. First thing seen when opened one fold. |
| Center | Panel 2 — Back Cover | Contact info (phone, email, website), QR code, APC seal (mandatory), "Trained & Certified By" text. |
| Right | Panel 1 — Front Cover | Hero portrait, celebrant name, title, logo, strapline. High visual impact. |

#### Side B: Inside (second `.brochure-page`)
| Column | Panel | Content |
|--------|-------|---------|
| Left | Panel 4 — About | Biography text, second portrait, training credentials. |
| Center | Panel 5 — Services | Core service offerings with 2–3 sentence descriptions and one thumbnail image per service. |
| Right | Panel 6 — Process/CTA | Process steps from `process.ts`, or additional services, or testimonials (only real ones) + CTA. |

**CSS foundation:**
```css
:root {
    --page-width: 297mm;
    --page-height: 210mm;
    --panel-width: calc(var(--page-width) / 3);
    --primary: /* from website */;
    --accent: /* from website */;
    --text: /* from website */;
    --bg-soft: /* from website */;
}

@page { size: A4 landscape; margin: 0; }

.brochure-page {
    width: var(--page-width);
    height: var(--page-height);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: var(--bg-soft);
    page-break-after: always;
    overflow: hidden;
    position: relative;
    margin: 10mm auto;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
}

.panel {
    padding: 12mm 10mm;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
}
```

**Typography:** Use the exact same fonts from the website's `index.css`. Load via Google Fonts CDN. Headings serif, body sans-serif or readable font. See `references/design-standards.md` section 5 for size guidelines.

**QR code:** Auto-generated via qrcode.js CDN. Wrap in `window.onload` with `try/catch`. Match colour to brand. Use `correctLevel: QRCode.CorrectLevel.H`.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

**APC seal:** Mandatory on back cover (Panel 2). Include "Trained & Certified By" text above it.

**Image embedding:** All images must be base64 data URIs so the HTML is fully self-contained. Read each image as binary, encode to base64, and inline:
```html
<img src="data:image/png;base64,iVBORw0KGgo..." alt="Description">
```

Determine MIME type from extension: `.png` → `image/png`, `.webp` → `image/webp`, `.jpg`/`.jpeg` → `image/jpeg`, `.svg` → `image/svg+xml`.

**Print CSS:**
```css
@media print {
    body { background: white; }
    .brochure-page { margin: 0; box-shadow: none; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
```

### Step 6: Panel Fullness and Text Sizing

Every panel should feel comfortably full — no large blank areas at the bottom, no cramped overflow. This requires both writing enough content and sizing text appropriately.

**Writing enough content:**
- Service descriptions should be **2–3 sentences each**, drawn from the website's detailed service pages (not just the homepage summary cards which are often one-liners). Explain what the service involves and what the client can expect.
- Process steps should be **2 sentences each**: what happens at that stage and why it matters to the client.
- The About panel biography should be multiple paragraphs — pull from the about page, questionnaire answers, and any personal story content.
- Each service card gets **exactly one thumbnail image** from the repo's ceremony photos. Do not stack multiple images per service.

**Adaptive text sizing** — after placing content, adjust body text per panel:

| Content volume | Body text size | When |
|---------------|---------------|------|
| Light (1–3 short items) | 12–14pt | Panel would look empty |
| Moderate (3–4 paragraphs) | 11–12pt | Standard density |
| Heavy (long bio, many services) | 10–11pt | Must fit without overflow |

Headings stay consistent (18–24pt). Category labels never below 9pt. If a panel still has visible empty space after placing all content at moderate size, increase body text to 12–14pt rather than leaving dead space.

**Never fabricate content.** If a panel is sparse, increase text size and whitespace. If no testimonials exist in the data, use a "My Promise" or "Why Choose Me?" section with the celebrant's own words from their about text or strapline. Never let a panel look like it ran out of things to say.

### Step 7: Design Polish (Print-Safe Styling)

Match the brochure's aesthetic to the website's personality. Reference `examples/brochure-fiona.html` and `examples/brochure-claire.html` for inspiration.

**Print-safe styling rule:** The PDF will often be opened in vector editors (Affinity Designer/Publisher, Illustrator, InDesign) for final layout adjustments. Every CSS property creates a vector object in the PDF. This means certain common web techniques create visible "ghost shapes" — translucent boxes, phantom circles, stray paths — that clutter the vector file. Follow these rules:

**Do not use:**
- `box-shadow` on non-image container elements (QR wrappers, APC seal containers, contact blocks). Shadows render as separate translucent rectangles.
- `background` fills on wrapper/layout-only divs. If a div only exists for layout structure, its background must be `transparent` or omitted.
- `border-radius: 50%` on non-image elements. Clipping masks on containers create phantom circles. Only use `border-radius` on actual `<img>` elements or elements with visible, intentional fills.
- `border-bottom` on inline links. These become stray vector paths. Use colour and font-weight to distinguish links.
- Decorative `::before` / `::after` pseudo-elements for blurred blobs, gradient washes, floating shapes, or underline effects. These look fine in browsers but become unmovable objects in vector editors and often print incorrectly.

**Safe to use:**
- **Image `border-radius`** — rounded corners, arch tops, organic shapes on `<img>` elements
- **Gradient panel backgrounds** — `linear-gradient` or solid fills on `.panel` divs (these are content elements)
- **Font styling** — weight, size, colour, letter-spacing, text-transform
- **Padding and spacing** — structural whitespace
- **Simple `box-shadow` on images** (portraits, service thumbnails) — acceptable because these are content the designer expects to see. Keep them simple (no spread, no inset).
- **Pull quotes** — the strapline styled distinctively in a script/accent font
- **Numbered process steps** — (01, 02, 03) with clear hierarchy via font size and colour

Use `mm` for structural dimensions, `pt` for font sizes.

### Step 8: Verification Checklist

Before declaring the HTML complete:

**Structure & layout:**
- [ ] `@page` set to `A4 landscape`
- [ ] Panel padding at least 10mm
- [ ] `overflow: hidden` on `.brochure-page`
- [ ] HTML renders correctly when opened directly in a browser

**Brand fidelity:**
- [ ] Colours match the website's brand (extracted from `index.css`)
- [ ] Fonts match the website (same Google Fonts families, or closest equivalent)
- [ ] All images embedded as base64 data URIs (no relative/external paths)

**Required elements:**
- [ ] APC seal on back cover (Panel 2) with "Trained & Certified By"
- [ ] QR code present, linked to the correct website URL
- [ ] Contact details (phone, email, website) clearly visible on back cover

**Content quality:**
- [ ] Every panel is visually full (no large blank areas at the bottom)
- [ ] Service descriptions are 2–3 sentences each (not one-liners)
- [ ] Process steps are 2 sentences each
- [ ] All copy comes from the source data — nothing fabricated
- [ ] UK/British English spelling (colour, honour, personalised)
- [ ] No em dashes in any copy
- [ ] No religious imagery (celebrants are independent/non-denominational)

**Print safety (for vector editors):**
- [ ] No `box-shadow` on non-image container elements (QR, APC, contact blocks)
- [ ] No `background` on wrapper/layout-only divs
- [ ] No decorative `::before` / `::after` pseudo-elements
- [ ] No `border-radius` on non-image container elements
- [ ] PDF opens cleanly in a vector editor with no ghost shapes

### Step 9: Convert to PDF

Use the bundled Puppeteer script.

Install dependencies (first time only):
```bash
cd <skill-path>/scripts && npm install
```

Convert:
```bash
node <skill-path>/scripts/print-to-pdf.js <path-to-brochure.html> [output.pdf]
```

If no output path given, it writes alongside the HTML with a `.pdf` extension.

Alternative: open the HTML in Chrome → Print → Save as PDF → A4 Landscape, no margins, "Background graphics" enabled.

### Output Location

Save the brochure HTML (and PDF) in the current project, typically:
- `brochure-materials/brochure-<name>.html`
- `brochure-materials/brochure-<name>.pdf`

Or if the user specifies a different location, use that.

---

## Fallback: Manual Info

If you're not inside a website repo (e.g. the user provides info directly or points to a standalone file), see `references/info-template.md` for the expected format. The same design standards and checklist apply.

## Content Rules

- **UK English** — colour, honour, personalised, organise
- **Tone** — warm, professional, compassionate. Personal and reassuring, never corporate
- **No em dashes** — use commas, colons, semicolons, or parentheses to break up sentences. This applies to all generated text.
- **No religious imagery** — independent celebrants, non-denominational
- **No fabricated content** — every word comes from the celebrant's actual data/copy
- **APC accreditation** — mandatory seal and "Trained & Certified By" on back cover
- **Services** — only include what the celebrant actually offers per their data files

## Reference Files

- `references/design-standards.md` — Full layout spec, dimensions, typography, print CSS
- `references/info-template.md` — Fallback format for manual client info
- `examples/brochure-fiona.html` — Fiona Armfield example (olive/gold, funeral-focused)
- `examples/brochure-claire.html` — Claire Cappell example (cream/orange, organic shapes)
- `scripts/print-to-pdf.js` — Puppeteer HTML→PDF converter
- `assets/apc-logo/APC-seal.png` — APC seal (fallback if repo doesn't have one)
