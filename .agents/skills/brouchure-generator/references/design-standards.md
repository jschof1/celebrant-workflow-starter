# Celebrant Brochure Design Standards

Complete specification for trifold celebrant brochures. Every brochure must follow these rules for consistent, professional, print-ready results.

## 1. Page Dimensions

- **Format:** A4 Landscape
- **Width:** 297mm
- **Height:** 210mm
- **Bleed:** 3mm (for print houses — extend background colours/images 3mm beyond trim)
- **Panels:** 3 equal columns per page, ~99mm each

```css
:root {
    --page-width: 297mm;
    --page-height: 210mm;
    --panel-width: calc(var(--page-width) / 3);
}
```

## 2. HTML Structure

Single HTML5 file. Two `.brochure-page` divs — one for each side of the paper.

```html
<!-- Side A: Outside -->
<div class="brochure-page">
    <div class="panel"><!-- Panel 3: Inside Flap --></div>
    <div class="panel"><!-- Panel 2: Back Cover --></div>
    <div class="panel"><!-- Panel 1: Front Cover --></div>
</div>

<!-- Side B: Inside -->
<div class="brochure-page">
    <div class="panel"><!-- Panel 4: About --></div>
    <div class="panel"><!-- Panel 5: Services --></div>
    <div class="panel"><!-- Panel 6: Process/CTA --></div>
</div>
```

## 3. CSS Foundation

```css
@page { size: A4 landscape; margin: 0; }

body {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans 3', sans-serif;
    background: #525659;
    color: var(--text);
}

h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: var(--primary-dark);
}

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

@media print {
    body { background: white; }
    .brochure-page { margin: 0; box-shadow: none; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}

@media screen and (max-width: 297mm) {
    body { padding: 20px; }
    .brochure-page {
        transform: scale(0.6);
        transform-origin: top center;
        margin-bottom: -80mm;
    }
}
```

## 4. Panel Content Mapping

### Side A — Outside (first `.brochure-page`)

When the brochure is printed and folded, this is what faces outward.

| Column | Panel | Role | Content |
|--------|-------|------|---------|
| Left | Panel 3 | Inside Flap | Fees/pricing, "My Promise", or a "Meet [Name]" mini-intro. This is the first thing seen when the brochure is opened a single fold. |
| Center | Panel 2 | Back Cover | Contact information (phone, email, website), QR code linking to website, APC seal with "Trained & Certified By" text. This faces up when the brochure is lying flat, back side up. **All content must be explicitly centered** (see centering rules below). |
| Right | Panel 1 | Front Cover | The hero panel — portrait photo, celebrant name, title ("Civil Celebrant" / "Funeral Celebrant"), logo, strapline. High visual impact. |

### Side B — Inside (second `.brochure-page`)

The full inside spread visible when the brochure is fully opened.

| Column | Panel | Role | Content |
|--------|-------|------|---------|
| Left | Panel 4 | About | Biography/about text, second portrait, training credentials, personal story. |
| Center | Panel 5 | Services | Core service offerings with 2–3 sentence descriptions and one thumbnail image per service card. |
| Right | Panel 6 | Process / CTA | "How I Work" steps, additional services, testimonials (if provided), call to action with contact details repeated. Often given a distinct background colour. |

## 5. Typography

### Font Pairing Options

| Role | Primary Choice | Alternatives |
|------|---------------|-------------|
| Headings | Playfair Display (serif) | Cormorant Garamond, Libre Baskerville |
| Body | Source Sans 3 (sans-serif) | Nunito, Montserrat, Lora |
| Accent/quotes | Dancing Script (cursive) | Great Vibes, Pacifico |

Load via Google Fonts CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
```

### Commercial Font Substitutions

If the website uses a commercial or locally-loaded typeface not available on Google Fonts, use the closest equivalent. Check `tailwind.config.ts` for fallback font stacks (e.g. `['Mont', '"DM Sans"', 'system-ui']`) and use that fallback.

| Commercial Font | Google Fonts Equivalent |
|----------------|----------------------|
| Mont | DM Sans |
| Proxima Nova | Montserrat or Inter |
| Avenir | Nunito |
| Futura | Poppins |
| Gotham | Raleway |

### Font Sizes

| Element | Size | Notes |
|---------|------|-------|
| Main heading (h1) | 24–30pt | Front cover name |
| Section heading (h2) | 18–22pt | Panel section titles |
| Sub-heading (h3) | 13–15pt | Service names, subsections |
| Body text | 10–14pt | Scaled by content density (see adaptive sizing) |
| Category labels | 10–11pt | Uppercase tracking labels |
| Fine print / captions | 8–9pt | Travel cost notes, "Scan to visit" |

### Units

- **Structural dimensions** (padding, margins, widths, heights): use `mm`
- **Font sizes**: use `pt`
- **Borders and fine details**: use `px` or `mm`

## 6. Colour System

Map the celebrant's brand colours to CSS custom properties:

```css
:root {
    --primary: #hexvalue;       /* Main brand colour */
    --primary-dark: #hexvalue;  /* Darker variant for headings */
    --accent: #hexvalue;        /* Accent/highlight colour */
    --text: #3a4a3e;            /* Body text colour */
    --bg-soft: #F7F6EE;         /* Light background */
    --bg-cream: #FAF9F3;        /* Alternate panel background */
}
```

Background should be warm — use off-whites and creams rather than stark white. Common palettes from existing brochures:

- **Fiona:** Olive green (#7a9a6d), goldenrod (#b8960b), teal (#5f9ea0), cream (#F7F6EE)
- **Claire:** Warm cream (#e6e1c5), dark forest green (#1a2e1f), vibrant orange (#d87a28)

## 7. Image Handling

### Embedding

All images must be base64 data URIs. This makes the HTML fully self-contained.

```html
<img src="data:image/png;base64,..." alt="Description" class="...">
```

### Image Shapes

Avoid plain rectangles. Use CSS to create interesting shapes:

```css
/* Arch top */
.arch-image {
    border-radius: 40mm 40mm 10mm 10mm;
    border: 3px solid var(--accent);
}

/* Organic blob */
.organic-image {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    border: 2px solid var(--accent);
}

/* Pill */
.pill-image {
    border-radius: 25mm;
    border: 2px solid var(--accent);
}

/* Rounded rectangle */
.rounded-image {
    border-radius: 10mm;
}
```

### Portrait Photos

- Front cover portrait: large, prominent, the visual centrepiece
- About panel portrait: medium, fits alongside text
- Always use `object-fit: cover` and set appropriate height in `mm`
- Use `object-position: top` for head-and-shoulders crops

## 8. QR Code

Auto-generated via qrcode.js CDN. Never use a static QR image.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

Implementation rules:
- Wrap generation in `window.onload`
- Always include `try/catch` with `console.error`
- Set `colorDark` to the brand's primary or text colour
- Set `correctLevel` to `QRCode.CorrectLevel.H` (highest error correction for print)
- Size: 100–128px width/height (renders well at print resolution)

## 9. APC Seal

Mandatory on every brochure. Placed on the back cover (Panel 2).

- Include text "Trained & Certified By" above the seal
- Text: small caps or uppercase with letter-spacing
- Seal width: 32–40mm
- Position: bottom of the back cover panel, centred
- The seal image is bundled in the skill at `assets/apc-logo/APC-seal.png`

## 10. Back Cover Centering (Panel 2)

The back cover content must be explicitly centered. Do not rely on the panel's `text-align: center` alone — PDF renderers and Puppeteer can drift elements left. Set:

```css
/* Contact block */
.contact-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.contact-block p {
    width: 100%;
    text-align: center;
}
.contact-block a {
    display: inline-block;
    text-align: center;
}

/* QR code container */
#qrcode {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: fit-content;
}

/* Panel heading */
.back-panel h2 {
    width: 100%;
    text-align: center;
}
```

## 11. Print-Safe Styling

The PDF will often be imported into vector editors (Affinity Designer/Publisher, Illustrator, InDesign) for final layout. Every CSS property creates a vector object. Certain web techniques create visible "ghost shapes" in vector editors.

**Do not use:**
- `box-shadow` on non-image containers (QR wrappers, APC seal containers, contact blocks). Shadows render as separate translucent rectangles.
- `background` fills on wrapper/layout-only divs. If a div only exists for structure, omit its background or set it to `transparent`.
- `border-radius: 50%` on non-image elements. Clipping masks on containers create phantom circles. Only use `border-radius` on actual `<img>` elements or elements with visible, intentional fills.
- `border-bottom` on inline links. These become stray vector paths. Use colour and font-weight instead.
- Decorative `::before` / `::after` pseudo-elements for blurred blobs, gradient washes, floating shapes, or underline effects.

**Safe to use:**
- `border-radius` on `<img>` elements (arch tops, rounded corners, organic shapes)
- `linear-gradient` or solid `background` on `.panel` divs (these are content elements the designer expects)
- Font styling (weight, size, colour, letter-spacing, text-transform)
- Padding, margins, and structural spacing
- Simple `box-shadow` on images only (portraits, service thumbnails), no spread, no inset

## 12. Print Production

### For Puppeteer/browser PDF:
```css
@page { size: A4 landscape; margin: 0; }
```

### For professional print (with bleed):
```css
@media print {
    @page { size: 303mm 216mm; margin: 0; }
    :root {
        --page-width: 303mm;
        --page-height: 216mm;
        --panel-width: 101mm;
    }
}
```

### Required print properties:
```css
* {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}
```

## 13. Responsive Screen Preview

The brochure is designed for print but should be viewable on screen for review:

```css
@media screen and (max-width: 297mm) {
    body { padding: 20px; background: #525659; }
    .brochure-page {
        transform: scale(0.6);
        transform-origin: top center;
        margin-bottom: -80mm;
    }
}
```

The dark grey background (`#525659`) provides contrast so the brochure "pages" stand out as distinct objects on screen.
